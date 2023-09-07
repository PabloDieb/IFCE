import { useAuthState } from "react-firebase-hooks/auth";
import { Navigate, Outlet } from "react-router-dom";
import { auth } from "../../firebase/config";
import { useUserClaimsStore } from "../../stores/UserClaimsStore";

export default function ProfessorProtectedRoute() {
  const [user] = useAuthState(auth);
  const userClaims = useUserClaimsStore(state => state.claims);

  return !user && !userClaims.professor ? <Navigate to="/" replace /> : <Outlet />;
};