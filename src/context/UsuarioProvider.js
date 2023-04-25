import React, { createContext, useEffect, useState } from "react";
import { Alert } from "react-native";
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth'; 
import EncryptedStorage from 'react-native-encrypted-storage';

export const UsuarioContext = createContext({});

export const UsuarioProvider = ({children}) => {
  const [usuarios, setUsuarios] = useState([]);
  const [authUser, setAuthUser] = useState();

  useEffect(() => {
    const listenerAuthUser = getAuthUser();
    const listenerUsers = getUsers();
    return () => {
      listenerAuthUser;
      listenerUsers;
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

  auth().onAuthStateChanged((user) => {
    if (user) {
      getAuthUser();
    } 
  });

  const getAuthUser = () => {
    if (auth.currentUser !== undefined) {
      const userF = auth().currentUser;
      const userUid = userF.uid;
      const listener =  firestore()
      .collection("usuarios")
      .doc(userUid)
      .onSnapshot((doc) => {
        const usuario = {
          uid: userUid,
          nome: doc.data().nome,
          sobrenome: doc.data().sobrenome,
          saldo: doc.data().saldo
        }
        setAuthUser(usuario);
      }, (error) => {
        console.error(`UsuarioProvider, getAuthUser: ${error.message}`);
      });
      return listener;
    }
  }

  const save = async (uid, nome, sobrenome, saldo) => {
    await firestore()
    .collection('usuarios')
    .doc(uid)
    .set({nome, sobrenome, saldo}, {merge: true})
    .then(() => {Alert.alert('Sucesso', 'Usuário alterado com êxito')})
    .catch(err => console.error(`UsuarioProvider, save: ${err.message}`))
  }

  const del = async (uid) => {
    await firestore()
    .collection('usuarios')
    .doc(uid)
    .delete()
    .then(() => {
      EncryptedStorage.removeItem('user_session')
      .then(() => {
        const userF = auth().currentUser;
        userF.delete()
        .then(() => {
          Alert.alert('Sucesso!', 'Sua conta foi removida');
        })
        .catch((error) => {
          console.error(`Usuarioprovider, del, auth.del: ${error.message}`);
        });
      })
    })
    .catch(err => console.error(`UsuarioProvider, del: ${err.message}`));
  }

      

  return (
    <UsuarioContext.Provider value={{usuarios, authUser, save, del}}>
      {children}
    </UsuarioContext.Provider>
  );
}