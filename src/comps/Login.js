import React, { useState, useEffect} from "react";
import * as ReactBootStrap from "react-bootstrap";
import { Button } from "@material-ui/core";
import { useHistory, Link } from "react-router-dom";
import { Formik } from "formik";
import { Form } from "react-bootstrap";

function Login() {
  const history = useHistory();
  const [data, setData] = useState("");
  const [errorr, setErr] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);
  
  const token = localStorage.getItem("Token")

  const  formSubmit = (data) => {
      setIsLoaded(true);
      let api  =  fetch("https://reqres.in/api/login", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...data,
        }),
      })
        .then((response) => response.json())
        .then((response) => {
          if (response.error) {
            setErr(response);
          } else {
            localStorage.setItem("Token", response.token);
            history.push("/home", {
              response,
            });
          }
          setIsLoaded(false);
        })
        .catch((err) => {
          setIsLoaded(false);
          setErr(err)
          localStorage.removeItem("Token");
        });
    }

  return (

    <div>
      <h2 variant="contained">Login Page</h2>
      <Formik
        initialValues={{ email: "", password: "" }}
        validate={(values) => {
          const errors = {};
          if (!values.email) {
            errors.email = "Required";
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
          ) {
            errors.email = "Invalid email address";
          }
          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          setData(values);
          formSubmit(values)
          setSubmitting(false);
        }}
        >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleSubmit,
          isSubmitting,
        }) => (
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Control
                type="email"
                name="email"
                onChange={handleChange}
                value={values.email}
                placeholder="Email"
              />
              <Form.Text>
                <p className="warning">
                  {errors.email && touched.email && errors.email}
                </p>
              </Form.Text>
            </Form.Group>
            <Form.Group>
              <Form.Control
                type="password"
                name="password"
                onChange={handleChange}
                value={values.password}
                placeholder="Password"
              />
              <p className="warning">
                {errors.password && touched.password && errors.password}
              </p>
            </Form.Group>
              <Button variant="contained" color="primary" type="submit">
                Login
                {isLoaded? <ReactBootStrap.Spinner animation="border"/>: null}
              </Button>
          </Form>
        )}
      </Formik>
      <p className="warning">
        {errorr.error}
      </p>
      <Link to="/register">
        Don't have an account? Register now!
      </Link>
    </div>
  );
}
export default Login;
