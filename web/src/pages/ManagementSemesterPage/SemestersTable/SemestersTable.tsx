import { Timestamp } from "firebase/firestore";
import React from "react";
import { Container, Row, Col, Table, Button } from "react-bootstrap";
import AddSemester from "../AddSemester/AddSemester";
import EditClassroom from "../../../components/EditClassroom/EditClassroom";
import ScheduleRegistrationTable from "../ScheduleRegistrationTable/ScheduleRegistrationTable";

export default function SemesterTable(props: any){
  const formatDate = (date: Date) => date.toLocaleDateString("pt-BR");
  const handleClick = (startDate, endDate) => {
    props.setSemester({
      startDate: startDate,
      endDate: endDate
    });
    props.showTable(true)
  }
  return(
    <Container>
      <Row>
        <Col>
          <AddSemester />
        </Col>
      </Row>

      <Row style={{position: "absolute"}}>
        <Col>
          <Table striped bordered hover id="tableX">
            <thead>
              <tr style={{display: 'flex', flexDirection: 'row'}}>
                <th>Nome</th>
                <th>Período</th>
                <th>Ativo</th>
                <th>Horários</th>
              </tr>
            </thead>
            <tbody>
              { 
                props.snapshot && props.snapshot.docs.map( (semester, index) => 
                  <tr key={index}>
                    <td>{semester.data().name}</td>
                    <td>{formatDate(semester.data().startDate.toDate()) + " ~ " + formatDate(semester.data().endDate.toDate())}</td>
                    <td>{semester.data().active.toString()}</td>
                    <td>
                      <Button onClick={() => handleClick(semester.data().startDate, semester.data().endDate)}></Button>
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