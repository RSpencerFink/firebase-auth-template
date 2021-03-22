/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import Context from "./Context";
import { auth, db } from "firebase-db";
import firebase from "firebase";
import { CircularProgress } from "@material-ui/core";

const ContextProvider = (props: any) => {
  const { children } = props;
  const [user, setUser] = useState(() => auth.currentUser);
  const [
    userData,
    setUserData,
  ] = useState<firebase.firestore.DocumentData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user ? user : null);
      if (loading) {
        setLoading(false);
      }
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    if (!user) {
      return;
    }
    const unsubscribe = db
      .collection("userData")
      .doc(user.uid)
      .onSnapshot((querySnapshot) => {
        const data = querySnapshot.data();
        if (data !== null && data !== undefined) {
          setUserData(data);
        }
      });
    return unsubscribe;
  }, [user]);

  const logOut = async () => {
    try {
      await auth.signOut();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Context.Provider
      value={{
        ...props,
        user,
        userData,
        logOut,
      }}
    >
      {loading ? <CircularProgress /> : children}
    </Context.Provider>
  );
};

export default ContextProvider;
