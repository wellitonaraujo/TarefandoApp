import HeaderCard from '../HeaderCard';
import * as S from './styles';
import React from 'react';

type Task = {
    id: string;
    name: string;
    completed: boolean;
};

type HeaderProps = {
    tasks: Task[];
};

const Header: React.FC<HeaderProps> = ({ tasks }) => (
    
    <S.HeaderContainer>
        <HeaderCard
            totalTasks={tasks.length}
            completedTasks={tasks.filter(task => task.completed).length}
        />
    </S.HeaderContainer>
);

export default Header;
