import { addDoc, collection, deleteDoc, DocumentReference, query, QueryConstraint, updateDoc, where } from "firebase/firestore"
import { useCollectionData, useCollectionDataOnce } from "react-firebase-hooks/firestore";
import { db } from "../firebase/config";
import User from "./interfaces/User";

let queryConstraints: QueryConstraint[] = []
const usersCollection = collection(db, "users");
const usersQuery = query(usersCollection, ...queryConstraints);
const usersCollectionQuery = (queryConstraints: Array<QueryConstraint>) => query(usersCollection, ...queryConstraints);

const getUsers = () => useCollectionData(usersCollectionQuery(queryConstraints));
const addUser = (user: User) => addDoc(usersCollection, user);

const getUserByUid = (uid: string) => {
  const queryConstraints : any = [];
  queryConstraints.push(where("uid", "==", uid));
  const [users, , , ] = useCollectionDataOnce(usersCollectionQuery(queryConstraints));

  return users ? users : []; 
}

const updateUserByDocRef = (userDocRef: DocumentReference<User>, userData: User) => updateDoc(userDocRef, userData);
const deleteUserByDocRef = (userDocRef: DocumentReference<User>) => deleteDoc(userDocRef);
export {
  addUser,
  getUsers,
  getUserByUid,
  updateUserByDocRef,
  deleteUserByDocRef
}