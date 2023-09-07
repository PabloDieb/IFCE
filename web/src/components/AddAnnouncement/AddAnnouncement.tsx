import moment from "moment";
import { useState, useRef, useEffect } from "react";
import { Button, Form, Offcanvas } from "react-bootstrap";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase/config";
import { addAnnouncementAsync } from "../../services/AnnouncementsService";
import Announcement from "../../services/interfaces/Announcement";

export default function AddAnnouncement({show, handleClose}: any) {
  const [ showMinutesDropdown, setShowMinutesDropdown ] = useState<boolean>(false);
  const [ charartersLimit, setCharartersLimit ] = useState<number>(0);
  
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
    console.log(announcement, "sucesso")
    await addAnnouncementAsync(announcement);
    handleClose();
  };
  const cleanUp = () => {
    console.log("cleanUp")
    radio1Ref && radio1Ref.current ? radio1Ref.current.checked = false : null;
    radio2Ref && radio2Ref.current ? radio2Ref.current.checked = false : null;
    setShowMinutesDropdown(false);
  }
  useEffect(() => {
    cleanUp();
  }, [show])
  const closeOffcanvas = () => {
    setCharartersLimit(0);
    handleClose();
  };
  return(
    <Offcanvas show={show} onHide={closeOffcanvas} placement="end" backdrop="static">
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Adicionar Aviso</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <Form onSubmit={submitHandler}>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Anúncio/Aviso</Form.Label>
            <Form.Control
              name="text"
              as="textarea"
              placeholder="Texto"
              ref={textRef}
              maxLength={144}
              rows={4}
              onChange={event => setCharartersLimit(event.target.value.length)}
              required
              autoFocus
            />
            <Form.Text id="charactersLimitHelpBlock" muted>
              A mensagem ainda pode conter {144 - charartersLimit} caracteres.
            </Form.Text>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Tempo de vida do aviso</Form.Label>
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
      </Offcanvas.Body>
    </Offcanvas>
  )
}