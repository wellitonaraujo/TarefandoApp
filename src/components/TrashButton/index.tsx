import {TrashIcon, Icon} from './styles';
import React from 'react';

interface TrashProps {
  rightImageSource: any;
  isTask: boolean;
  isAnyTaskSelected: boolean;
  onDelete: () => void;
}

const TrashButton: React.FC<TrashProps> = ({
  rightImageSource,
  isTask,
  isAnyTaskSelected,
  onDelete,
}) => {
  return (
    <TrashIcon
      opacity={isTask && isAnyTaskSelected ? 1 : 0}
      disabled={!isTask || !isAnyTaskSelected}
      onPress={onDelete}>
      <Icon source={rightImageSource} />
    </TrashIcon>
  );
};

export default TrashButton;
