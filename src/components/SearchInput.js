import React from 'react';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/Ionicons';
import { View } from 'react-native';

import {colors} from '../assets/colors';

const TextInput = styled.TextInput`
  width: 100%;
  height: 50px;
  border-bottom-color: ${colors.gray};
  border-bottom-width: 2px;
  font-size: 16px;
  padding-left: 2px;
  padding-bottom: 1px;
  margin-bottom: 10px;
  padding-right: 40px;
`;

const SearchInput = ({setPesquisa}) => {
  return (
    <View>
      <TextInput
        placeholder="Pesquisar por nome"
        keyboardType="default"
        onChangeText={(t) => setPesquisa(t)}
      />
    </View>
  );
};

export default SearchInput;