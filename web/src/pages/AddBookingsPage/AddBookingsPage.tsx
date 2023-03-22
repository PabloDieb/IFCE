import { useState } from 'react';
import CodeEditor from '@uiw/react-textarea-code-editor';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { createBookings } from '../../utils/functions';

export default function AddBookingsPage() {
  const [code, setCode] = useState("");

  return (
    <Container>
      <Row style={{marginTop: "5%"}}>
        <Col>
          <div data-color-mode="dark" style={{height: "20rem", overflow: "auto"}}>
            <CodeEditor
              value={code}
              language="js"
              placeholder="Please enter JS code."
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
          <Button onClick={() => createBookings(code)}>Salvar</Button>
        </Col>
      </Row>
    </Container>
  )
}