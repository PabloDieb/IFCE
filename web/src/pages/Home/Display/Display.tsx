import { Table } from "react-bootstrap";
import { getCurrentTimespan } from "../../../utils/functions";

export default function Display({bookings}: any) {
  const timespan = getCurrentTimespan();
  console.log(timespan, bookings);
  return (
    <Table responsive="sm">
      <thead>
        <tr>
          <th>Sala</th>
          <th>Aula</th>
        </tr>
      </thead>
      <tbody>
      {bookings && bookings.map((booking: any, index: number) => 
        booking[timespan] ? 
        <tr key={index}>
          <td>{booking.classroomName}</td>
          <td>{booking[timespan].course}</td>
        </tr> : null
      )}
      </tbody>
    </Table>
  )
}