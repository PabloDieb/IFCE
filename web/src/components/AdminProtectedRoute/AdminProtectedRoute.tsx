import { useAuthState } from "react-firebase-hooks/auth";
import { Navigate, Outlet } from "react-router-dom";
import { auth } from "../../firebase/config";
import { useUserClaimsStore } from "../../stores/UserClaimsStore";

export default function AdminProtectedRoute() {
  const [user] = useAuthState(auth);
  const userClaims = useUserClaimsStore(state => state.claims);
  return !user && !userClaims.admin ? <Navigate to="/" replace /> : <Outlet />;
};