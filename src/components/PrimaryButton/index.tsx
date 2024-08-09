import {ButtonContainer, ButtonText} from './styles';
import {TouchableOpacityProps} from 'react-native';
import React from 'react';

interface ButtonProps extends TouchableOpacityProps {
  title: string;
  disabled?: boolean; 
}

const PrimaryButton: React.FC<ButtonProps> = ({title,disabled, ...props}) => {
  return (
    <ButtonContainer disabled={disabled} style={{opacity: disabled ? 0.5 : 1}} {...props}>
      <ButtonText>{title}</ButtonText>
    </ButtonContainer>
  );
};

export default PrimaryButton;
