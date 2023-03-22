import { updateDoc, doc, collection, addDoc } from "firebase/firestore";
import React, { Fragment, useRef, useState } from "react";
import { Modal, Button, Form, Table } from "react-bootstrap";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { db } from "../../../firebase/config";
import AddBooking from "../../../components/AddBooking/AddBooking";
import SemesterTable from "../SemestersTable/SemestersTable";

export default function ScheduleRegistrationTable(props: any) {
  const classroomRef = useRef<any>();
  const [show, setShow] = useState(false);
  const [values, setValues] = useState({});
  const [classrooms, loading, error, classroomSnapshot] = useCollectionData(collection(db, "classrooms"));
  const [professors] = useCollectionData(collection(db, "users"));
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  console.log(props.semester)
  const updateClassroom = async (values) => {
    await updateDoc(doc(db, "classrooms", props.classroomId), values);
  }

  const onFormChange = (e: any): void => {
    const name = e.target.name;
    const value = e.target.value;
    setValues({ ...values, [name]: value });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    event.persist();
    console.log("dawad", values);
    updateClassroom(values);
  };

  const saveSchedule = async (day: string) => {
    await addDoc(collection(db, "bookings"), {day});
  };
  return(
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="building">Prédio</Form.Label>
              <Form.Select
                ref={classroomRef}
                name="classroom"
                id="classroom"
                >
                <option>Selecione uma opção</option>
                {classroomSnapshot?.docs?.map( (classroom, index) => (
                  <option key={index} value={classroom.data().name+";"+classroom.id}>{classroom.data().name}</option>
                  ))}
              </Form.Select>
            </Form.Group>
          </th>
        </tr>
        <tr>
          <th style={{flex:1}}>Horário/Dia</th>
          <th style={{flex:1}}>Segunda</th>
          <th style={{flex:1}}>Terça</th>
          <th style={{flex:1}}>Quarta</th>
          <th style={{flex:1}}>Quinta</th>
          <th style={{flex:1}}>Sexta</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th>AB - Manhã</th>
          <td><AddBooking classroom={classroomRef.current ? classroomRef.current.value : null} professors={professors} time={"abMorning"} semester={props.semester}/></td>
          <td><AddBooking classroom={classroomRef.current ? classroomRef.current.value : null} professors={professors} time={"abMorning"} semester={props.semester}/></td>
          <td><AddBooking classroom={classroomRef.current ? classroomRef.current.value : null} professors={professors} time={"abMorning"} semester={props.semester}/></td>
          <td><AddBooking classroom={classroomRef.current ? classroomRef.current.value : null} professors={professors} time={"abMorning"} semester={props.semester}/></td>
          <td><AddBooking classroom={classroomRef.current ? classroomRef.current.value : null} professors={professors} time={"abMorning"} semester={props.semester}/></td>
        </tr>
        <tr>
          <th>CD - Manhã</th>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <th>AB - Tarde</th>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <th>CD - Tarde</th>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        {/* {
          props.bookings.map( (booking, index) => {
            return (
              <Fragment key={index}>
                <tr>
                  <td>{booking.classroomName}</td>
                  <td>{booking.abMorning ? booking.professorName + " / " + booking.class : "-"}</td>
                  <td>{booking.cdMorning ? booking.professorName + " / " + booking.class : "-"}</td>
                  <td>{booking.abAfternoon ? booking.professorName + " / " + booking.class : "-"}</td>
                  <td>{booking.cdAfternoon ? booking.professorName + " / " + booking.class : "-"}</td>
                  <td>{booking.cdAfternoon ? booking.professorName + " / " + booking.class : "-"}</td>
                </tr>
              </Fragment>
            )
          })
        } */}
      </tbody>
  </Table>
  )
}