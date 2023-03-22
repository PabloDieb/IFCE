import { collection, query } from "firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { db } from "../firebase/config";

const queryConstraints : any = [];
const coursesCollection = collection(db, "classes");
const coursesCollectionQuery = query(coursesCollection, ...queryConstraints);
// queryConstraints.push(where("professorUserId", "==", user[0]?.uid));
const getClasses = () => useCollectionData(coursesCollectionQuery);

export {
  getClasses
}