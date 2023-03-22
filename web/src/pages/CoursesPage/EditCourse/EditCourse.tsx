import { doc, updateDoc } from "firebase/firestore";
import { useRef, useState } from "react";
import { Button, Container, Form, Modal } from "react-bootstrap";
import { db } from "../../../firebase/config";
interface props {
  course: any
}
export default function EditCourse(props: props) {
  const name = useRef<any>();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const submitHandler = async (event: any) => {
    event.preventDefault();
    event.persist();

    const course = { name: name.current.value };

    await updateCourse(course);
  };
  
  const updateCourse = async (course: any) => await updateDoc(doc(db, "courses", props.course.id), course);
  
  return (
    <Container>
      <Button variant="primary" onClick={handleShow}>
        Editar Curso
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Adicionar Curso</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={submitHandler}>

            <Form.Group>
              <Form.Label>Nome</Form.Label>
              <Form.Control type="text" ref={name} aria-label="Default select example" defaultValue={props.course.data().name}/>
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