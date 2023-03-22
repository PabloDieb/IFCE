import { Fragment } from 'react';
import { Button, Table } from 'react-bootstrap';
import { DocumentData } from 'firebase/firestore';
import { FullScreenHandle } from "react-full-screen";
import "./ClassroomsScheduleDisplay.css";

export default function ClassroomsScheduleDisplay({bookings}: any) {
  console.log("AAAAAAAAAAAAA")
  return(
    <Table bordered>
      <thead>
        {/* <tr id="rowTitle">
          <th colSpan={5}>{new Date(Date.now()).toLocaleDateString()}   <Button onClick={handle.enter}>FS</Button></th>
        </tr> */}
        <tr>
          <th>Salas/Horários</th>
          <th style={{flex:1}}>08:00 ~ 09:40</th>
          <th style={{flex:1}}>10:00 ~ 12:00</th>
          <th style={{flex:1}}>13:20 ~ 15:00</th>
          <th style={{flex:1}}>15:20 ~ 18:00</th>
        </tr>
      </thead>
      <tbody>
        {
          bookings?.map( (booking: any, index: number) => {
            return (
              <Fragment key={index}>
                <tr>
                  <td>{booking.classroomName.toUpperCase()}</td>
                  <td>{booking.abMorning ? booking.classroomName + " | " + booking.abMorning.class : "-"}</td>
                  <td>{booking.cdMorning ? booking.classroomName + " | " + booking.cdMorning.class : "-"}</td>
                  <td>{booking.abAfternoon ? booking.classroomName + " | " + booking.abAfternoon.class : "-"}</td>
                  <td>{booking.cdAfternoon ? booking.classroomName + " | " + booking.cdAfternoon.class : "-"}</td>
                </tr>
              </Fragment>
            )
          })
        }
      </tbody>
    </Table>
  )
}