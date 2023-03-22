import { updateDoc, doc } from "firebase/firestore";
import { useRef, useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { db } from "../../../firebase/config";
interface Classroom {
  building: string,
  name: string,
  status: string,
  maximumCapacity: string,
  observations: string
}
export default function EditClassroom(props: any) {
  const [show, setShow] = useState(false);

  const buildingRef = useRef<any>();
  const nameRef = useRef<any>();
  const statusRef = useRef<any>();
  const maximumCapacityRef = useRef<any>();
  const observationsRef = useRef<any>();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const updateClassroom = async (values: any) => {
    console.log(doc(db, "classrooms", props.classroomId))
    await updateDoc(doc(db, "classrooms", props.classroomId), values);
  }

  const submitHandler = async (event: any) => {
    event.preventDefault();
    event.persist();
    const values = {
      building: buildingRef.current.value,
      name: nameRef.current.value,
      status: statusRef.current.value,
      maximumCapacity: maximumCapacityRef.current.value,
      observations: observationsRef.current.value
    };

    await updateClassroom(values);
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Editar
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Editar</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit = {submitHandler}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Bloco</Form.Label>
              <Form.Control
                name = "building"
                type = "text"
                defaultValue = {props.classroom.building}
                placeholder = "Computação"
                ref = {buildingRef}
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Nome</Form.Label>
              <Form.Control
                name="name"
                type="text"
                defaultValue = {props.classroom.name}
                placeholder = "Laboratório de Redes"
                ref = {nameRef}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="classRoomStatus">Condição</Form.Label>
              <Form.Select 
                id = "classRoomStatus"
                name = "status"
                defaultValue = {props.classroom.status}
                ref = {statusRef}
              >
                <option>Selecione uma opção</option>
                <option value = "Utilizável">Utilizável</option>
                <option value = "Inutilizável">Inutilizável</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Capacida máxima</Form.Label>
              <Form.Control
                name = "maximumCapacity"
                defaultValue = {props.classroom.maximumCapacity}
                type = "text"
                placeholder = "30"
                ref = {maximumCapacityRef}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Observações</Form.Label>
              <Form.Control
                name = "observations"
                type = "text"
                defaultValue = {props.classroom.observations}
                ref = {observationsRef}
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