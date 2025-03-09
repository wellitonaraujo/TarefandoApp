import colors from "@/src/themes/colors";
import styled from "styled-components/native";

export const EmptyContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const EmptyTitle = styled.Text`
  color: ${colors.white};
  font-size: 15px;
  text-align: center;
  font-weight: 500;
  margin-bottom: 8px;
`;

export const HighlightedText = styled.Text`
  color: ${colors.primary};
  font-weight: bold;
`;

export const EmptyDescription = styled.Text`
  color: ${colors.gray_400};
  font-size: 12px;
  text-align: center;
`;
