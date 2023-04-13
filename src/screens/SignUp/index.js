import React, { useState } from 'react';
import { Alert } from 'react-native';
import auth from '@react-native-firebase/auth'; 
import firestore from '@react-native-firebase/firestore';
import { CommonActions } from '@react-navigation/native';

import MyButtom from '../../components/MyButtom';
import { Body, TextInput } from './styles';

const SignUp = ({navigation}) => {
  const [nome, setNome] = useState('');  
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  
  const cadastrar = () => {
    if (nome !== '' && email !== '' && pass !== '' && confirmPass !== '') {
      if (pass === confirmPass) {
        auth().createUserWithEmailAndPassword(email, pass)
          .then(() => {
            const userF = auth().currentUser;
            const user = {};
            user.nome = nome;
            user.email = email;
            userF.sendEmailVerification()
              .then(() => {
                Alert.alert('Informação', 'Um email de confirmação foi enviado para: .' + email);
                navigation.dispatch(
                  CommonActions.reset({
                    index: 0,
                    routes: [{name: 'SignIn'}]
                  }),
                );
              })
              .catch((e) => {
                console.log(`SignUp, cadastrar: ${e}`);
              })
          })
          .catch((e) => {
            console.log(`SignUp, cadastrar: ${e}`);
            switch(e.code){
              case 'auth/email-already-in-use': 
                Alert.alert('Erro', 'Email já esta em uso.'); 
                break;
              case 'auth/operation-not-allowed':
                Alert.alert('Erro', 'Problema ao cadastrar usuário.'); 
                break;
              case 'auth/invalid-email':
                Alert.alert('Erro', 'Email inválido.'); 
                break;
              case 'auth/weak-password':
                Alert.alert('Erro', 'Senha fraca.'); 
                break;
            }
          });
      } else {
        Alert.alert('Erro', 'Senhas devem ser iguais.');
      }
    }  else {
      Alert.alert('Erro', 'Preencha todos os campos.');
    }
  };

  return (
    <Body>
      <TextInput
        placeholder="Nome completo"
        keyboardType="default"
        returnKeyType="next"
        onChangeText={(t) => setNome(t)}
      />
      <TextInput
        placeholder="Email"
        keyboardType="email-address"
        returnKeyType="next"
        onChangeText={(t) => setEmail(t)}
      />
      <TextInput
        secureTextEntry={true}
        placeholder="Senha"
        keyboardType="default"
        returnKeyType="next"
        onChangeText={(t) => setPass(t)}
      />
      <TextInput
        secureTextEntry={true}
        placeholder="Confirmar senha"
        keyboardType="default"
        returnKeyType="go"
        onChangeText={(t) => setConfirmPass(t)}
      />
      <MyButtom text="cadastrar" onClick={cadastrar}/>
    </Body>
  );
};

export default SignUp;
