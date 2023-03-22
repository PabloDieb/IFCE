import { Carousel, Col, Container, Row } from "react-bootstrap";
import Announcements from "../../components/Announcements/Announcements";
import ClassroomsScheduleDisplay from "../../components/ClassroomsScheduleDisplay/ClassroomsScheduleDisplay";

export default function DisplayModal(props: any){
  return(
    <Container fluid>
      <Row style={props.bookings && {height: "85%"}}>
        <Col xs={12}>
          <Carousel controls={false} touch={true} interval={4000} style={{height: "5%"}}>
          {
            props.bookingsSpliced?.map((moc, index) => (
              <Carousel.Item key={index}>
                <ClassroomsScheduleDisplay bookings={props.bookingsSpliced[index]} />
                <Carousel.Caption>
                  <h3>{moc.professorName}</h3>
                  <p>{moc.professorName}</p>
                </Carousel.Caption>
              </Carousel.Item>
            ))
          }
        </Carousel>
        </Col>
      </Row>

      <Row style={props.announcements && {height: "15%"}}>
        <Col xs={12}>
          <Carousel controls={false} interval={5000}>
            {
              props.announcements?.map( (announcement: any, index: number) => (
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