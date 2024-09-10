import { moderateScale, verticalScale } from "@/src/utils/metrics";
import { TextInputProps } from "react-native";
import styled from "styled-components/native";
import colors from "@/src/styles/colors";


interface ModalTextInputTitleProps extends TextInputProps {
    isEmpty: boolean;
  }

export const ModalTextInputTitle = styled.TextInput<ModalTextInputTitleProps>`
  background-color: ${colors.grey.s400};
  color: ${colors.title};
  padding: ${moderateScale(12)}px;
  border-radius: ${moderateScale(8)}px;
  font-size: ${moderateScale(15)}px;
  height: ${verticalScale(50)}px;
`;
