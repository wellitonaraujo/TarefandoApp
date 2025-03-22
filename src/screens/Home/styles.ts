import colors from "@/src/themes/colors";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import styled from "styled-components/native";

export const Container = styled(GestureHandlerRootView)`
  flex: 1;
  background-color: ${colors.backgound};
`;

export const TabsContainer = styled.View`
  flex-direction: row;
  justify-content: space-around;
  padding-vertical: 10px;
  padding-horizontal: 16px;
`;

export const Tab = styled.TouchableOpacity<{ selected: boolean }>`
  padding-vertical: 5px;
`;

export const TabText = styled.Text<{ selected: boolean }>`
  font-size: 14px;
  color: ${(props: any) => (props.selected ? colors.primary :  colors.gray_200)};
`;

export const LoadingContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;
