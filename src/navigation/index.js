import React from "react";

import { EstudanteProvider } from "../context/EstudanteProvider";
import { AuthUserProvider } from "../context/AuthUserProvider";
import Navigator from "./Navigator";

export default function Providers() {
  return (
    <AuthUserProvider>
      <EstudanteProvider>
        <Navigator/>
      </EstudanteProvider>
    </AuthUserProvider>
  );
}
