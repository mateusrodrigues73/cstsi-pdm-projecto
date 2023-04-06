
import React, {useEffect, useState} from 'react';

import MyButtom from '../../components/MyButtom';
import {Container, Text, TextInput} from './styles';

const Estudante = ({route}) => {
  const [uid, setUid] = useState('');
  const [nome, setNome] = useState('');
  const [curso, setCurso] = useState();
  const [loading, setLoading] = useState(false);

  const log = () => {
    console.log(route.params);
  };

  useEffect(() => {
    if (route.params.value) {
      setUid(route.params.value.uid);
      setNome(route.params.value.nome);
      setCurso(route.params.value.curso);
    }
  }, [route]);

  return (
    <Container>
      <TextInput
        placeholder="Nome Completo"
        keyboardType="default"
        returnKeyType="go"
        onChangeText={t => setNome(t)}
        value={nome}
      />
      <TextInput
        placeholder="Curso"
        keyboardType="default"
        returnKeyType="go"
        onChangeText={t => setCurso(t)}
        value={curso}
      />
      <MyButtom text="Salvar" onClick={log} />
    </Container>
  );
};

export default Estudante;