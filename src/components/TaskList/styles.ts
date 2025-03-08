import { horizontalScale, verticalScale } from '@/src/utils/metrics';
import styled from 'styled-components/native';
import { ScrollView } from 'react-native';

export const ListContainer = styled(ScrollView)`
`;

export const TaskRow = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: ${verticalScale(2)}px ${horizontalScale(16)}px;
`;

export const CompletedSection = styled.View`
`;

export const CompletedTitle = styled.Text`
`;


