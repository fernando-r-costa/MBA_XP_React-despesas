import React, { useContext } from "react";
import { IUser } from "./backend";

export interface IAuthContext {
  user: IUser;
  onSignOut: () => void;
}

export const authContext = React.createContext<IAuthContext>({
  user: {
    nome: "",
    email: "",
  },
  onSignOut: () => {},
});

export function useAuthContext() {
  return useContext(authContext);
}
