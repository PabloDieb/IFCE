import { DocumentData } from "firebase/firestore";
import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import ClassroomForm from "../ClassroomForm/ClassroomForm";
import ClassroomOffcanvas from "../ClassrooomOffcanvas/ClassrooomOffcanvas";

interface Props {
  classroom: DocumentData;
  classroomId: string;
}
export default function EditButton({classroom, classroomId}: Props) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const action = "update";
  console.log(classroomId);
  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Editar
      </Button>
      
      <ClassroomOffcanvas show={show} handleClose={handleClose} action={action}>
        <ClassroomForm action={action} handleClose={handleClose} classroom={classroom!} classroomId={classroomId} />
      </ClassroomOffcanvas>
    </>
  );
}