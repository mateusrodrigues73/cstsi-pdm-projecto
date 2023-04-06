import React, { createContext, useEffect, useState } from "react";
import { Alert } from "react-native";
import firestore from '@react-native-firebase/firestore';

export const EstudanteContext = createContext({});

export const EstudanteProvider = ({children}) => {
  const [estudantes, setEstudantes] = useState([]);

  useEffect(() => {
    const listener = firestore()
    .collection('estudantes')
    .orderBy('nome')
    .onSnapshot(snapshot => {
      let data = [];
      snapshot.forEach(doc => {
        data.push({
          uid: doc.id,
          nome: doc.data().nome,
          curso: doc.data().curso
        });
      });
      setEstudantes(data);
    });

    return () => {
      listener();
    };
  }, []);

  const save = async (uid, nome, curso) => {
    if(!uid){
      await firestore()
      .collection('estudantes')
      .doc()
      .set({nome, curso}, {merge: true})
      .then(() => Alert.alert('Sucesso', 'Estudante cadastrado com sucesso'))
      .catch(err => console.error('Estudante, Save user: ' + err.message))
    } else {
      await firestore()
      .collection('estudantes')
      .doc(uid)
      .set({nome, curso}, {merge: true})
      .then(() => Alert.alert('Sucesso', 'Estudante atualizado com sucesso'))
      .catch(err => console.error('Estudante, Save user: ' + err.message))
    }
  }

  const del = async (uid) => {
    await firestore()
      .collection('estudantes')
      .doc(uid)
      .delete()
      .then(() => Alert.alert('Sucesso!', 'Estudante removido com sucesso'))
      .catch(err => console.error('Estudante, Erase user: ' + err.message))
  }

  return (
    <EstudanteContext.Provider value={{estudantes, save, del}}>
      {children}
    </EstudanteContext.Provider>
  );
}
