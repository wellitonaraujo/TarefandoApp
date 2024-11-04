import React from 'react';
import { ScrollView, View, Text } from 'react-native';
import styles from './styles';
import TaskItem from '../TaskItem';

const TaskList = ({ tasks, updateKey, onEditTask, onCompleteTask, onDeleteTask }) => (
    <ScrollView contentContainerStyle={styles.listContainer}>
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
            <View style={styles.completedSection}>
                <Text style={styles.completedTitle}>Concluídas</Text>
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
