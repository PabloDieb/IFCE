import { Card, ListGroup } from "react-bootstrap";
import { getClassroomByName } from "../../../services/ClassroomService";

export default function Cards({classroomName}: any) {
  const [classrooms, loading] = getClassroomByName(classroomName);
  console.log(classroomName, classrooms)
  return(
  <>
    {!loading ? 
      <Card style={{ width: '18rem' }}>
      <Card.Header>{classrooms ? classrooms[0].name : ""}</Card.Header>
      <ListGroup className="list-group-flush">
        <ListGroup.Item>Bloco: {classrooms ? classrooms[0].building : ""}</ListGroup.Item>
        <ListGroup.Item>Condição: {classrooms ? classrooms[0].status : ""}</ListGroup.Item>
        <ListGroup.Item>Capacidade Máxima: {classrooms ?classrooms[0].maximumCapacity : ""}</ListGroup.Item>
        <ListGroup.Item>Observações: {classrooms ?classrooms[0].observations : ""}</ListGroup.Item>
      </ListGroup>
    </Card> : null
    }
  </>
  )
}