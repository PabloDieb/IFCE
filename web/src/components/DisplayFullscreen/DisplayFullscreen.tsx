import { Button, Carousel, Col, Container, Row } from "react-bootstrap";
import { getBookings } from "../../services/BookingsService";
import { createBookings, getClassTimespans } from "../../utils/functions";
import { DocumentData } from "firebase/firestore";
import { getCurrentAnnouncements } from "../../services/AnnouncementsService";
import DisplaySection from "./DisplaySection/DisplaySection";
import Announcements from "../Announcements/Announcements";
import Announcement from "../../services/interfaces/Announcement";
import "./DisplayFullscreen.css";
import moment from "moment";


export default function DisplayFullscreen() {
  const [ bookings ] = getBookings();
  const [ announcements ] = getCurrentAnnouncements();
  
  let currentHourAndMinute = new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes();
  // let currentHourAndMinute = new Date(moment().hours(8)).getHours() + ":" + new Date(Date.now()).getMinutes();
  
  let classTimespans = getClassTimespans(currentHourAndMinute);
  // console.log(classTimespans, currentHourAndMinute, "IDWJDOIWJDOI")
  console.log(announcements);
  return (
    <Container id="containeri" fluid="xxl">
      <Row className="fullscreen-header">
        <Col>
          <b id="date">
          <img
            alt=""
            src="/IFCE/logo-ifce.png"
            width="20%"
            height="75px"
          />
            <span id="date-text">
              {moment().toDate().toLocaleDateString()}  
            </span>
          </b>
        </Col>
      </Row>
      <Row style={announcements && {}}>
        <Col>
          {classTimespans.current ? <DisplaySection bookings={bookings} classTimespan={classTimespans?.current} /> : null}
        </Col>
        <Col>
          {classTimespans.next ? <DisplaySection bookings={bookings} classTimespan={classTimespans?.next} /> : null}
        </Col>
      </Row>

      <Row style={announcements && {height: "15%", width: "inherit"}}>
        <Col xs={12}>
          <Carousel controls={false} indicators={false} interval={5000}>
            <Carousel.Item>
              <Announcements announcement={{text: "Sistema em fase de testes.", author: "Administrador"} as Announcement}/>
            </Carousel.Item>
            {
              announcements?.map((announcement: DocumentData, index: number) => (
                <Carousel.Item key={index}>
                  <Announcements announcement={announcement as Announcement}/>
                </Carousel.Item>
              ))
            }
          </Carousel>
        </Col>
      </Row>
    </Container>
  )
}