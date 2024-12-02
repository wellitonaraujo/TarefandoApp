import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#181A20',
        paddingBottom: 16,
    },
    headerContainer: {
        padding: 16,
    },
    title: {
        color: '#fff',
        fontSize: 15,
        fontWeight: '600',
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    emptyTitle: {
        color: '#FFFFFF',
        fontSize: 16,
        textAlign: 'center',
        fontWeight: 'bold',
        marginBottom: 8
    },
    highlightedText: {
        color: '#1A72F3',
        fontWeight: 'bold',
    },
    emptyDescription: {
        color: '#888888',
        fontSize: 12,
        textAlign: 'center',
    },
    completedSection: {
        marginTop: 16,
    },
    completedTitle: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
        marginHorizontal: 16,
    },
    taskList: {
        width: '100%',
    },
    listContainer: {
        paddingBottom: 16,
    },
    taskItem: {
        backgroundColor: '#313747',
        padding: 15,
        borderRadius: 16,
        marginVertical: 4,
        marginHorizontal: 16,
    },
    taskText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '600',
        letterSpacing: 1.5,
    },
    rightActionsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
    },
    actionButton: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 75,
        height: '100%',
        margin: 5,
    },
    completeButton: {
        backgroundColor: '#4CAF50',
        height: 40,
        borderRadius: 12,
    },
    editButton: {
        backgroundColor: '#FFA500',
        height: 40,
        borderRadius: 12,
    },
    deleteButton: {
        backgroundColor: '#FF0000',
        height: 40,
        borderRadius: 12,
    },
    actionText: {
        color: '#FFFFFF',
        fontSize: 12,
        fontWeight: '500',
    },
});

export default styles;
