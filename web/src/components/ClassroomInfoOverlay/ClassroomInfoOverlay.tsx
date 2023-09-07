import { ListGroup, OverlayTrigger, Popover, Tooltip } from "react-bootstrap";
import { InfoCircleFill } from "react-bootstrap-icons";
import Cards from "../../pages/BookingSwapsManagementPage/SwapSolicitationDetailModal/Cards";
import { getClassroomByName } from "../../services/ClassroomService";
interface props {
  classroomName: string;
}
export default function ClassroomInfoOverlay({classroomName}: props) {
  const [classrooms, loading] = getClassroomByName(classroomName);
  if(!loading && classrooms!.length) {
    const popover = (
      <Popover id="popover-basic">
        <Popover.Header as="h3">{classrooms![0].name}</Popover.Header>
        <Popover.Body>
        <ListGroup className="list-group-flush">
          <ListGroup.Item>Bloco: {classrooms![0].building}</ListGroup.Item>
          <ListGroup.Item>Condição: {classrooms![0].status}</ListGroup.Item>
          <ListGroup.Item>Capacidade Máxima: {classrooms![0].maximumCapacity}</ListGroup.Item>
          <ListGroup.Item>Possui Projetor: {classrooms![0].hasProjector ? "Sim" : "Não"}</ListGroup.Item>
          <ListGroup.Item>Observações: {classrooms![0].observations}</ListGroup.Item>
        </ListGroup>
        </Popover.Body>
      </Popover>
    );

    return (
      <OverlayTrigger placement="right" overlay={popover}>
        <InfoCircleFill size="1.3rem" style={{marginBottom: "4px"}}/>
      </OverlayTrigger>
  
    )
  }
    return null;
  
}