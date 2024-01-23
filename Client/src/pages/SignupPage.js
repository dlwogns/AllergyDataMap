import React from "react";
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
import axios from "axios";

function App() {
  const SignupSchema = Yup.object().shape({
    name: Yup.string().required("enter your name"),
    email: Yup.string().email("Invalid email").required("enter your email"),
    password: Yup.string().required("enter your password"),
    passwordCheck: Yup.string()
      .oneOf([Yup.ref("password"), null], "Password must match")
      .required("enter your password again"),
    cityName: Yup.string().required("select your province"),
    cityCtl: Yup.string().required("select your district"),
  });

  return (
    <Formik
      initialValues={{
        name: "",
        email: "",
        password: "",
        passwordCheck: "",
        cityName: "",
        cityCtl: "",
      }}
      validationSchema={SignupSchema}
      onSubmit={(values, { setSubmitting }) => {
        axios
          .post("/user/join", values)
          .then((response) => {
            alert("Register successful!");
            setSubmitting(false);
          })
          .catch((error) => {
            alert("Register failed. Please try again.");
            setSubmitting(false);
          });
      }}
    >
      {({ errors, touched, values }) => (
        <Form
          as={MDBContainer}
          fluid="true"
          className="loginContainer"
          style={{ height: "100vh", width: "100vw", overflow: "auto" }}
        >
          <Field
            as={MDBContainer}
            fluid="true"
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
                  name="passwordCheck"
                  wrapperClass="mb-4"
                  size="lg"
                  type="password"
                >
                  {errors.passwordCheck && touched.passwordCheck ? (
                    <span style={{ color: "red" }}>{errors.passwordCheck}</span>
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
                      name="cityNameDropdown"
                    >
                      {koreaRegion.map((region, idx) => (
                        <Field
                          as={Dropdown.Item}
                          key={idx}
                          onClick={() => {
                            values.cityName = region[0];
                          }}
                          name="cityName"
                        >
                          {region[0]}
                        </Field>
                      ))}
                    </DropdownButton>
                    <InputGroup.Text
                      style={{ minWidth: "255px" }}
                      name="cityNameText"
                    >
                      {values.cityName}
                    </InputGroup.Text>
                  </InputGroup>
                  {errors.cityName && touched.cityName ? (
                    <span style={{ color: "red" }}>{errors.cityName}</span>
                  ) : (
                    "Province"
                  )}
                </div>
                <div className="mb-4">
                  <InputGroup>
                    <Field
                      name="cityDtl"
                      as={DropdownButton}
                      variant="outline-success"
                      size="lg"
                      title="시/군/구"
                      name="cityDtlDropdown"
                    >
                      {values.cityName &&
                        koreaRegion
                          .find((region) => region[0] === values.cityName)[1]
                          .map((city, idx) => (
                            <Field
                              as={Dropdown.Item}
                              key={idx}
                              onClick={() => {
                                values.cityCtl = city;
                              }}
                              name="cityDtl"
                            >
                              {city}
                            </Field>
                          ))}
                    </Field>
                    <InputGroup.Text
                      style={{ minWidth: "230px" }}
                      name="cityDtlText"
                    >
                      {values.cityCtl}
                    </InputGroup.Text>
                  </InputGroup>
                  {errors.cityCtl && touched.cityCtl ? (
                    <span style={{ color: "red" }}>{errors.cityCtl}</span>
                  ) : (
                    "District"
                  )}
                </div>
                <Button
                  name="submitButton"
                  variant="outline-success"
                  size="lg"
                  className="mb-4 w-100 gradient-custom-4"
                  type="submit"
                  onClick={() => {
                    console.log(values);
                  }}
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
