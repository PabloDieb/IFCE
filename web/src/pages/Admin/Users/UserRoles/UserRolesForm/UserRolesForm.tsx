import { httpsCallable } from "firebase/functions";
import { useRef, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useAuthState, useUpdateProfile } from "react-firebase-hooks/auth";
import { Toast } from "../../../../../components/Toast/Toast";
import { auth, functions } from "../../../../../firebase/config";
import User from "../../../../../services/interfaces/User";
import { updateUserByDocRef } from "../../../../../services/UsersService";

interface props {
  userSnapshot: any;
  handleClose: () => void;
}

export default function UserRolesForm({userSnapshot, handleClose}: props) {
  const adminRef = useRef<HTMLInputElement>(null);
  const professorRef = useRef<HTMLInputElement>(null);
  const [adminChecked, setAdminhecked] = useState<boolean>(userSnapshot.data().admin);
  const [professorChecked, setProfessorChecked] = useState<boolean>(userSnapshot.data().professor);
  const [showToast, setShowToast] = useState<boolean>(false);

  const submitHandler = async (event: any) => {
    event.preventDefault();
    event.persist();

    let addAdminRole = httpsCallable(functions, "addAdminRole");
    let removeAdminRole = httpsCallable(functions, "removeAdminRole");
    let addProfessorRole = httpsCallable(functions, "addProfessorRole");
    let removeProfessorRole = httpsCallable(functions, "removeProfessorRole");

    if(adminRef.current!.checked !== userSnapshot.data().admin && professorRef!.current!.checked !== userSnapshot.data().professor){
      let addAdminAndProfessorRole = httpsCallable(functions, "addRoles");
      console.log(userSnapshot.data().email, adminRef!.current!.checked, professorRef!.current!.checked);
      addAdminAndProfessorRole({
        email: userSnapshot.data().email,
        admin: adminRef!.current!.checked,
        professor: professorRef!.current!.checked
      }).then(result => {
        console.log(result);
      });

      const userData: User = {
        admin: adminRef.current?.checked ? true : false,
        professor: professorRef.current?.checked ? true : false
      }
      updateUserByDocRef(userSnapshot.ref, userData);
      return;
    }
    
    if(adminRef.current?.checked !== userSnapshot.data().admin){
      console.log("ADD ADMIN")
      adminRef.current?.checked ? addAdminRole({
        email: userSnapshot.data().email}).then(result => {
        console.log(result);
      }) : removeAdminRole({email: userSnapshot.data().email}).then(result => { console.log(result); });
    }
    
    if(professorRef.current?.checked !== userSnapshot.data().professor){
      console.log("ADD PROF")
      professorRef.current?.checked ? addProfessorRole({
        email: userSnapshot.data().email}).then(result => {
        console.log(result);
      }) : removeProfessorRole({email: userSnapshot.data().email}).then(result => { console.log(result); });
    }

    const userData: User = {
      admin: adminRef.current?.checked ? true : false,
      professor: professorRef.current?.checked ? true : false
    }
    updateUserByDocRef(userSnapshot.ref, userData);

    setShowToast(true);
    setTimeout(() => handleClose(), 1500);
  };
  console.log(userSnapshot.data(), userSnapshot.data().admin);
  return(
    <>
      <p>
        <b>Usuário: </b> 
        {userSnapshot.data().name}
      </p>
      <p>
        <b>Email: </b>
        {userSnapshot.data().email}
      </p>

      <Form onSubmit={submitHandler}>
        <Form.Group className="mb-3">
          <Form.Check
            label="Administrador"
            name="admin"
            type="switch"
            id="admin-switch"
            defaultChecked={userSnapshot.data().admin}
            ref={adminRef}
            />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Check
            label="Professor"
            name="professor"
            type="switch"
            id="professor-switch"
            defaultChecked={userSnapshot.data().professor}
            ref={professorRef}
            />
        </Form.Group>
        
        <Button type ="submit" variant="primary" onClick={submitHandler}>
          Salvar
        </Button>
        <Button type ="submit" variant="danger" onClick={handleClose}>
          Cancelar
        </Button>
        <Toast message={"Usuário adicionado com sucesso!"} type={"success"} showToast={showToast} setShowToast={setShowToast}/>
      </Form>
    </>
  );
}