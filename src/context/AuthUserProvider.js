import React, { createContext, useState } from "react";
import auth from '@react-native-firebase/auth';

export const AuthUserContext = createContext({});

export const AuthUserProvider = ({children}) => {
  const [usuario, setUsuario] = useState();

  const getAuthUser = () => {
    setUsuario(auth().currentUser);
    return usuario;
  }

  return (
    <AuthUserContext.Provider value={{getAuthUser}}>
      {children}
    </AuthUserContext.Provider>
  );
}
