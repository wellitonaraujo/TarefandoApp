import { ScrollView, View, Text, StyleSheet } from 'react-native';
import CustomCheckBox from '@/src/components/CustomCheckBox';
import AddButton from '@/src/components/AddButton';
import CalendarS from '@/src/components/Calendar';
import TaskCard from '@/src/components/TaskCard';
import colors from '@/src/styles/colors';
import React, { useState } from 'react';
import { tasks } from './tasksmock';
import { imgs } from '../imgs';
import NewTaskModal from '@/src/components/NewTaskModal';
import { useModals } from '@/src/hooks/useModals';

const getCurrentDate = () => {
  const today = new Date();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const year = today.getFullYear();
  const day = String(today.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const Home = () => {
  const { modalVisible, toggleModal } = useModals();
  const [selectedDate, setSelectedDate] = useState(getCurrentDate());
  const [taskCompletion, setTaskCompletion] = useState<{ [key: string]: boolean }>(
    tasks.reduce((acc, task) => ({ ...acc, [task.id]: task.completed }), {})
  );

  const filteredTasks = tasks.filter(task => task.date === selectedDate);
  const incompleteTasksCount = filteredTasks.filter(task => !taskCompletion[task.id]).length;

  const taskText = incompleteTasksCount === 0 
    ? "nenhuma tarefa"
    : `${incompleteTasksCount} tarefa${incompleteTasksCount > 1 ? 's' : ''}`;

  const isToday = selectedDate === getCurrentDate();

  const handleCheckBoxChange = (taskId: string) => {
    setTaskCompletion(prevState => ({
      ...prevState,
      [taskId]: !prevState[taskId],
    }));
  };

  const handleToggleComplete = (taskId: string) => {
    setTaskCompletion(prevState => ({
      ...prevState,
      [taskId]: !prevState[taskId],
    }));
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View>
        <CalendarS onDateChange={setSelectedDate} />
      </View>

      <View style={styles.taskContainer}>
        <View style={styles.taskHeader}>
          <Text style={styles.title}>
            Você possui {taskText} {isToday && <Text style={styles.highlight}>hoje</Text>}
          </Text>
          <AddButton
            icon={imgs.plus}
            onPress={toggleModal}
            backgroundColor={colors.primary}
          />
        </View>

        {filteredTasks.map(task => (
          <View key={task.id} style={styles.taskRow}>
            <CustomCheckBox
              value={taskCompletion[task.id]}
              onValueChange={() => handleCheckBoxChange(task.id)}
            />
            <View style={styles.taskCardContainer}>
              <TaskCard
                description={task.description}
                time={task.time}
                completed={taskCompletion[task.id]}
                onToggleComplete={() => handleToggleComplete(task.id)}
              />
            </View>
          </View>
        ))}
          <NewTaskModal visible={modalVisible} onClose={toggleModal} />
      </View>
    
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: colors.background,

  },
  taskContainer: {
    padding: 16,
  },
  taskHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.white,
  },
  taskRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  taskCardContainer: {
    flex: 1,
    marginLeft: 16,
  },
  highlight: {
    color: '#3075FF',
  },
});

export default Home;
