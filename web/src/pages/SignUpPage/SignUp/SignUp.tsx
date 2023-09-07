import { Container, Button, Form } from 'react-bootstrap';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, functions } from '../../../firebase/config';
import { addUser } from '../../../services/UsersService';
import User from '../../../services/interfaces/User';
import { useUpdateProfile } from 'react-firebase-hooks/auth';
import { httpsCallable } from 'firebase/functions';

export default function SignUpPage() {

  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [userLoaded, setUserLoaded] = useState(false);
  const navigate = useNavigate();
  const [updateProfile, updating, error2] = useUpdateProfile(auth);
  const submitHandler = async (event: any) => {
    event.preventDefault();
    event.persist();
    console.log(auth.currentUser)
    let user = await createUserWithEmailAndPassword(auth,
      emailRef && emailRef.current ? emailRef.current.value : "",
      passwordRef && passwordRef.current ? passwordRef.current.value : "");

    if(user) await updateProfile({displayName: nameRef?.current?.value});
    if(user) setUserLoaded(true);
    // console.log(adminRef.current, professorRef.current);
    const userData: User = {
      name: user!.user!.displayName!,
      email: emailRef && emailRef.current ? emailRef.current.value : "",
      admin: false,
      professor: false
    }
    console.log(userData, "ADD USER");
    addUser(userData);

      let addAdminAndProfessorRole = httpsCallable(functions, "addRoles");
      addAdminAndProfessorRole({
        email: emailRef!.current!.value,
        admin: false,
        professor: false
      }).then(result => {
        console.log(result);
      });
    }

    // console.log(emailRef)
    // console.log(passwordRef.current ? passwordRef.current.value : "")

    // let userCredentials = await createUserWithEmailAndPassword(
    //   emailRef && emailRef.current ? emailRef.current.value : "",
    //   passwordRef && passwordRef.current ? passwordRef.current.value : ""
    // );

    // if(userCredentials) await updateProfile(userCredentials.user, {displayName: nameRef?.current?.value});
    
    // const userData: User = {
    //   name: user!.user!.displayName!,
    //   email: emailRef && emailRef.current ? emailRef.current.value : "",
    //   admin: false,
    //   professor: false
    // }

    // await addUser(userData);
  // };

  useEffect(() => {
    if (userLoaded) {
      navigate("/");
      // maybe trigger a loading screen
      return;
    }
  }, [userLoaded]);

  return(
    <Container style={{display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", width: "100%", height: "80%"}}>
      <h2>Cadastrar-se</h2>
      <Form>
        <Form.Group className="mb-3" controlId="formBasicName">
          <Form.Label>Nome e Sobrenome</Form.Label>
          <Form.Control type="text" placeholder="John Doe" ref={nameRef} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" placeholder="Email" ref={emailRef} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Senha</Form.Label>
          <Form.Control type="password" placeholder="Senha" ref={passwordRef} />
        </Form.Group>
        <Button type="submit" variant="primary" onClick={submitHandler}>
          Criar conta
        </Button>
      {/* {errorLogin ? <p>Tentativa de Login inválida.</p> : null} */}
      </Form>
      <Form.Label style={{marginTop: "15px"}}>Já possui uma conta? <a href="/IFCE/signin">Entrar</a> </Form.Label>
    </Container>
  )
}