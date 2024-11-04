import TaskItem from '../TaskItem';
import React from 'react';
import * as S from './styles';

type Task = {
    id: string;
    name: string;
    completed: boolean;
};

type TaskListProps = {
    tasks: Task[];
    updateKey: number;
    onEditTask: (id: string) => void;
    onCompleteTask: (id: string) => void;
    onDeleteTask: (id: string) => void;
};

const TaskList: React.FC<TaskListProps> = ({
    tasks,
    updateKey,
    onEditTask,
    onCompleteTask,
    onDeleteTask,
}) => (
    <S.ListContainer>
        {tasks.filter(task => !task.completed).map(task => (
            <TaskItem
                key={`${task.id}-${updateKey}`}
                task={task}
                onEdit={onEditTask}
                onComplete={onCompleteTask}
                onDelete={onDeleteTask}
            />
        ))}
        {tasks.some(task => task.completed) && (
            <S.CompletedSection>
                <S.CompletedTitle>Concluídas</S.CompletedTitle>
                {tasks.filter(task => task.completed).map(task => (
                    <TaskItem
                        key={`${task.id}-${updateKey}`}
                        task={task}
                        onEdit={onEditTask}
                        onComplete={onCompleteTask}
                        onDelete={onDeleteTask}
                        completed
                    />
                ))}
            </S.CompletedSection>
        )}
    </S.ListContainer>
);

export default TaskList;
