import { Offcanvas, Button, Form } from "react-bootstrap";

interface props {
  show: boolean;
  handleClose: () => void;
  children: JSX.Element;
  action?: string;
  title: string;
}
export default function ClassroomOffcanvas({show, handleClose, children, title}: props) {
  
  return (
    <Offcanvas show={show} onHide={handleClose} placement="end">
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>{title}</Offcanvas.Title>
      </Offcanvas.Header>
      <hr className="divider"/>
      <Offcanvas.Body>
        {children}
      </Offcanvas.Body>
    </Offcanvas>
  );
}