import { collection, deleteDoc, DocumentReference, query, where } from "firebase/firestore";
import { Button, Col, Container, Row, Table } from "react-bootstrap";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { db } from "../../firebase/config";
import AddCourse from "./AddCourse/AddCourse";
import EditCourse from "./EditCourse/EditCourse";

export default function CoursesPage() {

  const [courses, loading, error, snapshot] = useCollectionData(query(collection(db, "courses")));

  const handleDeleteButton = async (courseRef: DocumentReference) => deleteDoc(courseRef);
  
  return (
    <Container>
      <Row>
        <Col>
          <AddCourse />
        </Col>
      </Row>

      <Row style={{position: "absolute"}}>
        <Col>
          <Table striped bordered hover id="tableX">
            <thead>
              <tr>
                <th>Nome</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              { 
                snapshot?.docs?.map( (course, index) => 
                  {
                    return <tr key={index}>
                      <td>{course.data().name}</td>
                      <td>
                        <EditCourse course={course} />
                        <Button onClick={async () => await handleDeleteButton(course.ref)}>Excluir</Button>
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
  )
}