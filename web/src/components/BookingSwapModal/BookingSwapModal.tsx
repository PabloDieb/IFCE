import { query, collection, where, addDoc } from "firebase/firestore";
import React, { useState } from "react";
import { Modal, Button, ListGroup } from "react-bootstrap";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { auth, db } from "../../firebase/config";

export default function BookinSwapModal({show, handleClose}: any) {
  const user = useAuthState(auth);
  const queryConstraints : any = [];
  queryConstraints.push(where("professorUserId", "==", user[0]?.uid));
  const bookingsCollection = query(collection(db, 'bookings'), ...queryConstraints);
  const [bookings, loading, error, bookingsSnapshot] = useCollectionData(bookingsCollection,
    {
    snapshotListenOptions: { includeMetadataChanges: true },
    });
    console.log(user);
  const creatSwapRequest = (bookingId) => addDoc(collection(db, 'bookingSwap'), bookingId);

  return(
    <>
    {!loading ? 
      <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Criar Nova Sala</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ListGroup>
          {bookingsSnapshot?.docs?.map(booking => (
            <ListGroup.Item onClick={() => creatSwapRequest(booking.id)}>
              {booking.data().classroomName+"/"+booking.data().professorName}
            </ListGroup.Item>
          ))}
        </ListGroup>

        <Modal.Footer>
          <Button type ="submit" variant="primary" onClick={() => handleClose()}>
            Salvar
          </Button>
          <Button variant="secondary" onClick={() => handleClose()}>
            Fechar
          </Button>
        </Modal.Footer>
      </Modal.Body>
    </Modal>
     : null
    }
    </>
  )
}