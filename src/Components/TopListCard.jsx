import './TopListCard.css';

export default function TopListCard({ title, items }) {
  return (
    <div className="top-list-card">
      {/* Faixa azul clara ondulada no topo */}
      <svg className="card-wave" viewBox="0 0 300 70" preserveAspectRatio="none">
        <path d="M0,40 Q60,0 150,30 Q240,60 300,20 L300,0 L0,0 Z" fill="#2ed9e6" />
      </svg>
      <h3>{title}</h3>
      <ol className="top-list">
        {items.map((item, index) => (
          <li key={index} className="top-list-item">
            <span className="top-list-rank">{index + 1}.</span>
            <span>{item}</span>
          </li>
        ))}
      </ol>
      {/* Faixa azul escura ondulada no rodapé */}
      <svg className="card-wave-bottom" viewBox="0 0 300 70" preserveAspectRatio="none">
        <path d="M0,30 Q60,70 150,40 Q240,10 300,50 L300,70 L0,70 Z" fill="#15396a" />
      </svg>
    </div>
  );
}