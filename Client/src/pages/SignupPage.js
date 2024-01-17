import React, { useState, useEffect } from "react";
import {
  MDBBtn,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBInput,
} from "mdb-react-ui-kit";
import {
  Dropdown,
  DropdownButton,
  Button,
  ButtonGroup,
  InputGroup,
} from "react-bootstrap";
// import "mdb-react-ui-kit/dist/css/mdb.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "../styles/signupPage.css";
import koreaRegion from "../koreaRegion";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

function App() {
  const SignupSchema = Yup.object().shape({
    name: Yup.string().required("enter your name"),
    email: Yup.string().email("Invalid email").required("enter your email"),
    password: Yup.string().required("enter your password"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Password must match")
      .required("enter your password again"),
    selectedDOSI: Yup.string().required("select your province"),
    selectedSIGUNGU: Yup.string().required("select your district"),
  });

  return (
    <Formik
      initialValues={{
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        selectedDOSI: "",
        selectedSIGUNGU: "",
      }}
      validationSchema={SignupSchema}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
          setSubmitting(false);
        }, 400);
      }}
    >
      {({ errors, touched, values }) => (
        <Form
          as={MDBContainer}
          fluid
          className="loginContainer"
          style={{ height: "100vh", width: "100vw", overflow: "auto" }}
        >
          <Field
            as={MDBContainer}
            fluid
            className="d-flex align-items-center justify-content-center signupContainer"
            style={{
              height: "100%",
            }}
          >
            <div className="mask gradient-custom-3"></div>
            <Field as={MDBCard} className="m-5" style={{ maxWidth: "600px" }}>
              <Field as={MDBCardBody} className="px-5">
                <h2 className="text-uppercase text-center mb-5">
                  Create an account
                </h2>
                <Field
                  as={MDBInput}
                  name="name"
                  wrapperClass="mb-4"
                  size="lg"
                  id="form1"
                  type="text"
                >
                  {errors.name && touched.name ? (
                    <span style={{ color: "red" }}>{errors.name}</span>
                  ) : (
                    "Name"
                  )}
                </Field>
                <Field
                  as={MDBInput}
                  name="email"
                  wrapperClass="mb-4"
                  size="lg"
                  id="form1"
                  type="email"
                >
                  {errors.email && touched.email ? (
                    <span style={{ color: "red" }}>{errors.email}</span>
                  ) : (
                    "Email"
                  )}
                </Field>
                <Field
                  as={MDBInput}
                  name="password"
                  wrapperClass="mb-4"
                  size="lg"
                  id="form3"
                  type="password"
                >
                  {errors.password && touched.password ? (
                    <span style={{ color: "red" }}>{errors.password}</span>
                  ) : (
                    "Password"
                  )}
                </Field>
                <Field
                  as={MDBInput}
                  name="confirmPassword"
                  wrapperClass="mb-4"
                  size="lg"
                  id="form3"
                  type="password"
                >
                  {errors.confirmPassword && touched.confirmPassword ? (
                    <span style={{ color: "red" }}>
                      {errors.confirmPassword}
                    </span>
                  ) : (
                    "Confirm Password"
                  )}
                </Field>
                <div className="mb-4">
                  <InputGroup>
                    <DropdownButton
                      variant="outline-success"
                      as={ButtonGroup}
                      size="lg"
                      title="시/도"
                      name="selectedDOSI"
                    >
                      {koreaRegion.map((region, idx) => (
                        <Field
                          as={Dropdown.Item}
                          key={idx}
                          onClick={() => {
                            values.selectedDOSI = region[0];
                          }}
                        >
                          {region[0]}
                        </Field>
                      ))}
                    </DropdownButton>
                    <InputGroup.Text style={{ minWidth: "255px" }}>
                      {values.selectedDOSI}
                    </InputGroup.Text>
                  </InputGroup>
                  {errors.selectedDOSI && touched.selectedDOSI ? (
                    <span style={{ color: "red" }}>{errors.selectedDOSI}</span>
                  ) : (
                    "Province"
                  )}
                </div>
                <div className="mb-4">
                  <InputGroup>
                    <Field
                      as={DropdownButton}
                      variant="outline-success"
                      size="lg"
                      title="시/군/구"
                    >
                      {values.selectedDOSI &&
                        koreaRegion
                          .find(
                            (region) => region[0] === values.selectedDOSI
                          )[1]
                          .map((city, idx) => (
                            <Field
                              as={Dropdown.Item}
                              key={idx}
                              onClick={() => {
                                values.selectedSIGUNGU = city;
                              }}
                            >
                              {city}
                            </Field>
                          ))}
                    </Field>
                    <InputGroup.Text style={{ minWidth: "230px" }}>
                      {values.selectedSIGUNGU}
                    </InputGroup.Text>
                  </InputGroup>
                  {errors.selectedSIGUNGU && touched.selectedSIGUNGU ? (
                    <span style={{ color: "red" }}>
                      {errors.selectedSIGUNGU}
                    </span>
                  ) : (
                    "District"
                  )}
                </div>
                <Button
                  variant="outline-success"
                  size="lg"
                  className="mb-4 w-100 gradient-custom-4"
                  type="submit"
                >
                  Register
                </Button>
              </Field>
            </Field>
          </Field>
        </Form>
      )}
    </Formik>
  );
}

export default App;
