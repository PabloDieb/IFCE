import { useRef } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth } from "../../../../firebase/config";
import { addUser } from "../../../../services/UsersService";

export default function AddUser() {
  const nameRef = useRef<HTMLInputElement>(null);
  const surenameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const [
    createUserWithEmailAndPassword,
    user,
    loading,
    error,
  ] = useCreateUserWithEmailAndPassword(auth);

  const submitHandler = async (event: any) => {
    event.preventDefault();
    event.persist();
    const user = await createUserWithEmailAndPassword( emailRef.current.value, passwordRef.current.value );
    const data = {
      name: nameRef.current.value,
      surename: surenameRef.current.value,
      email: emailRef.current.value,
      uid: user?.user.uid
    }
    await addUser(data);
  };

  return(
    <Container id="containerClassroomsTableManagement">
      <Row className="justify-content-md-center">
      <Col md={4}>
      <Form onSubmit={submitHandler}>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Nome</Form.Label>
          <Form.Control
            name="name"
            type="text"
            placeholder="Nome"
            ref={nameRef}
            autoFocus
            />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Sobrenome</Form.Label>
          <Form.Control
            name="surename"
            type="text"
            placeholder="Sobrenome"
            ref={surenameRef}
            />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            name="email"
            type="text"
            placeholder="Email"
            ref={emailRef}
            />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Senha</Form.Label>
          <Form.Control
            name="password"
            type="text"
            placeholder="Senha"
            ref={passwordRef}
            />
        </Form.Group>

        <Button type ="submit" variant="primary" onClick={submitHandler}>
          Salvar
        </Button>
      </Form>
      </Col>
      </Row>
    </Container>
  )
}