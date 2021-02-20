import React from "react";
import { Route, Redirect, useLocation } from "react-router-dom";

const ProtectedForm = ({ component: Component, ...rest }) => {
  const token = localStorage.getItem("Token");

  return (
    <Route
      {...rest}
      render={(props) => {
        if (token) {
          return (
            <Redirect
              to={{
                pathname: "/",
                state: {
                  from: props.location,
                },
              }}
            />
          );
        } else {
          return <Component {...rest} {...props} />;
        }
      }}
    />
  );
};

export default ProtectedForm;
