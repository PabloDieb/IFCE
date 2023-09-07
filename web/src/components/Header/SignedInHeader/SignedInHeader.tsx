import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import DisplayFullscreen from '../../DisplayFullscreen/DisplayFullscreen';
import { signOut } from 'firebase/auth';
import { auth } from '../../../firebase/config';
import { Badge, Button, Modal, OverlayTrigger, Popover } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { useAuthState, useSendPasswordResetEmail } from 'react-firebase-hooks/auth';
import './SignedInHeader.css';
import AddAnnouncement from '../../AddAnnouncement/AddAnnouncement';
import { useUserClaimsStore } from '../../../stores/UserClaimsStore';
import { useNotificationsStore } from '../../../stores/NotificationsStore';
import { getNotificationsByUser, getOpenSwapsToMe } from '../../../services/BookingSwapService';


export default function SignedInHeader() {
  const [ showAddAnnouncement, setShowAddAnnouncement ] = useState(false);
  const {pathname} = useLocation();
  const logout = async () => {
    await signOut(auth).then(() => 
    console.log('Deslogando'));
  }
  const totalNotifications = getNotificationsByUser(auth.currentUser!.email!);

  // useEffect(() => {
  //   //Gambiarra pro dropdown fechar quando mudar de rota
  //   let a = document.getElementsByClassName('dropdown-menu')[0];
  //   let b = document.getElementsByClassName('dropdown')[0];
  //   let c = document.getElementById('collasible-nav-dropdown');
  //   a && a.classList.remove("show");
  //   b && b.classList.remove("show");
  //   c && c.classList.remove("show");
  //   c && c?.click(); //Mesmo com a gambiarra precisa desse click pra limpar tudo
  // }, [pathname]);

  const userClaims = useUserClaimsStore(state => state.claims)
  const userNotifications = useNotificationsStore(state => state.notifications);
  const [sendPasswordResetEmail, sending, error] = useSendPasswordResetEmail(auth);
  const [user] = useAuthState(auth);
  const [fullscreen, setFullscreen] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [show, setShow] = useState(false);
  const closeAddAnnouncement = () => setShowAddAnnouncement(false);
  function handleShow() {
    setFullscreen(true);
    setShow(true);
  }

  const sendPasswordReset = (email: string) => {
    sendPasswordResetEmail(email);
    setShowModal(true);
  }
  console.log("CLAIMS", userClaims)
  return(
    <>
    <Navbar collapseOnSelect style={{backgroundColor: 'rgb(115 165 239)'}} expand="lg" fixed="top" sticky="top">
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
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="me-auto">
          <>
          <Nav.Link as={Link} to="avisosl" className="nav-link">
            Avisos 
          </Nav.Link>
          {
            userClaims.professor ?
              <NavDropdown title="Professor">
                <NavDropdown.Item as={Link} to="reservas">
                  Reservas 
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="solicitacoes">
                  Solicitações de trocas
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="" onClick={() => setShowAddAnnouncement(true)}>
                  Criar aviso
                </NavDropdown.Item>
              </NavDropdown> : null
          }

          {
            userClaims.admin ? 
              <NavDropdown title="Admin">
                <NavDropdown.Item as={Link} to="" onClick={() => handleShow()}>
                  Modo Monitor
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="gerenciar-cursos">
                  Disciplinas
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="gerenciar-salas">
                  Salas
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/" onClick={() => setShowAddAnnouncement(true)}>
                  Avisos
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="cadastrar-horarios">
                  Cadastrar Horários
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="users">
                  Usuários
                </NavDropdown.Item>
              </NavDropdown> : null
          }
          </>
        </Nav>

        <Nav>
          {totalNotifications ? <OverlayTrigger
            trigger="click"
            key={"bottom"}
            placement={"bottom"}
            overlay={
              <Popover id={`popover-positioned-bottom`}>
                <Popover.Header as="h3">Notificações</Popover.Header>
                <Popover.Body>
                  <strong>Você recebeu novas solicitações de trocas!</strong>

                </Popover.Body>
              </Popover>
            }
          >
            <Button variant="primary">
              Notificações <Badge bg="secondary">{totalNotifications}</Badge>
            </Button>
          </OverlayTrigger> : null}
          <NavDropdown title={user!.email}>
            <NavDropdown.Item as={Link} to="" onClick={() => sendPasswordReset(user!.email!)}>
              Trocar Senha
            </NavDropdown.Item>
            <NavDropdown.Item as={Link} to="" onClick={() => logout()}>
              Sair
            </NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>

      <AddAnnouncement show={showAddAnnouncement} handleClose={closeAddAnnouncement} />
      <Modal show={show} className="modal-full" fullscreen={fullscreen ? true : ""} onHide={() => setShow(false)}>
        <DisplayFullscreen />
      </Modal>
    </Navbar>
    <Modal show={showModal} onHide={() => setShowModal(false)}>
    <Modal.Header closeButton>
      <Modal.Title>Troca de senha solicitada!</Modal.Title>
        </Modal.Header>
        <Modal.Body>Um email foi enviado para você contendo o link para trocar sua senha atual!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
        </Modal.Footer>
    </Modal>
    </>
  );
}