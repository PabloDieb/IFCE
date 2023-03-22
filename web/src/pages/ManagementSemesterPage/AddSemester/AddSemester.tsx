import { addDoc, collection } from 'firebase/firestore';
import React, { useRef } from 'react';
import { useState } from "react";
import { Button, Modal, Form} from "react-bootstrap";
import { db } from '../../../firebase/config';

export default function AddSemester(props) {
  const name = useRef<any>();
  const startDate = useRef<any>();
  const endDate = useRef<any>();
  const active = useRef<any>();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const saveSemester = async (values) => await addDoc(collection(db, "semesters"), values);

  const submitHandler = async (event) => {
    event.preventDefault();
    event.persist();
    const values = {
      name: name.current.value,
      startDate: new Date(startDate.current.value),
      endDate: new Date(endDate.current.value),
      active: active.current.checked
    }
    await saveSemester(values);
  };


  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Adicionar Semestre
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Criar Novo Semestre</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={submitHandler}>
            <Form.Group>
              <Form.Label>Nome</Form.Label>
              <Form.Control type="text" ref={name} aria-label="Default select example" />
            </Form.Group>
            <Form.Group>
              <Form.Label>Data Inicial</Form.Label>
              <Form.Control type="date" ref={startDate} aria-label="Default select example" />
            </Form.Group>
            <Form.Group>
              <Form.Label>Data Final</Form.Label>
              <Form.Control type="date" ref={endDate} aria-label="Default select example" />
            </Form.Group>
            <Form.Check
              ref={active}
              type="checkbox"
              id="custom-switch"
              label="Ativo"
            />

            <Modal.Footer>
              <Button type ="submit" variant="primary" onClick={handleClose}>
                Salvar
              </Button>
              <Button variant="secondary" onClick={handleClose}>
                Fechar
              </Button>
            </Modal.Footer>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}