import styled from 'styled-components/native';
import colors from '../../styles/colors';
import { moderateScale } from '@/src/utils/metrics';

export const TrashIcon = styled.TouchableOpacity<{opacity?: number}>`
  width: ${moderateScale(35)}px;
  height: ${moderateScale(35)}px;
  background-color: ${colors.grey.s300};
  border-radius:${moderateScale(35)}px;
  justify-content: center;
  align-items: center;
  align-self: flex-end;
  opacity: ${({opacity}) => (opacity !== undefined ? opacity : 1)};
`;

export const Icon = styled.Image`
  width: ${moderateScale(16)}px;
  height: ${moderateScale(16)}px;
`;
