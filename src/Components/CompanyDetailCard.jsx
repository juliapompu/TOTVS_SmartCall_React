import React from 'react';
import './CompanyDetailCard.css';

export default function CompanyDetailCard({ company, onClose }) {
  return (
    <div className="company-detail-overlay" onClick={onClose}>
      <div className="company-detail-card" onClick={(e) => e.stopPropagation()}>
        <button className="company-detail-close" onClick={onClose} aria-label="Fechar">×</button>

        <div className="company-detail-header">
          <img src={company.logo} alt={company.name} className="company-detail-logo" />
          <div>
            <h3>{company.name}</h3>
            <p className="company-detail-subtitle">{company.tagline}</p>
            <p className="company-detail-location">{company.location}</p>
          </div>
        </div>

        <p className="company-detail-description">{company.description}</p>

        <div className="company-detail-grid">
          <div>
            <div className="company-detail-label">Setor</div>
            <div>{company.sector}</div>
          </div>
          <div>
            <div className="company-detail-label">Fundada</div>
            <div>{company.founded}</div>
          </div>
          <div>
            <div className="company-detail-label">Contato</div>
            <div>{company.people.join(', ')}</div>
          </div>
          <div>
            <div className="company-detail-label">Website</div>
            <a href={company.website} target="_blank" rel="noreferrer">{company.website.replace(/^https?:\/\//, '')}</a>
          </div>
        </div>

        <div className="company-detail-section">
          <div className="company-detail-label">Destaques</div>
          <div className="company-detail-tags">
            {company.highlights.map((item) => (
              <span key={item} className="company-skill-pill">{item}</span>
            ))}
          </div>
        </div>

        <div className="company-detail-section">
          <div className="company-detail-label">Áreas de atuação</div>
          <div className="company-detail-tags">
            {company.focusAreas.map((item) => (
              <span key={item} className="company-skill-pill">{item}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
