import { addDoc, collection, DocumentData } from "firebase/firestore";
import React, { useRef, useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { db } from "../../firebase/config";
import { getDates } from "../../utils/functions";

interface props {
  classroom: any,
  professors: Array<any> | undefined,
  time: string,
  semester: any,
}
export default function AddBooking(props: props){
  const classRef = useRef<any>();
  const professorRef = useRef<any>();
  const [show, setShow] = useState(false);
  
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const saveBooking = async (values) => await addDoc(collection(db, "bookings"), values);

  const submitHandler = async (event) => {
    event.preventDefault();
    event.persist();
    const [ classroomName, classroomId ] = props.classroom.split(";");
    const [ professorName, professorUserId ] = professorRef.current.value.split(";");
    const dates = getDates(props.semester.startDate, props.semester.endDate);
    const values = {
      professorName: professorName,
      professorUserId: professorUserId,
      classroomName: classroomName,
      classroomId: classroomId,
      abMorning: props.time == "abMorning" ? true : false,
      cdMorning: props.time == "cdMorning" ? true : false,
      abAfternoon: props.time == "abAfternoon" ? true : false,
      cdAfternoon: props.time == "cdAfternoon" ? true : false,
      class: classRef.current.value,
      date: new Date(Date.now())
    }
    console.log(values)
    saveBooking(values);
  };
  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Criar
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Criar Nova Sala</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={submitHandler}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Nome da disciplina</Form.Label>
              <Form.Control
                ref={classRef}
                name="name"
                type="text"
                placeholder="Cálculo I"
                autoFocus
              />
            </Form.Group>
            
            <Form.Group className="mb-3">
              <Form.Label htmlFor="professor">Professor</Form.Label>
              <Form.Select
                ref={professorRef}
                name="professor"
                id="professor"
              >
                <option>Selecione uma opção</option>
                {props.professors?.map((professor, index) => (
                  <option key={index} value={professor.name+";"+professor.userId}>{professor.name}</option>
                ))}
              </Form.Select>
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