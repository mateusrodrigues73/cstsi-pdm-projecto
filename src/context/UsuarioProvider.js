import React, { createContext, useEffect, useState } from "react";
import { Alert } from "react-native";
import firestore from '@react-native-firebase/firestore';

export const UsuarioContext = createContext({});

export const UsuarioProvider = ({children}) => {
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    const listener = getUsers();
    return () => {
      listener();
    };
  }, []);

  const getUsers = () => {
    const listener = firestore()
    .collection('usuarios')
    .orderBy('nome')
    .onSnapshot(snapshot => {
      let data = [];
      snapshot.forEach(doc => {
        data.push({
          uid: doc.id,
          nome: doc.data().nome,
          sobrenome: doc.data().sobrenome,
          saldo: doc.data().saldo
        });
      });
      setUsuarios(data);
    });
    return listener;
  }

  const save = async (uid, nome, sobrenome, saldo) => {
    await firestore()
    .collection('usuarios')
    .doc(uid)
    .set({nome, sobrenome, saldo}, {merge: true})
    .then(() => Alert.alert('Sucesso', 'Usuário alterado com sucesso'))
    .catch(err => console.error(`UsuarioProvider, save: ${err.message}`))
  }

  const del = async (uid) => {
    await firestore()
      .collection('usuarios')
      .doc(uid)
      .delete()
      .then(() => Alert.alert('Sucesso!', 'Estudante removido com sucesso'))
      .catch(err => console.error(`UsuarioProvider, del: ${err.message}`))
  }

  return (
    <UsuarioContext.Provider value={{usuarios, save, del}}>
      {children}
    </UsuarioContext.Provider>
  );
}