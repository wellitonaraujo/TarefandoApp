import { moderateScale } from "@/src/utils/metrics";
import { TouchableOpacity } from "react-native";
import styled from "styled-components/native";


export const StyledTouchableOpacity = styled(TouchableOpacity)<{ value: boolean }>`
  width: ${moderateScale(30)}px;
  height:${moderateScale(30)}px;
  border-radius: ${moderateScale(30)}px;
  border-width: ${moderateScale(3)}px;
  border-color: ${({ value }) => (value ? '#1E90FF' :'#21242D')};
  background-color: ${({ value }) => (value ? '#1E90FF' : 'transparent')};
  align-items: center;
  justify-content: center;
`;

export const Checkmark = styled.Image`
  width: ${moderateScale(12)}px;
  height: ${moderateScale(12)}px;
  resize-mode: contain;
`;