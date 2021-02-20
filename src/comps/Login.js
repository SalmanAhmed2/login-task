import React, { useState} from "react";
import * as ReactBootStrap from "react-bootstrap";
import { Button } from "@material-ui/core";
import { useHistory, Link } from "react-router-dom";
import { Formik } from "formik";
import { Form } from "react-bootstrap";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";

function Login() {

  const history = useHistory();
  const [data, setData] = useState("");
  const [errorr, setErr] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const formSubmit = (data) => {
    setIsLoading(true)
    fetch("https://reqres.in/api/login", {
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
          history.push("/home")
        }
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        setErr(err);
        localStorage.removeItem("Token");
      });
  };

  return (
    <div className="formPage">
      <h2 variant="contained">Login Page</h2>
      <div className="form">
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
            formSubmit(values);
            setSubmitting(false);
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleSubmit,
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
              <Button
                className="loginBtn"
                variant="contained"
                color="primary"
                type="submit"
              >
                Login
                <AccountCircleIcon />
                {isLoading && <ReactBootStrap.Spinner animation="border" />}
              </Button>
            </Form>
          )}
        </Formik>
      </div>
      <p className="warning">{errorr.error}</p>
      <Link to="/register">Don't have an account? Register now!</Link>
    </div>
  );
}
export default Login;