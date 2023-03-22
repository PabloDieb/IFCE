import { Navbar, Container, Nav } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function UnsignedInHeader() {  
  return (
    <Navbar collapseOnSelect expand="lg" bg="light" sticky="top">
      <Navbar.Brand href="/">MyIFCE</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse className="justify-content-end">
        <Nav className="me-auto">
          <Nav.Link href="/" active={true}>Horários</Nav.Link>
          <Nav.Link href="avisos" active={true}>Avisos</Nav.Link>
        </Nav>
        <Nav>
          <Nav.Link className="justify-content-end" href="/login">Entrar</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}