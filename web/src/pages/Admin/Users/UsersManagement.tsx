import { useRef, useState } from "react";
import { Badge, Button, Col, Container, Form, InputGroup, Row, Table } from "react-bootstrap";
import { deleteUserByDocRef, getUsers } from "../../../services/UsersService";
import AddUserRoles from "./UserRoles/ManageUserRoles/ManageUserRoles";

export default function UsersManagementPage() {
  const [ , loading, , snapshot] = getUsers();
  const searchRef = useRef<HTMLInputElement>(null);
  const [userToSearch, setUserToSearch] = useState("");
  const [shouldSearch, setShouldSearch] = useState(false);
  const handleSearchClick = () => {
    setShouldSearch(true);
    setUserToSearch(searchRef!.current!.value.toUpperCase());
  }
  const handleClearClick = () => {
    setShouldSearch(false);
    setUserToSearch("");
  }
  const renderUserFiltered = () => {
    const usersFiltered = snapshot?.docs.filter(element => element.data().email.toUpperCase().includes(userToSearch.toUpperCase()));

    return usersFiltered && usersFiltered.map(user => 
      <tr>
        <td>{user.data().name}</td>
        <td>{user.data().email}</td>
        <td>
          {!user.data().admin ? <Badge bg="primary">Admin</Badge> : null}
          {!user.data().professor ? <Badge bg="info">Professor</Badge> : null}
        </td>
        <td style={{display: "flex", justifyContent: "flex-start", gap: "2vw"}}>
          <AddUserRoles userSnapshot={user} />
          <Button variant="danger" onClick={() => deleteUserByDocRef(user.ref)}>Deletar</Button>
        </td>
      </tr>);
  };

  return (
    <Container>
      <Row>
        <Col>
          <h1>Usuários</h1>
        </Col>
      </Row>
      <Row>
        <Col md={{ span: 6}} xl={{ span: 4}} xll={{ span: 4}}>
          <InputGroup >
            <Form.Control
              placeholder="Email"
              aria-label="Recipient's username"
              aria-describedby="basic-addon2"
              ref={searchRef}
            />
            <Button variant="outline-primary" id="button-addon1" style={{borderRight: "1px solid"}} onClick={() => handleSearchClick()}>
              Pesquisar
            </Button>
            <Button variant="outline-primary" id="button-addon2" onClick={() => handleClearClick()}>
              Limpar
            </Button>
          </InputGroup>
        </Col>
      </Row>
      <Row>
        <Col>
          <Table responsive striped bordered hover id="tableX">
            <thead>
              <tr>
                <th>Nome</th>
                <th>Email</th>
                <th>Funções</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {shouldSearch ? renderUserFiltered() :
                !loading && snapshot && snapshot.docs.map((user: any, index: number) => 
                  <tr key={index}>
                    <td>{user.data().name}</td>
                    <td>{user.data().email}</td>
                    <td>
                      {user.data().admin ? <Badge bg="primary">Admin</Badge> : null}
                      {user.data().professor ? <Badge bg="info">Professor</Badge> : null}
                    </td>
                    <td style={{display: "flex", justifyContent: "flex-start", gap: "2vw"}}>
                      <AddUserRoles userSnapshot={user} />
                      <Button variant="danger" onClick={() => deleteUserByDocRef(user.ref)}>Deletar</Button>
                    </td>
                  </tr>
                )
              }
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  )
}