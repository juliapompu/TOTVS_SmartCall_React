import React from 'react';
import './TopListCard.css';

export default function TopListCard({ title, items }) {
  return (
    <div className="top-list-card">
      <div className="top-list-card__wave top-list-card__wave-top">
        <svg viewBox="0 0 500 110" preserveAspectRatio="none">
          <path d="M0,0 H500 V44 C468,60 430,20 390,30 C350,40 300,58 250,52 C200,46 150,28 100,34 C60,40 35,50 0,48 Z" fill="#25c7c0" />
        </svg>
        <span className="top-list-card__title">{title}</span>
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

      <div className="top-list-card__wave top-list-card__wave-bottom">
        <svg viewBox="0 0 500 110" preserveAspectRatio="none">
          <path d="M0,0 H500 V44 C468,60 430,20 390,30 C350,40 300,58 250,52 C200,46 150,28 100,34 C60,40 35,50 0,48 Z" fill="#154b78" transform="translate(0,110) scale(1,-1)" />
        </svg>
      </div>
    </div>
  );
}
