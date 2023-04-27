import React from "react";

import Navigator from "./Navigator";
import { AuthUserProvider } from "../context/AuthUserProvider";
import { ApiProvider } from "../context/ApiProvider";
import { UsuarioProvider } from "../context/UsuarioProvider";
import { EstudanteProvider } from "../context/EstudanteProvider";

export default function Providers() {
  return (
    <AuthUserProvider>
      <ApiProvider>
        <EstudanteProvider>
          <UsuarioProvider>
            <Navigator/>
          </UsuarioProvider>        
        </EstudanteProvider>
      </ApiProvider>
    </AuthUserProvider>
  );
}
