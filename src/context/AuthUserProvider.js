import React, { createContext, useEffect, useState } from "react";
import auth from '@react-native-firebase/auth';

export const AuthUserContext = createContext({});

export const AuthUserProvider = ({children}) => {
  const [usuario, setUsuario] = useState();

  return (
    <AuthUserContext.Provider value={{usuario, setUsuario}}>
      {children}
    </AuthUserContext.Provider>
  );
}
