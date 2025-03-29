import colors from "@/src/themes/colors";
import { Image, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import styled from "styled-components";

export const Container = styled(GestureHandlerRootView)`
  flex: 1;
  background-color: ${colors.backgound};
`;

export const Wrapper = styled(View)`
 align-items: flex-end;
 padding: 16px;
`;

export const Icon = styled(Image)`
  width: 24px;
  height: 24px;
`;