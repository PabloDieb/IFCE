import { useState } from "react";
import { Toast, ToastContainer } from "react-bootstrap";
import { Navigate, Outlet } from "react-router-dom";
import { useAuthValue } from "../../contexts/AuthContext";
import { checkCurrentSwaps, getOpenSwapsToMe } from "../../services/BookingSwapService";
import SignedInHeader from "../Header/SignedInHeader/SignedInHeader";

export default function ProtectedRoute() {
  const currentUser = useAuthValue()
  if (!currentUser) {
    console.log("DOKDOWK", currentUser)
    return <Navigate to="/" replace />;
  }

  return (
    <Outlet />
  );
};