import { useRef } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { updateBooking } from "../../../services/BookingsService";
import { getClasses } from "../../../services/ClassesService";

export default function BookingModal({show, handleClose, bookingRef, hour}: any) {

  const [ courses, , , ] = getClasses();
  const courseRef = useRef<HTMLSelectElement >(null);

  const handleSaveClick = () => {
    const data = {
      [hour]: {
        // professorName: localStorage.getItem("userName"),
        professorName: "José",
        professorID: localStorage.getItem("userId"),
        course: courseRef.current.value
      }
    }
    console.log("save",bookingRef, data);
    updateBooking(bookingRef, data);
    handleClose();
  }
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Reservar sala</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h6>Selecione a aula</h6>
        <Form.Select
            ref={courseRef}
            name="curso"
            id="curso"
          >
            <option>Selecione uma opção</option>
            {courses?.map((course, index) => (
              <option key={index} value={course.name}>{course.name}</option>
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