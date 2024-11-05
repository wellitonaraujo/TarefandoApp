import { moderateScale, verticalScale } from '@/src/utils/metrics';
import { ScrollView } from 'react-native';
import styled from 'styled-components/native';

export const ListContainer = styled(ScrollView)`
    padding-bottom: 16px;
`;

export const CompletedSection = styled.View`
    margin-top: ${verticalScale(16)}px;
`;

export const CompletedTitle = styled.Text`
    color: #fff;
    font-size: ${moderateScale(13)}px;
    font-weight: 500;
    margin-bottom: 8px;
    margin-horizontal: ${moderateScale(16)}px;
`;

export const TaskRow = styled.View`
  flex-direction: row;
  align-items: center;
  padding: ${moderateScale(5)}px 0;
`;
