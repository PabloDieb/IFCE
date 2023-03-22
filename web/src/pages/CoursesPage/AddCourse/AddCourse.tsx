import { addDoc, collection, doc } from "firebase/firestore";
import { useRef, useState } from "react";
import { Button, Container, Form, Modal } from "react-bootstrap";
import { db } from "../../../firebase/config";

export default function AddCourse() {
  interface Courses {
    id: string,
    name: string
  }
  const name = useRef<any>();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const submitHandler = async (event: any) => {
    event.preventDefault();
    event.persist();

    const course = {
      id: doc(collection(db, "courses")).id,
      name: name.current.value,
    }
    console.log(course);
    await saveCurso(course);
  };
  
  const saveCurso = async (course: Courses) => await addDoc(collection(db, "courses"), course);

  return (
    <Container>
      <Button variant="primary" onClick={handleShow}>
        Adicionar Curso
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Adicionar Curso</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={submitHandler}>

            <Form.Group>
              <Form.Label>Nome</Form.Label>
              <Form.Control type="text" ref={name} aria-label="Default select example" />
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
    </Container>
  )
}