import firebase from "firebase";
import { createContext } from "react";

interface ContextState {
  user?: firebase.User;
  logOut: () => Promise<void>;
}

const defaultState: ContextState = {
  user: undefined,
  logOut: async () => {},
};

const Context = createContext<ContextState>(defaultState);

export default Context;
