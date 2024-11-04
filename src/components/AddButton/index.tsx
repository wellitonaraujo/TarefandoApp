import {Image, ImageSourcePropType, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

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

const styles = StyleSheet.create({
  container: {
      backgroundColor: '#1E90FF',
      alignItems: 'center',
      height: 60,
      width: 60,
      padding: 10,
      borderRadius: 60,
      position: 'absolute',
      bottom: 25,
      justifyContent: 'center',
      alignSelf: 'center'
  },
  plusIcon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
},
})