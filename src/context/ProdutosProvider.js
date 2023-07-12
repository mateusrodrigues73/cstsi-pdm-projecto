// eslint-disable-next-line no-unused-vars
import React, {createContext, useContext, useState, useEffect} from 'react';
import firestore from '@react-native-firebase/firestore';

// import {ApiContext} from './ApiProvider';

export const ProdutosContext = createContext({});

export const ProdutosProvider = ({children}) => {
  // const {api} = useContext(ApiContext);
  const [produtos, setProdutos] = useState([]);

  // const getProdutos = async () => {
  //   try {
  //     const response = await api.get('/produtos');
  //     //console.log('Dados buscados via API');
  //     //console.log(response.data);
  //     //console.log(response.data.documents);
  //     let data = [];
  //     response.data.documents.map(d => {
  //       let k = d.name.split(
  //         'projects/cstsi-pdm-projeto/databases/(default)/documents/produtos/',
  //       );
  //       //console.log(k[1]);
  //       //console.log(d.fields.nome.stringValue);
  //       //console.log(d.fields.tecnologias.stringValue);
  //       data.push({
  //         modelo: d.fields.modelo.stringValue,
  //         marca: d.fields.marca.stringValue,
  //         preco: d.fields.preco.stringValue,
  //         latitude: d.fields.latitude.stringValue,
  //         longitude: d.fields.longitude.stringValue,
  //         userId: d.fields.userId.stringValue,
  //         id: k[1],
  //       });
  //     });
  //     data.sort((a, b) => b.modelo.localeCompare(a.modelo));
  //     setProdutos(data);
  //   } catch (response) {
  //     console.error('Erro ao buscar via API.');
  //     console.error(response);
  //   }
  // };

  const getProdutos = async () => {
    try {
      const response = await firestore().collection('produtos').get();
      let data = [];
      response.forEach(doc => {
        data.push({
          id: doc.id,
          modelo: doc.data().modelo,
          marca: doc.data().marca,
          preco: doc.data().preco,
          latitude: doc.data().latitude,
          longitude: doc.data().longitude,
          userId: doc.data().userId,
        });
      });
      data.sort((a, b) => b.modelo.localeCompare(a.modelo));
      setProdutos(data);
    } catch (error) {
      console.error('Erro ao buscar via Firebase.');
      console.error(error);
    }
  };

  // const save = async val => {
  //   try {
  //     await api.post('/produtos/', {
  //       fields: {
  //         modelo: {stringValue: val.modelo},
  //         marca: {stringValue: val.marca},
  //         preco: {stringValue: val.preco},
  //         latitude: {stringValue: val.latitude},
  //         longitude: {stringValue: val.longitude},
  //         userId: {stringValue: val.userId},
  //       },
  //     });
  //     await getProdutos();
  //     return true;
  //   } catch (response) {
  //     console.error(`ProdutoProvider, save: ${response}`);
  //     return false;
  //   }
  // };

  const save = async val => {
    try {
      await firestore().collection('produtos').doc(val.id).set(
        {
          modelo: val.modelo,
          marca: val.marca,
          preco: val.preco,
          latitude: val.latitude,
          longitude: val.longitude,
          userId: val.userId,
        },
        {merge: true},
      );
      return true;
    } catch (error) {
      console.error(`ProdutoProvider, save: ${error}`);
      return false;
    }
  };

  // const update = async val => {
  //   try {
  //     await api.patch('/produtos/' + val.id, {
  //       fields: {
  //         modelo: {stringValue: val.modelo},
  //         marca: {stringValue: val.marca},
  //         preco: {stringValue: val.preco},
  //         latitude: {stringValue: val.latitude},
  //         longitude: {stringValue: val.longitude},
  //         userId: {stringValue: val.userId},
  //       },
  //     });
  //     await getProdutos();
  //     return true;
  //   } catch (response) {
  //     console.error(`ProdutoProvider, update: ${response}`);
  //     return false;
  //   }
  // };

  const update = async val => {
    try {
      await firestore().collection('produtos').doc(val.id).update(val);
      return true;
    } catch (error) {
      console.error(`ProdutoProvider, update: ${error}`);
      return false;
    }
  };

  // const del = async val => {
  //   try {
  //     await api.delete('/produtos/' + val);
  //     await getProdutos();
  //     return true;
  //   } catch (response) {
  //     console.error(`ProdutoProvider, delete: ${response}`);
  //     return false;
  //   }
  // };

  const del = async val => {
    try {
      await firestore().collection('produtos').doc(val).delete();
      return true;
    } catch (error) {
      console.error(`ProdutoProvider, delete: ${error}`);
      return false;
    }
  };

  // useEffect(() => {
  //   if (api) {
  //     getProdutos();
  //   }
  // }, [api]);

  useEffect(() => {
    const listener = firestore()
      .collection('produtos')
      .orderBy('modelo')
      .onSnapshot(snapShot => {
        if (snapShot) {
          let data = [];
          snapShot.forEach(doc => {
            data.push({
              id: doc.id,
              modelo: doc.data().modelo,
              marca: doc.data().marca,
              preco: doc.data().preco,
              latitude: doc.data().latitude,
              longitude: doc.data().longitude,
              userId: doc.data().userId,
            });
          });
          setProdutos(data);
        }
      });

    return () => {
      listener();
    };
  }, []);

  useEffect(() => {
    getProdutos();
  }, []);

  return (
    <ProdutosContext.Provider
      value={{produtos, getProdutos, save, update, del}}>
      {children}
    </ProdutosContext.Provider>
  );
};
