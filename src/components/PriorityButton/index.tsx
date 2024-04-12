import {PrioritySelectorProps} from '../../models/PrioritySelectorProps';
import {getBorderColor} from '../../utils/getBorderColor';
import {PriorityButton, PriorityWrapper} from './styles';
import {priorities} from '../../utils/prioritiesColors';
import {Text} from 'react-native';
import React from 'react';

const PrioritySelector: React.FC<PrioritySelectorProps> = ({
  onPressPriority,
  priority,
}) => {
  const handlePriorityPress = (priorityType: 'low' | 'average' | 'high') => {
    onPressPriority(priorityType);
  };

  return (
    <PriorityWrapper>
      {priorities.map(prio => (
        <PriorityButton
          key={prio.type}
          selected={priority === prio.type}
          onPress={() => handlePriorityPress(prio.type)}
          borderColor={prio.color}>
          <Text style={{color: prio.color, letterSpacing: 1.3, fontSize: 16}}>
            {prio.label}
          </Text>
        </PriorityButton>
      ))}
    </PriorityWrapper>
  );
};

export default PrioritySelector;
