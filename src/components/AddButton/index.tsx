import {ImageSourcePropType} from 'react-native';
import * as S from './styles';

interface AddButtonProps {
  icon?: ImageSourcePropType;
  onPress: () => void;
}

const icons = {
  plus: require('../../assets/icons/plus.png'),
};

const AddButton: React.FC<AddButtonProps> = ({
  onPress,
}) => {
  return (
    <S.Container>
      <S.Button onPress={onPress}>
        <S.PlusIcon tintColor={'#fff'} source={icons.plus} resizeMode='contain' />
      </S.Button>
    </S.Container>
  );
};

export default AddButton;