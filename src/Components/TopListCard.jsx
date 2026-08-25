import React from 'react';
import './TopListCard.css';

export default function TopListCard({ title, items, alignTitle = 'left', variant = 'standard' }) {
  const isMiddle = variant === 'middle';

  return (
    <div className={`top-list-card ${isMiddle ? 'top-list-card--middle' : ''}`}>
      {/* Header Turquesa com a curva orgânica exata */}
      <div className={`top-list-card__header top-list-card__header--${alignTitle}`}>
        <span className="top-list-card__title">{title}</span>
        <svg
          className="top-list-card__wave-top-svg"
          viewBox="0 0 500 200"
          preserveAspectRatio="none"
        >
          {isMiddle ? (
            /* Curva do Card 2 (Produtos): Lingueta na esquerda, bloco no canto direito */
            <path
              d="M0,0 L500,0 L500,165 C400,165 310,135 240,80 C190,40 140,5 90,5 C40,5 0,45 0,110 Z"
              fill="#00c7b7"
            />
          ) : (
            /* Curva dos Cards 1 e 3: Bloco na esquerda, lingueta na direita */
            <path
              d="M0,0 L500,0 L500,110 C500,45 460,5 410,5 C360,5 310,40 260,80 C190,135 100,165 0,165 Z"
              fill="#00c7b7"
            />
          )}
        </svg>
      </div>

      {/* Lista perfeitamente contida */}
      <div className="top-list-card__content">
        <ol className="top-list">
          {items.map((item, index) => (
            <li key={index} className="top-list-item">
              <span className="top-list-rank">{index + 1}.</span>
              <span className="top-list-text">{item}</span>
            </li>
          ))}
        </ol>
      </div>

      {/* Wave Inferior */}
      <div className="top-list-card__wave-bottom">
        <svg viewBox="0 0 500 160" preserveAspectRatio="none">
          {isMiddle ? (
            /* Base do Card 2: Curva alta na direita */
            <path
              d="M0,120 C140,120 220,100 320,50 C370,25 430,5 470,5 C490,5 500,15 500,30 L500,160 L0,160 Z"
              fill="#084770"
            />
          ) : (
            /* Base dos Cards 1 e 3: Curva alta na esquerda */
            <path
              d="M0,30 C0,15 10,5 30,5 C70,5 130,25 180,50 C280,100 360,120 500,120 L500,160 L0,160 Z"
              fill="#084770"
            />
          )}
        </svg>
      </div>
    </div>
  );
}