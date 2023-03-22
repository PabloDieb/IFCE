import { collection, doc, getDoc, query, QueryConstraint, where } from "firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { db } from "../firebase/config";


const queryConstraints : any = [];
// console.log(dayStart, dayEnd);
const classroomsCollection = collection(db, 'classrooms');
const classroomsCollectionQuery = (queryConstraints: Array<QueryConstraint>) => query(classroomsCollection, ...queryConstraints);

const getClassroomByIdAsync = async (classroomId: string) => await getDoc(doc(db, "bookings", classroomId));

const getClassroomByName = (classroomName: string) => {
  const queryConstraints : any = [];
  queryConstraints.push(where("name", "==", classroomName));
  return useCollectionData(classroomsCollectionQuery(queryConstraints),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    });
}

export {
  getClassroomByIdAsync,
  getClassroomByName
}