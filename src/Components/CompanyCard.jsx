import React from 'react';
import './CompanyCard.css';

export default function CompanyCard({ company, onClick }) {

  const meetingCount = company.meetings?.length || 0;

  return (

    <div
      className="company-card"
      onClick={() => onClick(company)}
    >

      {/* LOGO */}

      <img
        src={company.logo}
        alt={company.name}
        className="company-logo"
      />

      {/* INFORMAÇÕES */}

      <div className="company-info">

        <div className="company-name">
          {company.name}
        </div>

        <div className="company-people">
          {company.people.join(', ')}
        </div>

        {/* QUANTIDADE DE REUNIÕES */}

        <div className="company-meeting-count">

          {meetingCount}

          {meetingCount === 1
            ? ' reunião registrada'
            : ' reuniões registradas'}

        </div>

        {/* BOTÃO */}

        <button
          className="company-link"
          onClick={(e) => {
            e.stopPropagation();
            onClick(company);
          }}
        >
          Acesse aqui
        </button>

      </div>

    </div>
  );
}