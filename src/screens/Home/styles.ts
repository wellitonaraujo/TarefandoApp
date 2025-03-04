import { GestureHandlerRootView } from "react-native-gesture-handler";
import styled from "styled-components/native";

export const Container = styled(GestureHandlerRootView)`
  flex: 1;
  background-color: #1a1a2f;
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
  color: ${(props: any) => (props.selected ? "#fff" : "#A1A1C1")};
  font-weight: ${(props: any) => (props.selected ? 700 : 300)};
`;

export const LoadingContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;
