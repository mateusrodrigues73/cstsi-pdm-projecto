import React, {useState} from 'react';
import {Alert} from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {CommonActions} from '@react-navigation/native';

import MyButtom from '../../components/MyButtom';
import Loading from '../../components/Loading';
import {Body, TextInput} from './styles';

const SignUp = ({navigation}) => {
  const [nome, setNome] = useState('');
  const [sobrenome, setSobrenome] = useState('');
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [loading, setLoading] = useState(false);

  const salvar = async uid => {
    const saldo = 0;
    await firestore()
      .collection('usuarios')
      .doc(uid)
      .set({nome, sobrenome, saldo}, {merge: true})
      .then(() => true)
      .catch(err => {
        console.error('SignUp, salvar: ' + err.message);
        return false;
      });
  };

  const cadastrar = () => {
    setLoading(true);
    if (nome !== '' && email !== '' && pass !== '' && confirmPass !== '') {
      if (pass === confirmPass) {
        auth()
          .createUserWithEmailAndPassword(email, pass)
          .then(() => {
            const userF = auth().currentUser;
            const user = {};
            user.nome = nome;
            user.email = email;
            userF
              .sendEmailVerification()
              .then(() => {
                const retorno = salvar(userF.uid);
                if (retorno) {
                  setLoading(false);
                  Alert.alert(
                    'Informação',
                    'Um email de confirmação foi enviado para: .' + email,
                  );
                  navigation.dispatch(
                    CommonActions.reset({
                      index: 0,
                      routes: [{name: 'SignIn'}],
                    }),
                  );
                } else {
                  setLoading(false);
                  Alert.alert('Alerta', 'Erro ao salvar usuário!');
                }
              })
              .catch(e => {
                setLoading(false);
                console.log(`SignUp, cadastrar: ${e}`);
              });
          })
          .catch(e => {
            setLoading(false);
            console.log(`SignUp, cadastrar: ${e}`);
            switch (e.code) {
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
        setLoading(false);
        Alert.alert('Erro', 'Senhas devem ser iguais.');
      }
    } else {
      setLoading(false);
      Alert.alert('Erro', 'Preencha todos os campos.');
    }
  };

  return (
    <Body>
      <TextInput
        placeholder="Nome"
        keyboardType="default"
        returnKeyType="next"
        onChangeText={t => setNome(t)}
      />
      <TextInput
        placeholder="Sobrenome"
        keyboardType="default"
        returnKeyType="next"
        onChangeText={t => setSobrenome(t)}
      />
      <TextInput
        placeholder="Email"
        keyboardType="email-address"
        returnKeyType="next"
        onChangeText={t => setEmail(t)}
      />
      <TextInput
        secureTextEntry={true}
        placeholder="Senha"
        keyboardType="default"
        returnKeyType="next"
        onChangeText={t => setPass(t)}
      />
      <TextInput
        secureTextEntry={true}
        placeholder="Confirmar senha"
        keyboardType="default"
        returnKeyType="go"
        onChangeText={t => setConfirmPass(t)}
      />
      <MyButtom text="cadastrar" onClick={cadastrar} />
      {loading && <Loading />}
    </Body>
  );
};

export default SignUp;
