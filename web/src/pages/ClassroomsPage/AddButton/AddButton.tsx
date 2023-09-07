import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import ClassroomForm from "../ClassroomForm/ClassroomForm";
import ClassroomOffcanvas from "../ClassrooomOffcanvas/ClassrooomOffcanvas";

export default function AddButton() {
  const action: string = "add"
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Nova Sala
      </Button>

      <ClassroomOffcanvas show={show} handleClose={handleClose} action={action}>
        <ClassroomForm action={action} handleClose={handleClose} />
      </ClassroomOffcanvas>
    </>
  );
}