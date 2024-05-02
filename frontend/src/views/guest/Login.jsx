import { Container, Row } from "react-bootstrap";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { useState } from "react";

import "../../assets/styles/log-reg.css";
import logo from "../../images/logonimo.png";
import { Link } from "react-router-dom";

import axios_client from "../../configs/axios-client";
import { useStateContext } from "../../context/ContextProvider";

function Login() {
  const { setUser, setToken } = useStateContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(null); //ig toaster ine

  const handleLogin = () => {
    const payload = {
      email,
      password,
    };

    axios_client
      .post("/login", payload)
      .then(({ data }) => {
        setUser(data.user);
        setToken(data.token);
      })
      .catch((error) => {
        const response = error.response;
        if (response && response.status === 422) {
          setMessage(response.data.message);
        }
      });
  };

  return (
    <Container fluid className="Log-Reg-Container vh-100">
      <Row className="Log-Reg-Header">
        <div className="d-flex align-items-center">
          <div className="header-container ">
            <img src={logo} className="logo"></img>
          </div>
          <div className="mx-3">
            <h3 className="App-name"> Cloud Cache</h3>
          </div>
        </div>
      </Row>
      <Row className=" d-flex flex-column h-100 align-items-center">
        <Card className="w-25 h-75 d-flex justify-content-center flex-row">
          <div className="w-100 d-flex justify-content-center align mb-4">
            <h1 style={{ fontSize: "50px", fontWeight: "600" }}>
              Sign <span style={{ color: "rgb(39, 122, 201)" }}>in</span>
            </h1>
          </div>
          <Container fluid>
            <div className="field d-flex flex-column">
              <label htmlFor="email">Email</label>
              <InputText
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="field d-flex flex-column">
              <label htmlFor="password">Password</label>
              <Password
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                feedback={false}
                tabIndex={1}
                toggleMask
                className="input"
              />
            </div>
          </Container>
          <Button label="Login" onClick={handleLogin} />
          <div className="acc w-100 d-flex justify-content-center">
            <p>
              Dont have an account?{" "}
              <span className="sign-up">
                <Link to="/register">Register</Link>
              </span>
            </p>
          </div>
        </Card>
      </Row>
    </Container>
  );
}

export default Login;
