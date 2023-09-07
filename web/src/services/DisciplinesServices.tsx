import { addDoc, collection, query } from "firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { db } from "../firebase/config";
import Discipline from "./interfaces/Discipline";

const queryConstraints : any = [];
const disciplinesCollection = collection(db, "disciplines");
const disciplinesCollectionQuery = query(disciplinesCollection, ...queryConstraints);
// queryConstraints.push(where("professorUserId", "==", user[0]?.uid));
const getDisciplines = () => useCollectionData(disciplinesCollectionQuery);
const addDiscipline = (discipline: Discipline) => addDoc(disciplinesCollection, discipline)
export {
  getDisciplines,
  addDiscipline as addCourse
}