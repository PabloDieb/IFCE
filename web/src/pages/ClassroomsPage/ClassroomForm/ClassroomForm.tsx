import { DocumentData } from "firebase/firestore";
import { useState, useRef } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { Toast } from "../../../components/Toast/Toast";
import { addClassroom, updateClassroom } from "../../../services/ClassroomService";
import Classroom, { ClassroomStatus } from "../../../services/interfaces/Classroom";
import { useToastStore } from "../../../stores/ToastProviderStore";

interface Props {
  action: string;
  handleClose: () => void;
  classroom?: DocumentData;
  classroomId?: string;
}
export default function ClassroomForm({action, handleClose, classroom, classroomId=""}: Props) {
  const [validated, setValidated] = useState(false);
  const showToasts = useToastStore(state => state.showToast);
  const buildingRef = useRef<HTMLInputElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const statusRef = useRef<HTMLSelectElement>(null);
  const maximumCapacityRef = useRef<HTMLInputElement>(null);
  const hasProjectorRef = useRef<HTMLInputElement>(null);
  const observationsRef = useRef<HTMLTextAreaElement>(null);
  const [showToast, setShowToast] = useState<boolean>(false);

  console.log(classroom, classroomId)
  const submitHandler = (event: any) => {
    event.preventDefault();
    event.stopPropagation();
    const form = event.currentTarget;
    if (form.checkValidity()) {
      setValidated(true);
      const classroom: Classroom = {
        building: buildingRef.current ? Number(buildingRef.current.value) : 0, 
        name: nameRef.current ? nameRef.current.value : "",
        maximumCapacity: maximumCapacityRef.current ? Number(maximumCapacityRef.current.value) : 0,
        status: statusRef.current ? statusRef.current.value : ClassroomStatus.Utilizavel,
        hasProjector: hasProjectorRef!.current!.checked,
        observations: observationsRef.current ? observationsRef.current.value : ""
      }
      console.log(classroom, action, classroomId)
      if(action === "add") addClassroom(classroom);
      if(action === "update" && classroomId !== "") updateClassroom(classroom, classroomId);
    }
    
    showToasts({
      showToast: true,
      headerText: "Sucesso",
      bodyText: action === "add" ? "Novo usuário adicionado" : "Alteração bem sucedida",
      variation: "success"
    })
    handleClose();

  };

  return (
    <strong>
      <Form onSubmit={submitHandler}>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Bloco</Form.Label>
          <Form.Control
            name = "building"
            type = "text"
            defaultValue = {classroom ? classroom.building : ""}
            placeholder = "Computação"
            ref = {buildingRef}
            autoFocus
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Nome</Form.Label>
          <Form.Control
            name="name"
            type="text"
            defaultValue = {classroom ? classroom.name : ""}
            placeholder = "Laboratório de Redes"
            ref = {nameRef}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label htmlFor="classRoomStatus">Condição</Form.Label>
          <Form.Select 
            id = "classRoomStatus"
            name = "status"
            defaultValue = {classroom ? classroom.status : ""}
            ref = {statusRef}
          >
            <>
              <option disabled>Selecione uma opção</option>
              {Object.keys(ClassroomStatus).map((value) => (
                <option key={value} value={ClassroomStatus[value as keyof typeof ClassroomStatus]}>{ClassroomStatus[value as keyof typeof ClassroomStatus]}</option>
              ))}
            </>
          </Form.Select>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Capacida máxima</Form.Label>
          <Form.Control
            name = "maximumCapacity"
            defaultValue = {classroom ? classroom.maximumCapacity : ""}
            type = "text"
            placeholder = "30"
            ref = {maximumCapacityRef}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Possui projetor</Form.Label>
          <Form.Check
            name = "hasProjector"
            type = "switch"
            id = "hasProjector-switch"
            defaultChecked = {classroom? classroom.hasProjector : false}
            ref = {hasProjectorRef}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Observações</Form.Label>
          <Form.Control
            name = "observations"
            as = "textarea"
            defaultValue = {classroom ? classroom.observations : ""}
            ref = {observationsRef}
          />
        </Form.Group>
        <Button type ="submit" variant="primary">
          Salvar
        </Button>
        <Button variant="danger" onClick={handleClose}>
          Fechar
        </Button>
      </Form>
      <Toast message={"Usuário adicionado com sucesso!"} type={"success"} showToast={showToast} setShowToast={setShowToast}/>
    </strong>
  )
}