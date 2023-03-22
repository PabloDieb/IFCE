import { Col, Container, Row } from "react-bootstrap";
import { CircleFill } from 'react-bootstrap-icons';
export default function DisplaySectionRow({ booking, classTimespan}: any) {
  console.log(booking)
  return(
    <Container style={{height: "7rem", fontSize: "2rem"}}>
      <Row style={{height: "7rem", backgroundColor:"#dddddd"}} className="justify-content-md-center">
        <Col md={1} style={{display: "flex", padding: 0}} className="justify-content-md-center align-items-center">
          <Row>
            <CircleFill color="blue" size={"3rem"}/>
          </Row>
        </Col>
        <Col md="auto" style={{display: "flex"}} className="justify-content-md-center align-items-center">
          <div>
            <Row className="justify-content-md-center">
              <strong>
                {booking[classTimespan.timespanName]?.class}<br></br>
              </strong>
            </Row>
            <Row className="justify-content-md-center">
              <strong>
                {booking.classroomName}
              </strong>
            </Row>
          </div>
        </Col>
        <Col md={1} />
      </Row>
    </Container>
  )
}