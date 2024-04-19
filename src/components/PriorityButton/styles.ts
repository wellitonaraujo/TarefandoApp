import styled from 'styled-components/native';
import colors from '../../styles/colors';

interface PriorityButtonProps {
  selected: boolean;
  onPress: () => void;
  borderColor: string;
}

export const PriorityButton = styled.Pressable<PriorityButtonProps>`
  border-radius: 35px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  text-align: center;
  border-width: 1px;
  margin-right: 10px;
  border-color: ${({selected, borderColor}) =>
    selected ? borderColor : 'transparent'};

  width: 80px;
  height: 35px;
`;

export const PriorityWrapper = styled.View`
  flex-direction: row;
`;

export const PriorityTitle = styled.View`
  color: ${colors.title};
`;
