import os
import json
import re
import zipfile
from io import BytesIO
from datetime import datetime, timezone
from xml.etree import ElementTree

from dotenv import load_dotenv
from fastapi import FastAPI, UploadFile, File, Form, HTTPException
from fastapi.middleware.cors import CORSMiddleware

from groq import Groq
from supabase import create_client, Client


# =========================================================
# CONFIGURAÇÕES
# =========================================================

load_dotenv()

GROQ_API_KEY = os.getenv("GROQ_API_KEY")
SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_SERVICE_ROLE_KEY = os.getenv("SUPABASE_SERVICE_ROLE_KEY")


if not GROQ_API_KEY:
    raise RuntimeError("GROQ_API_KEY não configurada.")

if not SUPABASE_URL:
    raise RuntimeError("SUPABASE_URL não configurada.")

if not SUPABASE_SERVICE_ROLE_KEY:
    raise RuntimeError("SUPABASE_SERVICE_ROLE_KEY não configurada.")


# =========================================================
# CLIENTES
# =========================================================

groq_client = Groq(
    api_key=GROQ_API_KEY
)

supabase: Client = create_client(
    SUPABASE_URL,
    SUPABASE_SERVICE_ROLE_KEY
)

MAX_UPLOAD_SIZE = 50 * 1024 * 1024
SUPPORTED_EXTENSIONS = {".docx", ".vtt", ".txt"}


# =========================================================
# FASTAPI
# =========================================================

app = FastAPI(
    title="TOTVS SmartCall API",
    description="Backend de IA do TOTVS SmartCall",
    version="1.0.0"
)


# =========================================================
# CORS
# =========================================================

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)


# =========================================================
# TESTE
# =========================================================

@app.get("/")
def home():

    return {
        "status": "online",
        "sistema": "TOTVS SmartCall",
        "mensagem": "Backend funcionando!"
    }


def _get_field(row: dict, field: str):
    snake_case = re.sub(r"(?<!^)(?=[A-Z])", "_", field).lower()
    return row.get(field, row.get(snake_case))


def _normalize_company(row: dict) -> dict:
    meetings = _get_field(row, "meetings") or []
    if not isinstance(meetings, list):
        raise HTTPException(
            status_code=500,
            detail="A coluna companies.meetings deve conter uma lista JSON."
        )

    return {
        "id": row.get("id"),
        "name": row.get("name"),
        "logoUrl": _get_field(row, "logoUrl") or "",
        "meetingsCount": _get_field(row, "meetingsCount")
        if _get_field(row, "meetingsCount") is not None
        else len(meetings),
        "people": row.get("people") or [],
        "location": row.get("location") or "",
        "tagline": row.get("tagline") or "",
        "sector": row.get("sector") or "",
        "website": row.get("website") or "",
        "description": row.get("description") or "",
        "highlights": row.get("highlights") or [],
        "focusAreas": _get_field(row, "focusAreas") or [],
        "createdAt": _get_field(row, "createdAt") or "",
        "meetings": meetings,
    }


def _normalize_news(row: dict) -> dict:
    return {
        "id": row.get("id"),
        "slug": row.get("slug"),
        "title": row.get("title"),
        "summary": row.get("summary"),
        "category": row.get("category"),
        "author": row.get("author"),
        "publishedAt": _get_field(row, "publishedAt"),
        "imageUrl": _get_field(row, "imageUrl"),
        "paragraphs": row.get("paragraphs") or [],
    }


def _read_transcription(filename: str, content: bytes) -> str:
    extension = os.path.splitext(filename.lower())[1]
    if extension == ".txt":
        return content.decode("utf-8-sig")

    if extension == ".vtt":
        lines = content.decode("utf-8-sig").splitlines()
        return "\n".join(
            line.strip()
            for line in lines
            if line.strip()
            and line.strip() != "WEBVTT"
            and "-->" not in line
            and not line.strip().isdigit()
        )

    try:
        with zipfile.ZipFile(BytesIO(content)) as document:
            xml_content = document.read("word/document.xml")
        root = ElementTree.fromstring(xml_content)
    except (KeyError, zipfile.BadZipFile, ElementTree.ParseError) as error:
        raise HTTPException(
            status_code=422,
            detail="O arquivo DOCX não pôde ser lido."
        ) from error

    namespace = "{http://schemas.openxmlformats.org/wordprocessingml/2006/main}"
    paragraphs = []
    for paragraph in root.iter(f"{namespace}p"):
        text = "".join(
            node.text or "" for node in paragraph.iter(f"{namespace}t")
        ).strip()
        if text:
            paragraphs.append(text)
    return "\n".join(paragraphs)


def _validate_insights(raw_content: str) -> dict:
    try:
        insights = json.loads(raw_content)
    except json.JSONDecodeError as error:
        raise HTTPException(
            status_code=502,
            detail="A IA retornou uma análise em formato inválido."
        ) from error

    if not isinstance(insights, dict):
        raise HTTPException(
            status_code=502,
            detail="A IA retornou uma análise em formato inválido."
        )

    sentiment = insights.get("sentiment")
    if sentiment not in {"POSITIVE", "NEUTRAL", "NEGATIVE"}:
        raise HTTPException(
            status_code=502,
            detail="A IA retornou um sentimento inválido."
        )

    required_strings = ("summary", "overallTone")
    required_lists = ("keyTopics", "keyDecisions", "actionItems")
    if (
        any(not isinstance(insights.get(field), str) for field in required_strings)
        or any(not isinstance(insights.get(field), list) for field in required_lists)
        or any(not isinstance(item, dict) for item in insights["actionItems"])
    ):
        raise HTTPException(
            status_code=502,
            detail="A IA retornou campos de análise inválidos."
        )

    insights["actionItems"] = [
        {
            "id": str(item.get("id") or index + 1),
            "task": str(item.get("task") or ""),
            **({"assignee": item["assignee"]} if item.get("assignee") else {}),
            **({"deadline": item["deadline"]} if item.get("deadline") else {}),
        }
        for index, item in enumerate(insights["actionItems"])
    ]
    return insights


# =========================================================
# DADOS DO FRONTEND
# =========================================================

@app.get("/companies")
def listar_empresas():
    try:
        result = supabase.table("companies").select("*").execute()
        return [_normalize_company(row) for row in result.data]
    except HTTPException:
        raise
    except Exception as error:
        print("ERRO ao listar empresas:", error)
        raise HTTPException(
            status_code=500,
            detail="Não foi possível carregar as empresas."
        ) from error


@app.get("/companies/{company_id}")
def obter_empresa(company_id: int):
    try:
        result = (
            supabase.table("companies")
            .select("*")
            .eq("id", company_id)
            .limit(1)
            .execute()
        )
        if not result.data:
            raise HTTPException(status_code=404, detail="Empresa não encontrada.")
        return _normalize_company(result.data[0])
    except HTTPException:
        raise
    except Exception as error:
        print("ERRO ao buscar empresa:", error)
        raise HTTPException(
            status_code=500,
            detail="Não foi possível carregar a empresa."
        ) from error


@app.get("/news")
def listar_noticias():
    try:
        result = (
            supabase.table("news")
            .select("*")
            .order("published_at", desc=True)
            .execute()
        )
        return [_normalize_news(row) for row in result.data]
    except Exception as error:
        print("ERRO ao listar notícias:", error)
        raise HTTPException(
            status_code=500,
            detail="Não foi possível carregar as notícias."
        ) from error


@app.get("/news/{news_id}")
def obter_noticia(news_id: int):
    try:
        result = (
            supabase.table("news")
            .select("*")
            .eq("id", news_id)
            .limit(1)
            .execute()
        )
        if not result.data:
            raise HTTPException(status_code=404, detail="Notícia não encontrada.")
        return _normalize_news(result.data[0])
    except HTTPException:
        raise
    except Exception as error:
        print("ERRO ao buscar notícia:", error)
        raise HTTPException(
            status_code=500,
            detail="Não foi possível carregar a notícia."
        ) from error


# =========================================================
# PROCESSAMENTO DE IA
# =========================================================

@app.post("/transcriptions/analyze")
async def analisar_transcricao(
    companyId: int = Form(...),
    participants: str = Form(...),
    file: UploadFile = File(...),
):
    
    filename = file.filename or ""
    extension = os.path.splitext(filename.lower())[1]
    if extension not in SUPPORTED_EXTENSIONS:
        raise HTTPException(
            status_code=400,
            detail="Envie um arquivo DOCX, VTT ou TXT."
        )

    content = await file.read(MAX_UPLOAD_SIZE + 1)
    if not content:
        raise HTTPException(status_code=400, detail="Arquivo vazio.")
    if len(content) > MAX_UPLOAD_SIZE:
        raise HTTPException(
            status_code=413,
            detail="O arquivo deve ter no máximo 50 MiB."
        )

    try:
        participant_list = json.loads(participants)
    except json.JSONDecodeError as error:
        raise HTTPException(
            status_code=400,
            detail="participants deve ser um array JSON de nomes."
        ) from error
    if (
        not isinstance(participant_list, list)
        or any(not isinstance(name, str) for name in participant_list)
    ):
        raise HTTPException(
            status_code=400,
            detail="participants deve ser um array JSON de nomes."
        )

    try:
        company = (
            supabase.table("companies")
            .select("id, name")
            .eq("id", companyId)
            .limit(1)
            .execute()
        )
        if not company.data:
            raise HTTPException(status_code=404, detail="Empresa não encontrada.")

        transcription = _read_transcription(filename, content)
        if not transcription.strip():
            raise HTTPException(
                status_code=422,
                detail="O arquivo não contém texto para análise."
            )

        prompt = f"""
Analise a transcrição de uma reunião para o sistema TOTVS SmartCall.
Responda somente com um objeto JSON válido, sem bloco Markdown, usando
exatamente estas propriedades:
summary (string), sentiment (POSITIVE, NEUTRAL ou NEGATIVE),
overallTone (string), keyTopics (array de strings),
keyDecisions (array de strings) e actionItems (array de objetos com
id, task e, quando identificáveis, assignee e deadline).
Não invente informações ausentes; use arrays vazios quando necessário.

Empresa: {company.data[0]["name"]}
Participantes: {json.dumps(participant_list, ensure_ascii=False)}
Transcrição:
{transcription[:30000]}
"""
        completion = groq_client.chat.completions.create(
            model="openai/gpt-oss-20b",
            messages=[{"role": "user", "content": prompt}],
        )
        raw_result = completion.choices[0].message.content
        if not raw_result:
            raise HTTPException(
                status_code=502,
                detail="A IA não retornou uma análise."
            )
        insights = _validate_insights(raw_result)

        # Salvar reunião no banco
        titulo = filename.replace(".txt", "").replace(".docx", "").replace(".vtt", "")

        supabase.table("meetings").insert({
            "company_id": companyId,
            "title": titulo,
            "date_time": datetime.now(timezone.utc).isoformat(),
            "participants": participant_list,
            "transcription": transcription,
            "insights": insights
        }).execute()

        return {
            "success": True,
            "message": "Transcrição processada com sucesso!",
            "insights": insights,
        }
    except HTTPException:
        raise
    except Exception as error:
        print("ERRO ao analisar transcrição:", error)
        raise HTTPException(
            status_code=500,
            detail="Erro durante a análise da transcrição."
        ) from error

       


@app.post("/api/processar")
async def processar_arquivo(
    arquivo: UploadFile = File(...)
):

    try:

        # -------------------------------------------------
        # 1. Ler arquivo
        # -------------------------------------------------

        conteudo = await arquivo.read()

        if not conteudo:
            raise HTTPException(
                status_code=400,
                detail="Arquivo vazio."
            )


        # -------------------------------------------------
        # 2. Criar registro no Supabase
        # -------------------------------------------------

        registro = supabase.table(
            "processamentos"
        ).insert({

            "nome_arquivo": arquivo.filename,
            "status": "PROCESSANDO"

        }).execute()

        processamento = registro.data[0]
        processamento_id = processamento["id"]


        # -------------------------------------------------
        # 3. Preparar conteúdo
        # -------------------------------------------------

        try:

            texto = conteudo.decode("utf-8")

        except UnicodeDecodeError:

            texto = (
                "O arquivo enviado não é texto UTF-8. "
                "O arquivo foi recebido, mas seu conteúdo "
                "não pôde ser convertido automaticamente."
            )


        # -------------------------------------------------
        # 4. Enviar para a IA
        # -------------------------------------------------

        prompt = f"""
Você é a IA do sistema TOTVS SmartCall.

Analise o conteúdo abaixo.

Forneça uma resposta organizada contendo:

1. Resumo
2. Problemas identificados
3. Informações importantes
4. Próximas ações recomendadas

Conteúdo:

{texto[:30000]}
"""

        resposta = groq_client.chat.completions.create(
            model="openai/gpt-oss-20b",
            messages=[{"role": "user", "content": prompt}]
        )

        resultado = resposta.choices[0].message.content


        # -------------------------------------------------
        # 5. Criar relatório
        # -------------------------------------------------

        relatorio = f"""
TOTVS SMARTCALL
================

Arquivo:
{arquivo.filename}

Data:
{datetime.now(timezone.utc).isoformat()}

ANÁLISE DA IA
=============

{resultado}
"""

        relatorio_bytes = relatorio.encode("utf-8")


        # -------------------------------------------------
        # 6. Salvar arquivo no Storage
        # -------------------------------------------------

        caminho = (
            f"processamentos/"
            f"{processamento_id}/"
            f"relatorio.txt"
        )

        supabase.storage.from_(
            "resultados"
        ).upload(
            caminho,
            relatorio_bytes,
            {
                "content-type": "text/plain"
            }
        )


        # -------------------------------------------------
        # 7. Atualizar banco
        # -------------------------------------------------

        supabase.table(
            "processamentos"
        ).update({

            "status": "CONCLUIDO",
            "resultado": resultado,
            "arquivo_path": caminho,
            "finalizado_em": datetime.now(
                timezone.utc
            ).isoformat()

        }).eq(
            "id",
            processamento_id
        ).execute()


        # -------------------------------------------------
        # 8. Criar URL do arquivo
        # -------------------------------------------------

        arquivo_url = supabase.storage.from_(
            "resultados"
        ).get_public_url(caminho)


        # -------------------------------------------------
        # 9. Retornar para React
        # -------------------------------------------------

        return {

            "id": processamento_id,
            "status": "CONCLUIDO",
            "nome_arquivo": arquivo.filename,
            "resultado": resultado,
            "arquivo_url": arquivo_url

        }


    except HTTPException:

        raise


    except Exception as erro:

        print("ERRO:", erro)

        raise HTTPException(
            status_code=500,
            detail="Erro durante o processamento."
        )


# =========================================================
# LISTAR PROCESSAMENTOS
# =========================================================

@app.get("/api/processamentos")
def listar_processamentos():

    resultado = supabase.table(
        "processamentos"
    ).select(
        "*"
    ).order(
        "criado_em",
        desc=True
    ).execute()


    
    return resultado.data