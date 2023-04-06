import React from 'react';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/Ionicons';

import {colors} from '../assets/colors';

const Button = styled.TouchableOpacity`
  border-width: 0px;
  align-items: center;
  justify-content: center;
  width: 60px;
  height: 60px;
  position: absolute;
  bottom: 10px;
  right: 10px;
  background-color: ${colors.accent};
  border-radius: 100px;
`;

const AddFloatButton = ({onClick}) => {
  return (
    <Button onPress={() => onClick()}>
      <Icon name="add" size={30} color={colors.white} />
    </Button>
  );
};

export default AddFloatButton;
