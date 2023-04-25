import React, { useState, useEffect, useContext } from 'react';
import { Alert } from 'react-native';
import {CommonActions} from '@react-navigation/native';

import { UsuarioContext } from '../../context/UsuarioProvider';
import {Container, TextInput, Text} from './styles';
import Loading from '../../components/Loading';
import MyButtom from '../../components/MyButtom';

const Usuario = ({navigation}) => {
  const {authUser} = useContext(UsuarioContext);
  const [uid, setUid] = useState('');
  const [nome, setNome] = useState('');
  const [sobrenome, setSobrenome] = useState('');
  const [saldo, setSaldo] = useState(0);
  const [addSaldo, setAddSaldo] = useState();
  const [loading, setLoading] = useState(false);
  const {save, del} = useContext(UsuarioContext);

  const salvar = async () => {
    setLoading(true);
    const novoSaldo = addSaldo ? saldo + parseFloat(addSaldo) : saldo;
    await save(uid, nome, sobrenome, novoSaldo);
    setAddSaldo();
    setLoading(false);
  }
  
  const excluir = () => {
    Alert.alert('Opa!', 'Você tem certeza que deseja deletar sua conta?', [
      {
        text: 'Cancelar',
        onPress: () => {}
      },
      {
        text: 'Continuar',
        onPress: async () => {
          setLoading(true);
          await del(uid);
          setLoading(false);
          navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{name: 'AuthStack'}],
            }),
          ); 
        }
      }
    ])
  }

  useEffect(() => {
    setUid(authUser.uid);
    setNome(authUser.nome);
    setSobrenome(authUser.sobrenome);
    setSaldo(authUser.saldo);
  }, [saldo, authUser]);
  
  return (
    <Container>
      <TextInput
        placeholder="Nome"
        keyboardType="default"
        returnKeyType="go"
        onChangeText={t => setNome(t)}
        value={nome}
      />
      <TextInput
        placeholder="Sobrenome"
        keyboardType="default"
        returnKeyType="go"
        onChangeText={t => setSobrenome(t)}
        value={sobrenome}
      />
      <TextInput
        placeholder="Adionar saldo"
        keyboardType="numeric"
        returnKeyType="go"
        onChangeText={t => setAddSaldo(t)}
        value={addSaldo}
      />
      <Text>Saldo atual: R${saldo}</Text>
      <MyButtom text="Salvar" onClick={salvar} />
      <MyButtom text="Excluir" onClick={excluir} />
      {loading && <Loading />}
    </Container>
  );
}

export default Usuario;
