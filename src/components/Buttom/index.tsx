import { TouchableOpacityProps } from 'react-native';
import * as S from './styles';
import React from 'react';

interface ButtonProps extends TouchableOpacityProps {
  title: string;
  variant?: 'primary' | 'secondary';
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({ 
  title, 
  variant = 'primary', 
  disabled, 
  ...props 
}) => {
  return (
    <S.ButtonContainer 
      variant={variant} 
      disabled={disabled}
      style={{ opacity: disabled ? 0.3 : 1 }} 
       {...props}>
      <S.ButtonText>
        {title}
      </S.ButtonText>
    </S.ButtonContainer>
  );
};

export default Button;
