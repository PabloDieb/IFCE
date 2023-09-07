import { DocumentData, DocumentSnapshot } from "firebase/firestore";
import { Modal, Button, CardGroup, Card } from "react-bootstrap";
import { makeBookingSwap, updateBookingSwapStatus } from "../../../services/BookingSwapService";
import Cards from "./Cards";

interface props {
  swapDocument: DocumentData;
  bookingRequested: DocumentSnapshot;
  bookingRequester: DocumentSnapshot;
  showModal: boolean;
  canHandleSwap: boolean;
  handleClose: () => void;
}
export default function BookingSwapCardsModal({swapDocument, showModal, handleClose, bookingRequested, bookingRequester, canHandleSwap}: props) {
  console.log(swapDocument, bookingRequested)
  const handleAcceptClick = () => {
    makeBookingSwap(swapDocument, bookingRequested, bookingRequester);
    handleClose();
  }
  console.log(bookingRequester.data(), "DWKIJWOIDJW");

  const handleRejectClick = () => {
    updateBookingSwapStatus(swapDocument, false);
    handleClose();
  }

  return (
    <Modal show={showModal} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Solicitação de troca</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <CardGroup>
          <Cards classroomName={bookingRequester.data()!.classroomName}></Cards>
          <h1> {"->"} </h1>
          <Cards classroomName={bookingRequested.data()!.classroomName}></Cards>
        </CardGroup>
        <span style={{marginTop: "10px"}}>Mensagem:</span>
        <Card>
          <Card.Body>{swapDocument.data()!.message}</Card.Body>
        </Card>
        <Modal.Footer>
          {
          canHandleSwap &&
            <>
              <Button onClick={() => handleAcceptClick()}>Aceitar</Button>
              <Button variant="danger" onClick={() => handleRejectClick()}>Rejeitar</Button>
            </>
          }
        </Modal.Footer>
      </Modal.Body>
    </Modal>
  )
}