import React from 'react';
import { View } from 'react-native';
import * as S from './styles';
import TaskItem from '../TaskItem';
import CustomCheckBox from '../CustomCheckBox';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '@/src/navigation/AppNavigator';

type Subtask = {
  id: string;
  name: string;
  completed: boolean;
};

type Task = {
  id: string;
  name: string;
  completed: boolean;
  date: string;
  subtasks?: Subtask[];
};

type TaskListProps = {  
  tasks: Task[];
  onEditTask: (id: string) => void;
  onCompleteTask: (id: string) => void;
  onDeleteTask: (id: string) => void;
};

const TaskList: React.FC<TaskListProps> = ({
  tasks,
  onEditTask,
  onCompleteTask,
  onDeleteTask,
}) => {

  const navigation = useNavigation<StackNavigationProp<RootStackParamList, 'TaskDetails'>>();

  const handleTaskPress = (task: Task) => {
    navigation.navigate('TaskDetails', {
      name: task.name,
      date: task.date,
      subtasks: task.subtasks || [],
    });
  };

  const renderTasks = (filterCompleted: boolean) => (
    tasks
      .filter(task => task.completed === filterCompleted)
      .map(task => (
        <S.TaskRow key={task.id}>
          <View>
            <CustomCheckBox
              value={task.completed}
              onValueChange={() => onCompleteTask(task.id)}
            />
          </View>
          <TaskItem
            task={task}
            onEdit={onEditTask}
            onComplete={onCompleteTask}
            onDelete={onDeleteTask}
            completed={task.completed}
            onPress={() => handleTaskPress(task)}
          />
        </S.TaskRow>
      ))
  );

  return (
    <S.ListContainer showsVerticalScrollIndicator={false}>
      {renderTasks(false)}

      {tasks.some(task => task.completed) && (
        <S.CompletedSection>
          {renderTasks(true)}
        </S.CompletedSection>
      )}
    </S.ListContainer>
  );
};

export default TaskList;
