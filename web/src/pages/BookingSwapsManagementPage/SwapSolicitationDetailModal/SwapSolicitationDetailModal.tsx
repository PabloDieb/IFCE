import { Modal, ListGroup, Button, Table, CardGroup } from "react-bootstrap";
import { Form } from "react-router-dom";
import { getBookingById } from "../../../services/BookingsService";
import { makeBookingSwap, updateBookingSwapStatus } from "../../../services/BookingSwapService";
import Cards from "./Cards";

export default function SwapSolicitationDetailModal({swapRef, showModal, handleClose, bookingRequested, bookingRequester, canHandleSwap}: any) {
  const handleAcceptClick = () => {

    console.log(swapRef, bookingRequested, bookingRequester);
    makeBookingSwap(swapRef, bookingRequested, bookingRequester);
    handleClose();
  }
  console.log(bookingRequested, bookingRequester);
  const handleRejectClick = () => {
    updateBookingSwapStatus(swapRef, false);
    handleClose();
  }

  return (
    <Modal show={showModal} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Solicitação de troca</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <CardGroup>
          <Cards classroomName={bookingRequester.data().classroomName}></Cards>
          <h1> {"->"} </h1>
          <Cards classroomName={bookingRequested.data().classroomName}></Cards>
        </CardGroup>
        <Modal.Footer>
          {canHandleSwap ? 
          <>
            <Button onClick={() => handleAcceptClick()}>Aceitar</Button>
            <Button onClick={() => handleRejectClick()}>Rejeitar</Button>
          </> : null}
        </Modal.Footer>
      </Modal.Body>
    </Modal>
  )
}