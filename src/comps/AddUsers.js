import React, { useState, useEffect} from "react";
import * as ReactBootStrap from "react-bootstrap";
import { Button} from "@material-ui/core";
import { useHistory, Link } from "react-router-dom";
import { Formik } from "formik";
import { Form } from "react-bootstrap";
import SaveIcon from '@material-ui/icons/Save';

function AddUsers() {
  const history = useHistory();
  const [data, setData] = useState("");
  const [errr,setErrr] =useState("")
  const [isLoaded, setIsLoaded] = useState(false);

  const  formSubmit = (data) => {
      setIsLoaded(true);
      let api  =  fetch("https://reqres.in/api/users", {
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
          (response.name && response.job !== "")?
          history.push('/home'):
          setErrr("Please Fill all the fields")
          setIsLoaded(false);
        })
        .catch((err) => {
          console.log(err)
          setIsLoaded(false)
        });
    }

  return (

    <div className="loginPage">
      <h2 variant="contained">Add Users</h2>
     <div className="form">
     <Formik
        initialValues={{ name: "", job: "" }}
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
              <Form.Control type="text" name="name"
                onChange={handleChange} value={values.name} placeholder="Name"/>
            </Form.Group>
            
            <Form.Group>
              <Form.Control
                type="text"
                name="job"
                onChange={handleChange}
                value={values.job}
                placeholder="Job"/>
            </Form.Group>

              <Button className="loginBtn" variant="contained" color="primary" type="submit" startIcon={<SaveIcon/>} >
                Submit{isLoaded? <ReactBootStrap.Spinner animation="border"/>: null}
              </Button>
          </Form>
        )}
      </Formik>
      <p className="warning">{errr}</p>
     </div>
    </div>
  );
}
export default AddUsers;
