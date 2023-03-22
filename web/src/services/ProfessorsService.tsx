import { addDoc, collection } from "firebase/firestore"
import { db } from "../firebase/config";

const professorsCollection = collection(db, "professors");

async function addProfessor(professor: any) {
  await addDoc(professorsCollection, professor);
}

export {
  addProfessor
}