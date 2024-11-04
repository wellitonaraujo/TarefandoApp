import { moderateScale, verticalScale } from '@/src/utils/metrics';
import styled from 'styled-components/native';
import colors from '../../styles/colors';

export const ModalContainer = styled.View`
  flex: 1;
  background-color: rgba(0, 0, 0, 0.6);
  justify-content: flex-end;
  align-items: center;
`;

export const ModalContent = styled.View`
  background-color: ${colors.background};
  border-top-right-radius:${verticalScale(18)}px;
  border-top-left-radius: ${verticalScale(18)}px;
  flex-direction: column;
  justify-content: space-between;
  padding:  ${moderateScale(24)}px;
  width: 100%;
  height: ${verticalScale(280)}px;
`;