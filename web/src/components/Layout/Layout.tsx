
import { User, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { Outlet } from "react-router";
import { AuthContext, useAuthValue } from "../../contexts/AuthContext";
import { auth } from "../../firebase/config";
import Header from "../Header/Header";

export default function Layout() {
  const [currenUtser, setCurrentUser] = useState<User | null | undefined>(null)

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setCurrentUser(user)
      console.log("Auth state changed", user)
     })
  }, [])
  
  return (
    <AuthContext.Provider value={currenUtser}>
      <Header />
      <Outlet />
    </AuthContext.Provider>
  )
}