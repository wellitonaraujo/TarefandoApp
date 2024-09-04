import { ScrollView, View, Text, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import AddButton from '@/src/components/AddButton';
import CalendarS from '@/src/components/Calendar';
import TaskCard from '@/src/components/TaskCard';
import { tasks } from './tasksmock';
import { imgs } from '../imgs';
import colors from '@/src/styles/colors';

const getCurrentDate = () => {
  const today = new Date();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const year = today.getFullYear();
  const day = String(today.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const Home = () => {
  const [selectedDate, setSelectedDate] = useState(getCurrentDate());
  const filteredTasks = tasks.filter(task => task.date === selectedDate);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View>
        <CalendarS onDateChange={setSelectedDate} />
      </View>

      <View style={styles.taskContainer}>
        <View style={styles.taskHeader}>
          <Text style={styles.title}>
            Você possui {filteredTasks.length} tarefa(s) <Text style={styles.highlight}>hoje</Text>
          </Text>
          <AddButton
            icon={imgs.plus}
            onPress={() => {}}
            backgroundColor={colors.primary}
          />
        </View>

        {filteredTasks.map(task => (
          <TaskCard
            key={task.id}
            description={task.description}
            time={task.time}
            completed={task.completed}
            onPress={() => console.log(`Task ${task.id} pressed`)}
          />
        ))}
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
    borderRadius: 30,
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
    justifyContent:'center',

  },
  taskCard: {
    backgroundColor: colors.card,
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#21242D',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  taskCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  taskDescription: {
    fontSize: 14,
    fontWeight: 'bold',
    color: colors.white,
    flex: 1, 
  },
  ellipsisIcon: {
    width: 20,
    height: 20,
    tintColor: '#706F6F',
    marginLeft: 10,
  },
  taskInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  taskTime: {
    fontSize: 12,
    color: '#706F6F',
    marginLeft: 5,
  },
  icon: {
    width: 15,
    height: 15,
    tintColor: '#706F6F',
  },
  highlight: {
    color: '#3075FF',
  },
});

export default Home;
