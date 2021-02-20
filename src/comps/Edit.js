import React, { useState } from "react";
import * as ReactBootStrap from "react-bootstrap";
import { Button } from "@material-ui/core";
import { useHistory, useParams, useLocation } from "react-router-dom";
import { Formik } from "formik";
import { Form } from "react-bootstrap";
import SaveIcon from "@material-ui/icons/Save";

function Edit() {
  const { id } = useParams();
  const history = useHistory();
  const location = useLocation();
  let item = location.state.data;

  const [errr, setErrr] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const formSubmit = (data) => {
    setIsLoading(true);
    fetch(`https://reqres.in/api/users/${id}`, {
      method: "put",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...data,
      }),
    })
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        history.push("/home");
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(err, "error");
      });
  };

  return (
    <div className="formPage">
      <h2 variant="contained">Edit Users</h2>
      <div className="form">
        <Formik
          initialValues={{
            name: item.name,
            pantone_value: item.pantone_value,
          }}
          onSubmit={(values, { setSubmitting }) => {
            formSubmit(values);
            setSubmitting(false);
          }}
        >
          {({ values, handleChange, handleSubmit }) => (
            <Form onSubmit={handleSubmit}>
              <Form.Group>
                <Form.Control
                  type="text"
                  name="name"
                  value={values.name}
                  onChange={handleChange}
                  placeholder="Name"
                />
              </Form.Group>

              <Form.Group>
                <Form.Control
                  value={values.pantone_value}
                  type="text"
                  name="pantone_value"
                  onChange={handleChange}
                  placeholder="Value"
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
  );
}
export default Edit;