import React from 'react';
import { View, Text, StyleProp, ViewStyle, TextStyle } from 'react-native';
import HeaderCard from '../HeaderCard';
import styles from './styles';

type Task = {
    id: string;
    name: string;
    completed: boolean;
};

type HeaderProps = {
    tasks: Task[];
};

const Header: React.FC<HeaderProps> = ({ tasks }) => (
    <View style={styles.headerContainer as StyleProp<ViewStyle>}>
        <Text style={styles.title as StyleProp<TextStyle>}>Painel de tarefas</Text>
        <HeaderCard
            totalTasks={tasks.length}
            completedTasks={tasks.filter(task => task.completed).length}
        />
    </View>
);

export default Header;
