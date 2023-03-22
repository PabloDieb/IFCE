import { collection, deleteDoc, doc } from "firebase/firestore";
import { useEffect } from "react";
import { Container, Row, Col, Table, Button } from "react-bootstrap";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { db } from "../../firebase/config";
import AddClassroom from "./AddClassroom/AddClassroom";
import EditClassroom from "./EditClassroom/EditClassroom";

export default function ClassroomsPage(){
  const classroomsCollection = collection(db, 'classrooms');
  const [ classrooms, error, loading, snapshot] = useCollectionData(classroomsCollection);
  useEffect(() => {
    // pag();
    console.log(classrooms)
  }, [classrooms]);

  const deleteClassroom = async (classroomId: any) => {
    deleteDoc(doc(db, "classrooms", classroomId));
  }

  return (
    <Container id="containerClassroomsTableManagement">
      <Row>
        <AddClassroom />
      </Row>

      <Row>
        <Col>
          <Table striped bordered hover id="tableX">
            <thead>
              <tr>
                <th>Bloco</th>
                <th>Sala</th>
                <th>Status</th>
                <th>Capacidade Máxima</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              { 
                snapshot && snapshot.docs.map( (classroom, index) => 
                  <tr key={index}>
                    <td>{classroom.data().building}</td>
                    <td>{classroom.data().name}</td>
                    <td>{classroom.data().status}</td>
                    <td>{classroom.data().maximumCapacity}</td>
                    <td>
                      <EditClassroom classroom={classroom.data()} classroomId={classroom.id} />
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