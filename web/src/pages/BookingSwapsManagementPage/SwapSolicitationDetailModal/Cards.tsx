import { Card, ListGroup } from "react-bootstrap";
import { getClassroomByName } from "../../../services/ClassroomService";

export default function Cards({classroomName}: any) {
  const [classrooms, loading] = getClassroomByName(classroomName);

  return(
  <>
    {!loading && classrooms?.length? 
      <Card style={{ width: '18rem' }}>
      <Card.Header style={{color:"black"}}>{classrooms![0].name}</Card.Header>
      <ListGroup className="list-group-flush">
        <ListGroup.Item>Bloco: {classrooms![0].building}</ListGroup.Item>
        <ListGroup.Item>Condição: {classrooms![0].status}</ListGroup.Item>
        <ListGroup.Item>Capacidade Máxima: {classrooms![0].maximumCapacity}</ListGroup.Item>
        <ListGroup.Item>Possui Projetor: {classrooms![0].hasProjector ? "Sim" : "Não"}</ListGroup.Item>
        <ListGroup.Item>Observações: {classrooms![0].observations}</ListGroup.Item>
      </ListGroup>
    </Card> : null
    }
  </>
  )
}