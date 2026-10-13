import { Link } from 'react-router-dom';
import smartCallLogo from '../../assets/images/companies/TOTVS_SmartCall_Logo.jpeg';

export const Footer = () => (
  <footer className="site-footer">
    <Link to="/" aria-label="Voltar ao início">
      <img src={smartCallLogo} alt="" />
    </Link>
    <p>TOTVS SmartCall 2026</p>
  </footer>
);