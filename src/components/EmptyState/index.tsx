import { View, Text } from 'react-native';
import styles from './styles';
import React from 'react';

const EmptyState = () => (
    <View style={styles.emptyContainer}>
        <Text style={styles.emptyTitle}>
            Você não possui tarefas <Text style={styles.highlightedText}>hoje</Text>
        </Text>
        <Text style={styles.emptyDescription}>Clique no botão (+) para criar</Text>
    </View>
);

export default EmptyState;
