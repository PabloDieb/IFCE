import { addDoc, collection, query, QueryConstraint, where } from "firebase/firestore"
import { useCollectionDataOnce } from "react-firebase-hooks/firestore";
import { db } from "../firebase/config";

const professorsCollection = collection(db, "users");
const usersCollection = collection(db, "users");
const usersCollectionQuery = (queryConstraints: Array<QueryConstraint>) => query(usersCollection, ...queryConstraints);

const addUser = (user: any) => addDoc(professorsCollection, user);
const getUserByUid = (uid: string) => {
  const queryConstraints : any = [];
  queryConstraints.push(where("uid", "==", uid));
  const [users, , , ] = useCollectionDataOnce(usersCollectionQuery(queryConstraints));

  return users ? users : []; 
}

export {
  addUser,
  getUserByUid
}