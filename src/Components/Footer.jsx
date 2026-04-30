import logo from "../assets/TOTVS_SmartCall_Logo.jpeg";
import '../App.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="shapes">
        <div className="shape shape-top"></div>
        <div className="shape shape-bottom"></div>
      </div>
      <div className="footer-text">
        <h2 className="footer-text1">TOTVS SmartCall</h2>
        <p className="footer-text2">Slogan</p>
      </div>
      <div className="footer-contato">
        <h3 className="footer-contato-text1">Contato:</h3>
        <p className="footer-contato-text2">Telefone: (11) 5555-5555</p>
        <p className="footer-contato-text2">Email: smartcall@totvs.com.br</p>
        <p className="footer-contato-text2">Instagram: @TOTVS_SmartCall_oficial</p>
        <p className="footer-contato-text2">Whatsapp: (11) 99999-9999</p>
        <p className="footer-contato-text2">Facebook: smartcall_oficial</p>
        <p className="footer-contato-text2">LinkedIn: C.T.R.L</p>
      </div>
      <div className="logo2">
        <img
          src={logo}
          alt="Logo da solução TOTVS SmartCall"
        />
      </div>
    </footer>
  );
}