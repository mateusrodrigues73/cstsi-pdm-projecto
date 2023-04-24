import React, { useState, useContext } from 'react';

import { UsuarioContext } from '../../context/UsuarioProvider';
import {Container, TextInput, Text} from './styles';
import Loading from '../../components/Loading';
import MyButtom from '../../components/MyButtom';

const salvar = () => {
  alert('foi');
}

const excluir = () => {
  alert('foi');
}

const Usuario = () => {
  const [nome, setNome] = useState('');
  const [sobrenome, setSobrenome] = useState('');
  const [saldo, setSaldo] = useState('0.00');
  const [addSaldo, setAddSaldo] = useState('');
  const [loading, setLoading] = useState(false);
  const {save, del} = useContext(UsuarioContext);

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
      />
      <Text>Saldo atual: R${saldo}</Text>
      <MyButtom text="Salvar" onClick={salvar} />
      <MyButtom text="Excluir" onClick={excluir} />
      {loading && <Loading />}
    </Container>
  );
}

export default Usuario;
