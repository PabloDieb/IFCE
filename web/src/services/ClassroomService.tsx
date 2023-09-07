import { addDoc, collection, CollectionReference, doc, DocumentData, getDoc, query, QueryConstraint, updateDoc, where } from "firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { db } from "../firebase/config";
import Classroom from "./interfaces/Classroom";

const classroomsCollectionReference = collection(db, 'classrooms') as CollectionReference<Classroom>;
const getDocRefereceById = (docId: string) => doc<Classroom>(classroomsCollectionReference, docId);
const classroomsCollectionQuery = (queryConstraints: Array<QueryConstraint>) => query(classroomsCollectionReference, ...queryConstraints);

const getClassroomByIdAsync = async (classroomId: string) => 
  await getDoc(doc(db, "classrooms", classroomId));

const getClassroomByName = (classroomName: string) => {
  const queryConstraints: any = [];
  queryConstraints.push(where("name", "==", classroomName));
  return useCollectionData(classroomsCollectionQuery(queryConstraints),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    });
}
const addClassroom = (classroom: Classroom) => 
  addDoc(classroomsCollectionReference, classroom);

const updateClassroom = (classroom: DocumentData, classroomId: string) => updateDoc(getDocRefereceById(classroomId), classroom);

export {
  getClassroomByIdAsync,
  getClassroomByName,
  addClassroom, 
  updateClassroom
}