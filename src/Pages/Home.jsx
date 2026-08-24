import React, { useState, useEffect } from 'react';
import MeetingCard from '../components/MeetingCard';
import TopListCard from '../components/TopListCard';
import Body from '../components/Body';

export default function Home() {
  // Estados para os dados - Preparado para receber dados de uma API no futuro
  const [meetings, setMeetings] = useState([]);
  const [topClients, setTopClients] = useState([]);
  const [topProducts, setTopProducts] = useState([]);
  const [topEmployees, setTopEmployees] = useState([]);

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
  }, []);

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

      {/* Cards de Top 5 - Posicionados embaixo do carrossel existente */}
      <div className="row g-4 mt-5">
        <div className="col-12 col-md-4 d-flex">
          <TopListCard 
            title="Top 5 Clientes" 
            items={topClients} 
            bgColor="#FFFFFF" 
          />
        </div>
        <div className="col-12 col-md-4 d-flex">
          <TopListCard 
            title="Top 5 Produtos" 
            items={topProducts} 
            bgColor="#D9D9D9" 
          />
        </div>
        <div className="col-12 col-md-4 d-flex">
          <TopListCard 
            title="Top 5 Funcionários" 
            items={topEmployees} 
            bgColor="#094A73" 
            textColor="white"
          />
        </div>
      </div>
    </div>
  );
}
