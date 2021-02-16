import React, { useState, useEffect } from "react";
import {Button} from '@material-ui/core'
import { useHistory} from 'react-router-dom';
import { Formik } from "formik";
import { Form} from 'react-bootstrap';
import * as ReactBootStrap from 'react-bootstrap';

function Registration(props) {
  const history = useHistory();
  const [data, setData] = useState("");
  const [errorr, setErr]=useState("")
  const [isLoaded, setIsLoaded] = useState(false);
  
  const formSubmit = (data) => {
    setIsLoaded(true);
    let api = fetch("https://reqres.in/api/register", {
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
        setIsLoaded(false);
        localStorage.setItem('Token', response.token)
        response.error == "Missing password" ? setErr(response):
        history.push('/home',{
          response
        })
        props.user(true)
      })
      .catch((err) => {
        setIsLoaded(false);
        console.log(err);
      });
  };
  return (
    <div>
      <h2 variant="contained">Registration Page</h2>
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
          isSubmitting,
        }) => (
          <Form onSubmit={handleSubmit} controlId="formBasicEmail">
            <Form.Group>
            <Form.Control
              type="email"
              name="email"
              onChange={handleChange}
              value={values.email}
              placeholder="Email"
            />
            <Form.Text>
            <p className="warning">  {errors.email && touched.email && errors.email}</p>
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
            <Form>
            <p className="warning">{errors.password && touched.password && errors.password}</p>
            </Form>
            </Form.Group>
             <div className="buttons">

               <Button variant="contained" color="primary" type="submit">Login
               {/* {isLoaded? <ReactBootStrap.Spinner animation="border"/>: null} */}
               </Button>

            <Button type="submit" variant="contained" color="primary">Submit
             {isLoaded? <ReactBootStrap.Spinner animation="border"/>: null}</Button>

             </div>
          </Form>
        )}
      </Formik>
      <p className="warning">{(errorr.error == "Missing password")? errorr.error : null}</p>
    </div>
  );
}
export default Registration;
