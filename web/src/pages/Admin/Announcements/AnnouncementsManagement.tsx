import moment from "moment";
import Announcement from "../../../services/interfaces/Announcement";
import { useRef, useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { Toast } from "../../../components/Toast/Toast";
import { addAnnouncementAsync } from "../../../services/AnnouncementsService";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../../firebase/config";

export default function AnnouncementsManagementPage() {
  const [ showMinutesDropdown, setShowMinutesDropdown ] = useState(false);
  const [ showToast, setShowToast ] = useState(false);
  const [ charactersLimit, setCharactersLimit ] = useState<number>(144);

  const radio1Ref = useRef<HTMLInputElement>(null);
  const radio2Ref = useRef<HTMLInputElement>(null);
  const selectRef = useRef<HTMLSelectElement>(null);
  const textRef = useRef<HTMLTextAreaElement>(null);
  const [user] = useAuthState(auth);

  const submitHandler = async (event: any) => {
    event.preventDefault();
    event.persist();
    let currentDate = moment();
    if(radio1Ref!.current!.checked) {
      currentDate.set({'hours': 23, 'minutes': 59, "seconds": 55});
    }

    if(radio2Ref!.current!.checked) {
      currentDate.add(selectRef!.current!.value, "minutes");
    }

    const announcement: Announcement = {
      author: user?.displayName,
      expirationDate: currentDate.toDate(),
      text: textRef!.current!.value,
    }
    
    await addAnnouncementAsync(announcement);
    cleanUp();
    setShowToast(true);
  };
  const cleanUp = () => {
    textRef!.current!.value = "";
    radio1Ref!.current!.checked  = false;
    radio2Ref!.current!.checked = false;
    selectRef!.current!.value = "";
    setShowMinutesDropdown(false);
  }
  return (
    <Container className="justify-content-md-center">
      <Row className="justify-content-md-center">
        <Col xl={4} md={6} sm={4}>
        <h1>
          Criar Aviso
        </h1>
        </Col>
      </Row>
      <Row className="justify-content-md-center">
        <Col xl={4} md={6} sm={4}>
          <Form onSubmit={submitHandler}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Anúncio/Aviso</Form.Label>
              <Form.Control
                name="text"
                as="textarea"
                placeholder="Texto"
                ref={textRef}
                maxLength={144}
                onChange={() => setCharactersLimit(charactersLimit - 1)}
                required
                autoFocus
              />
              <Form.Text id="passwordHelpBlock" muted>
                A mensagem deve conter ao máximo {charactersLimit} caracteres.
              </Form.Text>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Tempo de vida do anúncio</Form.Label>
              <Form.Check
                label="Dia todo"
                name="group1"
                type="radio"
                value="1"
                ref={radio1Ref}
                onClick={() => setShowMinutesDropdown(false)}
              />
              <Form.Check
                label="Periodo de tempo"
                name="group1"
                type="radio"
                value="2"
                ref={radio2Ref}
                onClick={() => setShowMinutesDropdown(true)}
              />
              {
                showMinutesDropdown ? 
                  <Form.Select ref={selectRef} aria-label="Selecione o tempo">
                    <option>Open this select meawdanu</option>
                    <option value="30">30 Minutos</option>
                    <option value="60">1 Hora</option>
                    <option value="120">2 Horas</option>
                    <option value="360">6 Horas</option>
                    <option value="720">12 Horas</option>
                  </Form.Select>
                : null
              }
            </Form.Group>
            <Button type="submit" variant="primary" onClick={submitHandler}>
              Salvar
            </Button>
          </Form>
        </Col>
      </Row>
      {showToast && <Toast message="Aviso criado com sucesso!" type="success" showToast={showToast}  setShowToast={setShowToast}/>}
    </Container>
  )
}