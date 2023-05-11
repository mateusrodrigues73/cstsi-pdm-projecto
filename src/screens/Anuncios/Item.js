
import React from 'react';
import styled from 'styled-components/native';
import { colors } from '../../assets/colors';

const Button = styled.TouchableHighlight`
  width: 100%;
  height: 100px;
  background-color: ${colors.primaryLight};
  padding: 20px;
  margin-top: 10px;
  border-radius: 10px;
`;

const TextModelo = styled.Text`
  font-size: 24px;
  color: ${colors.white};
`;

const TextTecnologias = styled.Text`
  font-size: 16px;
  text-align: justify;
  color: ${colors.white};
`;

const TextPreco = styled.Text`
  font-size: 16px;
  text-align: justify;
  color: ${colors.white};
`;

const Item = ({item, onPress}) => {
  return (
    <Button onPress={onPress} underlayColor="transparent">
      <>
        <TextModelo>{item.modelo}</TextModelo>
        <TextTecnologias>{item.marca}</TextTecnologias>
        <TextPreco>R${item.preco}</TextPreco>
      </>
    </Button>
  );
};

export default Item;
