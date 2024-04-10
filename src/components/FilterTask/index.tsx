import {CardText, FilterCard} from './styles';
import React from 'react';

interface CardProps {
  title: string;
  onPress: () => void;
  hasBorder: boolean;
  isTask: boolean;
}

const FilterTask: React.FC<CardProps> = ({
  title,
  onPress,
  hasBorder,
  isTask,
}) => {
  const handlePress = () => {
    if (isTask) {
      onPress();
    }
  };
  return (
    <FilterCard
      onPress={handlePress}
      disabled={!isTask}
      hasBorder={hasBorder}
      isTask={isTask}>
      <CardText>{title}</CardText>
    </FilterCard>
  );
};

export default FilterTask;
