import { DocumentData } from "firebase/firestore";
import { useState } from "react";
import { Button, Table } from "react-bootstrap";
import { getBookingById } from "../../../services/BookingsService";
import { updateBookingSwapStatus } from "../../../services/BookingSwapService";
import SwapSolicitationDetailModal from "../SwapSolicitationDetailModal/SwapSolicitationDetailModal";

export default function BookingSwapsTable({bookingSwaps, canHandleSwap} : any) {
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [swapRef, setSwapRef] = useState(false);
  const [bookingRequested, setBookingRequested] = useState<DocumentData | undefined>();
  const [bookingRequester, setBookingRequester] = useState<DocumentData | undefined>();
  const handleShowDetailModal = async (swapRef: any) => {
    console.log(swapRef.data());
    setBookingRequester(await getBookingById(swapRef.data().bookingRequesterId))
    setBookingRequested(await getBookingById(swapRef.data().bookingRequestedId))
    setSwapRef(swapRef);
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
            bookingSwaps?.map( (openSwap: any, index: number) => 
            {
              return <tr key={index}>
                <td>{openSwap.data().professorEmailRequester}</td>
                <td><Button onClick={() => handleShowDetailModal(openSwap)}>Ver solicitação</Button></td>
              </tr>
            })
          }
        </tbody>
      </Table>
      : <SwapSolicitationDetailModal swapRef={swapRef} showModal={showDetailModal} handleClose={handleCloseDetailModal} bookingRequested={bookingRequested} bookingRequester={bookingRequester} canHandleSwap={canHandleSwap}></SwapSolicitationDetailModal>
      }
    </>
  )
}