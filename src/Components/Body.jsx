import './Body.css';
import Noticia1 from '../assets/noticia1.jpg';
import Noticia2 from '../assets/noticia2.jpg';
import Noticia3 from '../assets/noticia3.jpg';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

export default function Body() {
    return (
        <div className='carrosel-container'>
            <div id="carouselExampleCaptions" className="carousel slide" data-bs-ride="carousel" data-bs-interval="4000">
                <div className="carousel-indicators">
                    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Próximo"></button>
                    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Próximo"></button>
                    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Próximo"></button>
                </div>
                {/* aqui são as imgs que coloquei como noticias para girar no carrossel, precisa ter 3 imgs com cada uma 1 sessão explicando */}
                <div className="carousel-inner">
                    <div className="carousel-item active">
                        <img src={Noticia1} className="d-block w-100" alt="Notícia 1"/>
                        <div className="carousel-caption d-none d-md-block">
                            <h5>TOTVS + ESPM! Uma combinação de sucesso!</h5>
                            <p>TOTVS encontrou uma parceira com a ESMP para incluir graduações de marketing voltado a tecnologia na faculdade.</p>
                        </div>
                    </div>
                    <div className="carousel-item">
                        <img src={Noticia2} className="d-block w-100" alt="Notícia 2"/>
                        <div className="carousel-caption d-none d-md-block">
                            <h5>BTG e TOTVS quem diria?</h5>
                            <p>Veja mais sobre como a BTG Pactual comprou as ações da TOTVS em vez do Itau.</p>
                        </div>
                    </div>
                    <div className="carousel-item">
                        <img src={Noticia3} className="d-block w-100" alt="Notícia 3"/>
                        <div className="carousel-caption d-none d-md-block">
                            <h5>Prêmio TOTVS Brasil!</h5>
                            <p>Saiba mais sobre o evento mais esperado da TOTVS, conhece uma empresa que poderia fazer parte? Entre em contato pelo Complaence! </p>
                        </div>
                    </div>
                </div>
                {/* Botões do carrossel que controlam se vc vai pra frente ou para trás */}
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Anterior</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Próximo</span>
                </button>
            </div>
        </div>
    );
}