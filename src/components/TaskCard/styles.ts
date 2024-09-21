import { moderateScale, verticalScale } from '@/src/utils/metrics';
import styled from 'styled-components/native';
import colors from '../../styles/colors';

export const CardContainer = styled.View`
  flex: 1;
  background-color: '#21242D';
  border-radius: 12;
  padding: 15;
  shadow-color: '#21242D';
  shadow-opacity: 0.1;
  shadow-radius: 10;
  elevation: 5;
`;

export const CardHeader = styled.View`
  flex-direction: 'row';
  justify-content: 'space-between';
  align-items: 'center';
  margin-bottom: 10;
`;

export const title = styled.Text`
 font-size: 16px;
 color: '#D9D9D9';
 font-weight: 'bold';
`;

export const CompletedText = styled.Text`
  text-decoration-line: 'line-through';
  color: '#A9A9A9';
`;

export const EllipsisIcon = styled.Image`
    width: 18;
    height: 18;
    tint-color: '#D9D9D9';
    margin-mode: 'contain';
`;