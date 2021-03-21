import React from "react";
import styled from "styled-components";
import { Typography } from "@material-ui/core";
import firebase from "firebase";
import { Link } from "react-router-dom";

import { auth } from "firebase-db";
import { LoginRegisterForm } from "components";
import { RegisterFormData } from "components/LoginRegisterForm";
import { Button } from "@material-ui/core";

const LoginPage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const Login = () => {
  const handleSubmit = async (formData: RegisterFormData) => {
    const credential = firebase.auth.EmailAuthProvider.credential(
      formData.email,
      formData.password
    );
    try {
      await auth.signInWithCredential(credential);
    } catch (error) {
      console.error(error);
    }
  };

  const signInWithGoogle = async () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.useDeviceLanguage();
    try {
      auth.signInWithPopup(provider);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <LoginPage>
      <Typography>LOGIN</Typography>
      <LoginRegisterForm handleSubmit={handleSubmit} isRegister={false} />
      <Button variant="contained" onClick={signInWithGoogle}>
        SIGN IN WITH GOOGLE
      </Button>
      <Typography>
        Don't have an account? <Link to="/register">Register</Link>
      </Typography>
    </LoginPage>
  );
};

export default Login;
