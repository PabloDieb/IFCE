import ListGroup from 'react-bootstrap/ListGroup';
import { getCurrentAnnouncements } from "../../services/AnnouncementsService";

export default function AnnouncementsPage() {
  const [ announcements, loading, error ] = getCurrentAnnouncements();

  return (
    <ListGroup as="ol" numbered>
      {announcements !== undefined && announcements?.length > 0 ? announcements.map( (announcement: any, index: number) => (
        <ListGroup.Item
          as="li"
          className="d-flex justify-content-between align-items-start"
          key={index}
          >
          <div className="ms-2 me-auto">
            <div className="fw-bold">{announcement.text}</div>
            {announcement.text}
          </div>
        </ListGroup.Item>
      ))
      : <h4>Nenhum aviso foi encontrado.</h4>}
    </ListGroup>
  );
}