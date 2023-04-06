
import React, {useEffect, useState, useContext} from 'react';
import { Alert } from 'react-native';

import { EstudanteContext } from '../../context/EstudanteProvider';
import Loading from '../../components/Loading';
import MyButtom from '../../components/MyButtom';
import {Container, TextInput} from './styles';

const Estudante = ({route, navigation}) => {
  const [uid, setUid] = useState('');
  const [nome, setNome] = useState('');
  const [curso, setCurso] = useState();
  const [loading, setLoading] = useState(false);
  const {save, del} = useContext(EstudanteContext);

  const salvar = async () => {
    setLoading(true);
    await save(uid, nome, curso);
    setLoading(false);
    navigation.goBack();
  };

  const excluir = () => {
    Alert.alert('Opa!', 'Você tem certeza que deseja apagar um estudante?', [
      {
        text: 'Cancel',
        onPress: () => {}
      },
      {
        text: 'OK',
        onPress: async () => {
          setLoading(true);
          await del(uid);
          setLoading(false);
          navigation.goBack();
        }
      }
    ])
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
      <MyButtom text="Salvar" onClick={salvar} />
      <MyButtom text="Excluir" onClick={excluir} />
      {loading && <Loading />}
    </Container>
  );
};

export default Estudante;