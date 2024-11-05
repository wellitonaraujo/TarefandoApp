import { horizontalScale, moderateScale, verticalScale } from '@/src/utils/metrics';
import { ScrollView } from 'react-native';
import styled from 'styled-components/native';

export const ListContainer = styled(ScrollView)`
`;

export const TaskRow = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 5px 16px;
`;

export const CompletedSection = styled.View`
`;

export const CompletedTitle = styled.Text`
    color: #fff;
    font-size: ${moderateScale(13)}px;
    font-weight: 500;
    margin-bottom: 8px; 
    margin: 15px 16px 5px 16px;
`;


