import React, { useState } from "react";
import * as ReactBootStrap from "react-bootstrap";
import { useHistory} from "react-router-dom";
import { Formik } from "formik";
import { Form } from "react-bootstrap";
import { Button } from "@material-ui/core";
import SaveIcon from "@material-ui/icons/Save";

function AddUsers() {
  const history = useHistory();
  const [data, setData] = useState("");
  const [errr, setErrr] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const formSubmit = (data) => {
    setIsLoading(true);
    fetch("https://reqres.in/api/users", {
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
       ( response.name && response.job !== "")
          ? history.push("/home")
          : setErrr("Please Fill all the fields");
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  };

  return (
    <div className="formPage">
      <h2 variant="contained">Add Users</h2>
      <div className="form">
        <Formik
          initialValues={{ name: "", job: "" }}
          onSubmit={(values, { setSubmitting }) => {
            setData(values);
            formSubmit(values);
            setSubmitting(false);
          }}
        >
          {({
            values,
            handleChange,
            handleSubmit,
          }) => (
            <Form onSubmit={handleSubmit}>
              <Form.Group>
                <Form.Control
                  type="text"
                  name="name"
                  onChange={handleChange}
                  value={values.name}
                  placeholder="Name"
                />
              </Form.Group>

              <Form.Group>
                <Form.Control
                  type="text"
                  name="job"
                  onChange={handleChange}
                  value={values.job}
                  placeholder="Job"
                />
              </Form.Group>

              <Button
                className="loginBtn"
                variant="contained"
                color="primary"
                type="submit"
                startIcon={<SaveIcon />}
              >
                Submit
                {isLoading && <ReactBootStrap.Spinner animation="border" />}
              </Button>
            </Form>
          )}
        </Formik>
        <p className="warning">{errr}</p>
      </div>
    </div>
  )
}
export default AddUsers;
