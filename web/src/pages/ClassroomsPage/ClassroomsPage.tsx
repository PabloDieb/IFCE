import { collection, deleteDoc, doc, DocumentData, QueryDocumentSnapshot } from "firebase/firestore";
import { useEffect } from "react";
import { Container, Row, Col, Table, Button, Spinner } from "react-bootstrap";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { db } from "../../firebase/config";
import Classroom from "../../services/interfaces/Classroom";
import AddButton from "./AddButton/AddButton";
import ClassroomForm from "./ClassroomForm/ClassroomForm";
import ClassroomOffcanvas from "./ClassrooomOffcanvas/ClassrooomOffcanvas";
import EditButton from "./EditButton/EditButton";

export default function ClassroomsPage(){
  const classroomsCollection = collection(db, 'classrooms');
  const [ classrooms, error, loading, snapshot ] = useCollectionData(classroomsCollection);

  const deleteClassroom = async (classroomId: any) => {
    deleteDoc(doc(db, "classrooms", classroomId));
  }

  return (
    <Container>
      <Row>
        <Col>
          <h1>Salas de aula</h1>
        </Col>
      </Row>
      <Row>
        <Col>
          <AddButton />
        </Col>
      </Row>

      <Row>
        <Col>
          <Table responsive striped bordered hover id="tableX">
            <thead>
              <tr>
                <th>Bloco</th>
                <th>Sala</th>
                <th>Status</th>
                <th>Capacidade Máxima</th>
                <th>Possui Projetor</th>
                <th>Observações</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {loading && <Spinner animation="border" />}
              { 
                !loading && snapshot && snapshot.docs.map((classroom: any, index: number) => 
                  <tr key={index}>
                    <td>{classroom.data().building}</td>
                    <td>{classroom.data().name}</td>
                    <td>{classroom.data().status}</td>
                    <td>{classroom.data().maximumCapacity}</td>
                    <td>{classroom.data().hasProjector ? "Sim" : "Não"}</td>
                    <td>{classroom.data().observations}</td>
                    <td style={{display: "flex", justifyContent: "center", gap: "2vw"}}>
                      <EditButton classroom={classroom.data()} classroomId={classroom.id} />
                      <Button variant="danger" onClick={() => deleteClassroom(classroom.id)}>Deletar</Button>
                    </td>
                  </tr>
                )
              }
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  )
}