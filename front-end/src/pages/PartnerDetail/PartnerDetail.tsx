import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Footer } from '../../components/global/Footer';
import { Header } from '../../components/global/Header';
import { companyService } from '../../services/companyService';
import type { Company } from '../../types/company';

const formatMeetingDate = (dateTime: string) =>
  new Intl.DateTimeFormat('pt-BR', {
    dateStyle: 'long',
    timeStyle: 'short',
  }).format(new Date(dateTime));

export const PartnerDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [company, setCompany] = useState<Company | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;
    const companyId = Number(id);
    const request = Number.isInteger(companyId) && companyId > 0
      ? companyService.getCompanyById(companyId)
      : Promise.resolve(undefined);
    request
      .then((item) => {
        if (active) setCompany(item ?? null);
      })
      .catch(() => {
        if (active) setError('Não foi possível carregar os dados desta empresa.');
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [id]);

  return (
    <div className="page-shell">
      <Header />
      <main className="detail-page content-width">
        <Link className="back-link" to="/parcerias">← Voltar para parcerias</Link>
        {loading && <p className="state-message" role="status">Carregando empresa...</p>}
        {error && <p className="state-message state-message--error" role="alert">{error}</p>}
        {!loading && !error && !company && (
          <p className="state-message">Empresa não encontrada.</p>
        )}
        {company && !error && (
          <>
            <section className="company-profile">
              <div className="company-profile-logo"><img src={company.logoUrl} alt="" /></div>
              <div>
                <p className="eyebrow">{company.tagline}</p>
                <h1>{company.name}</h1>
                <p>{company.meetingsCount} reuniões registradas no SmartCall</p>
              </div>
            </section>
            <section className="company-overview" aria-labelledby="company-overview-title">
              <div className="company-overview-copy">
                <p className="eyebrow">Conheça a empresa</p>
                <h2 id="company-overview-title">Sobre {company.name}</h2>
                <p>{company.description}</p>
                <dl className="company-facts">
                  <div>
                    <dt>Localização</dt>
                    <dd>{company.location}</dd>
                  </div>
                  <div>
                    <dt>Setor</dt>
                    <dd>{company.sector}</dd>
                  </div>
                  <div>
                    <dt>Contatos</dt>
                    <dd>{company.people.join(', ')}</dd>
                  </div>
                </dl>
                <a className="company-website" href={company.website} target="_blank" rel="noreferrer">
                  Acessar site oficial
                  <span aria-hidden="true">↗</span>
                </a>
              </div>
              <div className="company-tags">
                <section>
                  <h3>Destaques</h3>
                  <ul>
                    {company.highlights.map((highlight) => <li key={highlight}>{highlight}</li>)}
                  </ul>
                </section>
                <section>
                  <h3>Áreas de atuação</h3>
                  <ul>
                    {company.focusAreas.map((area) => <li key={area}>{area}</li>)}
                  </ul>
                </section>
              </div>
            </section>
            <section className="meeting-history">
              <h2 className="section-heading">Histórico de reuniões</h2>
              {company.meetings.length === 0 ? (
                <p className="state-message">Ainda não há reuniões registradas para esta empresa.</p>
              ) : (
                <div className="meeting-list">
                  {company.meetings.map((meeting) => (
                    <article className="meeting-card" key={meeting.id}>
                      <div className="meeting-card-heading">
                        <div>
                          <h3>{meeting.title}</h3>
                          <time dateTime={meeting.dateTime}>{formatMeetingDate(meeting.dateTime)}</time>
                        </div>
                        <span>{meeting.participants.length} participantes</span>
                      </div>
                      <p className="meeting-participants"><strong>Participantes:</strong> {meeting.participants.join(', ')}</p>
                      <p>{meeting.transcription}</p>
                    </article>
                  ))}
                </div>
              )}
            </section>
          </>
        )}
      </main>
      <Footer />
    </div>
  );
};
