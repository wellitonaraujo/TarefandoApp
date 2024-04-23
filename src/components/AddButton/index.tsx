import * as Animatable from 'react-native-animatable';
import {ImageSourcePropType} from 'react-native';
import {CreateTask, Icon} from './styles';
import React from 'react';

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
        <Icon source={icon} />
      </CreateTask>
    </Animatable.View>
  );
};

export default AddButton;
