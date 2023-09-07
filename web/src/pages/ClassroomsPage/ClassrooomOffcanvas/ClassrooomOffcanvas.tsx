import { Offcanvas, Button, Form } from "react-bootstrap";


export default function ClassroomOffcanvas({show, handleClose, children, action}: any) {
  

  return (
    <Offcanvas show={show} onHide={handleClose} placement="end">
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>{action}</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        {children}
      </Offcanvas.Body>
    </Offcanvas>
  );
}