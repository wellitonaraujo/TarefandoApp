import styled from 'styled-components/native';

interface PriorityButtonProps {
  selected: boolean;
  onPress: () => void;
  borderColor: string;
}

export const PriorityButton = styled.Pressable<PriorityButtonProps>`
  border-radius: 40px;
  z-index: 1;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  text-align: center;
  border-width: 1px;
  border-color: ${({selected, borderColor}) =>
    selected ? borderColor : 'transparent'};

  width: 100px;
  height: 55px;
`;

export const PriorityWrapper = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-top: 40px;
`;
