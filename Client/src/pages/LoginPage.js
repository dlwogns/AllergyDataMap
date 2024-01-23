import React, { useState } from "react";
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
} from "mdb-react-ui-kit";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";

// import "mdb-react-ui-kit/dist/css/mdb.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "../styles/loginPage.css";

function LoginPage() {
  const SignupSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("enter your email"),
    password: Yup.string().required("enter your password"),
  });

  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      validationSchema={SignupSchema}
      onSubmit={(values, { setSubmitting }) => {
        axios
          .post("/user/login", values)
          .then((response) => {
            console.log(response.data);
            alert("Login successful!");
            setSubmitting(false);
          })
          .catch((error) => {
            console.log(error);
            alert("Login failed. Please try again.");
            setSubmitting(false);
          });
      }}
    >
      {({ errors, touched }) => (
        <Form
          as={MDBContainer}
          fluid
          className="loginContainer"
          style={{ height: "100vh", width: "100vw", overflow: "auto" }}
        >
          <MDBRow className="d-flex justify-content-center align-items-center h-100">
            <MDBCol col="12">
              <MDBCard
                className="bg-dark text-white my-5 mx-auto"
                style={{ borderRadius: "1rem", maxWidth: "400px" }}
              >
                <MDBCardBody className="p-5 d-flex flex-column align-items-center mx-auto w-100">
                  <h2 className="fw-bold mb-2 text-uppercase">Login</h2>
                  <Field
                    as={MDBInput}
                    name="email"
                    labelClass="text-white"
                    id="formControlLg"
                    type="email"
                    size="lg"
                    wrapperClass="mb-4 mx-5 w-100"
                  >
                    {errors.email && touched.email ? (
                      <span style={{ color: "red" }}>{errors.email}</span>
                    ) : (
                      "Email address"
                    )}
                  </Field>

                  <Field
                    as={MDBInput}
                    name="password"
                    labelClass="text-white"
                    id="formControlLg"
                    type="password"
                    size="lg"
                    wrapperClass="mb-4 mx-5 w-100"
                  >
                    {errors.password && touched.password ? (
                      <span style={{ color: "red" }}>{errors.password}</span>
                    ) : (
                      "Password"
                    )}
                  </Field>

                  <Button
                    variant="outline-success"
                    size="lg"
                    className="w-75 mb-4"
                    type="submit"
                  >
                    Login
                  </Button>
                  <div>
                    <p className="mb-0">
                      Don't have an account?{" "}
                      <a href="/signup" className="text-white-50 fw-bold">
                        Sign Up
                      </a>
                    </p>
                  </div>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          </MDBRow>
        </Form>
      )}
    </Formik>
  );
}

export default LoginPage;
