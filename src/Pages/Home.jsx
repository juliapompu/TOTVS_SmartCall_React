import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import TopListCard from '../Components/TopListCard';
import CompanyCard from '../Components/CompanyCard';
import CompanyDetailCard from '../Components/CompanyDetailCard';
import JsonUploadDetail from '../Components/JsonUploadDetail';

// Estilos
import '../styles/Home.css';
import '../Css/Body/carousel-effects.css';
import '../Css/Body/carousel-layout.css';
import '../Css/Body/carousel-responsive.css';

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
  const [showUpload, setShowUpload] = useState(false);

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

  return (
    <div className="container pb-5">
      {/* Carrossel Inline */}
      <div className="carrosel-container">
        <div id="carouselExampleCaptions" className="carousel slide" data-bs-ride="carousel" data-bs-interval="4000">
          <div className="carousel-indicators">
            <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Próximo"></button>
            <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Próximo"></button>
            <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Próximo"></button>
          </div>
          <div className="carousel-inner">
            <div className="carousel-item active">
              <Link to="/noticia/1" className="news-image-link" aria-label="Ler notícia sobre TOTVS e ESPM">
                <img src={Noticia1} className="d-block w-100" alt="Notícia 1" />
              </Link>
              <div className="carousel-caption d-none d-md-block">
                <h5>TOTVS + ESPM! Uma combinação de sucesso!</h5>
                <p>TOTVS encontrou uma parceira com a ESMP para incluir graduações de marketing voltado a tecnologia na faculdade.</p>
              </div>
            </div>
            <div className="carousel-item">
              <Link to="/noticia/2" className="news-image-link" aria-label="Ler notícia sobre BTG e TOTVS">
                <img src={Noticia2} className="d-block w-100" alt="Notícia 2" />
              </Link>
              <div className="carousel-caption d-none d-md-block">
                <h5>BTG e TOTVS quem diria?</h5>
                <p>Veja mais sobre como a BTG Pactual comprou as ações da TOTVS em vez do Itau.</p>
              </div>
            </div>
            <div className="carousel-item">
              <Link to="/noticia/3" className="news-image-link" aria-label="Ler notícia sobre o Prêmio TOTVS Brasil">
                <img src={Noticia3} className="d-block w-100" alt="Notícia 3" />
              </Link>
              <div className="carousel-caption d-none d-md-block">
                <h5>Prêmio TOTVS Brasil!</h5>
                <p>Saiba mais sobre o evento mais esperado da TOTVS, conhece uma empresa que poderia fazer parte? Entre em contato pelo Complaence!</p>
              </div>
            </div>
          </div>
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

      <div className="text-center mb-5 mt-4">
        <button className="botao-trascricao" onClick={() => setShowUpload(true)}>
          <h4>Coloque sua transcrição aqui!</h4>
        </button>
      </div>

      {/* Cards de Top 5 */}
      <div className="row g-5 mt-4 mb-5">
        <div className="col-12 col-md-4">
          <TopListCard
            title="Top 5 Clientes"
            items={topClients}
            alignTitle="left"
            variant="standard"
          />
        </div>
        <div className="col-12 col-md-4">
          <TopListCard
            title="Top 5 Produtos"
            items={topProducts}
            alignTitle="right"
            variant="middle"
          />
        </div>
        <div className="col-12 col-md-4">
          <TopListCard
            title="Top 5 Funcionários"
            items={topEmployees}
            alignTitle="left"
            variant="standard"
          />
        </div>
      </div>

      {/* Mural de Empresas */}
      <section className="home-company-section">
        <h2 className="home-company-title">Empresas Parceiras</h2>
        <div className="home-company-grid">
          {companies.map((company) => (
            <CompanyCard
              key={company.id}
              company={company}
              onClick={() => setSelectedCompany(company)}
            />
          ))}
        </div>
      </section>

      {selectedCompany && (
        <CompanyDetailCard
          company={selectedCompany}
          onClose={() => setSelectedCompany(null)}
        />
      )}

      {showUpload && (
        <JsonUploadDetail
          onClose={() => setShowUpload(false)}
          onUpload={(data) => {
            console.log('JSON recebido:', data);
            setShowUpload(false);
          }}
        />
      )}
    </div>
  );
}