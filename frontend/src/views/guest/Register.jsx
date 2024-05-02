import React, { useState } from "react";
import { Container, Row } from "react-bootstrap";
import { Divider } from "primereact/divider";
import { Field, Form } from "react-final-form";
import { InputText } from "primereact/inputtext";
import { classNames } from "primereact/utils";
import { Button } from "primereact/button";
import { Password } from "primereact/password";
import { Checkbox } from "primereact/checkbox";
import { Link } from "react-router-dom";

function Register() {
  const [formData, setFormData] = useState({});

  const validate = (data) => {
    let errors = {};

    if (!data.last_name) {
      errors.last_name = "Surname is required.";
    }

    if (!data.first_name) {
      errors.first_name = "First name is required.";
    }

    if (!data.email) {
      errors.email = "Email is required.";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(data.email)) {
      errors.email = "Invalid email address. E.g. example@email.com";
    }

    if (!data.password) {
      errors.password = "Password is required.";
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
      <ul className="pl-2 ml-2 mt-0" style={{ lineHeight: "1.5" }}>
        <li>At least one lowercase</li>
        <li>At least one uppercase</li>
        <li>At least one numeric</li>
        <li>Minimum 8 characters</li>
      </ul>
    </React.Fragment>
  );

  const onRegister = (data) => {
    setFormData(data);

    //request here
    console.log(formData);
  };

  return (
    <Container fluid>
      <Row>header</Row>
      <Row>
        <div className="d-flex justify-content-center">
          <div className="card p-4">
            <h5 className="text-center">Register</h5>
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
                  <Field
                    name="last_name"
                    render={({ input, meta }) => (
                      <div className="field">
                        <label
                          htmlFor="last_name"
                          className={classNames({
                            "p-error": isFormFieldValid(meta),
                          })}
                        >
                          Last Name*
                        </label>
                        <InputText
                          id="last_name"
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
                    name="first_name"
                    render={({ input, meta }) => (
                      <div className="field">
                        <label
                          htmlFor="first_name"
                          className={classNames({
                            "p-error": isFormFieldValid(meta),
                          })}
                        >
                          First Name*
                        </label>
                        <InputText
                          id="first_name"
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
                    name="email"
                    render={({ input, meta }) => (
                      <div className="field">
                        <label
                          htmlFor="email"
                          className={classNames({
                            "p-error": isFormFieldValid(meta),
                          })}
                        >
                          Email Address*
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
                      <div className="field">
                        <label
                          htmlFor="password"
                          className={classNames({
                            "p-error": isFormFieldValid(meta),
                          })}
                        >
                          Password*
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
            <p>Already have an account?<span><Link to='/login'>Login</Link></span></p>
          </div>
        </div>
      </Row>
    </Container>
  );
}

export default Register;
