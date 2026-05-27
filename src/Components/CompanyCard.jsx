import React from 'react';
import './CompanyCard.css';

export default function CompanyCard({ company, onClick }) {
  return (
    /* Este card representa cada empresa do mural */
    <div className="company-card" onClick={() => onClick(company)}>
      {/* Foto arredondada da logo da empresa */}
      <img src={company.logo} alt={company.name} className="company-logo" />
      
      <div className="company-info">
        {/* Nome da empresa */}
        <div className="company-name">{company.name}</div>
        
        {/* Lista de pessoas aleatórias ligadas à empresa */}
        <div className="company-people">
          {company.people.join(', ')}
        </div>
        
        {/* Texto fixo de transcrição */}
        <div className="company-transcription">Transcrição</div>
        
        {/* Link para acessar os detalhes da empresa */}
        <a href="#" className="company-link" onClick={(e) => e.preventDefault()}>Acesse aqui</a>
      </div>
    </div>
  );
}
