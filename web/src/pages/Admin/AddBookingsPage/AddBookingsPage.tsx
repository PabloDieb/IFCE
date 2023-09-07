import { useState } from 'react';
import { Container, Row, Col, Button, Toast, ToastContainer } from 'react-bootstrap';
import { createBookings } from '../../../utils/functions';
import CodeEditor from '@uiw/react-textarea-code-editor';

export default function AddBookingsPage() {
  const [code, setCode] = useState("");
  const [showToast, setShowToast] = useState(false);

  const handleSubmit = () => {
    createBookings(code);
    setCode("");
    setShowToast(true);
  }

  return (
    <Container>
      <Row>
        <Col>
          <h2>
            Cadastar horários do semestre
          </h2>
        </Col>
      </Row>
      <Row>
        <Col>
          <div data-color-mode="dark" style={{height: "20rem", overflow: "auto"}}>
            <CodeEditor
              value={code}
              language="js"
              placeholder="Insira o código JSON."
              onChange={(evn) => setCode(evn.target.value)}
              padding={15}
              style={{
                fontFamily:
                  "ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace",
                fontSize: 12,
                height: "20rem",
                overflow: "auto"
              }}
            />
          </div>
          <Button style={{marginTop: "2vh"}} size="lg" onClick={() => handleSubmit()}>Salvar</Button>

          <ToastContainer className="p-3" position='bottom-end'>
            <Toast onClose={() => setShowToast(false)} show={showToast} delay={2000} bg="success" autohide>
              <Toast.Header closeButton={false}>
                <strong className="me-auto">Aviso</strong>
              </Toast.Header>
              <Toast.Body><strong className="me-auto">Horários criados com sucessos.</strong></Toast.Body>
            </Toast>
          </ToastContainer>
        </Col>
      </Row>
    </Container>
  )
}