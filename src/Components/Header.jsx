import { Link } from 'react-router-dom';
import logo from "../assets/TOTVS_SmartCall_Logo.jpeg";
import './Header.css';

export default function Header() {
  return (
    <header className="header-container">
      <div className="shapes">
        <div className="shape shape-top"></div>
        <div className="shape shape-bottom"></div>
      </div>
      <nav className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/sobre">Sobre</Link>
        <Link to="/empresa">Empresa</Link>
      </nav>
      <div className="header-logo ms-auto">
        <img
          src={logo}
          alt="Logo da solução TOTVS SmartCall"
        />
      </div>
    </header>
  );
}
