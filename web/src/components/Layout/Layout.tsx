
import { Toast, ToastContainer } from "react-bootstrap";
import { Outlet } from "react-router";
import { useToastStore } from "../../stores/ToastProviderStore";
import Header from "../Header/Header";

export default function Layout() {
  const toast = useToastStore(state => state.toast);
  const showToast = useToastStore(state => state.showToast);
  return (
    <>
      <Header />
      {toast.showToast &&
        <ToastContainer position="bottom-start" className="p-3">
          <Toast bg={toast.variation}>
            <Toast.Header>
              <strong className="me-auto">{toast.headerText}</strong>
            </Toast.Header>
            <Toast.Body>{toast.bodyText}</Toast.Body>
          </Toast>
        </ToastContainer>}
      {toast.showToast && setTimeout(() => showToast({showToast: false}), 3000)}
      <Outlet />
    </>
  )
}