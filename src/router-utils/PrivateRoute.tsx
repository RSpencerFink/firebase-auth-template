import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";

import { Context } from "context";

const PrivateRoute = (props) => {
  const { rest, children } = props;
  const { user } = useContext(Context);
  return (
    <Route
      {...rest}
      render={({ location }) =>
        user ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};

export default PrivateRoute;
