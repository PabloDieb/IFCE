import { query, collection, DocumentData, DocumentReference } from 'firebase/firestore';
import { Container, Row, Col, Carousel, Toast, ToastContainer, Button } from 'react-bootstrap';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import Announcements from '../../components/Announcements/Announcements';
import ClassroomsScheduleDisplay from '../../components/ClassroomsScheduleDisplay/ClassroomsScheduleDisplay';
import { db } from '../../firebase/config';
import { getChunks } from '../../utils/functions';
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import { getCurrentAnnouncements } from '../../services/AnnouncementsService';
import { getBookings } from '../../services/BookingsService';
import { useEffect, useState } from 'react';
import { checkCurrentSwaps, getOpenSwapsToMe } from '../../services/BookingSwapService';
import { useAuthValue } from '../../contexts/AuthContext';
import { Navigate, useNavigate } from 'react-router-dom';

export default function HomePage() {
  type Announcement = {
    text: string,
    id: string,
    ref: DocumentReference<DocumentData>,
    date: string,
  };
  
  const mock = [
    {
      "professorName": "X",
      "classroomId": "VRMop7bygbMlRZMvzYGh",
      "cdMorning": true,
      "professorId": "10",
      "building": "1",
      "date": { "seconds": 1665802743, "nanoseconds": 190000000 },
      "abMorning": true,
      "class": "Cálculo 1",
      "cdAfternoon": true,
      "classroomName": "Sala 1",
      "abAfternoon": false
    },
    {
      "professorName": "X",
      "classroomId": "VRMop7bygbMlRZMvzYGh",
      "cdMorning": true,
      "professorId": "10",
      "building": "1",
      "date": { "seconds": 1665802743, "nanoseconds": 190000000 },
      "abMorning": true,
      "class": "Cálculo 1",
      "cdAfternoon": true,
      "classroomName": "Sala 1",
      "abAfternoon": false
    },
    {
      "professorName": "X",
      "classroomId": "VRMop7bygbMlRZMvzYGh",
      "cdMorning": true,
      "professorId": "10",
      "building": "1",
      "date": { "seconds": 1665802743, "nanoseconds": 190000000 },
      "abMorning": true,
      "class": "Cálculo 1",
      "cdAfternoon": true,
      "classroomName": "Sala 1",
      "abAfternoon": false
    },
    {
      "professorName": "X",
      "classroomId": "VRMop7bygbMlRZMvzYGh",
      "cdMorning": true,
      "professorId": "10",
      "building": "1",
      "date": { "seconds": 1665802743, "nanoseconds": 190000000 },
      "abMorning": true,
      "class": "Cálculo 1",
      "cdAfternoon": true,
      "classroomName": "Sala 1",
      "abAfternoon": false
    },
    {
      "professorName": "X",
      "classroomId": "VRMop7bygbMlRZMvzYGh",
      "cdMorning": true,
      "professorId": "10",
      "building": "1",
      "date": { "seconds": 1665802743, "nanoseconds": 190000000 },
      "abMorning": true,
      "class": "Cálculo 1",
      "cdAfternoon": true,
      "classroomName": "Sala 1",
      "abAfternoon": false
    },
    {
      "professorName": "X",
      "classroomId": "VRMop7bygbMlRZMvzYGh",
      "cdMorning": true,
      "professorId": "10",
      "building": "1",
      "date": { "seconds": 1665802743, "nanoseconds": 190000000 },
      "abMorning": true,
      "class": "Cálculo 1",
      "cdAfternoon": true,
      "classroomName": "Sala 1",
      "abAfternoon": false
    },
    {
      "professorName": "X",
      "classroomId": "VRMop7bygbMlRZMvzYGh",
      "cdMorning": true,
      "professorId": "10",
      "building": "1",
      "date": { "seconds": 1665802743, "nanoseconds": 190000000 },
      "abMorning": true,
      "class": "Cálculo 1",
      "cdAfternoon": true,
      "classroomName": "Sala 1",
      "abAfternoon": false
    },
    {
      "professorName": "X",
      "classroomId": "VRMop7bygbMlRZMvzYGh",
      "cdMorning": true,
      "professorId": "10",
      "building": "1",
      "date": { "seconds": 1665802743, "nanoseconds": 190000000 },
      "abMorning": true,
      "class": "Cálculo 1",
      "cdAfternoon": true,
      "classroomName": "Sala 1",
      "abAfternoon": false
    },
    {
      "professorName": "X",
      "classroomId": "VRMop7bygbMlRZMvzYGh",
      "cdMorning": true,
      "professorId": "10",
      "building": "1",
      "date": { "seconds": 1665802743, "nanoseconds": 190000000 },
      "abMorning": true,
      "class": "Cálculo 1",
      "cdAfternoon": true,
      "classroomName": "Sala 1",
      "abAfternoon": false
    },
    {
      "professorId": "2",
      "cdAfternoon": "TEste",
      "classroomName": "2",
      "date": { "seconds": 1665745320, "nanoseconds": 395000000 },
      "abAfternoon": "Teste",
      "building": "2",
      "cdMorning": "Teste",
      "classroomId": "2",
      "abMorning": "Teste"
    },
    {
      "professorId": "2",
      "cdAfternoon": "TEste",
      "classroomName": "2",
      "date": { "seconds": 1665745320, "nanoseconds": 395000000 },
      "abAfternoon": "Teste",
      "building": "2",
      "cdMorning": "Teste",
      "classroomId": "2",
      "abMorning": "Teste"
    },
    {
      "professorId": "2",
      "cdAfternoon": "TEste",
      "classroomName": "2",
      "date": { "seconds": 1665745320, "nanoseconds": 395000000 },
      "abAfternoon": "Teste",
      "building": "2",
      "cdMorning": "Teste",
      "classroomId": "2",
      "abMorning": "Teste"
    },
    {
      "professorId": "2",
      "cdAfternoon": "TEste",
      "classroomName": "2",
      "date": { "seconds": 1665745320, "nanoseconds": 395000000 },
      "abAfternoon": "Teste",
      "building": "2",
      "cdMorning": "Teste",
      "classroomId": "2",
      "abMorning": "Teste"
    },
    {
      "professorId": "2",
      "cdAfternoon": "TEste",
      "classroomName": "2",
      "date": { "seconds": 1665745320, "nanoseconds": 395000000 },
      "abAfternoon": "Teste",
      "building": "2",
      "cdMorning": "Teste",
      "classroomId": "2",
      "abMorning": "Teste"
    },
    {
      "professorId": "2",
      "cdAfternoon": "TEste",
      "classroomName": "2",
      "date": { "seconds": 1665745320, "nanoseconds": 395000000 },
      "abAfternoon": "Teste",
      "building": "2",
      "cdMorning": "Teste",
      "classroomId": "2",
      "abMorning": "Teste"
    },
    {
      "professorId": "2",
      "cdAfternoon": "TEste",
      "classroomName": "2",
      "date": { "seconds": 1665745320, "nanoseconds": 395000000 },
      "abAfternoon": "Teste",
      "building": "2",
      "cdMorning": "Teste",
      "classroomId": "2",
      "abMorning": "Teste"
    },
    {
      "professorId": "2",
      "cdAfternoon": "TEste",
      "classroomName": "2",
      "date": { "seconds": 1665745320, "nanoseconds": 395000000 },
      "abAfternoon": "Teste",
      "building": "2",
      "cdMorning": "Teste",
      "classroomId": "2",
      "abMorning": "Teste"
    },
    {
      "professorId": "2",
      "cdAfternoon": "TEste",
      "classroomName": "2",
      "date": { "seconds": 1665745320, "nanoseconds": 395000000 },
      "abAfternoon": "Teste",
      "building": "2",
      "cdMorning": "Teste",
      "classroomId": "2",
      "abMorning": "Teste"
    },
    {
      "professorId": "2",
      "cdAfternoon": "TEste",
      "classroomName": "2",
      "date": { "seconds": 1665745320, "nanoseconds": 395000000 },
      "abAfternoon": "Teste",
      "building": "2",
      "cdMorning": "Teste",
      "classroomId": "2",
      "abMorning": "Teste"
    },
    {
      "professorId": "2",
      "cdAfternoon": "TEste",
      "classroomName": "2",
      "date": { "seconds": 1665745320, "nanoseconds": 395000000 },
      "abAfternoon": "Teste",
      "building": "2",
      "cdMorning": "Teste",
      "classroomId": "2",
      "abMorning": "Teste"
    },
    {
      "professorId": "2",
      "cdAfternoon": "TEste",
      "classroomName": "2",
      "date": { "seconds": 1665745320, "nanoseconds": 395000000 },
      "abAfternoon": "Teste",
      "building": "2",
      "cdMorning": "Teste",
      "classroomId": "2",
      "abMorning": "Teste"
    },
    {
      "professorId": "2",
      "cdAfternoon": "TEste",
      "classroomName": "2",
      "date": { "seconds": 1665745320, "nanoseconds": 395000000 },
      "abAfternoon": "Teste",
      "building": "2",
      "cdMorning": "Teste",
      "classroomId": "2",
      "abMorning": "Teste"
    }
  ]
  const nav = useNavigate();
  const [show, setShow] = useState(false);
  const [countShowAlert, setCountShowAlert] = useState(0);
  const bookingsSpliced = getChunks(mock, 10);
  const user = useAuthValue();
  const [ bookings, loading, error, snapshot ] = getBookings();
  const [ , , , swaps ] = getOpenSwapsToMe(user && user.email ? user.email : "");
  const openBookingSwapsForMe = swaps?.docs.filter(bookingSwap => bookingSwap?.data().waiting);
  console.log(openBookingSwapsForMe?.length)
  useEffect(() => {
    if(openBookingSwapsForMe && openBookingSwapsForMe?.length > 0 && countShowAlert < 1) {
      console.log(countShowAlert, 12312312)
      setShow(true);
      setCountShowAlert(countShowAlert + 1);
    }
    
  }, [openBookingSwapsForMe])

  return (
    <Container fluid style={{padding: 0}}>
      {openBookingSwapsForMe && openBookingSwapsForMe?.length > 0 ? <ToastContainer className="p-3" position="bottom-start">
        <Toast onClose={() => setShow(false)} show={show} delay={10000} bg="warning" autohide>
          <Toast.Header>
            <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
            <strong className="me-auto">Alerta</strong>
          </Toast.Header>
          <Toast.Body className={'warning'}>
            Olá, Existem solicitações de troca abertas para você. <Button onClick={() => nav("/solicitacoes")}>Ver</Button>
            
          </Toast.Body>
        </Toast>
      </ToastContainer> : null}
      <Row>
        <Col xs={12}>
          <ClassroomsScheduleDisplay bookings={bookings} />
        </Col>
      </Row>
    </Container>
  )
}