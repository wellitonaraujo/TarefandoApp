import {PrioritySelectorProps} from '../../models/PrioritySelectorProps';
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
      {priorities.map(prio => {
        if (
          prio.type === 'low' ||
          prio.type === 'average' ||
          prio.type === 'high'
        ) {
          return (
            <PriorityButton
              key={prio.type}
              selected={priority === prio.type}
              onPress={() =>
                handlePriorityPress(prio.type as 'low' | 'average' | 'high')
              }
              borderColor={prio.color}>
              <Text
                style={{color: prio.color, letterSpacing: 1.3, fontSize: 14}}>
                {prio.label}
              </Text>
            </PriorityButton>
          );
        } else {
          console.error(`Tipo de prioridade inválido: ${prio.type}`);
          return null;
        }
      })}
    </PriorityWrapper>
  );
};

export default PrioritySelector;
