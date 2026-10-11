import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import TopListCard from '../Components/TopListCard';
import CompanyCard from '../Components/CompanyCard';
import CompanyDetailCard from '../Components/CompanyDetailCard';

import "../Css/Home/home-general.css";
import "../Css/Home/company-mural.css";
import "../Css/Home/news-section.css";
import "../Css/Home/hero-section.css";

// Logos das Empresas
import itauLogo from '../assets/itau-logo.jpg';
import ambevLogo from '../assets/ambev-logo.jpeg';
import magaluLogo from '../assets/magazine-luiza-logo.png';
import localizaLogo from '../assets/localiza-logo.png';
import fleuryLogo from '../assets/grupo-fleury-logo.png';
import sebraeLogo from '../assets/sebrae-logo.jpg';
import assaiLogo from '../assets/assai-atacatista-logo.jfif';
import atacadaoLogo from '../assets/atacadao-logo.png';
import muffatoLogo from '../assets/grupomuffato_logo.jfif';
import martMinasLogo from '../assets/mart-minas-logo.png';
import arklokLogo from '../assets/arklok-logo.jpg';
import makroLogo from '../assets/makro-engenharia-logo.png';

// Imagens das Notícias
import Noticia1 from '../assets/noticia1.jpg';
import Noticia2 from '../assets/noticia2.jpg';
import Noticia3 from '../assets/noticia3.jpg';

export default function Home() {
  const [topClients, setTopClients] = useState([]);
  const [topProducts, setTopProducts] = useState([]);
  const [topEmployees, setTopEmployees] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState(null);
  
  // Estado para controle do Carrossel Infinito
  const [currentIndex, setCurrentIndex] = useState(3);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const [isPaused, setIsPaused] = useState(false);

  // Estados do upload de transcrição e vídeo
  const [selectedAudio, setSelectedAudio] = useState(null);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const videoInputRef = useRef(null);

  useEffect(() => {
    setTopClients(['Itaú Unibanco', 'Ambev', 'Magazine Luiza', 'Grupo Fleury', 'Localiza']);
    setTopProducts(['TOTVS Protheus', 'TOTVS RM', 'TOTVS Fluig', 'TOTVS Datasul', 'TOTVS Mega']);
    setTopEmployees(['Ricardo Souza', 'Fernanda Lima', 'Marcos Oliveira', 'Juliana Costa', 'André Santos']);

    setCompanies([
      { id: 1, name: 'Itaú Unibanco', logo: itauLogo, people: ['Ana Paula', 'Bruno Silva'], location: 'São Paulo/SP', tagline: 'Banco líder em serviços financeiros', sector: 'Serviços Financeiros', founded: '1945', website: 'https://www.itau.com.br', description: 'Itaú Unibanco entrega soluções bancárias digitais e corporativas para milhões de clientes, com foco em inovação, segurança e atendimento personalizado.', highlights: ['Bancos Digitais', 'Pagamentos', 'Gestão de Caixa'], focusAreas: ['Fintech', 'Cartões', 'Empresas'] },
      { id: 2, name: 'Ambev', logo: ambevLogo, people: ['Carlos Edu', 'Daniela M.'], location: 'Rio de Janeiro/RJ', tagline: 'Referência em bebidas e varejo', sector: 'Consumo', founded: '1999', website: 'https://www.ambev.com.br', description: 'Ambev é uma das maiores fabricantes de bebidas do Brasil, combinando escala, sustentabilidade e inovação em portfólio nacional e internacional.', highlights: ['Sustentabilidade', 'Distribuição', 'Branding'], focusAreas: ['Bebidas', 'Logística', 'Comércio'] },
      { id: 3, name: 'Magazine Luiza', logo: magaluLogo, people: ['Elaine S.', 'Fabio J.'], location: 'São Paulo/SP', tagline: 'E-commerce e varejo omnichannel', sector: 'Varejo', founded: '1957', website: 'https://www.magazineluiza.com.br', description: 'Magazine Luiza une loja física e digital para oferecer a melhor experiência de compra, com forte presença em tecnologia e relacionamento com o cliente.', highlights: ['Omnichannel', 'Marketplace', 'Digital'], focusAreas: ['E-commerce', 'Tecnologia', 'Vendas'] },
      { id: 4, name: 'Localiza', logo: localizaLogo, people: ['Gisele R.', 'Hugo V.'], location: 'Belo Horizonte/MG', tagline: 'Mobilidade e aluguel de veículos', sector: 'Transporte', founded: '1973', website: 'https://www.localiza.com', description: 'Localiza oferece soluções de mobilidade para pessoas e empresas, com frota moderna, atendimento digital e ampla cobertura nacional.', highlights: ['Aluguel de Carros', 'Frota', 'Tecnologia'], focusAreas: ['Mobilidade', 'Fleet Management', 'Logística'] },
      { id: 5, name: 'Grupo Fleury', logo: fleuryLogo, people: ['Igor L.', 'Julia T.'], location: 'São Paulo/SP', tagline: 'Saúde diagnóstica de ponta', sector: 'Saúde', founded: '1926', website: 'https://www.fleury.com.br', description: 'O Grupo Fleury é líder em medicina diagnóstica no Brasil, combinando centros de excelência, tecnologia médica e atendimento humanizado.', highlights: ['Diagnóstico', 'Pesquisa', 'Inovação'], focusAreas: ['Saúde', 'Laboratórios', 'Bem-estar'] },
      { id: 6, name: 'SEBRAE', logo: sebraeLogo, people: ['Katia M.', 'Leo N.'], location: 'Brasília/DF', tagline: 'Apoio a micro e pequenas empresas', sector: 'Educação', founded: '1972', website: 'https://www.sebrae.com.br', description: 'O SEBRAE promove empreendedorismo e capacitação para pequenos negócios em todo o Brasil, com programas de formação e consultoria especializada.', highlights: ['Empreendedorismo', 'Capacitação', 'Consultoria'], focusAreas: ['PME', 'Treinamento', 'Inovação'] },
      { id: 7, name: 'Assaí Atacadista', logo: assaiLogo, people: ['Marta P.', 'Nuno G.'], location: 'São Paulo/SP', tagline: 'Atacado forte para varejo e indústrias', sector: 'Atacado', founded: '1974', website: 'https://www.assai.com.br', description: 'Assaí Atacadista oferece preços competitivos e sortimento amplo para comércio, indústria e profissionais, com logística integrada e presença nacional.', highlights: ['Preços Baixos', 'Sortimento', 'Logística'], focusAreas: ['Atacado', 'Bens de Consumo', 'Supply Chain'] },
      { id: 8, name: 'Atacadão', logo: atacadaoLogo, people: ['Otávio S.', 'Paula F.'], location: 'São Paulo/SP', tagline: 'Rede de atacarejo para varejo e PME', sector: 'Atacado', founded: '1960', website: 'https://www.atacadao.com.br', description: 'Atacadão atende comerciantes e consumidores com grande variedade de produtos e preços competitivos em seus pontos de venda e canais digitais.', highlights: ['Atacarejo', 'Variedade', 'Economia'], focusAreas: ['Varejo', 'Distribuição', 'Compras'] },
      { id: 9, name: 'Grupo Muffato', logo: muffatoLogo, people: ['Quiteria L.', 'Ruan K.'], location: 'Cascavel/PR', tagline: 'Supermercados e distribuição regional', sector: 'Varejo', founded: '1979', website: 'https://www.muffato.com.br', description: 'Grupo Muffato atua no varejo alimentar e atacarejo, com foco em inovação, serviço local e experiência de compra de qualidade.', highlights: ['Supermercado', 'Atacado', 'Inovação'], focusAreas: ['Alimentação', 'Varejo', 'Experiência'] },
      { id: 10, name: 'Mart Minas', logo: martMinasLogo, people: ['Soraia B.', 'Tito A.'], location: 'Minas Gerais/MG', tagline: 'Rede de atacado para compras em grande volume', sector: 'Atacado', founded: '1978', website: 'https://www.martminas.com.br', description: 'Mart Minas oferece soluções de abastecimento para comerciantes e indústrias, com foco em preços competitivos e atendimento regionalizado.', highlights: ['Atacado', 'Parcerias', 'Produtos'], focusAreas: ['Agronegócio', 'Comércio', 'Distribuição'] },
      { id: 11, name: 'Arklok', logo: arklokLogo, people: ['Uriel D.', 'Vera C.'], location: 'Curitiba/PR', tagline: 'Engenharia e soluções industriais', sector: 'Indústria', founded: '2005', website: 'https://www.arklok.com.br', description: 'Arklok desenvolve projetos de engenharia industrial e sistemas de controle para operações de energia e manufatura.', highlights: ['Engenharia', 'Automação', 'Projetos'], focusAreas: ['Indústria', 'Energia', 'Automação'] },
      { id: 12, name: 'Makro Engenharia', logo: makroLogo, people: ['Wagner X.', 'Yara Z.'], location: 'São Paulo/SP', tagline: 'Soluções de engenharia para construção pesada', sector: 'Engenharia', founded: '1990', website: 'https://www.makroengenharia.com.br', description: 'Makro Engenharia atua em projetos de infraestrutura, construção pesada e manutenção industrial com foco em segurança e qualidade.', highlights: ['Infraestrutura', 'Obras', 'Qualidade'], focusAreas: ['Construção', 'Manutenção', 'Segurança'] },
    ]);
  }, []);

  const extendedCompanies = companies.length > 0 
    ? [...companies.slice(-3), ...companies, ...companies.slice(0, 3)]
    : [];

  const totalPages = Math.ceil(companies.length / 3);

  const nextSlide = () => {
    if (!isTransitioning) return;
    setCurrentIndex((prev) => prev + 3);
  };

  const prevSlide = () => {
    if (!isTransitioning) return;
    setCurrentIndex((prev) => prev - 3);
  };

  const handleTransitionEnd = () => {
    if (currentIndex >= companies.length + 3) {
      setIsTransitioning(false);
      setCurrentIndex(3);
    } else if (currentIndex < 3) {
      setIsTransitioning(false);
      setCurrentIndex(companies.length);
    }
  };

  useEffect(() => {
    if (isPaused || companies.length === 0) return;

    const interval = setInterval(() => {
      nextSlide();
    }, 3500);

    return () => clearInterval(interval);
  }, [currentIndex, isPaused, companies]);

  useEffect(() => {
    if (!isTransitioning) {
      const timer = setTimeout(() => {
        setIsTransitioning(true);
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [isTransitioning]);

  const activePageIndex = companies.length > 0
    ? (Math.floor((currentIndex - 3) / 3) + totalPages) % totalPages
    : 0;

  const handleAudioChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedAudio(e.target.files[0].name);
    }
  };

  const handleVideoChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedVideo(URL.createObjectURL(e.target.files[0]));
    }
  };

  const triggerVideoSelect = () => {
    if (videoInputRef.current) {
      videoInputRef.current.click();
    }
  };

  return (
    <div className="home-container">
      {/* SEÇÃO HERO - INSIGHTS E RANKING */}
      <section className="hero-dashboard-container">
        <div className="hero-card hero-insights-card">
          <div className="insights-header">
            <h2>Receba insights da sua reunião.</h2>
            <p>
              Receba insights da sua reunião com facilidade em tempo real. Veja a transcrição da sua reunião,
              resumo das decisões tomadas e episódios gravados para estudo.
            </p>
          </div>

          <div className="insights-content">
            <input 
              type="file" 
              ref={videoInputRef} 
              onChange={handleVideoChange} 
              accept="video/*" 
              style={{ display: 'none' }} 
            />
            
            <div className="video-preview" onClick={triggerVideoSelect}>
              {selectedVideo ? (
                <video src={selectedVideo} controls className="video-element" />
              ) : (
                <div className="play-button">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              )}
            </div>

            <label className="transcription-status-box clickable-upload">
              <input 
                type="file" 
                onChange={handleAudioChange} 
                accept="audio/*,.mp3,.doc,.docx,.vtt,.txt" 
                style={{ display: 'none' }} 
              />
              <div className="status-badge">Faça upload da sua transcrição</div>
              <p className="status-time">
                {selectedAudio ? `Arquivo: ${selectedAudio}` : 'Clique para selecionar arquivo'}
              </p>
              <p className="status-note">
                Aceita áudio (MP3), documentos (.doc, .docx), legendas (.vtt) e textos (.txt)
              </p>
            </label>
          </div>
        </div>

        <div className="hero-card hero-ranking-card">
          <div className="ranking-header">
            <h3>Ranking</h3>
            <span>Top Clientes</span>
          </div>

          <div className="ranking-list">
            <div className="ranking-item">
              <span className="rank-position">1</span>
              <div className="rank-badge">Itaú Unibanco</div>
            </div>
            <div className="ranking-item">
              <span className="rank-position">2</span>
              <div className="rank-badge">Ambev</div>
            </div>
            <div className="ranking-item">
              <span className="rank-position">3</span>
              <div className="rank-badge">TOTVS Protheus</div>
            </div>
            <div className="ranking-item">
              <span className="rank-position">4</span>
              <div className="rank-badge">TOTVS RM</div>
            </div>
            <div className="ranking-item">
              <span className="rank-position">5</span>
              <div className="rank-badge">Magazine Luiza</div>
            </div>
          </div>

          <button className="ranking-nav-btn nav-left" aria-label="Anterior">
            &#10094;
          </button>
          <button className="ranking-nav-btn nav-right" aria-label="Próximo">
            &#10095;
          </button>
        </div>
      </section>

      {/* 1. MURAL DE EMPRESAS / PARCEIROS */}
      <section className="home-company-section">
        <div className="CompanyCardTitle">
          <h3>Empresas Parceiras</h3>
        </div>

        <div 
          className="carousel-wrapper"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <button className="carousel-control prev" onClick={prevSlide} aria-label="Anterior">
            &#10094;
          </button>

          <div className="carousel-track-container">
            <div 
              className="carousel-track" 
              onTransitionEnd={handleTransitionEnd}
              style={{ 
                transform: `translateX(-${currentIndex * (100 / 3)}%)`,
                transition: isTransitioning ? 'transform 0.8s cubic-bezier(0.25, 1, 0.5, 1)' : 'none'
              }}
            >
              {extendedCompanies.map((company, index) => (
                <div className="carousel-slide-item" key={`${company.id}-${index}`}>
                  <CompanyCard 
                    company={company} 
                    onClick={() => setSelectedCompany(company)} 
                  />
                </div>
              ))}
            </div>
          </div>

          <button className="carousel-control next" onClick={nextSlide} aria-label="Próximo">
            &#10095;
          </button>
        </div>

        {/* Indicadores do carrossel */}
        <div className="carousel-indicators">
          {Array.from({ length: totalPages }).map((_, idx) => (
            <button
              key={idx}
              className={`indicator-dot ${activePageIndex === idx ? 'active' : ''}`}
              onClick={() => {
                setIsTransitioning(true);
                setCurrentIndex((idx + 1) * 3);
              }}
              aria-label={`Ir para a página ${idx + 1}`}
            />
          ))}
        </div>
      </section>

      {/* 2. SEÇÃO NOTÍCIAS */}
      <section className="news-section">
        <h2 className="news-section-title">Notícias</h2>
        <div className="row g-4">
          <div className="col-md-4">
            <div className="news-card">
              <div className="news-card-img-wrapper">
                <img src={Noticia1} alt="Notícia 1" />
              </div>
              <div className="news-card-content">
                <h5>TOTVS + ESPM! Uma combinação de sucesso!</h5>
                <p>TOTVS encontrou uma parceira com a ESPM para incluir graduações de marketing voltado à tecnologia.</p>
                <Link to="#" className="news-card-btn">Saiba Mais</Link>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="news-card">
              <div className="news-card-img-wrapper">
                <img src={Noticia2} alt="Notícia 2" />
              </div>
              <div className="news-card-content">
                <h5>BTG e TOTVS quem diria?</h5>
                <p>Veja mais sobre como o BTG Pactual expandiu sua participação estratégica nas ações corporativas.</p>
                <Link to="#" className="news-card-btn">Saiba Mais</Link>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="news-card">
              <div className="news-card-img-wrapper">
                <img src={Noticia3} alt="Notícia 3" />
              </div>
              <div className="news-card-content">
                <h5>Prêmio TOTVS Brasil!</h5>
                <p>Saiba mais sobre o evento mais esperado da TOTVS e veja como indicar empresas parceiras.</p>
                <Link to="#" className="news-card-btn">Saiba Mais</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. CARDS DE TOP 5 */}
      <section className="top-lists-section">
        <div className="row g-4">
          <div className="col-md-4">
            <TopListCard title="Top 5 Clientes" items={topClients} />
          </div>
          <div className="col-md-4">
            <TopListCard title="Top 5 Produtos" items={topProducts} />
          </div>
          <div className="col-md-4">
            <TopListCard title="Top 5 Funcionários" items={topEmployees} />
          </div>
        </div>
      </section>

      <br/>    <br/>

      {/* MODAL DETALHES DA EMPRESA */}
      {selectedCompany && (
        <CompanyDetailCard 
          company={selectedCompany} 
          onClose={() => setSelectedCompany(null)} 
        />
      )}
    </div>
  );
}