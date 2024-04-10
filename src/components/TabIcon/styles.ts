import styled from 'styled-components/native';
import colors from '../../styles/colors';

type Props = {
  focused: boolean;
};

export const Container = styled.View`
  align-items: center;
`;

export const IconImage = styled.Image<Props>`
  height: 24px;
  width: 24px;
  tint-color: ${({focused}) =>
    focused ? colors.primary.s300 : colors.grey.s400};
`;

export const IconText = styled.Text<Props>`
  font-size: 14px;
  line-height: 21px;
  color: ${({focused}) => (focused ? colors.primary.s300 : colors.grey.s400)};
  font-weight: ${({focused}) => (focused ? 'bold' : 'normal')};
`;
