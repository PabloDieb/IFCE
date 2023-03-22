import { useRef } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { auth } from '../../../firebase/config';

export default function Login() {
  const navigate = useNavigate();
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [
    signInWithEmailAndPassword,
    userCredentials,
    loading, 
    error
  ] = useSignInWithEmailAndPassword(auth);

  const signIn = async (email: string, password: string): Promise<any> => {
    console.log(`login:${email}`, `password:${password}`);

    await signInWithEmailAndPassword(email, password);
    localStorage.setItem("isUserLoggedIn", userCredentials?.user.uid ? "y" : "n");
    navigate("/avisosl")
  } 

  return(
    <>
      <h2>Login</h2>
      <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control as="input" type="email" ref={emailRef} placeholder="Enter email" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Senha</Form.Label>
          <Form.Control type="password" ref={passwordRef} placeholder="Password" />
        </Form.Group>

        <Button variant="primary" onClick={() => signIn(emailRef !== null && emailRef.current !== null ? emailRef.current.value : "", passwordRef !== null && passwordRef.current !== null ? passwordRef.current.value : "")}>
          Submit
        </Button>
        {error ? <p>Tentativa de Login inválida.</p> : null}
      </Form>
      <Form.Label style={{marginTop: "15px"}}>Não possui uma conta? <a href="/signup">Cadastre-se</a> </Form.Label>
    
    </>
  )
}