import { moderateScale, verticalScale } from "@/src/utils/metrics";
import styled from "styled-components/native";

export const Container = styled.View`
    background-color: #262b39;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    height: ${moderateScale(100)}px;
    border-top-left-radius: 0px;
    border-top-right-radius: 25px;
    border-bottom-right-radius: 25px;
    border-bottom-left-radius: 25px;
    padding:  ${moderateScale(16)}px;
`;

export const Title = styled.Text`
    color: #fff;
    font-size:  ${moderateScale(13)}px;
    font-weight: 500;
`;

export const Value = styled.Text`
    color: #fff;
    font-size: 18px;
    font-weight: 500;
    font-size:  ${moderateScale(14)}px;
`;

export const DateValue = styled.Text`
    color: #fff;
    font-size:  ${moderateScale(10)}px;
    font-weight: 600;
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
    padding: 8px;
    width: 120px;
    align-items: center;
    margin-top: 25px;
`;

export const PercentageChart = styled.View`
    border-width: 4px;
    border-color: #1a72f3;
    border-radius: 35px;
    width: ${moderateScale(60)}px;
    height: ${moderateScale(60)}px;
    align-items: center;
    justify-content: center;
`;
