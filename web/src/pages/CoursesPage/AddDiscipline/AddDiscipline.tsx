import { useRef, useState } from "react";
import { Button, Container, Form, Modal } from "react-bootstrap";
import { addCourse } from "../../../services/DisciplinesServices";
import Discipline from "../../../services/interfaces/Discipline";
import Course from "../../../services/interfaces/Discipline";

export default function AddDiscipline() {
  const courseRef = useRef<any>();
  const disciplineRef = useRef<any>();
  const semesterRef = useRef<any>();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const submitHandler = async (event: any) => {
    event.preventDefault();
    event.persist();

    const course: Discipline = {
      courseName: courseRef.current.value,
      courseAcronym: getCourseAcronym(courseRef.current.value),
      discipline: disciplineRef.current.value,
      semester: semesterRef.current.value
    }

    await addCourse(course);
  };
  function getCourseAcronym(courseName: string): string {
    const object = {
      "CIÊNCIA DA COMPUTAÇÂO": "COMP",
      "ENGENHARIA AMBIENTAL E SANITÁRIA": "ENAM",
      "ENGENHARIA MECÂNICA": "ENME",
      "ENGENHARIA DE CONTROLE E AUTOMAÇÂO": "ENCO",
      "MATEMÁTICA": "MATE",
      "QUÍMICA": "QUIM",
      "MANUTENÇÂO INDUSTRIAL": "MAIN",
    }
    return (object as any)[courseName];
  }
  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Adicionar Disciplina
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Adicionar Disciplina</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={submitHandler}>

            <Form.Group>
              <Form.Label>Curso</Form.Label>
              <Form.Select ref={courseRef} aria-label="Selecione uma opção">
                <option value="CIÊNCIA DA COMPUTAÇÂO">Ciência da Computação</option>
                <option value="ENGENHARIA AMBIENTAL E SANITÁRIA">Engenharia Ambiental e Sanitária</option>
                <option value="ENGENHARIA MECÂNICA">Engenharia Mecânica</option>
                <option value="ENGENHARIA DE CONTROLE E AUTOMAÇÂO">Engenharia de Controle e Automação</option>
                <option value="MATEMÁTICA">Matemática</option>
                <option value="QUÍMICA">Química</option>
                <option value="MANUTENÇÂO INDUSTRIAL">Manutenção Industrial</option>
              </Form.Select>
            </Form.Group>

            <Form.Group>
              <Form.Label>Disciplina</Form.Label>
              <Form.Control type="text" ref={disciplineRef} aria-label="Default select example" />
            </Form.Group>

            <Form.Group>
              <Form.Label>Semestre</Form.Label>
              <Form.Control type="text" ref={semesterRef} aria-label="Default select example" />
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
  )
}