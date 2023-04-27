import React, { createContext, useContext, useState } from "react";

import { ApiContext } from "./ApiProvider";

export const ProdutosContext = createContext({});

export const ProdutosProvider = ({children}) => {
  const {api} = useContext(ApiContext);
  const [produtos, setProdutos] = useState([]);

  const getProdutos = async () => {
    try {
      const response = await api.get('/produtos');
      //console.log('Dados buscados via API');
      //console.log(response.data);
      //console.log(response.data.documents);
      let data = [];
      response.data.documents.map((d) => {
        let k = d.name.split(
          'projects/cstsi-pdm-projeto/databases/(default)/documents/produtos/',
        );
        //console.log(k[1]);
        //console.log(d.fields.nome.stringValue);
        //console.log(d.fields.tecnologias.stringValue);
        data.push({
          modelo: d.fields.modelo.stringValue,
          marca: d.fields.marca.stringValue,
          preco: d.fields.preco.stringValue,
          uid: k[1],
        });
      });
      data.sort((a, b) => b.modelo.localeCompare(a.modelo));
      setProdutos(data);
    } catch (response) {
      console.error('Erro ao buscar via API.');
      console.error(response);
    }
  };

  return (
    <ProdutosContext.Provider value={{produtos, getProdutos}}>
      {children}
    </ProdutosContext.Provider>
  );
}
