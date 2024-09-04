import { horizontalScale, moderateScale, verticalScale } from "@utils/metrics";
import styled from "styled-components/native";

interface RNStyledComponentsProps {
  width?: number;
  height?: number;
  marginTop?: number;
  marginBottom?: number;
  marginLeft?: number;
  marginRight?: number;
  lineHeight?: number;
  color?: string;
  textAlign?: "center" | "auto" | "left" | "right" | "justify";
  fontFamily?: string;
  fontSize?: number;
  flexWrap?: "nowrap" | "wrap";
  numberOfLines?: number;
  ellipsizeMode?: "head" | "clip" | "middle" | "tail" | undefined;
}


export const Text = styled.Text<RNStyledComponentsProps>`
  margin-top: ${({ marginTop }) => verticalScale(marginTop ?? 0)}px;
  margin-bottom: ${({ marginBottom }) => verticalScale(marginBottom ?? 0)}px;
  margin-left: ${({ marginLeft }) => horizontalScale(marginLeft ?? 0)}px;
  margin-right: ${({ marginRight }) => horizontalScale(marginRight ?? 0)}px;
  color: ${({ theme, color }) => color ?? theme.colors.grey.s300};
  text-align: ${({ textAlign }) => textAlign ?? "auto"};
  flex-wrap: ${({ flexWrap }) => flexWrap ?? "nowrap"};
  font-size: ${({ fontSize }) => moderateScale(fontSize ?? 12)}px;
`;
