import { useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import './Booking.css';
import ClassroomsScheduleTable from "../../components/ClassroomsScheduleTable/ClassroomsScheduleTable";

export default function BookingsPage() {
  const [date, setDate] = useState(new Date());
  const [showBookingTable, setShowBookingTable] = useState(false);

  const handleClick = () => {
    console.log(date)
    setShowBookingTable(true);
  }

  return (
    <Container>
      {showBookingTable ?
       <ClassroomsScheduleTable date={date}/>
      : 
      <>
        <Form.Group>
          <Form.Label>Bloco</Form.Label>
          <Form.Select aria-label="Default select example">
            <option>Open this select menu</option>
            <option value="computacao">Computação</option>
          </Form.Select>
        </Form.Group>
        <Calendar 
          onChange={setDate}
          value={date} 
          minDate={new Date()}
          minDetail='year'
          />
        <Button onClick={() => handleClick()}>Buscar</Button>
        <p className='text-center'>
          <span className='bold'>Selected Date:</span>{' '}
          {date.toDateString()}
        </p>
      </>
      }
    </Container>
  )
}