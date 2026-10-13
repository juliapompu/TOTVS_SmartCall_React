import { useEffect } from 'react';
import type { MouseEvent } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import smartCallLogo from '../../assets/images/companies/TOTVS_SmartCall_Logo.jpeg';

export const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.pathname !== '/' || location.hash !== '#ranking') return;

    const timeout = window.setTimeout(() => {
      const ranking = document.getElementById('ranking');
      if (ranking) {
        window.scrollTo({
          top: ranking.getBoundingClientRect().top + window.scrollY,
          behavior: 'smooth',
        });
      }
    }, 500);
    return () => window.clearTimeout(timeout);
  }, [location.hash, location.pathname]);

  const scrollToRanking = () => {
    window.setTimeout(() => {
      const ranking = document.getElementById('ranking');
      if (ranking) {
        window.scrollTo({
          top: ranking.getBoundingClientRect().top + window.scrollY,
          behavior: 'smooth',
        });
      }
    }, 500);
  };

  const goToRanking = (event: MouseEvent<HTMLAnchorElement>) => {
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
      return;
    }
    event.preventDefault();
    if (location.pathname !== '/') {
      navigate('/#ranking');
      return;
    }

    window.history.replaceState(null, '', '/#ranking');
    scrollToRanking();
  };

  return (
    <header className="site-header">
      <NavLink className="brand-link" to="/" aria-label="TOTVS SmartCall - início">
        <img src={smartCallLogo} alt="TOTVS SmartCall" />
      </NavLink>
      <nav className="main-nav" aria-label="Navegação principal">
        <NavLink end to="/" className={({ isActive }) => (isActive ? 'is-active' : '')}>
          Home
        </NavLink>
        <Link to="/#ranking" onClick={goToRanking}>Ranking</Link>
        <NavLink to="/parcerias" className={({ isActive }) => (isActive ? 'is-active' : '')}>
          Parcerias
        </NavLink>
      </nav>
    </header>
  );
};