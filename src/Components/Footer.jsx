import logo from "../assets/TOTVS_SmartCall_Logo.jpeg";
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer-container">
      <div className="footer-shapes">
        <div className="footer-shape-top"></div>
        <div className="footer-shape-bottom"></div>
      </div>
      
      <div className="footer-left">
        <div className="footer-links">
          <a href="#">Termos de uso e privacidade</a>
          <a href="#">Atendimento</a>
          <a href="#">Central de Denúncias</a>
        </div>
        <div className="footer-socials">
          <a href="#"><img src="https://cdn-icons-png.flaticon.com/512/733/733547.png" alt="Facebook" /></a>
          <a href="#"><img src="https://cdn-icons-png.flaticon.com/512/3536/3536505.png" alt="LinkedIn" /></a>
          <a href="#"><img src="https://cdn-icons-png.flaticon.com/512/733/733579.png" alt="Twitter" /></a>
          <a href="#"><img src="https://cdn-icons-png.flaticon.com/512/2111/2111463.png" alt="Instagram" /></a>
        </div>
      </div>

      <div className="footer-right">
        <div className="footer-brand">
          <div className="text-end">
            <h2 className="h5 mb-0">TOTVS SmartCall</h2>
            <p className="small mb-0">Slogan</p>
          </div>
          <div className="footer-logo">
            <img
              src={logo}
              alt="Logo da solução TOTVS SmartCall"
            />
          </div>
        </div>
      </div>
    </footer>
  );
}
