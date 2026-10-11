import React from "react";
import "../Css/Parcerias/company-card.css";
import "../Css/Parcerias/company-logo.css";
import "../Css/Parcerias/company-info.css";
import "../Css/Parcerias/btn-acesse-aqui.css";

export default function CompanyCard({ company, onClick }) {
  const meetingCount = company.meetings?.length || 0;

  return (
    <div className="company-card" onClick={() => onClick(company)}>
      {/* GLOW DE FUNDO SEGUINDO O MOUSE/BORDER MESH */}
      <div className="company-card-glow" />

      {/* HEADER DO CARD COM LOGO E BADGE */}
      <div className="company-card-header">
        <div className="company-logo-wrapper">
          <img
            src={company.logo}
            alt={company.name}
            className="company-logo"
          />
        </div>
        <span className="company-badge">
          <span className="badge-dot" />
          {meetingCount} {meetingCount === 1 ? "reunião" : "reuniões"}
        </span>
      </div>

      {/* INFORMAÇÕES */}
      <div className="company-info">
        <h3 className="company-name">{company.name}</h3>

        <div className="company-people-container">
          <span className="company-people-label">Participantes</span>
          <p className="company-people">{company.people.join(", ")}</p>
        </div>

        {/* BOTÃO INTERATIVO */}
        <button
          className="company-link"
          onClick={(e) => {
            e.stopPropagation();
            onClick(company);
          }}
        >
          <span className="btn-text">Acesse aqui</span>
          <svg className="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </button>
      </div>
    </div>
  );
}