import { User, onAuthStateChanged } from 'firebase/auth';
import { useState, useEffect } from 'react';
import { RouterProvider } from 'react-router-dom'
import { AuthContext } from './contexts/AuthContext';
import { auth } from './firebase/config';
import Router from './Router';

export default function App() {
  const [currenUtser, setCurrentUser] = useState<User | null | undefined>(null)

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setCurrentUser(user)
     })
  }, [])
  return (
    <AuthContext.Provider value={currenUtser}>
      <RouterProvider router={Router} />
    </AuthContext.Provider>
  )
}