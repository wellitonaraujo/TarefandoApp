import React from 'react';
import { View, Text } from 'react-native';
import styles from './styles';
import HeaderCard from '../HeaderCard';


const Header = ({ tasks }) => (
    <View style={styles.headerContainer}>
        <Text style={styles.title}>Painel de tarefas</Text>
        <HeaderCard
            totalTasks={tasks.length}
            completedTasks={tasks.filter(task => task.completed).length}
        />
    </View>
);

export default Header;
