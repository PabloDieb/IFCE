import moment from "moment";
import { useRef } from "react";
import { Modal, Form, Button, ListGroup, Container, Row } from "react-bootstrap";
import { ArrowRight } from "react-bootstrap-icons";
import Cards from "../../../pages/BookingSwapsManagementPage/SwapSolicitationDetailModal/Cards";
import { addBookingSwapSolicitation } from "../../../services/BookingSwapService";
import BookingSwap from "../../../services/interfaces/BookingSwap";
import { filterBookingsByTimespanAndProfessor } from "../../../utils/functions";

export default function SwapModal({show, handleClose, bookingId, professorEmailRequested, professorEmail, timespan, bookingProp, snapshot}: any) {
  const messageRef = useRef<HTMLTextAreaElement>(null);
  
  const handleSaveClick = () => {
    var bookingSwap: BookingSwap = {
      accepted: false,
      message: messageRef.current!.value!,
      timespan: timespan,
      date: moment().toDate(),
      waiting: true,
      bookingRequestedId: bookingId,
      professorEmailRequested: professorEmailRequested,
      bookingRequesterId: filteredSnapshot[0].id,
      professorEmailRequester: filteredSnapshot[0].data()[timespan].professorEmail,
    }

    addBookingSwapSolicitation(bookingSwap);
    handleClose();
  }

  let filteredSnapshot = filterBookingsByTimespanAndProfessor(snapshot.docs, timespan, professorEmail);
  console.log(filteredSnapshot.length, professorEmail, )
  return (
    <Modal show={show} onHide={handleClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Solicitar troca</Modal.Title>
      </Modal.Header>
      <Modal.Body>
      {filteredSnapshot.length ?
      <>
        {filteredSnapshot?.map((booking: any, index: number) => (
          <Container style={{display: "flex"}}>
            <Row style={{display: "flex", flexWrap:"nowrap", flexGrow: 0, justifyContent:"center", alignItems: "center", width:"inherit"}}>
              <Cards classroomName={booking.data().classroomName}></Cards>
                <ArrowRight style={{display: "flex", alignItems:"center", justifyContent: "flex-start", width:"5rem" ,height:"5rem"}}/>
              <Cards classroomName={bookingProp.data().classroomName}></Cards>
            </Row>
            {/* <ListGroup as="ol" numbered>
              <ListGroup.Item as="li" className="d-flex justify-content-between align-items-start">
                <div className="ms-2 me-auto">
                  <div className="fw-bold">{booking.data().classroomName} ({booking.data()[timespan].course})</div>
                  <option key={index} value={booking.data()[timespan].professorEmail}>{booking.data()[timespan].professorEmail}</option>
                </div>
              </ListGroup.Item>
            </ListGroup> */}
            
          </Container>
        ))}
        <p>Mensagem:</p>
        <Form.Control as="textarea" ref={messageRef} aria-label="With textarea" />
        <Modal.Footer>
          <Button onClick={() => handleSaveClick()}>Solicitar troca</Button>
          <Button variant="secondary" onClick={() => handleClose()}>
            Fechar
          </Button>
        </Modal.Footer>
        </> : <p>Para solicitar uma troca você precisa ter uma reserva nesse mesmo período.</p>
      }
      </Modal.Body>
    </Modal>
  )
}