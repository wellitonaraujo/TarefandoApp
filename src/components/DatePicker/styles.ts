import colors from "@/src/styles/colors";
import { horizontalScale, moderateScale, verticalScale } from "@/src/utils/metrics";
import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

export const ModalDateWrapper = styled.View`
  flex-direction: row;
  justify-content: flex-end;
`;

export const ModalDateInput = styled.Pressable`
  border-radius: ${moderateScale(12)}px;
  z-index: 1;
  flex-direction: row;
  justify-content: space-around;
  padding: 0 ${horizontalScale(5)}px;
  align-items: center;
  text-align: center;
  background-color: ${colors.grey.s400};
  width: ${verticalScale(80)}px;
  height: ${horizontalScale(35)}px;
`;

export const ModalIcon = styled.Image`
  width: ${RFValue(14)}px;
  height: ${RFValue(14)}px;
  opacity: 0.5;
`;


export const ModalSelectedDateText = styled.Text`
  color: ${colors.title};
  font-size: ${moderateScale(13)}px;
`;