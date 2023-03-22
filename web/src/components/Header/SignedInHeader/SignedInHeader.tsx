import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { signOut } from 'firebase/auth';
import { auth } from '../../../firebase/config';
import './SignedInHeader.css';
import { Modal } from 'react-bootstrap';
import { useState } from 'react';
import DisplayFullscreen from '../../DisplayFullscreen/DisplayFullscreen';
import { Link, Navigate, NavLink, useNavigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { getOpenSwapsToMe } from '../../../services/BookingSwapService';
import { CircleFill } from 'react-bootstrap-icons';



export default function SignedInHeader() {
  const logout = async () => {
    await signOut(auth);
    localStorage.removeItem("isUserLoggedIn");
    console.log('Deslogando');

  }

  const [user] = useAuthState(auth);
  // const [ swaps, loading, , swapForMeSnapshot ] = getOpenSwapsToMe(user?.email ? user.email : "");
  // const openBookingSwapsForMe = swaps?.filter(bookingSwap => bookingSwap.waiting);
  // console.log(swaps, "HEADER")
  const [fullscreen, setFullscreen] = useState(true);
  const [show, setShow] = useState(false);

  function handleShow() {
    setFullscreen(true);
    setShow(true);
  }
  return(
    <Navbar collapseOnSelect bg="light" expand="lg" sticky="top">
      <Navbar.Brand href="/">MyIFCE</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link onClick={() => handleShow()} active={true}>Display</Nav.Link>
          <NavLink to="reservas" className="nav-link active">
            Reservas 
          </NavLink>
          <NavLink to="avisosl" className="nav-link active">
            Avisos 
          </NavLink>
          <NavLink to="solicitacoes" className="nav-link active">
            Solicitacoes trocas 
          </NavLink>
        </Nav>
        <Nav>
          <NavDropdown title="Admin" id="collasible-nav-dropdown">
            <NavLink to="gerenciar-cursos" as={Link}>
              Cursos 
            </NavLink>
            <NavLink to="gerenciar-salas" className="dropdown-item">
              Salas
            </NavLink>
            <NavLink to="gerenciar-anuncios" className="dropdown-item">
              Avisos
            </NavLink>
            <NavLink to="gerenciar-usuarios" className="dropdown-item">
              Novo Usuário
            </NavLink>
            <NavLink to="cadastrar-horarios" className="dropdown-item">
              Cadastrar Horários
            </NavLink>
          </NavDropdown>
          <Nav.Link onClick={() => logout()}>Sair</Nav.Link>
        </Nav>
      </Navbar.Collapse>
      <Modal show={show} fullscreen={fullscreen ? true : ""} onHide={() => setShow(false)}>
        <DisplayFullscreen />
      </Modal>
    </Navbar>
    
  );
}