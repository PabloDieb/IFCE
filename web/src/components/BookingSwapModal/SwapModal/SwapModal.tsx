import moment from "moment";
import { useRef } from "react";
import { Modal, Form, Button, ListGroup } from "react-bootstrap";
import { addBookingSwapSolicitation } from "../../../services/BookingSwapService";
import { filterBookingsByTimespanAndProfessor } from "../../../utils/functions";

export default function SwapModal({show, handleClose, bookingId, professorEmailRequested, professorEmail, timespan, snapshot}: any) {
  const messageRef = useRef<HTMLTextAreaElement>(null);
  const handleSaveClick = () => {
    var data = {
      bookingRequestedId: bookingId,
      professorEmailRequested: professorEmailRequested,
      bookingRequesterId: filteredSnapshot[0].id,
      professorEmailRequester: filteredSnapshot[0].data()[timespan].professorEmail,
      timespan: timespan,
      message: messageRef.current ? messageRef.current.value : "",
      waiting: true,
      accepted: false,
      date: moment().toDate()
    }
    console.log(data, 1231231)
    addBookingSwapSolicitation(data);
    handleClose();
  }
  console.log(bookingId)
  let filteredSnapshot = filterBookingsByTimespanAndProfessor(snapshot.docs, timespan, professorEmail);
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Minhas aulas</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {filteredSnapshot?.map((booking: any, index: number) => (
          <>
            <ListGroup as="ol" numbered>
              <ListGroup.Item as="li" className="d-flex justify-content-between align-items-start">
                <div className="ms-2 me-auto">
                  <div className="fw-bold">{booking.data().classroomName} ({booking.data()[timespan].class})</div>
                  <option key={index} value={booking.data()[timespan].professorEmail}>{booking.data()[timespan].professorEmail}</option>
                </div>
              </ListGroup.Item>
            </ListGroup>
          </>
        ))}
        <Form.Control as="textarea" ref={messageRef} aria-label="With textarea" />
        <Modal.Footer>
          <Button onClick={() => handleSaveClick()}>Solicitar troca</Button>
          <Button variant="secondary" onClick={() => handleClose()}>
            Fechar
          </Button>
        </Modal.Footer>
      </Modal.Body>
    </Modal>
  )
}