import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";

import { Context } from "context";

const AuthRoute = (props) => {
  const { rest, children } = props;
  const { user } = useContext(Context);
  return (
    <Route
      {...rest}
      render={({ location }) =>
        !user ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};

export default AuthRoute;
