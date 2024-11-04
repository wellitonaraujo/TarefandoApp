import {Image, ImageSourcePropType, TouchableOpacity, View} from 'react-native';
import { styles } from './styles';

interface AddButtonProps {
  icon?: ImageSourcePropType;
  onPress: () => void;
}

const AddButton: React.FC<AddButtonProps> = ({
  onPress,
}) => {
  return (
    <View>
      <TouchableOpacity 
        onPress={onPress} 
        style={styles.container}
      >
         <Image source={require('../../assets/images/plus.png')} style={styles.plusIcon} />
      </TouchableOpacity>
    </View>
  );
};

export default AddButton;