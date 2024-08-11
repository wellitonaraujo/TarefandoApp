import {TouchableOpacityProps} from 'react-native';
import * as S from './styles';

interface ButtonProps extends TouchableOpacityProps {
  title: string;
  disabled?: boolean; 
}

const PrimaryButton: React.FC<ButtonProps> = ({title,disabled, ...props}) => {
  return (
    <S.ButtonContainer 
      disabled={disabled} 
      style={{opacity: disabled ? 0.3 : 1}} 
      {...props}>
      <S.ButtonText>{title}</S.ButtonText>
    </S.ButtonContainer>
  );
};

export default PrimaryButton;
