import React from "react";
import { useHistory } from "react-router";
import { AppBar, Toolbar, Typography } from "@material-ui/core";
import styled from "styled-components";

import AccountMenu from "./AccountMenu";

const StyledToolbar = styled(Toolbar)`
  justify-content: space-between;
`;

const AppName = styled(Typography)`
  cursor: pointer;
`;

const Header = () => {
  const history = useHistory();
  return (
    <AppBar position="static">
      <StyledToolbar>
        <AppName onClick={() => history.push("/")}>APP NAME</AppName>
        <AccountMenu />
      </StyledToolbar>
    </AppBar>
  );
};

export default Header;
