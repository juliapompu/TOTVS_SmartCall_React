import logo from "../assets/TOTVS_SmartCall_Logo.jpeg";
import '../App.css';

export default function Header() {
  return (
    <header className="header">
        <div className="shapes">
            <div className="shape shape-top"></div>
            <div className="shape shape-bottom"></div>
        </div>
      <nav className="nav">
        <a href="/">Home</a>
        <a href="/Sobre">Sobre</a>
        <a href="/Empresa">Empresa</a>
      </nav>
      <div className="logo">
        <img
          src={logo}
          alt="Logo da solução TOTVS SmartCall"
        />
      </div>
    </header>
  );
}