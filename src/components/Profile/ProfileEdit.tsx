/* eslint-disable @typescript-eslint/no-unused-expressions */
import { TextField, Button } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import firebase from "firebase";
import styled from "styled-components";
import { auth, db } from "firebase-db";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

interface FormData {
  email: string;
  displayName: string;
  address: string;
  zip: string;
  city: string;
}

const defaultFormData = {
  email: "",
  displayName: "",
  address: "",
  zip: "",
  city: "",
};

const ProfileEdit = ({
  user,
  userData,
  setEdit,
}: {
  user: firebase.User;
  userData?: firebase.firestore.DocumentData;
  setEdit: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [formData, setFormData] = useState<FormData>(defaultFormData);

  const getDefaultFormData = () => {
    console.log("getDefaultFormdata");
    const newFormData = Object.assign({}, defaultFormData);
    if (user.email && user.displayName) {
      newFormData.email = user.email;
      newFormData.displayName = user.displayName;
    }
    if (userData) {
      newFormData.address = userData.address;
      newFormData.city = userData.city;
      newFormData.zip = userData.zip;
    }
    setFormData(newFormData);
  };

  useEffect(getDefaultFormData, [user, userData]);

  const submitForm = async (e) => {
    e.preventDefault();
    const { email, displayName, address, city, zip } = formData;
    try {
      await auth.currentUser?.updateEmail(email);
      await auth.currentUser?.updateProfile({
        displayName,
      });
      await db.collection("userData").doc(user.uid).set({
        address,
        city,
        zip,
      });
      setEdit(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e: React.FormEvent<HTMLFormElement>): void => {
    const target = e.target as HTMLInputElement;
    const { id, value } = target;
    setFormData((prevFormData) => ({ ...prevFormData, [id]: value }));
  };

  return (
    <Form onSubmit={submitForm} onChange={handleChange}>
      <TextField
        className="margin-bottom"
        id="email"
        label="Email"
        variant="outlined"
        type="email"
        value={formData.email}
        required
      />
      <TextField
        className="margin-bottom"
        id="displayName"
        label="Name"
        variant="outlined"
        type="text"
        value={formData.displayName}
        required
      />
      <TextField
        className="margin-bottom"
        id="address"
        label="Address"
        variant="outlined"
        type="text"
        value={formData.address}
      />
      <TextField
        className="margin-bottom"
        id="city"
        label="City"
        variant="outlined"
        type="text"
        value={formData.city}
      />
      <TextField
        className="margin-bottom"
        id="zip"
        label="Zip"
        variant="outlined"
        type="text"
        value={formData.zip}
      />
      <Button variant="contained" type="submit">
        UPDATE
      </Button>
    </Form>
  );
};

export default ProfileEdit;
