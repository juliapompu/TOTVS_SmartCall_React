import os
import io
from datetime import datetime, timezone

from dotenv import load_dotenv
from fastapi import FastAPI, UploadFile, File, HTTPException
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
    allow_origins=[
        "http://localhost:5173",
        "http://localhost:3000",
        "https://vercel.app"
    ],
    allow_credentials=True,
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


# =========================================================
# PROCESSAMENTO DE IA
# =========================================================

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