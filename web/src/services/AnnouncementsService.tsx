import { query, collection, addDoc, where, QueryConstraint, Timestamp } from "firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { db } from "../firebase/config";
import moment from "moment";
import Announcement from "./interfaces/Announcement";

const dayStart = moment().set({"hours": 0, "minutes": 0, "seconds": 5}).toDate();
const currentTime = moment().toDate();
const dayEnd = moment().set({"hours": 23, "minutes": 59, "seconds": 59}).toDate();

const announcementsCollection = collection(db, 'announcements');
const announcementsCollectionQuery = (queryConstraints: Array<QueryConstraint>) => query(announcementsCollection, ...queryConstraints);

function getCurrentAnnouncements() {
  const queryConstraints : any = [];
  queryConstraints.push(where("expirationDate", ">=", Timestamp.fromDate(dayStart)));
  queryConstraints.push(where("expirationDate", ">=", Timestamp.fromDate(currentTime)));
  queryConstraints.push(where("expirationDate", "<=", Timestamp.fromDate(dayEnd)));
  return useCollectionData(announcementsCollectionQuery(queryConstraints));
}

async function addAnnouncementAsync(announcement: Announcement) {
  await addDoc(announcementsCollection, announcement);
} 

export {
  getCurrentAnnouncements,
  addAnnouncementAsync
}