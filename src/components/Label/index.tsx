import { TextProps, TextStyle } from "react-native";
import * as S from "./styles";
import React from "react";

export interface TypographyProps extends TextStyle {
  fontFamily: string;
  fontSize: number;
  lineHeight: number;
}

export interface ILabelProps extends RNStyledComponentsProps, Pick<TextProps, "testID"> {
  text?: string;
  typography?: TypographyProps;
  color: string;
  children?: React.ReactNode;
}

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


const Label: React.FC<ILabelProps> = ({
  text,
  typography,
  fontSize,
  marginBottom,
  marginLeft,
  marginRight,
  marginTop,
  numberOfLines,
  ellipsizeMode,
  color,
  textAlign,
  flexWrap,
  testID,
  children,
}) => {
  return (
    <S.Text
      marginBottom={marginBottom}
      marginLeft={marginLeft}
      marginRight={marginRight}
      marginTop={marginTop}
      textAlign={textAlign}
      color={color}
      numberOfLines={numberOfLines}
      ellipsizeMode={ellipsizeMode}
      flexWrap={flexWrap}
      style={{ ...typography }}
      testID={testID}
      fontSize={fontSize}
    >
      {text}
      {children}
    </S.Text>
  );
};

export default Label;
