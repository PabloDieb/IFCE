import { useState } from 'react';
import { Button, Table } from 'react-bootstrap';
import { auth, db } from '../../../firebase/config';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { collection, query, where, Timestamp, addDoc, QueryDocumentSnapshot, DocumentData} from 'firebase/firestore';
import BookingSwapModal from '../../../components/BookingSwapModal/BookingSwapModal';
import { addBookingAsync, getBookings, getBookingsByDate } from '../../../services/BookingsService';
import SwapModal from '../../../components/BookingSwapModal/SwapModal/SwapModal';
import BookingModal from '../../../components/BookingSwapModal/BookingModal/BookingModal';
import moment from 'moment';
import { user } from 'firebase-functions/v1/auth';
import { InfoCircleFill } from 'react-bootstrap-icons';
import ClassroomInfoOverlay from '../../../components/ClassroomInfoOverlay/ClassroomInfoOverlay';

export default function ClassroomsScheduleTable({date, setShowBookingTable}: any) {

  const [ showBookingModal, setShowBookingModal] = useState(false);
  const [ showSwapModal, setShowSwapModal] = useState(false);
  const [ timespan, setTimespan ] = useState<string>("");
  const [ bookignProp, setBookignProp ] = useState();
  const [ professorEmailRequested, setprofessorEmailRequested ] = useState<string>("");
  const [ bookingRef, setBookingRef ] = useState<QueryDocumentSnapshot<DocumentData>>();
  const [user] = useAuthState(auth);

  const nav = useNavigate();
  const [bookings, loading, error, snapshot] = getBookingsByDate(date);
  console.log(bookings, date);
  console.log(user?.email);
  const a = snapshot?.docs.sort()
  const handleBookingClick = (hour: string, booking: any) => {
    console.log(hour, booking)
    setBookingRef(booking);//Necessario pra não pegar o booking errado
    setTimespan(hour);
    setShowBookingModal(true);
  }
  const handleSwapClick = (timespan: string, professorEmail: string, booking: any) => {
    console.log("prop", booking)
    setBookignProp
    setBookingRef(booking);
    setTimespan(timespan);
    setprofessorEmailRequested(professorEmail);
    setShowSwapModal(true);
  }

  const handleCloseBookingModal = () => setShowBookingModal(false);
  const handleCloseSwapModal = () => setShowSwapModal(false);


  function BookingButton(booking: any, currentTimespan: string ) {
    if(booking.data().abMorning?.professorEmail == user!.email) return "-";
    if(booking.data()[currentTimespan]){
      return <Button onClick={() => handleSwapClick("abMorning", booking.data().abMorning.professorEmail, booking)}>Solicitar troca</Button>;
    }else{
      return <Button onClick={() => handleBookingClick("abMorning", booking)}>Reservar</Button>
    }
  
  }
  return(
    <>
      {false ? null : 
      // moment().day() == 0 || moment().day() == 6 ? <h1>Sem aulas hoje</h1> :
       !loading && <>
        <Button onClick={() => setShowBookingTable(false)}>Voltar</Button>
        <h3 style={{marginLeft: "40%"}}>{new Date(Date.now()).toLocaleDateString()}</h3>
        <Table hover>
          {snapshot?.docs?.map( (booking, index) => {
            console.log(booking.data())
            return (
              <>
                <thead>
                  <tr style={{backgroundColor: "#0262ef52"}} >
                    <th colSpan={12}>
                      <strong style={{marginLeft: "42%"}}>
                        {booking.data().classroomName + " "}<ClassroomInfoOverlay classroomName={booking.data().classroomName}/>
                      </strong>
                    </th>
                  </tr>
                  <tr>
                    <th style={{flex:1}}>7:40 ~ 9:40</th>
                    <th style={{flex:1}}>10:00 ~ 12:00</th>
                    <th style={{flex:1}}>13:30 ~ 15:30</th>
                    <th style={{flex:1}}>15:50 ~ 17:50</th>
                  </tr>
                </thead>
                <tbody>
                  <tr key={index}>
                    <td>{booking.data().abMorning ? booking.data().abMorning!.course : "-"}</td>
                    <td>{booking.data().cdMorning ?  booking.data().cdMorning!.course : "-"}</td>
                    <td>{booking.data().abAfternoon ? booking.data().abAfternoon!.course : "-"}</td>
                    <td>{booking.data().cdAfternoon ? booking.data().cdAfternoon!.course : "-"}</td>
                  </tr> 
                  <tr>
                    <td>{BookingButton(booking,"abMorning")}</td>
                    <td>{booking.data().cdMorning ? <Button onClick={() => handleSwapClick("cdMorning", booking!.data()!.cdMorning!.professorEmail, booking)}>Solicitar troca</Button> : <Button onClick={() => handleBookingClick("cdMorning", booking)}>Reservar</Button>}</td>
                    <td>{booking.data().abAfternoon ? <Button onClick={() => handleSwapClick("abAfternoon", booking!.data()!.abAfternoon!.professorEmail, booking)}>Solicitar troca</Button> : <Button onClick={() => handleBookingClick("abAfternoon", booking)}>Reservar</Button>}</td>
                    <td>{booking.data().cdAfternoon ? <Button onClick={() => handleSwapClick("cdAfternoon", booking!.data()!.cdAfternoon!.professorEmail, booking)}>Solicitar troca</Button> : <Button onClick={() => handleBookingClick("cdAfternoon", booking)}>Reservar</Button>}</td>
                  </tr>
                </tbody>
                
              </>
            )})
          }
        </Table>
      </>
      }
      {showBookingModal ? 
                  <BookingModal 
                    show={showBookingModal}
                    handleClose={handleCloseBookingModal} 
                    bookingRef={bookingRef!.ref} 
                    timespan={timespan} /> : null}
                {showSwapModal ? 
                  <SwapModal 
                    show={showSwapModal} 
                    handleClose={handleCloseSwapModal}
                    bookingId={bookingRef ? bookingRef.id : null}
                    professorEmailRequested={professorEmailRequested}
                    professorEmail={user?.email}
                    timespan={timespan}
                    bookingProp={bookingRef}
                    snapshot={snapshot}/> : null}
    </>
  )
}