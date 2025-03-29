import colors from "@/src/themes/colors";
import { moderateScale, verticalScale } from "@/src/utils/metrics";
import styled from "styled-components/native";

export const Container = styled.View`
`;

export const Title = styled.Text`
  color: ${colors.gray_100};
  font-size: ${moderateScale(14)}px;
  font-weight: 700;
  margin-bottom: ${verticalScale(6)}px;
`;

export const Value = styled.Text`
  color: ${colors.gray_50};
  font-size: ${moderateScale(13)}px;
`;

export const Wrapper = styled.View`
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
`;

export const RightWrapper = styled.TouchableOpacity`
`;


export const CurrentDate = styled.View`
  background-color: ${colors.primary};
  border-top-left-radius: 0px;
  border-top-right-radius: 25px;
  border-bottom-right-radius: 25px;
  border-bottom-left-radius: 25px;
  padding: ${moderateScale(6)}px;
  width: ${verticalScale(125)}px;
  align-items: center;
`;

export const IconBell = styled.Image`
  width: 30px;
  height: 30px;
`;

export const DateContainer = styled.View`
  align-items: flex-end;
  flex: 1; 
`;

export const DateText = styled.Text`
    font-size: ${moderateScale(14)}px;
    font-weight: 700;
    color: ${colors.gray_100};
    font-weight: 600;
`;
