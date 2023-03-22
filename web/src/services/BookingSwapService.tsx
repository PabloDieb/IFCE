import { addDoc, collection, query, QueryConstraint, updateDoc, where } from "firebase/firestore"
import { useCollectionData } from "react-firebase-hooks/firestore";
import { useAuthValue } from "../contexts/AuthContext";
import { db } from "../firebase/config";
import { updateBooking } from "./BookingsService";

const bookingSwapCollection = collection(db, "bookingSwap");
const bookingSwapCollectionQuery = (queryConstraints: Array<QueryConstraint>) => query(bookingSwapCollection, ...queryConstraints);

const addBookingSwapSolicitation = (data: any) => addDoc(bookingSwapCollection, data);

const getOpenSwapsToMe = (professorEmail: string) => {
  console.log(professorEmail);
  const queryConstraints : any = [];
  queryConstraints.push(where("professorEmailRequested", "==", professorEmail));
  return useCollectionData(bookingSwapCollectionQuery(queryConstraints));
}

const getOpenSwapsFromMe = (professorEmail: string | null) => {
  const queryConstraints : any = [];
  queryConstraints.push(where("professorEmailRequester", "==", professorEmail));
  return useCollectionData(bookingSwapCollectionQuery(queryConstraints));
}

const updateBookingSwapStatus = (swapRef: any, accepted: boolean) => {
  const data = {
    ...swapRef.data(),
    accepted,
    waiting: false
  }
  console.log(swapRef.data());
  updateDoc(swapRef.ref, data);
}

const makeBookingSwap = (swapRef: any, bookingRequestedRef: any, bookingRequesterRef: any) => {
  let timespan = swapRef.data().timespan;
  let a = bookingRequestedRef.data()[timespan];
  let b = bookingRequesterRef.data()[timespan];
  let dataBookingRequestedRef = {[timespan]: {...b}};
  let dataBookingRequesterRef = {[timespan]: {...a}};
  console.log(bookingRequesterRef.id,dataBookingRequesterRef, b,dataBookingRequestedRef)
  updateBooking(bookingRequestedRef.ref, dataBookingRequestedRef);
  updateBooking(bookingRequesterRef.ref, dataBookingRequesterRef);
  updateBookingSwapStatus(swapRef, true);
}

const checkCurrentSwaps = (swapForMeSnapshot: any): boolean => {
  if(swapForMeSnapshot == null) return false;

  const openBookingSwapsForMe = swapForMeSnapshot?.docs.filter(bookingSwap => bookingSwap?.data().waiting);

  return openBookingSwapsForMe.length > 0 ? true : false;
}

export {
  addBookingSwapSolicitation,
  getOpenSwapsToMe,
  getOpenSwapsFromMe,
  updateBookingSwapStatus,
  makeBookingSwap,
  checkCurrentSwaps
}