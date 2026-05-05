import MeetingCard from '../components/MeetingCard';
import Body from '../Components/Body';

const MOCKED_MEETINGS = [
  {
    id: 1,
    userName: 'João Silva',
    userPhoto: 'https://i.pravatar.cc/150?u=joao',
    clientName: 'Cliente Alpha',
    meetingName: 'Discussão de Requisitos',
    status: 'Concluida',
    duration: '45 min',
  },
  {
    id: 2,
    userName: 'Maria Souza',
    userPhoto: 'https://i.pravatar.cc/150?u=maria',
    clientName: 'Cliente Beta',
    meetingName: 'Apresentação de Projeto',
    status: 'Agendada',
    date: '2026-05-10T14:00:00',
  },
  {
    id: 3,
    userName: 'Carlos Lima',
    userPhoto: 'https://i.pravatar.cc/150?u=carlos',
    clientName: 'Cliente Gamma',
    meetingName: 'Alinhamento Semanal',
    status: 'Em andamento',
    duration: '30 min',
  },
  {
    id: 4,
    userName: 'Ana Costa',
    userPhoto: 'https://i.pravatar.cc/150?u=ana',
    clientName: 'Cliente Delta',
    meetingName: 'Revisão de Sprint',
    status: 'Cancelada',
    date: '2026-05-11T10:00:00',
  },
  {
    id: 5,
    userName: 'Pedro Alves',
    userPhoto: 'https://i.pravatar.cc/150?u=pedro',
    clientName: 'Cliente Epsilon',
    meetingName: 'Feedback de Produto',
    status: 'Concluida',
    duration: '60 min',
  },
];

export default function Home() {
  return (
    <>
      <div className="container pb-5">
        <h1 className="mb-3 text-center h4">Minhas Reuniões</h1>
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-5 g-3">
          {MOCKED_MEETINGS.map(meeting => (
            <div key={meeting.id} className="col">
              <MeetingCard meeting={meeting} />
            </div>
          ))}
        </div>
      </div>
      <Body />
    </>
    
  );
}
