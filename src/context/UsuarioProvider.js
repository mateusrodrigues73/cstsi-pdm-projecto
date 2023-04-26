import React, { createContext, useEffect, useState, useContext } from "react";
import { Alert } from "react-native";
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth'; 
import EncryptedStorage from 'react-native-encrypted-storage';

export const UsuarioContext = createContext({});

export const UsuarioProvider = ({children}) => {
  const [usuarios, setUsuarios] = useState([]);
  const [authUser, setAuthUser] = useState();
  const [userSession, setUserSession] = useState();

  useEffect(() => {
    let listenerAuthUser;
    if (userSession) {
      listenerAuthUser = getAuthUser();
    }
    const listenerUsers = getUsers();
    return () => {
      listenerAuthUser;
      listenerUsers;
    };
  }, [userSession]);

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

  const getAuthUser = () => {
    const userUid = userSession.uid;
    const listener =  firestore()
    .collection("usuarios")
    .doc(userUid)
    .onSnapshot((doc) => {
      if(doc.exists) {
        const usuario = {
          uid: userUid,
          nome: doc.data().nome,
          sobrenome: doc.data().sobrenome,
          saldo: doc.data().saldo
        }
        setAuthUser(usuario);
      }
    }, (error) => {
      console.error(`UsuarioProvider, getAuthUser: ${error.message}`);
    });
    return listener;
  }

  const unsubscribe = auth().onAuthStateChanged((user) => {
    if (user) {
      setUserSession(user);
      unsubscribe();
    } 
  });

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
          setUserSession(null);
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
    <UsuarioContext.Provider value={{
      usuarios, 
      authUser, 
      setAuthUser, 
      save, 
      del
    }}>
      {children}
    </UsuarioContext.Provider>
  );
}