import { DocumentData, DocumentReference } from 'firebase/firestore';
import { getBookings } from '../../services/BookingsService';
import { useEffect, useState } from 'react';
import { getOpenSwapsToMe } from '../../services/BookingSwapService';
import { useNavigate } from 'react-router-dom';
import Display from './Display/Display';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../firebase/config';
import { Container, Table, Toast } from 'react-bootstrap';
import { getClassTimespans } from '../../utils/functions';
import Booking from '../../services/interfaces/Booking';

export default function HomePage() {
  const nav = useNavigate();
  const [show, setShow] = useState(false);
  const [countShowAlert, setCountShowAlert] = useState(0);
  // const bookingsSpliced = getChunks(mock, 10);
  const [user] = useAuthState(auth);

  // const [ , , , swaps ] = getOpenSwapsToMe(user && user.email ? user.email : "");
  // const openBookingSwapsForMe = swaps?.docs.filter(bookingSwap => bookingSwap?.data().waiting);
  // console.log(openBookingSwapsForMe?.length)
  // useEffect(() => {
  //   if(openBookingSwapsForMe && openBookingSwapsForMe?.length > 0 && countShowAlert < 1) {
  //     console.log(countShowAlert, 12312312)
  //     setShow(true);
  //     setCountShowAlert(countShowAlert + 1);
  //   }
    
  // }, [openBookingSwapsForMe])

  const [ bookings ] = getBookings();
  
  return (
    <Container fluid="xxl" style={{padding: 0}}>
      <Display bookings={bookings}></Display>
    </Container>
  )
}