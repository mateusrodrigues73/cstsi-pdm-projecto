import React, {useContext, useEffect, useState} from 'react';
import {CommonActions} from '@react-navigation/native';

import AddFloatButton from '../../components/AddFloatButton';
import Item from './Item';
import {Container, FlatList} from './styles';

import {ProdutosContext} from '../../context/ProdutosProvider';
import {UsuarioContext} from '../../context/UsuarioProvider';

const Anuncios = ({navigation}) => {
  const {produtos} = useContext(ProdutosContext);
  const {authUser} = useContext(UsuarioContext);
  const [userSessionProdutos, setUserSessionProdutos] = useState(null);

  const routeAddAnuncio = () => {
    navigation.dispatch(
      CommonActions.navigate({
        name: 'Anuncio',
        params: {produto: null},
      }),
    );
  };

  const routeProduto = item => {
    navigation.dispatch(
      CommonActions.navigate({
        name: 'Anuncio',
        params: {produto: item},
      }),
    );
  };

  const filterProdutos = text => {
    let p = [];
    produtos.forEach(e => {
      if (e.userId === authUser.uid) {
        p.push(e);
      }
    });
    if (p.length > 0) {
      setUserSessionProdutos(p);
    }
  };

  const renderItem = ({item}) => (
    <Item item={item} onPress={() => routeProduto(item)} />
  );

  useEffect(() => {
    filterProdutos();
  }, [produtos]);

  return (
    <Container>
      <FlatList
        data={userSessionProdutos}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
      <AddFloatButton onClick={routeAddAnuncio} />
    </Container>
  );
};

export default Anuncios;
