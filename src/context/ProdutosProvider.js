import React, {createContext, useContext, useState, useEffect} from 'react';

import {ApiContext} from './ApiProvider';

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
      response.data.documents.map(d => {
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
          userId: d.fields.userId.stringValue,
          id: k[1],
        });
      });
      data.sort((a, b) => b.modelo.localeCompare(a.modelo));
      setProdutos(data);
    } catch (response) {
      console.error('Erro ao buscar via API.');
      console.error(response);
    }
  };

  const save = async val => {
    try {
      await api.post('/produtos/', {
        fields: {
          modelo: {stringValue: val.modelo},
          marca: {stringValue: val.marca},
          preco: {stringValue: val.preco},
          userId: {stringValue: val.userId},
        },
      });
      await getProdutos();
      return true;
    } catch (response) {
      console.error(`ProdutoProvider, save: ${response}`);
      return false;
    }
  };

  const update = async val => {
    try {
      await api.patch('/produtos/' + val.id, {
        fields: {
          modelo: {stringValue: val.modelo},
          marca: {stringValue: val.marca},
          preco: {stringValue: val.preco},
          userId: {stringValue: val.userId},
        },
      });
      await getProdutos();
      return true;
    } catch (response) {
      console.error(`ProdutoProvider, update: ${response}`);
      return false;
    }
  };

  const del = async val => {
    try {
      await api.delete('/produtos/' + val);
      await getProdutos();
      return true;
    } catch (response) {
      console.error(`ProdutoProvider, delete: ${response}`);
      return false;
    }
  };

  useEffect(() => {
    if (api) {
      getProdutos();
    }
  }, [api]);

  return (
    <ProdutosContext.Provider
      value={{produtos, getProdutos, save, update, del}}>
      {children}
    </ProdutosContext.Provider>
  );
};
