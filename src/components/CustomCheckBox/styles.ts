import { moderateScale } from "@/src/utils/metrics";
import { TouchableOpacity } from "react-native";
import styled from "styled-components/native";


export const StyledTouchableOpacity = styled(TouchableOpacity)<{ value: boolean }>`
  width: ${moderateScale(26)}px;
  height:${moderateScale(26)}px;
  border-radius: ${moderateScale(26)}px;
  border-width: ${moderateScale(2)}px;
  border-color: ${({ value }) => (value ? '#1A72F3' :'#313747')};
  background-color: ${({ value }) => (value ? '#1A72F3' : 'transparent')};
  align-items: center;
  justify-content: center;
`;

export const Checkmark = styled.Image`
  width: ${moderateScale(12)}px;
  height: ${moderateScale(12)}px;
`;