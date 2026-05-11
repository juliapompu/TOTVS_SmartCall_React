import React, { useState, useEffect } from 'react';
import MeetingCard from '../components/MeetingCard';
import TopListCard from '../components/TopListCard';
import Body from '../components/Body';
import CompanyCard from '../components/CompanyCard';

// Importação das logos locais
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

export default function Home() {
  // Estados para os dados - Preparado para receber dados de uma API no futuro
  const [meetings, setMeetings] = useState([]);
  const [topClients, setTopClients] = useState([]);
  const [topProducts, setTopProducts] = useState([]);
  const [topEmployees, setTopEmployees] = useState([]);
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    // Simulação de chamada de API para carregar os dados iniciais (mocados)
    setMeetings([
      { id: 1, userName: 'João Silva', userPhoto: 'https://i.pravatar.cc/150?u=joao', clientName: 'Cliente Alpha', meetingName: 'Discussão de Requisitos', status: 'Concluida', duration: '45 min' },
      { id: 2, userName: 'Maria Souza', userPhoto: 'https://i.pravatar.cc/150?u=maria', clientName: 'Cliente Beta', meetingName: 'Apresentação de Projeto', status: 'Agendada', date: '2026-05-10T14:00:00' },
      { id: 3, userName: 'Carlos Lima', userPhoto: 'https://i.pravatar.cc/150?u=carlos', clientName: 'Cliente Gamma', meetingName: 'Alinhamento Semanal', status: 'Em andamento', duration: '30 min' },
      { id: 4, userName: 'Ana Costa', userPhoto: 'https://i.pravatar.cc/150?u=ana', clientName: 'Cliente Delta', meetingName: 'Revisão de Sprint', status: 'Cancelada', date: '2026-05-11T10:00:00' },
      { id: 5, userName: 'Pedro Alves', userPhoto: 'https://i.pravatar.cc/150?u=pedro', clientName: 'Cliente Epsilon', meetingName: 'Feedback de Produto', status: 'Concluida', duration: '60 min' },
    ]);

    setTopClients(['Itaú Unibanco', 'Ambev', 'Magazine Luiza', 'Grupo Fleury', 'Localiza']);
    setTopProducts(['TOTVS Protheus', 'TOTVS Datasul', 'TOTVS RM', 'TOTVS Fluig', 'TOTVS Logix']);
    setTopEmployees(['Ricardo Souza', 'Fernanda Lima', 'Marcos Oliveira', 'Juliana Costa', 'André Santos']);

    // Dados mocados das empresas utilizando as imagens locais importadas
    setCompanies([
      { id: 1, name: 'Itaú Unibanco', logo: itauLogo, people: ['Ana Paula', 'Bruno Silva'] },
      { id: 2, name: 'Ambev', logo: ambevLogo, people: ['Carlos Edu', 'Daniela M.'] },
      { id: 3, name: 'Magazine Luiza', logo: magaluLogo, people: ['Elaine S.', 'Fabio J.'] },
      { id: 4, name: 'Localiza', logo: localizaLogo, people: ['Gisele R.', 'Hugo V.'] },
      { id: 5, name: 'Grupo Fleury', logo: fleuryLogo, people: ['Igor L.', 'Julia T.'] },
      { id: 6, name: 'SEBRAE', logo: sebraeLogo, people: ['Katia M.', 'Leo N.'] },
      { id: 7, name: 'Assaí Atacadista', logo: assaiLogo, people: ['Marta P.', 'Nuno G.'] },
      { id: 8, name: 'Atacadão', logo: atacadaoLogo, people: ['Otávio S.', 'Paula F.'] },
      { id: 9, name: 'Grupo Muffato', logo: muffatoLogo, people: ['Quiteria L.', 'Ruan K.'] },
      { id: 10, name: 'Mart Minas', logo: martMinasLogo, people: ['Soraia B.', 'Tito A.'] },
      { id: 11, name: 'Arklok', logo: arklokLogo, people: ['Uriel D.', 'Vera C.'] },
      { id: 12, name: 'Makro Engenharia', logo: makroLogo, people: ['Wagner X.', 'Yara Z.'] },
    ]);
  }, []);

  const handleCompanyClick = (company) => {
    console.log('Buscando dados da empresa:', company.name, 'ID:', company.id);
    alert(`Acessando dados de: ${company.name}. (Aqui será feita a chamada ao banco de dados no futuro)`);
  };

  return (
    <div className="container pb-5">
      <h1 className="mb-3 text-center h4">Minhas Reuniões</h1>
      
      {/* Grid de Reuniões */}
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-5 g-3 mb-5">
        {meetings.map(meeting => (
          <div key={meeting.id} className="col">
            <MeetingCard meeting={meeting} />
          </div>
        ))}
      </div>

      {/* Carrossel de Notícias existente (Componente Body) */}
      <Body />

      {/* Cards de Top 5 */}
      <div className="row g-4 mt-5 mb-5">
        <div className="col-md-4">
          <TopListCard 
            title="Top 5 Clientes" 
            items={topClients} 
            bgColor="#FFFFFF" 
          />
        </div>
        <div className="col-md-4">
          <TopListCard 
            title="Top 5 Produtos" 
            items={topProducts} 
            bgColor="#D9D9D9" 
          />
        </div>
        <div className="col-md-4">
          <TopListCard 
            title="Top 5 Funcionários" 
            items={topEmployees} 
            bgColor="#094A73" 
            textColor="white"
          />
        </div>
      </div>

      {/* Mural de Empresas */}
      <div className="company-mural-container">
        <h2 className="text-center mb-4 h4">Mural de Empresas</h2>
        <div className="row g-4">
          {companies.map(company => (
            <div key={company.id} className="col-12 col-sm-6 col-md-3">
              <CompanyCard 
                company={company} 
                onClick={handleCompanyClick} 
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
