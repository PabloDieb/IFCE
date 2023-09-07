import { updateProfile, createUserWithEmailAndPassword } from "firebase/auth";
import { httpsCallable } from "firebase/functions";
import { SetStateAction, useRef, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useCreateUserWithEmailAndPassword, useUpdateProfile } from "react-firebase-hooks/auth";
import { Toast } from "../../../../components/Toast/Toast";
import { auth, functions } from "../../../../firebase/config";
import User from "../../../../services/interfaces/User";
import { addUser } from "../../../../services/UsersService";
interface props {
  action: string;
  handleClose: () => void;
}

export default function UserForm({action, handleClose}: props) {
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const adminRef = useRef<HTMLInputElement>(null);
  const professorRef = useRef<HTMLInputElement>(null);
  const [showToast, setShowToast] = useState<boolean>(false);
  const [updateProfile, updating, error2] = useUpdateProfile(auth);

  const submitHandler = async (event: any) => {
    event.preventDefault();
    event.persist();
    console.log(auth.currentUser)
    // let user = await createUserWithEmailAndPassword(auth,
    //   emailRef && emailRef.current ? emailRef.current.value : "",
    //   passwordRef && passwordRef.current ? passwordRef.current.value : "");

    // if(user) await updateProfile({displayName: nameRef?.current?.value});
    
    // // console.log(adminRef.current, professorRef.current);
    // const userData: User = {
    //   name: user!.user!.displayName!,
    //   email: emailRef && emailRef.current ? emailRef.current.value : "",
    //   admin: adminRef!.current!.checked,
    //   professor: professorRef!.current!.checked
    // }
    // console.log(userData, "ADD USER");
    // addUser(userData);
    console.log("JDOIWJDOWIDJ")
    // if(adminRef.current!.checked && professorRef!.current!.checked){
    //   let addAdminAndProfessorRole = httpsCallable(functions, "addRoles");
    //   addAdminAndProfessorRole({
    //     email: emailRef!.current!.value,
    //     admin: adminRef!.current!.checked,
    //     professor: professorRef!.current!.checked
    //   }).then(result => {
    //     console.log(result);
    //   });
    // }
    // if(adminRef.current?.checked){
    //   let addAdminRole = httpsCallable(functions, "addAdminRole");
    //   addAdminRole({email: emailRef!.current!.value}).then(result => {
    //     console.log(result);
    //   });
    // }

    // if(professorRef.current?.checked){
    //   let addProfessorRole = httpsCallable(functions, "addProfessorRole");
    //   addProfessorRole({email: emailRef!.current!.value}).then(result => {
    //     console.log(result);
    //   });
    // }

    setShowToast(true);
    setTimeout(() => handleClose(), 1500);
  };

  return(
    <Form onSubmit={submitHandler}>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Nome e Sobrenome</Form.Label>
          <Form.Control
            name="name"
            type="text"
            placeholder="Nome"
            ref={nameRef}
            autoFocus
            />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            name="email"
            type="text"
            placeholder="Email"
            ref={emailRef}
            required
            />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Senha</Form.Label>
          <Form.Control
            name="password"
            type="text"
            placeholder="Senha"
            ref={passwordRef}
            required
            />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Check
            label="Administrador"
            name="admin"
            type="switch"
            id="admin-switch"
            ref={adminRef}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Check
            label="Professor"
            name="professor"
            type="switch"
            id="professor-switch"
            ref={professorRef}
          />
        </Form.Group>
        <Button type ="submit" variant="primary" onClick={submitHandler}>
          Salvar
        </Button>
        <Toast message={"Usuário adicionado com sucesso!"} type={"success"} showToast={showToast} setShowToast={setShowToast}/>
      </Form>
  );
}