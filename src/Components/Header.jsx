import { useRef, useState, useLayoutEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import logo from "../assets/TOTVS_SmartCall_Logo.jpeg";
// import './Header.css';

import "../Css/Header/animations.css"
import "../Css/Header/header.css"
import "../Css/Header/main.css"
import "../Css/Header/responsividade.css"
import "../Css/Header/variables.css"


export default function Header() {
  const location = useLocation();
  const navRef = useRef(null);
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0, opacity: 0 });

  useLayoutEffect(() => {
    if (!navRef.current) return;

    const activeLink = navRef.current.querySelector('a.active');

    if (activeLink) {
      setIndicatorStyle({
        left: activeLink.offsetLeft,
        width: activeLink.offsetWidth,
        opacity: 1,
      });
    } else {
      setIndicatorStyle((prev) => ({ ...prev, opacity: 0 }));
    }
  }, [location.pathname]);

  return (
    <header className="header-container">
      <div className="shapes">
        <div className="shape shape-top"></div>
        <div className="shape shape-bottom"></div>
      </div>

      <nav className="nav-links" ref={navRef}>
        <NavLink to="/" end>Home</NavLink>
        <NavLink to="/empresa">Empresas Parceiras</NavLink>

        <span className="nav-indicator" style={indicatorStyle} />
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