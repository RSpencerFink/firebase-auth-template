import { Typography } from "@material-ui/core";
import { Context } from "context";
import React, { useContext } from "react";
import styled from "styled-components";

const ProfilePage = styled.div`
  display: flex;
  flex-direction: column;
  width: 33%;
  margin: 0 auto;
  .row {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
  }
`;

const Profile = () => {
  const { user } = useContext(Context);
  return user ? (
    <ProfilePage>
      <div className="row">
        <Typography variant="subtitle2">Email:</Typography>
        <Typography variant="subtitle1">{user.email}</Typography>
      </div>
      <div className="row">
        <Typography variant="subtitle2">Display Name:</Typography>
        <Typography variant="subtitle1">{user.displayName}</Typography>
      </div>
    </ProfilePage>
  ) : null;
};

export default Profile;
