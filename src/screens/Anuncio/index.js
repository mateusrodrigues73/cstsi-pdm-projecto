import React, {useEffect, useState, useContext} from 'react';
import {Alert, ToastAndroid} from 'react-native';

import Loading from '../../components/Loading';
import MyButtom from '../../components/MyButtom';
import {Container, TextInput} from './styles';
import {UsuarioContext} from '../../context/UsuarioProvider';
import {ProdutosContext} from '../../context/ProdutosProvider';

const Anuncio = ({route, navigation}) => {
  const {save, update, del} = useContext(ProdutosContext);
  const {authUser} = useContext(UsuarioContext);
  const [loading, setLoading] = useState(false);
  const [id, setId] = useState(null);
  const [modelo, setModelo] = useState('');
  const [marca, setMarca] = useState('');
  const [preco, setPreco] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');

  const salvar = async () => {
    if (modelo && marca && preco) {
      let produto = {};
      produto.id = id;
      produto.modelo = modelo;
      produto.marca = marca;
      produto.preco = preco;
      produto.latitude = latitude;
      produto.longitude = longitude;
      produto.userId = authUser.uid;
      setLoading(true);
      if (id) {
        if (await update(produto)) {
          ToastAndroid.show(
            'Show! Você alterou com sucesso.',
            ToastAndroid.LONG,
          );
        } else {
          ToastAndroid.show('Ops! Erro ao alterar.', ToastAndroid.LONG);
        }
      } else {
        if (await save(produto)) {
          ToastAndroid.show(
            'Show! Você inluiu com sucesso.',
            ToastAndroid.LONG,
          );
        } else {
          ToastAndroid.show('Ops! Erro ao alterar.', ToastAndroid.LONG);
        }
      }
      setLoading(false);
      navigation.goBack();
    } else {
      Alert.alert('Atenção', 'Digite todos os campos.');
    }
  };

  const excluir = async () => {
    Alert.alert(
      'Fique Esperto!',
      'Você tem certeza que deseja excluir o anúncio?',
      [
        {
          text: 'Não',
          onPress: () => {},
          style: 'cancel',
        },
        {
          text: 'Sim',
          onPress: async () => {
            setLoading(true);
            if (await del(id)) {
              ToastAndroid.show(
                'Show! Você excluiu com sucesso.',
                ToastAndroid.LONG,
              );
            } else {
              ToastAndroid.show('Ops! Erro ao excluir.', ToastAndroid.LONG);
            }
            setLoading(false);
            navigation.goBack();
          },
        },
      ],
    );
  };

  function onGoBack(lat, long) {
    setLatitude(lat.toString());
    setLongitude(long.toString());
  }

  useEffect(() => {
    if (route.params.produto) {
      setModelo(route.params.produto.modelo);
      setMarca(route.params.produto.marca);
      setPreco(route.params.produto.preco);
      setLatitude(route.params.produto.latitude);
      setLongitude(route.params.produto.longitude);
      setId(route.params.produto.id);
    }
  }, [route]);

  return (
    <Container>
      <TextInput
        placeholder="Modelo"
        keyboardType="default"
        returnKeyType="go"
        onChangeText={t => setModelo(t)}
        value={modelo}
      />
      <TextInput
        placeholder="Marca"
        keyboardType="default"
        returnKeyType="go"
        onChangeText={t => setMarca(t)}
        value={marca}
      />
      <TextInput
        placeholder="Preço"
        keyboardType="default"
        returnKeyType="go"
        onChangeText={t => setPreco(t)}
        value={preco}
      />
      <TextInput
        placeholder="Latitude em decimal"
        keyboardType="default"
        returnKeyType="go"
        onChangeText={t => setLatitude(t)}
        value={latitude}
      />
      <TextInput
        placeholder="Longitude em decimal"
        keyboardType="default"
        returnKeyType="go"
        onChangeText={t => setLongitude(t)}
        value={longitude}
      />
      <MyButtom text="Salvar" onClick={salvar} />
      {id && <MyButtom text="Excluir" onClick={excluir} />}
      <MyButtom
        text="Obter Coordenadas no Mapa"
        onClick={() => navigation.navigate('ProdutosMap', {onGoBack})}
      />
      {loading && <Loading />}
    </Container>
  );
};

export default Anuncio;
