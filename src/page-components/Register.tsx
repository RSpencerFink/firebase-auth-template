import React from "react";
import styled from "styled-components";
import { Typography } from "@material-ui/core";
import { Link } from "react-router-dom";

import { auth } from "firebase-db";
import { LoginRegisterForm } from "components";
import { RegisterFormData } from "components/LoginRegisterForm";

const RegisterPage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const Register = () => {
  const handleSubmit = async (formData: RegisterFormData) => {
    try {
      await auth.createUserWithEmailAndPassword(
        formData.email,
        formData.password
      );
      await auth.currentUser?.updateProfile({
        displayName: formData.firstname + formData.lastname,
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <RegisterPage>
      <Typography>REGISTER</Typography>
      <LoginRegisterForm handleSubmit={handleSubmit} isRegister={true} />
      <Typography>
        Already have an account? <Link to="/login">Log in</Link>
      </Typography>
    </RegisterPage>
  );
};

export default Register;
