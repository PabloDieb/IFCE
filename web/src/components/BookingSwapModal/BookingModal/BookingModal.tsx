import { DocumentData, QueryDocumentSnapshot } from "firebase/firestore";
import { useRef } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../../firebase/config";
import { updateBookingWithRef } from "../../../services/BookingsService";
import { getDisciplines } from "../../../services/DisciplinesServices";

export default function BookingModal({show, handleClose, bookingRef, timespan}: any) {

  const [ , , , disciplinesSnapshot] = getDisciplines();
  const disciplineRef = useRef<HTMLSelectElement >(null);
  const [user] = useAuthState(auth);

  const handleSaveClick = () => {
    let classElement = getSelectedClassData(disciplinesSnapshot!.docs, disciplineRef!.current!.value)[0];
    console.log(classElement)
    console.log(user!.email, classElement!.data())
    const data = {
      [timespan]: {
        professorEmail: user!.email!,
        course: classElement!.data().discipline,
        graduation: classElement!.data().courseName,
        semester: classElement!.data().semester
      }
    }
    updateBookingWithRef(bookingRef, data);
    handleClose();
  }
  console.log(timespan);
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Reservar sala</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h6>Selecione a aula</h6>
        <Form.Select
            ref={disciplineRef}
            name="curso"
            id="curso"
          >
            <option>Selecione uma opção</option>
            {disciplinesSnapshot?.docs.map((discipline, index) => (
              <option key={index} value={discipline.id}>
                {discipline.data().discipline}
              </option>
            ))}
          </Form.Select>
        <Modal.Footer>
          <Button type ="submit" variant="primary" onClick={() => handleSaveClick()}>
            Salvar
          </Button>
          <Button variant="secondary" onClick={() => handleClose()}>
            Fechar
          </Button>
        </Modal.Footer>
      </Modal.Body>
    </Modal>
  )
}

function getSelectedClassData(docs: QueryDocumentSnapshot<DocumentData>[], id: string) {
  return docs.filter(element => element.id === id);
}