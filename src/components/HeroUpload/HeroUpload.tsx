import { useRef, useState } from 'react';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import CloseIcon from '@mui/icons-material/Close';
import LightbulbOutlinedIcon from '@mui/icons-material/LightbulbOutlined';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutlineRounded';
import AssignmentTurnedInOutlinedIcon from '@mui/icons-material/AssignmentTurnedInOutlined';
import { NewsCarousel } from '../NewsCarousel/NewsCarousel';
import { useGlobalSnackbar } from '../global/SnackbarContext';
import { companyService } from '../../services/companyService';
import type { Company, MeetingInsights } from '../../types/company';

const maxFileSize = 50 * 1024 * 1024;
const allowedExtensions = ['.docx', '.vtt', '.txt'];

const validateFile = (file: File) => {
  const extension = file.name.slice(file.name.lastIndexOf('.')).toLowerCase();
  if (!allowedExtensions.includes(extension)) {
    return 'Selecione um arquivo DOCX, VTT ou TXT.';
  }
  if (file.size > maxFileSize) {
    return 'O arquivo deve ter no máximo 50 MB.';
  }
  return '';
};

const formatFileSize = (size: number) =>
  size < 1024 * 1024
    ? `${Math.max(1, Math.round(size / 1024))} KB`
    : `${(size / (1024 * 1024)).toFixed(1)} MB`;

export const HeroUpload = () => {
  const { showSuccess } = useGlobalSnackbar();
  const inputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [companies, setCompanies] = useState<Company[]>([]);
  const [companyId, setCompanyId] = useState('');
  const [participantsText, setParticipantsText] = useState('');
  const [uploadOpen, setUploadOpen] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [insights, setInsights] = useState<MeetingInsights | null>(null);
  const [insightsCompany, setInsightsCompany] = useState('');

  const acceptFile = (candidate?: File) => {
    if (!candidate) return;
    const validationError = validateFile(candidate);
    if (validationError) {
      setError(validationError);
      return;
    }

    setError('');
    setFile(candidate);
    setUploadOpen(true);
    companyService.getCompanies().then(setCompanies).catch(() => {
      setError('Não foi possível carregar a lista de empresas. Tente novamente.');
    });
  };

  const handleFileInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    acceptFile(event.target.files?.[0]);
    event.target.value = '';
  };

  const handleDrop = (event: React.DragEvent<HTMLElement>) => {
    event.preventDefault();
    setDragging(false);
    acceptFile(event.dataTransfer.files[0]);
  };

  const closeUpload = () => {
    if (loading) return;
    setUploadOpen(false);
    setFile(null);
    setError('');
  };

  const analyzeTranscription = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!file || !companyId) {
      setError('Selecione uma empresa para continuar.');
      return;
    }

    const participants = participantsText
      .split(/[,\n;]/)
      .map((name) => name.trim())
      .filter(Boolean);

    setError('');
    setLoading(true);
    try {
      const result = await companyService.uploadAndAnalyze({
        companyId: Number(companyId),
        participants,
        file,
      });
      if (!result.success) {
        throw new Error(result.message || 'Não foi possível analisar a transcrição.');
      }
      showSuccess(result.message || 'Transcrição analisada com sucesso.');
      setInsights(result.insights);
      setInsightsCompany(companies.find((company) => company.id === Number(companyId))?.name ?? '');
      setUploadOpen(false);
      setFile(null);
      setInsightsOpen(true);
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : 'Ocorreu um erro ao analisar a transcrição.');
    } finally {
      setLoading(false);
    }
  };

  const [insightsOpen, setInsightsOpen] = useState(false);

  return (
    <>
      <section className="hero-section">
        <div className="hero-layout content-width">
          <div className="upload-panel">
            <h1>Receba insights da sua reunião.</h1>
            <p className="upload-intro">
              Receba insights da sua reunião com facilidade no Smart Call. Envie a
              transcrição da sua reunião, tenha os seus tópicos anotados e explicados
              automaticamente.
            </p>
            <div
              className={`drop-area${dragging ? ' is-dragging' : ''}`}
              onDragOver={(event) => {
                event.preventDefault();
                setDragging(true);
              }}
              onDragLeave={() => setDragging(false)}
              onDrop={handleDrop}
            >
              <div className="drop-area-inner">
                <DescriptionOutlinedIcon aria-hidden="true" />
                <button
                  type="button"
                  className="upload-trigger"
                  onClick={() => inputRef.current?.click()}
                >
                  Faça upload da sua transcrição
                </button>
                <span>Ou arraste e solte aqui</span>
                <small>O arquivo deve ser .DOCX, VTT ou TXT e ter até 50 MB.</small>
                <input
                  ref={inputRef}
                  className="visually-hidden"
                  type="file"
                  accept=".docx,.vtt,.txt"
                  onChange={handleFileInput}
                  aria-label="Selecionar arquivo de transcrição"
                />
              </div>
            </div>
            {error && !uploadOpen && <p className="upload-inline-error" role="alert">{error}</p>}
            <p className="upload-terms">
              Ao fazer upload do arquivo, você concorda com os nossos{' '}
              <a href="#termos">Termos de uso</a> e a{' '}
              <a href="#privacidade">Política de privacidade</a>.
            </p>
          </div>
          <NewsCarousel />
        </div>
      </section>

      {uploadOpen && file && (
        <div className="modal-backdrop" role="presentation" onMouseDown={(event) => {
          if (event.target === event.currentTarget) closeUpload();
        }}>
          <section className="upload-modal modal-card" role="dialog" aria-modal="true" aria-labelledby="upload-modal-title">
            <div className="modal-heading">
              <div>
                <h2 id="upload-modal-title">Prepare sua análise</h2>
                <p>Confirme os dados da reunião antes de enviar.</p>
              </div>
              <button className="icon-button" type="button" onClick={closeUpload} aria-label="Fechar">
                <CloseIcon />
              </button>
            </div>
            <div className="selected-file">
              <DescriptionOutlinedIcon />
              <div>
                <strong>{file.name}</strong>
                <span>{formatFileSize(file.size)}</span>
              </div>
              <button className="text-button" type="button" onClick={() => inputRef.current?.click()}>
                Trocar
              </button>
            </div>
            <form onSubmit={analyzeTranscription}>
              <label className="form-field">
                Empresa
                <select value={companyId} onChange={(event) => setCompanyId(event.target.value)} required>
                  <option value="">Selecione uma empresa</option>
                  {companies.map((company) => (
                    <option key={company.id} value={company.id}>{company.name}</option>
                  ))}
                </select>
              </label>
              <label className="form-field">
                Participantes
                <textarea
                  value={participantsText}
                  onChange={(event) => setParticipantsText(event.target.value)}
                  placeholder="Digite os nomes separados por vírgula"
                  rows={3}
                />
              </label>
              {error && <p className="form-error" role="alert">{error}</p>}
              {loading && (
                <p className="loading-message" role="status">
                  <span className="loading-spinner" /> IA analisando transcrição...
                </p>
              )}
              <button className="primary-button modal-submit" type="submit" disabled={loading}>
                {loading ? 'Analisando...' : 'Processar e gerar insights'}
              </button>
            </form>
          </section>
        </div>
      )}

      {insightsOpen && insights && (
        <div className="modal-backdrop" role="presentation">
          <section className="insights-modal modal-card" role="dialog" aria-modal="true" aria-labelledby="insights-title">
            <div className="modal-heading">
              <div className="insights-title">
                <LightbulbOutlinedIcon />
                <div>
                  <h2 id="insights-title">Insights gerados pela IA</h2>
                  <p>Reunião com <strong>{insightsCompany}</strong></p>
                </div>
              </div>
              <button className="icon-button" type="button" onClick={() => setInsightsOpen(false)} aria-label="Fechar">
                <CloseIcon />
              </button>
            </div>
            <div className="insights-content">
              <section className="insight-summary">
                <h3>Resumo da call</h3>
                <p>{insights.summary}</p>
                <span className="tone-badge">Tom: {insights.overallTone}</span>
              </section>
              <section>
                <h3>Principais tópicos discutidos</h3>
                <div className="topic-tags">
                  {insights.keyTopics.map((topic) => <span key={topic}>#{topic}</span>)}
                </div>
              </section>
              <section>
                <h3><CheckCircleOutlineIcon /> Decisões-chave</h3>
                <ul className="decision-list">
                  {insights.keyDecisions.map((decision) => <li key={decision}>{decision}</li>)}
                </ul>
              </section>
              <section>
                <h3><AssignmentTurnedInOutlinedIcon /> Plano de ação e tarefas</h3>
                <div className="action-list">
                  {insights.actionItems.map((item) => (
                    <article key={item.id}>
                      <strong>{item.task}</strong>
                      <span>{item.assignee ?? 'Responsável não definido'}{item.deadline ? ` · Prazo: ${item.deadline}` : ''}</span>
                    </article>
                  ))}
                </div>
              </section>
            </div>
            <button className="primary-button modal-submit" type="button" onClick={() => setInsightsOpen(false)}>
              Concluir e salvar
            </button>
          </section>
        </div>
      )}
    </>
  );
};
