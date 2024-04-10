import {useNavigation} from '@react-navigation/native';
import {ArrowBackIcon, BackWrapper} from './styles';
import {imgs} from '../../screens/imgs';
import React from 'react';

const CustomBackButton = () => {
  const navigation = useNavigation();

  const handlePress = () => {
    navigation.goBack();
  };

  return (
    <BackWrapper onPress={handlePress}>
      <ArrowBackIcon source={imgs.arrow} />
    </BackWrapper>
  );
};

export default CustomBackButton;
