import React from "react";

import Navigator from "./Navigator";
import { AuthUserProvider } from "../context/AuthUserProvider";
import { UsuarioProvider } from "../context/UsuarioProvider";
import { EstudanteProvider } from "../context/EstudanteProvider";

export default function Providers() {
  return (
    <AuthUserProvider>
      <EstudanteProvider>
        <UsuarioProvider>
          <Navigator/>
        </UsuarioProvider>        
      </EstudanteProvider>
    </AuthUserProvider>
  );
}
