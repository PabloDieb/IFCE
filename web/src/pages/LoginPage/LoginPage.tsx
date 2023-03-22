import { Container } from "react-bootstrap";
import Login from "./Login/Login";

export default function LoginPage(){
  return (
    <Container style={{display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", width: "100%", height: "80%"}}>
      <Login />
    </Container>
  )
}