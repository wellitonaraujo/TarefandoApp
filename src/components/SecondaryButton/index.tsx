import {ButtonContainer, ButtonText} from './styles';
import {TouchableOpacityProps} from 'react-native';

interface ButtonProps extends TouchableOpacityProps {
  title: string;
}

const SecondaryButton: React.FC<ButtonProps> = ({title, ...props}) => {
  return (
    <ButtonContainer {...props}>
      <ButtonText>{title}</ButtonText>
    </ButtonContainer>
  );
};

export default SecondaryButton;
