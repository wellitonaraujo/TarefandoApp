import {Image, ImageSourcePropType, TouchableOpacity, View} from 'react-native';
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
        <S.PlusIcon source={icons.plus} />
      </S.Button>
    </S.Container>
  );
};

export default AddButton;