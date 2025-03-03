import { moderateScale } from "@/src/utils/metrics";
import { TouchableOpacity } from "react-native";
import styled from "styled-components/native";


export const StyledTouchableOpacity = styled(TouchableOpacity)<{ value: boolean }>`
  width: ${moderateScale(24)}px;
  height:${moderateScale(24)}px;
  border-radius: ${moderateScale(24)}px;
  border-width: ${moderateScale(1)}px;
  border-color: ${({ value }) => (value ? '#7A12FF' :'#A1A1C1')};
  background-color: ${({ value }) => (value ? '#7A12FF' : 'transparent')};
  align-items: center;
  justify-content: center;
`;

export const Checkmark = styled.Image`
  width: ${moderateScale(12)}px;
  height: ${moderateScale(12)}px;
`;