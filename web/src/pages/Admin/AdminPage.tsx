import { Container, Row, Col } from "react-bootstrap";
import AddButton from "../ClassroomsPage/AddButton/AddButton";

export default function AdminPage() {
  
  return (
    <Container>
      <Row>
        <Col>
          <h1>Área do Administrador</h1>
        </Col>
      </Row>
      <Row>
        <Col>
          <AddButton />
        </Col>
      </Row>
    </Container>
  );
}