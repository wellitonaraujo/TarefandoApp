import * as Animatable from 'react-native-animatable';
import {ImageSourcePropType} from 'react-native';
import {CreateTask, Icon} from './styles';
import React from 'react';
import colors from '../../styles/colors';

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
    <Animatable.View animation="pulse" iterationCount={Infinity}>
      <CreateTask onPress={onPress} backgroundColor={backgroundColor}>
        <Icon source={icon} tintColor={colors.title}/>
      </CreateTask>
    </Animatable.View>
  );
};

export default AddButton;
