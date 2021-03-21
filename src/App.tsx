import React from "react";
import styled from "styled-components";
import { BrowserRouter as Router, Switch } from "react-router-dom";

import { ContextProvider } from "context";
import { Header } from "components";
import { Home, Login, Register } from "page-components";

import { ScrollToTop, PrivateRoute, AuthRoute } from "router-utils";

const AppContainer = styled.div``;

const App = () => {
  return (
    <ContextProvider>
      <Router>
        <ScrollToTop />
        <AppContainer>
          <Header />
          <Switch>
            <AuthRoute path="/login">
              <Login />
            </AuthRoute>
            <AuthRoute path="/register">
              <Register />
            </AuthRoute>
            <PrivateRoute path="/">
              <Home />
            </PrivateRoute>
          </Switch>
        </AppContainer>
      </Router>
    </ContextProvider>
  );
};

export default App;
