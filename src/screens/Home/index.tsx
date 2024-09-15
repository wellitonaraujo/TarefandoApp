import { ScrollView, View, StyleSheet } from 'react-native';
import CustomCheckBox from '@/src/components/CustomCheckBox';
import AddButton from '@/src/components/AddButton';
import TaskCard from '@/src/components/TaskCard';
import colors from '@/src/styles/colors';
import React, { useState, useEffect } from 'react';
import { imgs } from '../imgs';
import NewTaskModal from '@/src/components/NewTaskModal';
import { useModals } from '@/src/hooks/useModals';
import CalendarS from '@/src/components/Calendar';

// Função para obter a data atual no formato dd-mm-yyyy
const getCurrentDate = () => {
  const today = new Date();
  const day = String(today.getDate()).padStart(2, '0');
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const year = today.getFullYear();
  return `${day}-${month}-${year}`;
};

interface Task {
  id: string;
  description: string;
  startTime: string;
  endTime: string;
  completed: boolean;
  date: string; // Nova propriedade para associar uma data à tarefa
}

const Home = () => {
  const { modalVisible, toggleModal } = useModals();
  const [selectedDate, setSelectedDate] = useState(getCurrentDate());
  const [tasks, setTasks] = useState<Task[]>([]);
  const [taskCompletion, setTaskCompletion] = useState<{ [key: string]: boolean }>({});

  const handleToggleComplete = (taskId: string) => {
    setTaskCompletion(prev => ({
      ...prev,
      [taskId]: !prev[taskId],
    }));
  };

  const handleAddTask = (description: string, startTime: string, endTime: string) => {
    const newTask: Task = {
      id: new Date().getTime().toString(),
      description,
      startTime,
      endTime,
      completed: false,
      date: selectedDate, // Associa a tarefa à data selecionada no formato dd-mm-yyyy
    };
    setTasks(prevTasks => [...prevTasks, newTask]);
    toggleModal(); // Fechar o modal após salvar a tarefa
  };  

  // Filtra as tarefas para a data selecionada
  const filteredTasks = tasks.filter(task => task.date === selectedDate);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View>
        <CalendarS onDateChange={setSelectedDate} tasks={tasks} />
      </View>
      <View style={styles.taskContainer}>
        <View style={styles.taskHeader}>
          <AddButton
            icon={imgs.plus}
            onPress={toggleModal}
            backgroundColor={colors.primary}
          />
        </View>

        {filteredTasks.map(task => (
          <View key={task.id} style={styles.taskRow}>
            <CustomCheckBox
              value={taskCompletion[task.id] || false}
              onValueChange={() => handleToggleComplete(task.id)}
            />
            <View style={styles.taskCardContainer}>
              <TaskCard
                id={task.id} 
                description={task.description}
                startTime={task.startTime}
                endTime={task.endTime}  
                completed={taskCompletion[task.id] || false}
                onToggleComplete={() => handleToggleComplete(task.id)}
              />
            </View>
          </View>
        ))}

        <NewTaskModal visible={modalVisible} onClose={toggleModal} onSave={handleAddTask} />
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
    fontSize: 16,
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
