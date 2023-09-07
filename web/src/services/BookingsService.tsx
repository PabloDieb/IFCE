import { addDoc, collection, CollectionReference, doc, DocumentData, DocumentReference, getDoc, query, QueryConstraint, updateDoc, where } from "firebase/firestore";
import moment from "moment";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { db } from "../firebase/config";
import Booking from "./interfaces/Booking";

const dayStart = moment().set({"hours": 0, "minutes": 0, "seconds": 5}).toDate();
const dayEnd = moment().set({"hours": 23, "minutes": 59, "seconds": 59}).toDate();
// const dayStart = moment().set({"month": 5,"day": 2, "hours": 0, "minutes": 0, "seconds": 5}).toDate();
// const dayEnd = moment().set({"month": 5,"day": 2,"hours": 23, "minutes": 59, "seconds": 59}).toDate();

// console.log(dayStart, dayEnd);
const bookingsCollection = collection(db, 'bookings') as CollectionReference<Booking>;
const getDocReferenceById = (bookingId: string) => doc<Booking>(bookingsCollection, "bookings", bookingId);
const bookingsCollectionQuery = (queryConstraints: Array<QueryConstraint>) => query(bookingsCollection, ...queryConstraints);

function getBookings() {
  console.log(dayStart, dayEnd);
  const queryConstraints: Array<QueryConstraint> = [];
  queryConstraints.push(where("date", ">=", dayStart));
  queryConstraints.push(where("date", "<=", dayEnd));
  // console.log(dayStart, dayEnd);
  return useCollectionData(bookingsCollectionQuery(queryConstraints),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    });

}  
async function addBookingAsync(booking: Booking) {
  // console.log("adding booking", booking)
  await addDoc(bookingsCollection, booking);
}

const updateBooking = (bookingDocId: string, booking: any,) =>
  updateDoc(getDocReferenceById(bookingDocId), booking);

  const updateBookingWithRef = (bookingRef: DocumentReference, booking: any,) =>
  updateDoc(bookingRef, booking);

const getBookingsByProfessorUid = (professorUid: string, hour: string) => {
  const queryConstraints : any = [];
  queryConstraints.push(where("date", ">=", dayStart));
  queryConstraints.push(where("date", "<=", dayEnd));
  queryConstraints.push(where(hour + ".professorId", "==", professorUid));
  return useCollectionData(bookingsCollectionQuery(queryConstraints));
}

const getBookingById = async (bookingDocId: string) => await getDoc(doc(db, "bookings", bookingDocId));

const getBookingsByTimeSpan = (timeSpan: string) => {
  const queryConstraints : any = [];
  queryConstraints.push(where("date", ">=", dayStart));
  queryConstraints.push(where("date", "<=", dayEnd));
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
  updateBookingWithRef,
  getBookings,
  getBookingsByDate,
  getBookingById,
  getBookingsByProfessorUid,
  getBookingsByTimeSpan
}