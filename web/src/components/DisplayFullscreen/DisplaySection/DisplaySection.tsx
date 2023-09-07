import { Stack } from "react-bootstrap";
import DisplaySectionRow from "./DisplaySectionRow/DisplaySectionRow";

export default function  DisplaySection({bookings, classTimespan} : any) {
  console.log(bookings, classTimespan)
  const filterByTimespanName = (bookings: Array<any>,name: string) => {
    return bookings?.filter(booking => booking[name])
  }
  let bookingsFiltered = filterByTimespanName(bookings, classTimespan.timespanName);
  return (
    <>
      <h1 style={{display: "flex", fontSize: "4rem"}} className="justify-content-md-center align-items-center">
        <strong>
          {classTimespan.timespan}
        </strong>
      </h1>
      <hr />
      <Stack gap={1}>
        {bookingsFiltered?.map(booking => (
          <>
          <DisplaySectionRow booking={booking} classTimespan={classTimespan} />
          <hr />
          </>
        ))}
      </Stack>
    </>
  )
}