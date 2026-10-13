import { useEffect, useMemo, useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import { Link } from 'react-router-dom';
import { Footer } from '../../components/global/Footer';
import { Header } from '../../components/global/Header';
import { companyService } from '../../services/companyService';
import type { Company } from '../../types/company';

export const Partners = () => {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [query, setQuery] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;
    companyService.getCompanies()
      .then((items) => {
        if (active) setCompanies(items);
      })
      .catch(() => {
        if (active) setError('Não foi possível carregar as empresas parceiras.');
      });
    return () => {
      active = false;
    };
  }, []);

  const filteredCompanies = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase('pt-BR');
    return companies.filter((company) =>
      company.name.toLocaleLowerCase('pt-BR').includes(normalizedQuery));
  }, [companies, query]);

  return (
    <div className="page-shell">
      <Header />
      <main className="partners-page content-width">
        <Link className="back-link" to="/">← Voltar ao início</Link>
        <h1 className="section-heading">Nossas parcerias</h1>
        <p className="section-copy">Conheça as empresas que transformam suas reuniões com o SmartCall.</p>
        <label className="partner-search">
          <SearchIcon aria-hidden="true" />
          <span className="visually-hidden">Buscar empresa</span>
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Buscar empresa"
          />
        </label>
        {error && <p className="state-message state-message--error" role="alert">{error}</p>}
        {!error && filteredCompanies.length === 0 && (
          <p className="state-message">Nenhuma empresa encontrada para “{query}”.</p>
        )}
        {!error && (
          <div className="companies-grid">
            {filteredCompanies.map((company) => (
              <Link className="company-card" to={`/parcerias/${company.id}`} key={company.id}>
                <img src={company.logoUrl} alt="" />
                <h2>{company.name}</h2>
                <span>
                  {company.meetingsCount} {company.meetingsCount === 1 ? 'reunião registrada' : 'reuniões registradas'}
                </span>
              </Link>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};