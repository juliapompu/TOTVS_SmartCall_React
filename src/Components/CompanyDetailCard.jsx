import React from 'react';
import './CompanyDetailCard.css';

export default function CompanyDetailCard({ company, onClose }) {

  const meetings = company.meetings || [];

  return (

    <div
      className="company-modal-overlay"
      onClick={onClose}
    >

      <div
        className="company-modal"
        onClick={(e) => e.stopPropagation()}
      >

        {/* BOTÃO FECHAR */}

        <button
          className="company-modal-close"
          onClick={onClose}
        >
          ×
        </button>


        {/* CABEÇALHO */}

        <div className="company-modal-header">

          <img
            src={company.logo}
            alt={company.name}
            className="company-modal-logo"
          />

          <div>

            <h2>
              {company.name}
            </h2>

            <p className="company-modal-tagline">
              {company.tagline}
            </p>

            <p className="company-modal-location">
              {company.location}
            </p>

          </div>

        </div>


        {/* DESCRIÇÃO */}

        <p className="company-modal-description">
          {company.description}
        </p>


        {/* INFORMAÇÕES */}

        <div className="company-modal-info-grid">

          <div>
            <span>SETOR</span>
            <strong>{company.sector}</strong>
          </div>

          <div>
            <span>FUNDADA</span>
            <strong>{company.founded}</strong>
          </div>

          <div>
            <span>CONTATO</span>
            <strong>
              {company.people.join(', ')}
            </strong>
          </div>

          <div>
            <span>WEBSITE</span>

            <a
              href={company.website}
              target="_blank"
              rel="noreferrer"
            >
              {company.website.replace('https://', '')}
            </a>

          </div>

        </div>


        {/* DESTAQUES */}

        <div className="company-modal-section">

          <span className="company-section-title">
            DESTAQUES
          </span>

          <div className="company-tags">

            {company.highlights.map((item, index) => (

              <span
                key={index}
                className="company-tag"
              >
                {item}
              </span>

            ))}

          </div>

        </div>


        {/* ÁREAS DE ATUAÇÃO */}

        <div className="company-modal-section">

          <span className="company-section-title">
            ÁREAS DE ATUAÇÃO
          </span>

          <div className="company-tags">

            {company.focusAreas.map((item, index) => (

              <span
                key={index}
                className="company-tag"
              >
                {item}
              </span>

            ))}

          </div>

        </div>


        {/* ================================================= */}
        {/* REUNIÕES */}
        {/* ================================================= */}

        <div className="company-meetings">

          <div className="company-meetings-header">

            <div>

              <span className="company-section-title">
                REUNIÕES E TRANSCRIÇÕES
              </span>

              <p>
                Histórico de reuniões registradas para esta empresa.
              </p>

            </div>

            <div className="company-meeting-total">
              {meetings.length}
            </div>

          </div>


          {meetings.length > 0 ? (

            <div className="meetings-list">

              {meetings.map((meeting) => (

                <div
                  className="meeting-item"
                  key={meeting.id}
                >

                  <div className="meeting-top">

                    <div>

                      <strong>
                        {meeting.title}
                      </strong>

                      <span className="meeting-date">
                        {meeting.date} • {meeting.time}
                      </span>

                    </div>

                  </div>


                  <div className="meeting-participants">

                    <strong>
                      Participantes:
                    </strong>{' '}

                    {meeting.participants.join(', ')}

                  </div>


                  <div className="meeting-transcription">

                    <span>
                      TRANSCRIÇÃO
                    </span>

                    <p>
                      {meeting.transcription}
                    </p>

                  </div>

                </div>

              ))}

            </div>

          ) : (

            <div className="no-meetings">

              <p>
                Nenhuma reunião registrada para esta empresa.
              </p>

            </div>

          )}

        </div>

      </div>

    </div>
  );
}