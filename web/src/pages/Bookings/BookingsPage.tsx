import { useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import './Booking.css';
import ClassroomsScheduleTable from "./ClassroomsScheduleTable/ClassroomsScheduleTable";

export default function BookingsPage() {
  const [date, setDate] = useState(new Date());
  const [showBookingTable, setShowBookingTable] = useState(false);

  const handleClick = () => {
    console.log(date)
    setShowBookingTable(true);
  }

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col xs={6}>
          {showBookingTable ?
          <ClassroomsScheduleTable date={date} setShowBookingTable={setShowBookingTable}/>
          : 
          <>
            {/* Comentado pois no momento só vai funcionar para o bloco da computação */}
            {/* <Form.Group>
              <Form.Label>Bloco</Form.Label>
              <Form.Select aria-label="Default select example">
                <option>Open this select menu</option>
                <option value="computacao">Computação</option>
              </Form.Select>
            </Form.Group> */}
            <Calendar 
              onChange={setDate}
              value={date} 
              minDate={new Date()}
              minDetail='year'
              />
            <Button className="calendar-search-btn" onClick={() => handleClick()}>Buscar</Button>
            <p className='text-center'>
              <span className='bold'>Selected Date:</span>{' '}
              {date.toDateString()}
            </p>
          </>
          }
        </Col>
      </Row>
    </Container>
  )
}