import { DocumentData, DocumentSnapshot, QueryDocumentSnapshot } from "firebase/firestore";
import { useState } from "react";
import { Button, Table } from "react-bootstrap";
import { getBookingById } from "../../../services/BookingsService";
import { updateBookingSwapStatus } from "../../../services/BookingSwapService";
import BookingSwap from "../../../services/interfaces/BookingSwap";
import BookingSwapCardsModal from "../SwapSolicitationDetailModal/BookingSwapCardsModal";

interface props {
  bookingSwaps: QueryDocumentSnapshot<BookingSwap>[];
  canHandleSwap: boolean;
}

export default function BookingSwapsTable({bookingSwaps, canHandleSwap}: props) {
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [swapDocument, setSwapDocument] = useState<DocumentData>();
  const [bookingRequested, setBookingRequested] = useState<DocumentSnapshot<DocumentData> | undefined>();
  const [bookingRequester, setBookingRequester] = useState<DocumentSnapshot<DocumentData> | undefined>();

  const handleShowDetailModal = async (swap: DocumentData) => {
    console.log(swap.data());
    setBookingRequester(await getBookingById(swap.data().bookingRequesterId))
    setBookingRequested(await getBookingById(swap.data().bookingRequestedId))
    setSwapDocument(swap);
    setShowDetailModal(true);
  }
  const handleCloseDetailModal = () => setShowDetailModal(false);

  return (
    <>
      {!showDetailModal ?
      <Table striped bordered hover id="tableX">
        <thead>
          <tr>
            <th>Solicitante</th>
            <th>Ver solicitação</th>
          </tr>
        </thead>
        <tbody>
          { 
            bookingSwaps?.map((swap: DocumentData, index: number) => 
            {
              return <tr key={index}>
                <td>{swap.data().professorEmailRequester}</td>
                <td><Button onClick={() => handleShowDetailModal(swap)}>Ver solicitação</Button></td>
              </tr>
            })
          }
        </tbody>
      </Table>
      : <BookingSwapCardsModal swapDocument={swapDocument!} bookingRequested={bookingRequested!} bookingRequester={bookingRequester!} showModal={showDetailModal} handleClose={handleCloseDetailModal} canHandleSwap={canHandleSwap} />
      }
    </>
  )
}