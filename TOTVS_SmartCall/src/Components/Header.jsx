import {Link} from 'react-router-dom';
import { Moon, Sun, Menu, X } from "lucide-react";
import { useState, useEffect } from 'react';
import logo from "../assets/TOTVS_SmartCall_Logo.jpeg";


export default function Header({}) {
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      const storedTheme = localStorage.getItem('theme');
      if (storedTheme) {
        if (storedTheme === 'dark') {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
        return storedTheme;
      }
    }
    return 'light';
  });

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

    localStorage.setItem('theme', newTheme);
  };

  useEffect(() => {
    const storedTheme = localStorage.getItem('theme') || 'light';
    if (storedTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [])

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  
  return (
    <header className="container-header-total">
      <div className="container mx-auto">
        {/* Desktop Header */}
        <div className="container-back-header">
          <div className="header-logo">
            <img
              className="logo"
              src={logo}
              alt="Logo da solução TOTVS SmartCall"
            />
          </div>
          <nav className="header-nav">
            <Link to="/" className='nav-home'>Home</Link>
            <Link to="/Sobre" className='nav-sobre'>Sobre</Link>
            <Link to="/Empresa" className='nav-empresa'>Empresa</Link>
          </nav>
          <button onClick={toggleTheme}
            className="header-tema">
            {theme === 'light' ? <Moon/> : <Sun/>}
          </button>
        </div>

        {/* Mobile Header
        <div className="md:hidden flex justify-between items-center">
          <div className="flex items-center gap-2">
            <img
              className="w-24 h-16 object-contain"
              src={logo}
              alt="Logo da empresa HumanTech"
            />
            <h1 className="text-lg font-mono font-normal text-gray-50">HumanTech</h1>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={toggleTheme}
              className="rounded-full p-2 shadow-md shadow-indigo-400 text-gray-50 
              hover:text-indigo-400 transition-all ease-in-out cursor-pointer">
              {theme === 'light' ? <Moon size={20}/> : <Sun size={20}/>}
            </button>
            <button 
              onClick={toggleMenu}
              className="rounded-full p-2 text-gray-50 hover:text-indigo-400 transition-colors cursor-pointer"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={24}/> : <Menu size={24}/>}
            </button>
          </div>
        </div> */}

        {/* Mobile Menu
        {isMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 border-t border-gray-700 pt-4">
            <div className="flex flex-col gap-2">
              <Link 
                to="/" 
                className='px-4 py-3 text-lg font-mono text-gray-50 hover:text-indigo-400 hover:bg-indigo-400/10 transition-colors rounded'
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                to="/Sobre" 
                className='px-4 py-3 text-lg font-mono text-gray-50 hover:text-indigo-400 hover:bg-indigo-400/10 transition-colors rounded'
                onClick={() => setIsMenuOpen(false)}
              >
                Sobre
              </Link>
              <Link 
                to="/Contatos" 
                className='px-4 py-3 text-lg font-mono text-gray-50 hover:text-indigo-400 hover:bg-indigo-400/10 transition-colors rounded'
                onClick={() => setIsMenuOpen(false)}
              >
                Contatos
              </Link>
              <Link 
                to="/Relatos" 
                className='px-4 py-3 text-lg font-mono text-gray-50 hover:text-indigo-400 hover:bg-indigo-400/10 transition-colors rounded'
                onClick={() => setIsMenuOpen(false)}
              >
                Relatos
              </Link>
            </div>
          </nav> */}
        {/* )} */}
        </div>
    </header>
  );
}