import { View, StyleProp, ViewStyle } from 'react-native';
import HeaderCard from '../HeaderCard';
import styles from './styles';
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
    <View style={styles.headerContainer as StyleProp<ViewStyle>}>
        <HeaderCard
            totalTasks={tasks.length}
            completedTasks={tasks.filter(task => task.completed).length}
        />
    </View>
);

export default Header;
