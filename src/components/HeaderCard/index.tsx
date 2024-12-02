import useHeaderCard from "./hook/useHeaderCard";
import * as S from "./styles";
import React from "react";

interface HeaderCardProps {
    totalTasks: number;
    completedTasks: number;
}

const HeaderCard: React.FC<HeaderCardProps> = ({ totalTasks, completedTasks }) => {
    const { formattedDate, taskProgress } = useHeaderCard(totalTasks, completedTasks);

    return (
        <S.Container>
            <S.Wrapper>
                <S.CurrentDate>
                    <S.DateValue>{formattedDate}</S.DateValue>
                </S.CurrentDate>
            </S.Wrapper>
            <S.PercentageChart>
                <S.Value>{taskProgress}</S.Value>
            </S.PercentageChart>
        </S.Container>
    );
};

export default HeaderCard;
