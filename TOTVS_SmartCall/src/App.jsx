import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <header className="header">
      <div className="shapes">
        <div className="shape shape-top"></div>
        <div className="shape shape-bottom"></div>
      </div>

      <nav className="nav">
        <a href="./App.jsx">Home</a>
        <a href="./Pages/Sobre.jsx">Sobre nós</a>
        <a href="./Pages/Empresa.jsx">Conheça a empresa</a>
      </nav>

      <div className="logo" src="assets/TOTVS_SmartCall_Logo.jpeg">LOGO</div>
    </header>
  )
}

export default App
