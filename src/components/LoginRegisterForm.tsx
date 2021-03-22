import { Button } from "@material-ui/core";
import { TextField } from "@material-ui/core";
import React, { useState } from "react";
import styled from "styled-components";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 33%;
`;

export interface RegisterFormData {
  email: string;
  firstname: string;
  lastname: string;
  password: string;
  confirm_password: string;
}

const defaultFormData: RegisterFormData = {
  email: "",
  firstname: "",
  lastname: "",
  password: "",
  confirm_password: "",
};

const defaultFormErrors: RegisterFormData = {
  email: "",
  firstname: "",
  lastname: "",
  password: "",
  confirm_password: "",
};

const LoginRegisterForm = ({
  handleSubmit,
  isRegister,
}: {
  handleSubmit: (RegisterFormData) => void;
  isRegister: boolean;
}) => {
  const [formData, setFormData] = useState<RegisterFormData>(defaultFormData);
  const [formErrors, setFormErrors] = useState<RegisterFormData>(
    defaultFormData
  );

  const handleChange = (e: React.FormEvent<HTMLFormElement>): void => {
    const target = e.target as HTMLInputElement;
    const { id, value } = target;
    setFormData((prevFormData) => ({ ...prevFormData, [id]: value }));
  };

  const validateForm = () => {
    const newFormErrors = defaultFormErrors;
    const { email, firstname, lastname, password, confirm_password } = formData;
    if (
      !/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
        email
      )
    ) {
      newFormErrors.email = "Email is Invalid";
    }
    if (email === "") {
      newFormErrors.email = "Email is Required";
    }
    if (firstname === "") {
      newFormErrors.firstname = "First Name is Required";
    }
    if (lastname === "") {
      newFormErrors.lastname = "Last Name is Required";
    }
    if (password !== confirm_password) {
      newFormErrors.password = "Passwords must match";
      newFormErrors.confirm_password = "Passwords must match";
    }
    if (password === "") {
      newFormErrors.password = "Password is Required";
    }
    if (confirm_password === "") {
      newFormErrors.confirm_password = "Password is Required";
    }
    setFormErrors(newFormErrors);
    return newFormErrors;
  };

  const submitForm = (e): void => {
    e.preventDefault();
    if (isRegister) {
      const errors = validateForm();
      if (Object.values(errors).some((val) => val !== "")) {
        return;
      }
    }
    handleSubmit(formData);
  };

  return (
    <Form onSubmit={submitForm} onChange={handleChange}>
      <TextField
        id="email"
        label="Email"
        variant="outlined"
        type="email"
        value={formData.email}
        required
        error={!!formErrors.email}
        helperText={formErrors.email}
      />
      {isRegister && (
        <>
          <TextField
            id="firstname"
            label="First Name"
            variant="outlined"
            value={formData.firstname}
            required
            error={!!formErrors.email}
            helperText={formErrors.email}
          />
          <TextField
            id="lastname"
            label="Last Name"
            variant="outlined"
            value={formData.lastname}
            required
            error={!!formErrors.email}
            helperText={formErrors.email}
          />
        </>
      )}
      <TextField
        id="password"
        label="Password"
        variant="outlined"
        type="password"
        value={formData.password}
        required
        error={!!formErrors.email}
        helperText={formErrors.email}
      />
      {isRegister && (
        <TextField
          id="confirm_password"
          label="Confirm Password"
          variant="outlined"
          type="password"
          value={formData.confirm_password}
          required
          error={!!formErrors.email}
          helperText={formErrors.email}
        />
      )}
      <Button variant="contained" type="submit">
        {isRegister ? "REGISTER" : "LOG IN"}
      </Button>
    </Form>
  );
};

export default LoginRegisterForm;
