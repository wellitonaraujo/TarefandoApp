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
    <CreateTask onPress={onPress} backgroundColor={backgroundColor}>
      <Icon source={icon} />
    </CreateTask>
  );
};

export default AddButton;
