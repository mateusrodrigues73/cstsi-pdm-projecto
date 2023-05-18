import React from 'react';

import Navigator from './Navigator';
import {AuthUserProvider} from '../context/AuthUserProvider';
import {ApiProvider} from '../context/ApiProvider';
import {UsuarioProvider} from '../context/UsuarioProvider';
import {EstudanteProvider} from '../context/EstudanteProvider';
import {ProdutosProvider} from '../context/ProdutosProvider';

export default function Providers() {
  return (
    <AuthUserProvider>
      <ApiProvider>
        <EstudanteProvider>
          <UsuarioProvider>
            <ProdutosProvider>
              <Navigator />
            </ProdutosProvider>
          </UsuarioProvider>
        </EstudanteProvider>
      </ApiProvider>
    </AuthUserProvider>
  );
}
