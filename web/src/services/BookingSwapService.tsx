import { addDoc, collection, DocumentData, DocumentReference, DocumentSnapshot, query, QueryConstraint, updateDoc, where } from "firebase/firestore"
import { useCollectionData } from "react-firebase-hooks/firestore";
import { db } from "../firebase/config";
import { updateBooking, updateBookingWithRef } from "./BookingsService";
import Booking, { ClassroomBookingData } from "./interfaces/Booking";
import BookingSwap from "./interfaces/BookingSwap";

const bookingSwapCollection = collection(db, "bookingSwap");
const bookingSwapCollectionQuery = (queryConstraints: Array<QueryConstraint>) => query(bookingSwapCollection, ...queryConstraints);

const addBookingSwapSolicitation = (booking: BookingSwap) => addDoc(bookingSwapCollection, booking);

const getOpenSwapsToMe = (professorEmail: string) => {
  console.log(professorEmail);
  const queryConstraints: QueryConstraint[] = [];
  queryConstraints.push(where("professorEmailRequested", "==", professorEmail));
  return useCollectionData(bookingSwapCollectionQuery(queryConstraints));
}

const getOpenSwapsFromMe = (professorEmail: string) => {
  const queryConstraints: QueryConstraint[] = [];
  queryConstraints.push(where("professorEmailRequester", "==", professorEmail));
  return useCollectionData(bookingSwapCollectionQuery(queryConstraints)) ;
}

const getNotificationsByUser = (professorEmail: string) => {
  const queryConstraints: QueryConstraint[] = [];
  const queryConstraints2: QueryConstraint[] = [];
  // queryConstraints.push(where("professorEmailRequester", "==", professorEmail));
  // queryConstraints.push(where("waiting", "==", true));
  // var a = useCollectionData(bookingSwapCollectionQuery(queryConstraints));
  queryConstraints2.push(where("professorEmailRequested", "==", professorEmail));
  queryConstraints2.push(where("waiting", "==", true));
  var b = useCollectionData(bookingSwapCollectionQuery(queryConstraints2));
  if( b[0]?.length){
    return b[0]!.length;
  }
  return 0;
}

const updateBookingSwapStatus = (swapDocument: DocumentData, accepted: boolean) => {
  const bookingSwap: BookingSwap = {
    ...swapDocument.data(),
    accepted,
    waiting: false
  }

  updateDoc(swapDocument.ref, bookingSwap);
}

const makeBookingSwap = (swapDocument: DocumentData, bookingRequestedRef: DocumentSnapshot, bookingRequesterRef: DocumentSnapshot) => {
  let timespan: string = swapDocument.data().timespan;
  let bookingRequestedData: ClassroomBookingData = bookingRequestedRef.data()![timespan];
  let bookingRequesterData: ClassroomBookingData = bookingRequesterRef.data()![timespan];
  
  let dataBookingRequesterRef = {[timespan]: {...bookingRequestedData}};
  let dataBookingRequestedRef = {[timespan]: {...bookingRequesterData}};
  console.log(bookingRequestedRef.id, bookingRequesterRef.id )
  updateBookingSwapStatus(swapDocument, true);
  updateBookingWithRef(bookingRequestedRef.ref, dataBookingRequestedRef);
  updateBookingWithRef(bookingRequesterRef.ref, dataBookingRequesterRef);
}

const checkCurrentSwaps = (swapForMeSnapshot: any): boolean => {
  if(swapForMeSnapshot == null) return false;

  const openBookingSwapsForMe = swapForMeSnapshot?.docs.filter((bookingSwap: any) => bookingSwap?.data().waiting);

  return openBookingSwapsForMe.length > 0 ? true : false;
}

export {
  addBookingSwapSolicitation,
  getOpenSwapsToMe,
  getNotificationsByUser,
  getOpenSwapsFromMe,
  updateBookingSwapStatus,
  makeBookingSwap,
  checkCurrentSwaps
}