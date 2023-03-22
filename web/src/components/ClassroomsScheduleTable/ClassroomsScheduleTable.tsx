import { useState } from 'react';
import { Button, Table } from 'react-bootstrap';
import { auth, db } from '../../firebase/config';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { collection, query, where, Timestamp, addDoc, QueryDocumentSnapshot, DocumentData} from 'firebase/firestore';
import BookingSwapModal from '../BookingSwapModal/BookingSwapModal';
import { addBookingAsync, getBookings, getBookingsByDate } from '../../services/BookingsService';
import SwapModal from '../BookingSwapModal/SwapModal/SwapModal';
import BookingModal from '../BookingSwapModal/BookingModal/BookingModal';
import moment from 'moment';

export default function ClassroomsScheduleTable({date, backToClassroomList}: any) {

  interface bookings {
    abMorning: boolean,
    cdMorning: boolean,
    abAfternoon: boolean,
    cdAfternoon: boolean,
    class: string,
    classroomId: string,
    classroomName: string,
    date: Date,
    professorName: string,
    professorEmail: string,
  }

  const [ showBookingModal, setShowBookingModal] = useState(false);
  const [ showSwapModal, setShowSwapModal] = useState(false);
  const [ timespan, setTimespan ] = useState<string>("");
  const [ professorEmailRequested, setprofessorEmailRequested ] = useState<string>("");
  const [ bookingRef, setBookingRef ] = useState<QueryDocumentSnapshot<DocumentData>>();
  const [user] = useAuthState(auth);

  const nav = useNavigate();
  const [bookings, loading, error, snapshot] = getBookingsByDate(date);
  console.log(bookings, date);
  console.log(user?.email);
  const IsClassroomWithoutBooking = (booking: any) => {
  if(
    !booking.abMorning &&
    !booking.cdMorning &&
    !booking.abAfternoon &&
    !booking.cdAfternoon
    ){ return true}
    
    return false;
  }
  const handleBookingClick = (hour: string, booking: any) => {
    console.log(hour, booking)
    setBookingRef(booking);//Necessario pra não pegar o booking errado
    setTimespan(hour);
    setShowBookingModal(true);
  }
  const handleSwapClick = (timespan: string, professorEmail: string, booking: any) => {
    console.log("prop", booking)
    setBookingRef(booking);
    setTimespan(timespan);
    setprofessorEmailRequested(professorEmail);
    setShowSwapModal(true);
  }

  const handleCloseBookingModal = () => setShowBookingModal(false);
  const handleCloseSwapModal = () => setShowSwapModal(false);

  return(
    <>
      {false ? null : 
      // moment().day() == 0 || moment().day() == 6 ? <h1>Sem aulas hoje</h1> :
       !loading && <>
        <Button onClick={() => backToClassroomList()}>BACK</Button>
        <Table hover>
          {snapshot?.docs?.map( (booking, index) => {
            console.log(booking.data())
            return (
              <>
                <thead>
                  <tr style={{backgroundColor: "grey"}}>
                    <th colSpan={4}>
                      <strong>
                        {booking.data().classroomName + " - " + booking.data().date.toDate().toLocaleDateString()}
                      </strong>
                    </th>
                  </tr>
                  <tr>
                    <th style={{flex:1}}>8:00 ~ 9:50</th>
                    <th style={{flex:1}}>10:00 ~ 11:50</th>
                    <th style={{flex:1}}>15:50 ~ 16:49</th>
                    <th style={{flex:1}}>16:50 ~ 17:50</th>
                  </tr>
                </thead>
                <tbody>
                  <tr key={index}>
                    <td>{booking.data().abMorning ? booking.data().classroomName + " / " + booking.data().abMorning.class : "-"}</td>
                    <td>{booking.data().cdMorning ? booking.data().classroomName + " / " + booking.data().cdMorning.class : "-"}</td>
                    <td>{booking.data().abAfternoon ? booking.data().classroomName + " / " + booking.data().abAfternoon.class : "-"}</td>
                    <td>{booking.data().cdAfternoon ? booking.data().classroomName + " / " + booking.data().cdAfternoon.class : "-"}</td>
                  </tr> 
                  <tr>
                    <td>{booking.data().abMorning ? <Button onClick={() => handleSwapClick("abMorning", booking.data().abMorning.professorEmail, booking)}>Solicitar troca</Button> : <Button onClick={() => handleBookingClick("abMorning", booking)}>Reservar</Button>}</td>
                    <td>{booking.data().cdMorning ? <Button onClick={() => handleSwapClick("cdMorning", booking.data().cdMorning.professorEmail, booking)}>Solicitar troca</Button> : <Button onClick={() => handleBookingClick("cdMorning", booking)}>Reservar</Button>}</td>
                    <td>{booking.data().abAfternoon ? <Button onClick={() => handleSwapClick("abAfternoon", booking.data().abAfternoon.professorEmail, booking)}>Solicitar troca</Button> : <Button onClick={() => handleBookingClick("abAfternoon", booking)}>Reservar</Button>}</td>
                    <td>{booking.data().cdAfternoon ? <Button onClick={() => handleSwapClick("cdAfternoon", booking.data().cdAfternoon.professorEmail, booking)}>Solicitar troca</Button> : <Button onClick={() => handleBookingClick("cdAfternoon", booking)}>Reservar</Button>}</td>
                  </tr>
                </tbody>
                {showBookingModal ? <BookingModal show={showBookingModal} handleClose={handleCloseBookingModal} bookingRef={bookingRef.ref} timespan={timespan} /> : null}
                {showSwapModal ? 
                  <SwapModal 
                    show={showSwapModal} 
                    handleClose={handleCloseSwapModal}
                    bookingId={bookingRef ? bookingRef.id : null}
                    professorEmailRequested={professorEmailRequested}
                    professorEmail={user?.email}
                    timespan={timespan}
                    snapshot={snapshot}/> : null}

              </>
            )})
          }
        </Table>
      </>
      }
    </>
  )
}