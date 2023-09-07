import { Dispatch, SetStateAction, useState } from "react";
import { Toast, ToastContainer } from "react-bootstrap";

type ToastProps = {
  message: string;
  type: "primary" | "secondary" | "success" | "warning" | "danger";
  showToast: boolean;
  setShowToast: Dispatch<SetStateAction<boolean>>;
}

function ToastComponent({message, type, showToast, setShowToast}: ToastProps){
  
  return(
    <ToastContainer className="p-3" position="bottom-center">
      <Toast onClose={() => setShowToast(false)} show={showToast} delay={2500} bg={type} autohide>
        <Toast.Header closeButton={false}>
          <strong className="me-auto">Aviso</strong>
        </Toast.Header>
        <Toast.Body><strong className="me-auto">{message}</strong></Toast.Body>
      </Toast>
    </ToastContainer>
  )
}

export {
  ToastComponent as Toast
}