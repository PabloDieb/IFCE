import { Container } from "react-bootstrap";
import SignUp from "./SignUp/SignUp";

export default function LoginPage(){
  return (
    <Container style={{display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", width: "100%", height: "80%"}}>
      <SignUp />
    </Container>
  )
}