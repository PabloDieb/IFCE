import { memo, useEffect, useRef } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useSignInWithEmailAndPassword, useUpdateProfile } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { auth } from '../../../firebase/config';
import { IUserClaims, useUserClaimsStore } from '../../../stores/UserClaimsStore';

function Login() {
  const navigate = useNavigate();
  const claims = useUserClaimsStore(state => state.claims)
  const set = useUserClaimsStore(state => state.updateUserClaims);
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
    navigate("/");
  }
  console.log(loading, userCredentials);

  useEffect(() => {
    let claimsLoaded = false;
    userCredentials && userCredentials.user?.getIdTokenResult()
                                            .then((result) => result.claims)
                                            .then((claims) => { 
                                              const userClaims: IUserClaims = {admin: claims.admin ? true : false, professor: claims.professor ? true : false};
                                              set(userClaims);
                                              claimsLoaded = true;
                                            });
    if(claimsLoaded) navigate("/");
    
  }, [userCredentials])

  console.log("CLAIMS", useUserClaimsStore(state => state.claims))
  return(
    <>
      <h2>Login</h2>
      <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control as="input" type="email" ref={emailRef} placeholder="Digite seu email" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Senha</Form.Label>
          <Form.Control type="password" ref={passwordRef} placeholder="Digite sua senha" />
        </Form.Group>

        <Button variant="primary" onClick={() => signIn(emailRef !== null && emailRef.current !== null ? emailRef.current.value : "", passwordRef !== null && passwordRef.current !== null ? passwordRef.current.value : "")}>
          Entrar
        </Button>
        {error ? <p>Tentativa de Login inválida.</p> : null}
      </Form>
      <Form.Label style={{marginTop: "15px"}}>Não possui uma conta? <a href="/IFCE/signup">Cadastre-se</a> </Form.Label>
    
    </>
  )
}

export default memo(Login);