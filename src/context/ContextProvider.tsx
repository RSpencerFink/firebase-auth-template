import React, { useState, useEffect } from "react";
import Context from "./Context";
import { auth } from "firebase-db";

const ContextProvider = (props: any) => {
  const { children } = props;
  const [user, setUser] = useState(() => auth.currentUser);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user ? user : null);
      if (loading) {
        setLoading(false);
      }
    });
    return unsubscribe;
  }, [loading]);

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
        logOut,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default ContextProvider;
