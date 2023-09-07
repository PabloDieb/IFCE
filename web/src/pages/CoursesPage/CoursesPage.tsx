import { collection, deleteDoc, DocumentReference, query, where } from "firebase/firestore";
import { Button, Col, Container, Form, InputGroup, Row, Table } from "react-bootstrap";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { db } from "../../firebase/config";
import AddDiscipline from "./AddDiscipline/AddDiscipline";
import EditDiscipline from "./EditDiscipline/EditDiscipline";
import "./CoursesPage.css";
import { useRef, useState } from "react";

export default function DisciplinesPage() {
  const searchRef = useRef<HTMLInputElement>(null);
  const [disciplines, loading, error, snapshot] = useCollectionData(query(collection(db, "disciplines")));
  const [courseToSearch, setCourseToSearch] = useState("");
  const [shouldSearch, setShouldSearch] = useState(false);
  const handleDeleteButton = async (courseRef: DocumentReference) => deleteDoc(courseRef);
  const handleSearchClick = () => {
    setShouldSearch(true);
    console.log(searchRef!.current!.value)
    setCourseToSearch(searchRef!.current!.value.toUpperCase());
  }

  const handleClearClick = () => {
    setShouldSearch(false);
    setCourseToSearch("");
    searchRef!.current!.value = "";
  }

  const renderSingle = () => {
    const disciplines = snapshot?.docs.filter(element => element.data().name.includes(courseToSearch))[0];

    return disciplines ? <tr>
          <td>{disciplines.data().name}</td>
          <td style={{display: "flex", justifyContent: "center", gap: "2vw"}}>
            <EditDiscipline discipline={disciplines} />
            <Button variant="danger" onClick={async () => await handleDeleteButton(disciplines.ref)}>Excluir</Button>
          </td>
        </tr> : null;
  };

  return (
    <>
      {!loading && 
        <Container>
          <Row className="coursesRow">
            <Col xl={{ span: 7, offset: 3 }} xll={{ span: 6, offset: 3 }}>
              <h1>Disciplinas</h1>
            </Col>
          </Row>

          <Row className="coursesRow">
            <Col md={{ span: 6}} xl={{ span: 2, offset: 3 }} xll={{ span: 2, offset: 3 }}>
              <AddDiscipline />
            </Col>
            <Col md={{ span: 6}} xl={{ span: 4}} xll={{ span: 4}}>
              <InputGroup >
                <Form.Control
                  placeholder="Nome da disciplina"
                  aria-label="Discipline name"
                  aria-describedby="basic-addon2"
                  ref={searchRef}
                />
                <Button variant="outline-primary" id="button-addon1" style={{borderRight: "1px solid"}} onClick={() => handleSearchClick()}>
                  Pesquisar
                </Button>
                <Button variant="outline-primary" id="button-addon2" onClick={() => handleClearClick()}>
                  Limpar
                </Button>
              </InputGroup>
            </Col>
          </Row>

          <Row className="coursesRow">
            <Col xl={{ span: 6, offset: 3 }} xll={{ span: 6, offset: 3 }}>
              <Table bordered hover>
                <thead>
                  <tr>
                    <th>Curso</th>
                    <th>Disciplina</th>
                    <th>Semestre</th>
                    <th>Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    shouldSearch ? renderSingle() : snapshot?.docs?.map((discipline, index) => 
                    {
                      return <tr key={index}>
                          <td>{discipline.data().courseName}</td>
                          <td>{discipline.data().discipline}</td>
                          <td>{discipline.data().semester}</td>
                          <td style={{display: "flex", justifyContent: "center", gap: "2vw"}}>
                            <EditDiscipline discipline={discipline} />
                            <Button variant="danger" onClick={async () => await handleDeleteButton(discipline.ref)}>Excluir</Button>
                          </td>
                        </tr>;
                    }
                    )
                  }
                </tbody>
              </Table>
            </Col>
          </Row>
        </Container>
      }
    </>
  )
}