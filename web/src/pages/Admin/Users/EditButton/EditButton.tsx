import { useState } from "react";
import { Button } from "react-bootstrap";
import UserForm from "../UserForm/UserForm";
import UserOffcanvas from "../UserOffcanvas/UserOffcanvas";

export default function EditButton() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const action = "update";

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Editar
      </Button>
      
      <UserOffcanvas show={show} handleClose={handleClose} action={action} title={""}>
        <UserForm action={action} handleClose={handleClose} />
      </UserOffcanvas>
    </>
  );
}