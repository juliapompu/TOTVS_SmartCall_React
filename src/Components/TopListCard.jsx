import React from 'react';
import './TopListCard.css';

export default function TopListCard({ title, items }) {
  return (
    <div className="top-list-card">
      <div className="top-list-card__top">
        <span className="top-list-card__title">{title}</span>
        <svg viewBox="0 0 400 120" className="top-list-card__top-wave" preserveAspectRatio="none">
          <path d="M0,80 C80,110 160,28 240,50 C320,72 360,56 400,88 L400,120 L0,120 Z" fill="#06112f" />
        </svg>
      </div>
      <div className="top-list-card__content">
        <ol className="top-list">
          {items.map((item, index) => (
            <li key={index} className="top-list-item">
              <span className="top-list-rank">{index + 1}.</span>
              <span>{item}</span>
            </li>
          ))}
        </ol>
      </div>
      <div className="top-list-card__bottom-wave">
        <svg viewBox="0 0 400 120" preserveAspectRatio="none" className="top-list-card__bottom-svg">
          <path d="M0,40 C90,10 180,90 400,32 L400,120 L0,120 Z" fill="#134676" />
        </svg>
      </div>
    </div>
  );
}
