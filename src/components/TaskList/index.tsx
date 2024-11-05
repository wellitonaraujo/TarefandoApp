import TaskItem from '../TaskItem';
import React from 'react';
import * as S from './styles';
import CustomCheckBox from '../CustomCheckBox';
import { View } from 'react-native';

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
            <S.TaskRow key={`${task.id}-${updateKey}`}>
                <View>
                    <CustomCheckBox
                        value={task.completed}
                        onValueChange={() => onCompleteTask(task.id)}
                    />
                </View>
                <TaskItem
                    task={task}
                    onEdit={onEditTask}
                    onComplete={onCompleteTask}
                    onDelete={onDeleteTask}
                />
            </S.TaskRow>
        ))}

        {tasks.some(task => task.completed) && (
            <S.CompletedSection>
                <S.CompletedTitle></S.CompletedTitle>
                {tasks.filter(task => task.completed).map(task => (
                    <S.TaskRow key={`${task.id}-${updateKey}`}>
                        <View>
                            <CustomCheckBox
                                value={task.completed}
                                onValueChange={() => onCompleteTask(task.id)}
                            />
                        </View>
                        <TaskItem
                            task={task}
                            onEdit={onEditTask}
                            onComplete={onCompleteTask}
                            onDelete={onDeleteTask}
                            completed
                        />
                    </S.TaskRow>
                ))}
            </S.CompletedSection>
        )}
    </S.ListContainer>
);

export default TaskList;
