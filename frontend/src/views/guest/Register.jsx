import React, { useState } from "react";
import { Container, Row } from "react-bootstrap";
import { Divider } from "primereact/divider";
import { Field, Form } from "react-final-form";
import { InputText } from "primereact/inputtext";
import { classNames } from "primereact/utils";
import { Button } from "primereact/button";
import { Password } from "primereact/password";
import { Checkbox } from "primereact/checkbox";
import "../../assets/styles/log-reg.css";
import logo from "../../images/logonimo.png";
import { useNavigate } from "react-router-dom";
import axios_client from "../../configs/axios-client";
import { useStateContext } from "../../context/ContextProvider";

function Register() {
  
  const {setUser, setToken} = useStateContext()
  const [formData, setFormData] = useState({});
  
  const [errors, setErrors] = useState(null) //toaster
  
  const navigate = useNavigate();
  const validate = (data) => {
    let errors = {};

    if (!data.last_name) {
      errors.last_name = "Required Field";
    }

    if (!data.first_name) {
      errors.first_name = "Required Field";
    }

    if (!data.email) {
      errors.email = "Required Field";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(data.email)) {
      errors.email = "Invalid email address.";
    }

    if (!data.password) {
      errors.password = "Required Field";
    }

    if (!data.accept) {
      errors.accept = "You need to agree to terms and conditions of use";
    }

    return errors;
  };

  const isFormFieldValid = (meta) => !!(meta.touched && meta.error);
  const getFormErrorMessage = (meta) => {
    return (
      isFormFieldValid(meta) && <small className="p-error">{meta.error}</small>
    );
  };

  const passwordHeader = <h6>Pick a password</h6>;
  const passwordFooter = (
    <React.Fragment>
      <Divider />
      <p className="mt-2">Suggestions</p>
      <ul className="pl-2 ml-2 mt-0" style={{ lineHeight: "1.5  " }}>
        <li>At least one lowercase</li>
        <li>At least one uppercase</li>
        <li>At least one numeric</li>
        <li>Minimum 8 characters</li>
      </ul>
    </React.Fragment>
  );

  const onRegister = (data) => {
    const payload = {
      last_name: data.last_name,
      first_name: data.first_name,
      email: data.email,
      password: data.password,
    }

    //request here
    axios_client.post('/register', payload)
      .then(({data}) => { 
        setUser(data.user)
        setToken(data.token);
      })
      .catch(err => {
        const response = err.response;
        console.log(response)
        if (response && response.status === 422) {
          setErrors(response.data.errors)
        }
      })
  };

  return (
    <Container fluid>
    <Row className="Log-Reg-Header p-2">
    <div className="d-flex align-items-center">
      <div className="header-container ">
        <img src={logo} className="logo"></img>
      </div>
      <div className="mx-3">
        <h3 className="App-name" style={{cursor:'default'}}> Cloud Cache</h3>
      </div>
    </div>
  </Row>
      <Row>
        <div className="d-flex justify-content-center">
          <div className="card p-1">
            <h1 className="text-center" style={{color:'white', fontWeight: '600', marginBottom:'10%',cursor:'default'}}>Sign <span style={{color:'rgb(39, 122, 201)'}}>up</span></h1>
            <Form
              onSubmit={onRegister}
              initialValues={{
                last_name: "",
                first_name: "",
                email: "",
                password: "",
                accept: false,
              }}
              validate={validate}
              render={({ handleSubmit }) => (
                <form onSubmit={handleSubmit} className="p-fluid">
                <div className="d-flex  nameInput-container">
                <Field
                    name="first_name"
                    render={({ input, meta }) => (
                      <div className="field d-flex flex-column">
                        <label
                          htmlFor="first_name"
                          className={classNames({
                            "p-error": isFormFieldValid(meta),
                          })}
                        >
                          First Name
                        </label>
                        <InputText
                          id="first_name"
                          {...input}
                          className={classNames({
                            "p-invalid": isFormFieldValid(meta),
                          })}
                          style={{width: '23vh'}}
                        />
                        {getFormErrorMessage(meta)}
                      </div>
                    )}
                  />  
                <Field
                    name="last_name"
                    render={({ input, meta }) => (
                      <div className="field d-flex flex-column">
                        <label
                          htmlFor="last_name"
                          className={classNames({
                            "p-error": isFormFieldValid(meta),
                          })}
                        >
                          Last Name
                        </label>
                        <InputText
                          id="last_name"
                          {...input}
                          className={classNames({
                            "p-invalid": isFormFieldValid(meta),
                          })}
                          style={{width: '23vh'}}
                        />
                        {getFormErrorMessage(meta)}
                      </div>
                    )}
                  />
                  </div>
                  <Field
                    name="email"
                    render={({ input, meta }) => (
                      <div className="field d-flex flex-column">
                        <label
                          htmlFor="email"
                          className={classNames({
                            "p-error": isFormFieldValid(meta),
                          })}
                        >
                          Email Address
                        </label>
                        <InputText
                          id="email"
                          {...input}
                          className={classNames({
                            "p-invalid": isFormFieldValid(meta),
                          })}
                        />
                        {getFormErrorMessage(meta)}
                      </div>
                    )}
                  />
                  <Field
                    name="password"
                    render={({ input, meta }) => (
                      <div className="field d-flex flex-column">
                        <label
                          htmlFor="password"
                          className={classNames({
                            "p-error": isFormFieldValid(meta),
                          })}
                        >
                          Password
                        </label>
                        <Password
                          id="password"
                          {...input}
                          toggleMask
                          className={classNames({
                            "p-invalid": isFormFieldValid(meta),
                          })}
                          header={passwordHeader}
                          footer={passwordFooter}
                        />
                        {getFormErrorMessage(meta)}
                      </div>
                    )}
                  />
                  <Field
                    name="accept"
                    type="checkbox"
                    render={({ input, meta }) => (
                      <div className="field-checkbox">
                        <Checkbox
                          inputId="accept"
                          {...input}
                          className={classNames({
                            "p-invalid": isFormFieldValid(meta),
                          })}
                        />
                        <label
                          htmlFor="accept"
                          className={classNames({
                            "p-error": isFormFieldValid(meta),
                          })}
                          style={{fontSize:'10px', marginLeft: '5px'}}
                        >
                          I agree to the terms and conditions*
                        </label>
                      </div>
                    )}
                  />
                  <Button type="submit" label="Register" className="mt-2" />
                </form>
              )}
            />
            <div className="acc1 w-100 d-flex justify-content-center">
          <label>
            Dont have an account?{" "}
            <span className="sign-up"><a onClick={() => navigate("/login")}>Sign in</a></span>
          </label>
          </div>
          </div>
        </div>
      </Row>
    </Container>
  );
}

export default Register;
