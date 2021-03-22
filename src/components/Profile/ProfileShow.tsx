import { Typography } from "@material-ui/core";
import React from "react";
import firebase from "firebase";

const ProfileShow = ({
  user,
  userData,
}: {
  user: firebase.User;
  userData?: firebase.firestore.DocumentData;
}) => {
  return (
    <>
      <div className="row margin-bottom">
        <Typography variant="subtitle2">Email:</Typography>
        <Typography variant="subtitle1">{user.email}</Typography>
      </div>
      <div className="row margin-bottom">
        <Typography variant="subtitle2">Display Name:</Typography>
        <Typography variant="subtitle1">{user.displayName}</Typography>
      </div>
      <div className="row margin-bottom">
        <Typography variant="subtitle2">Address:</Typography>
        <Typography variant="subtitle1">
          {userData ? userData.address : "N/A"}
        </Typography>
      </div>
      <div className="row margin-bottom">
        <Typography variant="subtitle2">City:</Typography>
        <Typography variant="subtitle1">
          {userData ? userData.city : "N/A"}
        </Typography>
      </div>
      <div className="row margin-bottom">
        <Typography variant="subtitle2">Zip Code:</Typography>
        <Typography variant="subtitle1">
          {userData ? userData.zip : "N/A"}
        </Typography>
      </div>
    </>
  );
};

export default ProfileShow;
