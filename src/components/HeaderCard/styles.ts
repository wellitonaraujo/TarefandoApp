import { moderateScale, verticalScale } from "@/src/utils/metrics";
import styled from "styled-components/native";

export const Container = styled.View`

`;

export const Title = styled.Text`
    color: #fff;
    font-size:  ${moderateScale(14)}px;
    font-weight: 700;
    margin-bottom: ${verticalScale(6)}px;
`;

export const Value = styled.Text`
    color: #fff;
    font-size:  ${moderateScale(13)}px;
`;


export const Wrapper = styled.View`
    justify-content: space-between;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`;

export const CurrentDate = styled.View`
    background-color: #5F33E1;
    border-top-left-radius: 0px;
    border-top-right-radius: 25px;
    border-bottom-right-radius: 25px;
    border-bottom-left-radius: 25px;
    padding: ${moderateScale(4)}px;
    width: ${verticalScale(125)}px;
    align-items: center;

`;

export const IconBell = styled.Image`
    width: 30px;
    height: 30px;
`;
