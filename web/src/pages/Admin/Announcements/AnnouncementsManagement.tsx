import moment from "moment";
import { useRef, useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { AddAnnouncementAsync } from "../../../services/AnnouncementsService";

export default function AnnouncementsManagementPage() {
  const [ showMinutesDropdown, setShowMinutesDropdown ] = useState(false);
  const radio1Ref = useRef<any>();
  const radio2Ref = useRef<any>();
  const selectRef = useRef<any>();
  const textRef = useRef<any>();

  const submitHandler = async (event: any) => {
    event.preventDefault();
    event.persist();
    let currentDate = moment();
    if(radio1Ref.current.checked) {
      currentDate.set({'hours': 23, 'minutes': 59, "seconds": 55});
    }
    if(radio2Ref.current.checked) {
      currentDate.add(selectRef.current.value, "minutes");
    }
    const announcement = {
      text: textRef.current.value,
      expirationDate: currentDate.toDate(),
    }
    await AddAnnouncementAsync(announcement);
  };

  return (
    <Container>
      <Row className="justify-content-md-center">
      <Col md={4}>
      <Form onSubmit={submitHandler}>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Anúncio/Aviso</Form.Label>
          <Form.Control
            name = "text"
            type = "text"
            placeholder = "Texto"
            ref = {textRef}
            autoFocus
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <>
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
                  <option>Open this select menu</option>
                  <option value="30">30 Minutos</option>
                  <option value="60">1 Hora</option>
                  <option value="120">2 Horas</option>
                  <option value="360">6 Horas</option>
                  <option value="720">12 Horas</option>
                </Form.Select>
              : null
            }
          </>
        </Form.Group>
        <Button type ="submit" variant="primary" onClick={submitHandler}>
          Salvar
        </Button>
      </Form>
      </Col>
      </Row>
    </Container>
  )
}