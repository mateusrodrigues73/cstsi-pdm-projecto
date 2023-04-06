import React, {useEffect, useContext} from 'react';
import {View} from 'react-native';
import EncryptedStorage from 'react-native-encrypted-storage';
import auth from '@react-native-firebase/auth';
import {CommonActions} from '@react-navigation/native';

import Item from './Item';
import {EstudanteContext} from '../../context/EstudanteProvider';
import MyButtom from '../../components/MyButtom';
import AddFloatButton from '../../components/AddFloatButton';
import {Container, Text} from './styles'; 

const Estudantes = ({navigation}) => {
  const {estudantes} = useContext(EstudanteContext);

  useEffect(() => {
    //console.log(estudantes);
  }, [estudantes]);

  const routeStudent = value => {
    navigation.navigate('Estudante', {value});
  };
  
  const signOut = () => {
    EncryptedStorage.removeItem('user_session')
      .then(() => {
        auth()
          .signOut()
            .then(() => {})
            .catch((e) => {
              console.error(`Estudantes, signOut, auth: ${e}`);
            });
            navigation.dispatch(
              CommonActions.reset({
                index: 0,
                routes: [{name: 'AuthStack'}],
              }),
            ); 
      })
      .catch((e) =>{
        console.error(`Estudantes, signOut, removeItem: ${e}`);
      });
  }

  return (
    <Container>
      <Text>Estudantes</Text>

      {estudantes.map((v, k) => {
        return <Item item={v} onPress={() => routeStudent(v)} key={k} />;
      })}

      <AddFloatButton onClick={() => routeStudent(null)} />
      <MyButtom text="Sair" onClick={signOut} />
    </Container>
  );
};

export default Estudantes;
