import colors from "@/src/styles/colors";
import { horizontalScale, moderateScale } from "@/src/utils/metrics";
import { TouchableOpacity } from "react-native";
import styled from "styled-components/native";

export const StyledTouchableOpacity = styled(TouchableOpacity)<{ value: boolean }>`
  width: ${moderateScale(20)}px;
  height:${moderateScale(20)}px;
  border-radius: ${moderateScale(20)}px;
  border-width: ${moderateScale(1)}px;
  border-color: ${({ value }) => (value ? colors.priority.average : colors.grey.s100)};
  background-color: ${({ value }) => (value ? colors.priority.average : 'transparent')};
  align-items: center;
  justify-content: center;
  margin-left: ${horizontalScale(5)}px;
`;

export const Checkmark = styled.View`
  width: ${moderateScale(12)}px;
  height: ${moderateScale(12)}px;
  border-radius: ${moderateScale(12)}px;
  background-color: ${colors.white};
`;
