import React from 'react';
import { View, Text, TouchableOpacity, GestureResponderEvent } from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';
import styles from './styles';

interface Task {
    id: string;
    name: string;
}

interface TaskItemProps {
    task: Task;
    onEdit: (id: string) => void;
    onComplete: (id: string) => void;
    onDelete: (id: string) => void;
    completed?: boolean;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onEdit, onComplete, onDelete, completed = false }) => {
    const renderRightActions = (): JSX.Element => (
        <View style={styles.rightActionsContainer}>
            {completed ? (
                <TouchableOpacity
                    style={[styles.actionButton, styles.deleteButton]}
                    onPress={() => onDelete(task.id)}
                >
                    <Text style={styles.actionText}>Deletar</Text>
                </TouchableOpacity>
            ) : (
                <>
                    <TouchableOpacity
                        style={[styles.actionButton, styles.completeButton]}
                        onPress={() => onComplete(task.id)}
                    >
                        <Text style={styles.actionText}>Concluir</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.actionButton, styles.editButton]}
                        onPress={() => onEdit(task.id)}
                    >
                        <Text style={styles.actionText}>Editar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.actionButton, styles.deleteButton]}
                        onPress={() => onDelete(task.id)}
                    >
                        <Text style={styles.actionText}>Deletar</Text>
                    </TouchableOpacity>
                </>
            )}
        </View>
    );

    return (
        <Swipeable renderRightActions={renderRightActions}>
            <View style={[styles.taskItem, completed && { opacity: 0.5 }]}>
                <Text style={styles.taskText}>{task.name}</Text>
            </View>
        </Swipeable>
    );
};

export default TaskItem;
