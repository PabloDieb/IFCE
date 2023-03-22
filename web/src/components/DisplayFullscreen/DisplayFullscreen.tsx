import { Button, Carousel, Col, Container, Row } from "react-bootstrap";
import { getBookings } from "../../services/BookingsService";
import { createBookings, getClassTimespans } from "../../utils/functions";
import DisplaySection from "./DisplaySection/DisplaySection";
import "./DisplayFullscreen.css";
import { getCurrentAnnouncements } from "../../services/AnnouncementsService";
import Announcements from "../Announcements/Announcements";

export default function DisplayFullscreen() {
  const [ bookings ] = getBookings();
  const [ announcements ] = getCurrentAnnouncements();
  console.log(announcements)
  let currentHourAndMinute = new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes();
  
  let classTimespans = getClassTimespans(currentHourAndMinute);
  console.log(classTimespans);
  // console.log(bookings, currentHourAndMinute, classTimespans)
  return (
    <Container id="containeri" fluid="xxl">
      <Row>
        <Col>
          {classTimespans.current ? <DisplaySection bookings={bookings} classTimespan={classTimespans?.current} /> : null}
        </Col>
        <Col>
          {classTimespans.next ? <DisplaySection bookings={bookings} classTimespan={classTimespans?.next} /> : null}
        </Col>
      </Row>
      <Row style={announcements && {height: "15%"}}>
        <Col xs={12}>
          <Carousel controls={false} interval={1000}>
            {
              announcements?.map((announcement, index: number) => (
                <Carousel.Item key={index}>
                  <Announcements announcement={announcement}/>
                </Carousel.Item>
              ))
            }
          </Carousel>
        </Col>
      </Row>
    </Container>
  )
}