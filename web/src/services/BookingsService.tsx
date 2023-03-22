import { addDoc, collection, doc, getDoc, query, QueryConstraint, updateDoc, where } from "firebase/firestore";
import moment from "moment";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { db } from "../firebase/config";

let dayStart = moment().add(1, "m").toDate();
let dayEnd = moment().add(23, "h").toDate();
const queryConstraints : any = [];
// console.log(dayStart, dayEnd);
const bookingsCollection = collection(db, 'bookings');
const bookingsCollectionQuery = (queryConstraints: Array<QueryConstraint>) => query(bookingsCollection, ...queryConstraints);

function getBookings() {
  console.log(dayStart, dayEnd);
  const queryConstraints : any = [];
  queryConstraints.push(where("date", ">=", dayStart));
  queryConstraints.push(where("date", "<=", dayEnd));
  return useCollectionData(bookingsCollectionQuery(queryConstraints),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    });

}  
async function addBookingAsync(booking: any) {
  // console.log("adding booking", booking)
  await addDoc(bookingsCollection, booking);
}

const updateBooking = async (bookingRef: any, data: any) => {
  console.log(bookingRef, data)
  await updateDoc(doc(db, "bookings", bookingRef.id), data);
}


const getBookingsByProfessorUid = (professorUid: string, hour: string) => {
  const queryConstraints : any = [];
  queryConstraints.push(where("date", ">=", dayStart));
  queryConstraints.push(where("date", "<=", dayEnd));
  queryConstraints.push(where(hour + ".professorId", "==", professorUid));
  return useCollectionData(bookingsCollectionQuery(queryConstraints));
}

const getBookingById = async (docId: string) => await getDoc(doc(db, "bookings", docId));

const getBookingsByTimeSpan = (timeSpan: string) => {
  const queryConstraints : any = [];
  queryConstraints.push(where("date", ">=", dayStart));
  queryConstraints.push(where("date", "<=", dayEnd));
  queryConstraints.push(where(hour + ".professorId", "==", professorUid));
  return useCollectionData(bookingsCollectionQuery(queryConstraints));
}

const getBookingsByDate = (date: Date) => {
  let dayStart = moment(date).set({hour: 0, minute: 0, second: 0}).toDate();
  let dayEnd = moment(date).set({hour: 23, minute: 59, second: 59}).toDate();
  const queryConstraints : any = [];
  queryConstraints.push(where("date", ">=", dayStart));
  queryConstraints.push(where("date", "<=", dayEnd));
  return useCollectionData(bookingsCollectionQuery(queryConstraints));
}

export {
  addBookingAsync,
  updateBooking,
  getBookings,
  getBookingsByDate,
  getBookingById,
  getBookingsByProfessorUid,
  getBookingsByTimeSpan
}