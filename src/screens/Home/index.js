import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import EncryptedStorage from 'react-native-encrypted-storage';
import auth from '@react-native-firebase/auth';
import {CommonActions} from '@react-navigation/native';

import MyButtom from '../../components/MyButtom';
import {Text} from './styles';

const Home = ({navigation}) => {
  const [cont, setCont] = useState(0);

  useEffect(() => {
    console.log('chamou na criação do componente');

    return () => {
      console.log('chamou ao destruir o componente');
    };
  }, []);

  useEffect(() => {
    console.log('chamou na atualização do componente');
  }, [cont]);

  const incrementar = () => {
    setCont(cont + 1);
  };

  const decrementar = () => {
    setCont(cont - 1);
  };

  const signOut = () => {
    EncryptedStorage.removeItem('user_session')
      .then(() => {
        auth()
          .signOut()
            .then(() => {})
            .catch((e) => {
              console.error(`Home, signOut, auth: ${e}`);
            });
            navigation.dispatch(
              CommonActions.reset({
                index: 0,
                routes: [{name: 'AuthStack'}],
              }),
            ); 
      })
      .catch((e) =>{
        console.error(`Home, signOut, removeItem: ${e}`);
      });
  }

  return (
    <View>
      <Text>Contador: {cont}</Text>
      <MyButtom text="Incrementar" onClick={incrementar} />
      <MyButtom text="Decrementar" onClick={decrementar} />
      <MyButtom text="Sair" onClick={signOut} />
    </View>
  );
};
export default Home;
