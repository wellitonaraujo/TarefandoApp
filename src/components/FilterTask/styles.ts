import styled from 'styled-components/native';
import colors from '../../styles/colors';

export const FilterCard = styled.TouchableOpacity<{
  hasBorder: boolean;
  isTask: boolean;
}>`
  width: 85px;
  height: 40px;
  background-color: ${colors.grey.s300};
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  ${({hasBorder, isTask}) =>
    isTask &&
    hasBorder &&
    `
    border-width: 1px;
    border-color: ${colors.primary.s300};
  `}
  opacity: ${({isTask}) => (isTask ? 1 : 0.5)};
`;

export const CardText = styled.Text`
  font-size: 12px;
  color: ${colors.title};
  letter-spacing: 1px;
`;
