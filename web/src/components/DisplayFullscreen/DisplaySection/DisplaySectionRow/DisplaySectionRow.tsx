import { Col, Container, Row } from "react-bootstrap";
import "./DisplaySectionRow.css";
export default function DisplaySectionRow({ booking, classTimespan}: any) {
  console.log(booking)

  const getGraduationIcon = (): any=> {

    if(booking[classTimespan.timespanName]?.graduation == "COM" || booking[classTimespan.timespanName]?.graduation == "COMP"){
        return <div style={{backgroundColor:"#58a7ff"}} className="course-icon">CC</div>
        // <CircleFill color="blue" size={"3rem"}/>
    }
    
    if(booking[classTimespan.timespanName]?.graduation === "MAT"){
      return <div style={{backgroundColor:"#ffc107d4"}} className="course-icon">MT</div>
    }
    if(booking[classTimespan.timespanName]?.graduation === "RED"){
      return <div style={{backgroundColor:"#dc3545"}} className="course-icon">RD</div>
    }
    return <div style={{backgroundColor:"#58a7ff"}} className="course-icon">CC</div>
  }
  return(
    <Container style={{height: "7rem", fontSize: "2rem"}}>
      <Row 
        style={{height: "7rem", display: "flex", padding: 0}} 
        className="justify-content-md-center"
      >
        <Col 
          md={2} 
          style={{display: "flex", padding: "0"}} 
          className="justify-content-md-center align-items-center"
        >
          {getGraduationIcon()}
        </Col>
        <Col
          className="justify-content-md-center align-items-center"
        >
          <Row style={booking[classTimespan.timespanName]?.course.length > 24 ? {height: "60%"} : {height: "60%"}} >
            <strong style={{lineHeight: "2rem"}}>
              {booking[classTimespan.timespanName]?.course}<br></br>
            </strong>
          </Row>
          <Row style={booking[classTimespan.timespanName]?.course.length > 24 ? {height: "60%"} : {height: "60%"}} >
            <i style={{fontSize: "1.8rem", fontWeight: "600"}}>
              {booking.classroomName}
            </i>
          </Row>
        </Col>
      </Row>
    </Container>
  )
}