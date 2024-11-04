import { ScrollView, View, Text, StyleProp, ViewStyle, TextStyle } from 'react-native';
import TaskItem from '../TaskItem';
import styles from './styles';
import React from 'react';

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
    <ScrollView contentContainerStyle={styles.listContainer as StyleProp<ViewStyle>}>
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
            <View style={styles.completedSection as StyleProp<ViewStyle>}>
                <Text style={styles.completedTitle as StyleProp<TextStyle>}>Concluídas</Text>
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
            </View>
        )}
    </ScrollView>
);

export default TaskList;
