import { useState } from "react";
import { Button } from "react-bootstrap";
import UserForm from "../UserForm/UserForm";
import UserOffcanvas from "../UserOffcanvas/UserOffcanvas";

export default function AddButton() {
  let [show, setShow] = useState(false);
  let action: string = "add";
  
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  return(
    <>
      <Button variant="primary" onClick={handleShow}>
        Adicionar usuário
      </Button>

      <UserOffcanvas show={show} handleClose={handleClose} action={action} title={"Adicionar usuários"}>
        <UserForm action={action} handleClose={handleClose} />
      </UserOffcanvas>
    </>
  
  )
}