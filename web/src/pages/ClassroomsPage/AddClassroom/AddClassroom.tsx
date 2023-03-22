import { addDoc, collection } from "firebase/firestore";
import { useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { db } from "../../../firebase/config";

export default function AddClassroom() {
  const [show, setShow] = useState(false);
    const [values, setValues] = useState({});
  
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const saveClassroom = async (values: any) => await addDoc(collection(db, "classrooms"), values);
    const onFormChange = (e: any) => setValues({ ...values, [e.target.name]: e.target.value });

    const submitHandler = (event: any) => {
      event.preventDefault();
      event.persist();
      console.log("val",values)
      saveClassroom(values);
    };
  
  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Nova Sala
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Criar Nova Sala</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={submitHandler}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Nome</Form.Label>
              <Form.Control
                name="name"
                type="text"
                placeholder="Laboratório de Redes"
                onChange={() => onFormChange(event)}
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="classRoomStatus">Condição</Form.Label>
              <Form.Select 
                name="status"
                id="classRoomStatus"
                onChange={() => onFormChange(event)}
              >
                <option>Selecione uma opção</option>
                <option value="Utilizável">Utilizável</option>
                <option value ="Inutilizável">Inutilizável</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="building">Prédio</Form.Label>
              <Form.Select 
                name="building"
                id="building"
                onChange={() => onFormChange(event)}
              >
                <option>Selecione uma opção</option>
                <option value="1">1</option>
                <option value ="2">2</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Capacida máxima</Form.Label>
              <Form.Control
                name="maximumCapacity"
                type="text"
                placeholder="30"
                onChange={() => onFormChange(event)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Observações</Form.Label>
              <Form.Control
                name="observations"
                type="textarea"
                placeholder="Observações"
                onChange={() => onFormChange(event)}
              />
            </Form.Group>

            <Modal.Footer>
              <Button type ="submit" variant="primary" onClick={handleClose}>
                Salvar
              </Button>
              <Button variant="secondary" onClick={handleClose}>
                Fechar
              </Button>
            </Modal.Footer>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}