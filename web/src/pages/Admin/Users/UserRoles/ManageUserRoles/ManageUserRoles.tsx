import { useState } from "react";
import { Button } from "react-bootstrap";
import UserForm from "../../UserForm/UserForm";
import UserOffcanvas from "../../UserOffcanvas/UserOffcanvas";
import UserRolesForm from "../UserRolesForm/UserRolesForm";

interface ManageUserRolesProps {
  userSnapshot: any;
}

export default function ManageUserRoles({userSnapshot}: ManageUserRolesProps) {
  let [show, setShow] = useState(false);
  let action: string = "add";
  
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  return(
    <>
      <Button variant="primary" onClick={handleShow}>
        Gerenciar cargos
      </Button>

      <UserOffcanvas show={show} handleClose={handleClose} title={"Gerenciar Cargos"}>
        <UserRolesForm userSnapshot={userSnapshot} handleClose={handleClose} />
      </UserOffcanvas>
    </>
  
  )
}