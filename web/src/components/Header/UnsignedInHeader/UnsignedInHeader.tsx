import { Navbar, Nav } from "react-bootstrap";
import { Link } from 'react-router-dom';

export default function UnsignedInHeader() {  
  return (
    <Navbar collapseOnSelect expand="lg" style={{backgroundColor: 'rgb(115 165 239)'}} fixed="top" sticky="top">
      <Navbar.Brand>
        <img
          style={{marginLeft: '20px'}}
          alt=""
          src="logo-ifce.png"
          width="190"
          height="50"
          className="d-inline-block align-top"
        />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse className="justify-content-end">
        <Nav className="me-auto">
          <Nav.Link as={Link} to="/">Horários</Nav.Link>
          <Nav.Link as={Link} to="avisos">Avisos</Nav.Link>
        </Nav>
        <Nav>
          <Nav.Link as={Link} to="signin">Entrar</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}