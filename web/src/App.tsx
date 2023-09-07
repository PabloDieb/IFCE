import { User, onAuthStateChanged } from 'firebase/auth';
import { useState, useEffect } from 'react';
import { RouterProvider } from 'react-router-dom'
import { auth } from './firebase/config';
import Router from './Router';
import { useUserClaimsStore } from './stores/UserClaimsStore';

export default function App() {
  const [currenUtser, setCurrentUser] = useState<User | null | undefined>(null)
  const [claims, setClaims] = useState<object>();
  const set = useUserClaimsStore(state => state.updateUserClaims);
  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      await user?.getIdTokenResult()
      .then((result) => result.claims)
      .then((claims) => { 
        const userClaims = {admin: claims.admin ? true : false, professor: claims.professor ? true : false};
        set(userClaims);
        console.log(currenUtser, "claims");
      });
     });
  }, []);
  return (
    <RouterProvider router={Router} />
  )
}