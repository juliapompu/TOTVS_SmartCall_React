import React from 'react';
import './TopListCard.css';

export default function TopListCard({ title, items, bgColor, textColor = 'black' }) {
  return (
    /* Este card mostra as listas de 'Top 5' (clientes, produtos ou funcionários) */
    <div className="top-list-card" style={{ backgroundColor: bgColor, color: textColor }}>
      <h3>{title}</h3>
      <ol className="top-list">
        {/* Mapeia a lista de itens recebida para criar a numeração de 1 a 5 */}
        {items.map((item, index) => (
          <li key={index} className="top-list-item">
            <span className="top-list-rank">{index + 1}.</span>
            <span>{item}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}
