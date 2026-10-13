import { useEffect, useState } from 'react';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { Link } from 'react-router-dom';
import { companyService } from '../../services/companyService';
import type { Company } from '../../types/company';

export const PartnershipsCarousel = () => {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [error, setError] = useState('');
  const [firstIndex, setFirstIndex] = useState(0);

  useEffect(() => {
    let active = true;
    companyService.getCompanies()
      .then((data) => {
        if (active) setCompanies(data);
      })
      .catch(() => {
        if (active) setError('Não foi possível carregar as parcerias.');
      });
    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    if (companies.length <= 3) return;

    const intervalId = window.setInterval(() => {
      setFirstIndex((index) => (index + 1) % companies.length);
    }, 5000);

    return () => window.clearInterval(intervalId);
  }, [companies.length]);

  const visibleCompanies = companies.length
    ? Array.from({ length: Math.min(3, companies.length) }, (_, offset) =>
        companies[(firstIndex + offset) % companies.length])
    : [];

  const move = (direction: number) => {
    if (companies.length) {
      setFirstIndex((index) => (index + direction + companies.length) % companies.length);
    }
  };

  return (
    <section className="partnerships-section" id="parcerias">
      <div className="content-width partnerships-content">
        <h2 className="section-heading">Parcerias</h2>
        <p className="section-copy">
          Receba insights da sua reunião com facilidade no Smart Call. Envie a
          transcrição da sua reunião, tenha os seus tópicos anotados e explicados
          automaticamente.
        </p>
        {error ? (
          <p className="state-message state-message--error" role="alert">{error}</p>
        ) : (
          <div className="carousel-wrap">
            <button className="carousel-arrow carousel-arrow--left" type="button" onClick={() => move(-1)} aria-label="Parceria anterior">
              <ChevronLeftIcon />
            </button>
            <div className="partner-carousel" aria-live="polite">
              {visibleCompanies.map((company) => (
                <Link
                  className="partner-teaser"
                  to={`/parcerias/${company.id}`}
                  key={`${company.id}-${firstIndex}`}
                >
                  <span className="partner-logo">
                    <img src={company.logoUrl} alt="" />
                  </span>
                  <span className="partner-teaser-info">
                    <span>{company.name}</span>
                    <strong>{company.meetingsCount}</strong>
                    <small>{company.meetingsCount === 1 ? 'reunião' : 'reuniões'}<br />registradas</small>
                  </span>
                </Link>
              ))}
            </div>
            <button className="carousel-arrow carousel-arrow--right" type="button" onClick={() => move(1)} aria-label="Próxima parceria">
              <ChevronRightIcon />
            </button>
          </div>
        )}
        <Link className="primary-button more-partners" to="/parcerias">Ver mais</Link>
      </div>
    </section>
  );
};