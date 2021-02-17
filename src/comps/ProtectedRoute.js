import React from "react";
import { Route, Redirect, useLocation } from "react-router-dom";

const ProtectedRoute = ({ component: Component, ...rest }) => {

  const location = useLocation();
  const token = localStorage.getItem("Token");
  return (
    <Route
      {...rest}
      render={(props) => {
        if (token) {
          return <Component {...rest} {...props} />;
        } else {
          return (
            <Redirect
              to={{
                pathname: "/form",
                state: {
                  from: props.location,
                },
              }}
            />
          );
        }
      }}
    />
  );
};

export default ProtectedRoute;
