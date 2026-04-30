import logo from "../assets/TOTVS_SmartCall_Logo.jpeg";
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer-container">
      <div className="footer-shapes">
        <div className="footer-shape-top"></div>
        <div className="footer-shape-bottom"></div>
      </div>
      <div className="footer-content">
        <div className="text-center text-md-start">
          <h2 className="h5 mb-1">TOTVS SmartCall</h2>
          <p className="small mb-0">Slogan</p>
        </div>
        <div className="text-start small">
          <h3 className="h6 mb-1">Contato:</h3>
          <p className="mb-0">Telefone: (11) 5555-5555</p>
          <p className="mb-0">Email: smartcall@totvs.com.br</p>
          <p className="mb-0">Instagram: @TOTVS_SmartCall_oficial</p>
          <p className="mb-0">Whatsapp: (11) 99999-9999</p>
          <p className="mb-0">Facebook: smartcall_oficial</p>
          <p className="mb-0">LinkedIn: C.T.R.L</p>
        </div>
      </div>
      <div className="footer-logo">
        <img
          src={logo}
          alt="Logo da solução TOTVS SmartCall"
        />
      </div>
    </footer>
  );
}
