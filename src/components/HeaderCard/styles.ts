import { moderateScale, verticalScale } from "@/src/utils/metrics";
import styled from "styled-components/native";

export const Container = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

`;

export const Title = styled.Text`
    color: #fff;
    font-size:  ${moderateScale(13)}px;
    font-weight: 500;
`;

export const Value = styled.Text`
    color: #fff;
    font-size:  ${moderateScale(13)}px;
`;

export const DateValue = styled.Text`
    color: #fff;
    font-size:  ${moderateScale(11)}px;
`;

export const Wrapper = styled.View`
    justify-content: space-between;
`;

export const CurrentDate = styled.View`
    background-color: #1a72f3;
    border-top-left-radius: 0px;
    border-top-right-radius: 25px;
    border-bottom-right-radius: 25px;
    border-bottom-left-radius: 25px;
    padding: ${moderateScale(8)}px;
    width: ${verticalScale(125)}px;
    align-items: center;
`;

export const PercentageChart = styled.View`
    border-width: 2px;
    border-color: #1a72f3;
    border-radius: 55px;
    width: ${moderateScale(55)}px;
    height: ${moderateScale(55)}px;
    align-items: center;
    justify-content: center;
`;
