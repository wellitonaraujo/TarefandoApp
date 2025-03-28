import colors from "@/src/themes/colors";
import { moderateScale } from "@/src/utils/metrics";
import { TouchableOpacity } from "react-native";
import styled from "styled-components/native";

interface StyledTouchableOpacityProps {
  value: boolean;
}

export const StyledTouchableOpacity = styled(TouchableOpacity)<StyledTouchableOpacityProps>`
  width: ${moderateScale(24)}px;
  height: ${moderateScale(24)}px;
  border-radius: ${moderateScale(24)}px;
  border-width: ${moderateScale(1)}px;
  border-color: ${({ value }: StyledTouchableOpacityProps) => (value ? colors.primary : colors.gray_200)};
  background-color: ${({ value }: StyledTouchableOpacityProps) => (value ? colors.primary : 'transparent')};
  align-items: center;
  justify-content: center;
`;
export const Checkmark = styled.Image`
  width: ${moderateScale(12)}px;
  height: ${moderateScale(12)}px;
`;