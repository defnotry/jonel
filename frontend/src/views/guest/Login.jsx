import { Container, Row } from "react-bootstrap";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { useState } from "react";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    const userData = {
      email,
      password
    }

    //handle query
  };

  return (
    <Container fluid className="bg-light">
      <Row className="">Header</Row>
      <Row className="justify-content-center d-flex flex-column">
        <Card>
          <h2>Login</h2>
          <Container fluid>
            <div className="field">
              <label htmlFor="email">Email</label>
              <InputText
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="field">
              <label htmlFor="password">Password</label>
              <Password
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                feedback={false}
                tabIndex={1}
              />
            </div>
          </Container>
          <Button label="Login" onClick={handleLogin} />
        </Card>
      </Row>
    </Container>
  );
}

export default Login;
