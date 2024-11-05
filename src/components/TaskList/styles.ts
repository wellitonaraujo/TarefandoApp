import { horizontalScale, verticalScale } from '@/src/utils/metrics';
import { ScrollView } from 'react-native';
import styled from 'styled-components/native';

export const ListContainer = styled(ScrollView)`
`;

export const TaskRow = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: ${verticalScale(5)}px ${horizontalScale(16)}px;
`;

export const CompletedSection = styled.View`
`;

export const CompletedTitle = styled.Text`
`;


