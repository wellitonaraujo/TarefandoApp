import * as Animatable from 'react-native-animatable';
import {ImageSourcePropType} from 'react-native';
import colors from '../../styles/colors';
import * as S from './styles';

interface AddButtonProps {
  icon: ImageSourcePropType;
  onPress: () => void;
  backgroundColor?: string;
}

const AddButton: React.FC<AddButtonProps> = ({
  icon,
  onPress,
  backgroundColor,
}) => {
  return (
    <Animatable.View 
      animation="pulse"
      iterationCount={Infinity}
    >
      <S.CreateTask 
        onPress={onPress} 
        backgroundColor={backgroundColor}
        testID="create-task-button"
      >
        <S.Icon 
          source={icon} 
          tintColor={colors.white}
        />
      </S.CreateTask>
    </Animatable.View>
  );
};

export default AddButton;
