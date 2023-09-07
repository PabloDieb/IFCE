import { useAuthState } from "react-firebase-hooks/auth";
import { Navigate, Outlet } from "react-router-dom";
import { auth } from "../../firebase/config";

export default function ProtectedRoute() {
  const [currentUser] = useAuthState(auth)
  if (!currentUser) {
    console.log("DOKDOWK", currentUser)
    return <Navigate to="/" replace />;
  }

  return (
    <Outlet />
  );
};