import {PriorityButton, PriorityWrapper} from './styles';
import {Text} from 'react-native';
import React from 'react';

interface PrioritySelectorProps {
  onPressPriority: (priority: 'low' | 'average' | 'high' | null) => void;
  priority: 'low' | 'average' | 'high' | null;
}

const PrioritySelector: React.FC<PrioritySelectorProps> = ({
  onPressPriority,
  priority,
}) => {
  const getBorderColor = (p: 'low' | 'average' | 'high' | null): string => {
    switch (p) {
      case 'low':
        return '#FFCC00';
      case 'average':
        return '#00C31F';
      case 'high':
        return '#C30000';
      default:
        return '#CCCCCC';
    }
  };

  return (
    <PriorityWrapper>
      <PriorityButton
        selected={priority === 'low'}
        onPress={() => onPressPriority('low')}
        borderColor={getBorderColor('low')}>
        <Text style={{color: '#FFCC00'}}>Baixa</Text>
      </PriorityButton>
      <PriorityButton
        selected={priority === 'average'}
        onPress={() => onPressPriority('average')}
        borderColor={getBorderColor('average')}>
        <Text style={{color: '#00C31F'}}>Média</Text>
      </PriorityButton>
      <PriorityButton
        selected={priority === 'high'}
        onPress={() => onPressPriority('high')}
        borderColor={getBorderColor('high')}>
        <Text style={{color: '#C30000'}}>Alta</Text>
      </PriorityButton>
    </PriorityWrapper>
  );
};

export default PrioritySelector;
