import { formatDate } from '../utils/formatters';
import './MeetingCard.css';

const STATUS_COLORS = {
  'Agendada': 'text-primary',
  'Em andamento': 'text-warning',
  'Cancelada': 'text-danger',
  'Concluida': 'text-success',
};

export default function MeetingCard({ meeting }) {
  const statusColor = STATUS_COLORS[meeting.status] || 'text-muted';
  const displayValue = meeting.status === 'Agendada' 
    ? formatDate(meeting.date) 
    : meeting.duration;

  return (
    <div className="meeting-card p-2 h-100 d-flex flex-column" style={{ fontSize: '0.85rem' }}>
      <div className="d-flex align-items-center mb-2">
        <img 
          src={meeting.userPhoto || "https://via.placeholder.com/50"} 
          alt={meeting.userName} 
          className="rounded-circle me-2" 
          style={{ width: '32px', height: '32px', objectFit: 'cover' }}
        />
        <span className="fw-bold text-truncate">{meeting.userName}</span>
      </div>
      <div className="flex-grow-1">
        <div className="mb-1">
          <p className="mb-0 text-muted" style={{ fontSize: '0.65rem' }}>Cliente</p>
          <p className="fw-bold mb-0 text-truncate" style={{ fontSize: '0.8rem' }}>{meeting.clientName}</p>
        </div>
        <div className="mb-1">
          <p className="mb-0 text-muted" style={{ fontSize: '0.65rem' }}>Reunião</p>
          <p className="fw-bold mb-0 text-truncate" style={{ fontSize: '0.8rem' }}>{meeting.meetingName}</p>
        </div>
        <div className="text-end">
          <p className="mb-0 text-muted" style={{ fontSize: '0.65rem' }}>Status: <span className={`fw-bold ${statusColor}`}>{meeting.status}</span></p>
          <p className="fw-bold mb-0 text-truncate" style={{ fontSize: '0.8rem' }}>
            {displayValue}
          </p>
        </div>
      </div>
    </div>
  );
}
