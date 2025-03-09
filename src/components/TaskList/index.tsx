import { RootStackParamList } from "@/src/navigation/AppNavigator";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";
import React, { useRef, useState } from "react";
import CustomCheckBox from "../CustomCheckBox";
import { View, Animated } from "react-native";
import TaskItem from "../TaskItem";
import * as S from "./styles";

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

interface TaskListProps {
  tasks: Task[];
  onEditTask: (id: string) => void;
  onCompleteTask: (id: string) => void;
  onDeleteTask: (id: string) => void;
}

const TaskList: React.FC<TaskListProps> = ({
  tasks,
  onEditTask,
  onCompleteTask,
  onDeleteTask,
}) => {
  const navigation =
    useNavigation<StackNavigationProp<RootStackParamList, "TaskDetails">>();

  const handleTaskPress = (task: Task) => {
    navigation.navigate("TaskDetails", {
      id: task.id,
      name: task.name,
      date: task.date,
      subtasks: task.subtasks || [],
    });
  };

  return (
    <S.ListContainer showsVerticalScrollIndicator={false}>
      {tasks
        .filter((task) => !task.completed)
        .map((task) => (
          <AnimatedTaskRow
            key={task.id}
            task={task}
            onEditTask={onEditTask}
            onCompleteTask={onCompleteTask}
            onDeleteTask={onDeleteTask}
            onPress={() => handleTaskPress(task)}
          />
        ))}

      {tasks.some((task) => task.completed) && (
        <S.CompletedSection>
          {tasks
            .filter((task) => task.completed)
            .map((task) => (
              <AnimatedTaskRow
                key={task.id}
                task={task}
                onEditTask={onEditTask}
                onCompleteTask={onCompleteTask}
                onDeleteTask={onDeleteTask}
                onPress={() => handleTaskPress(task)}
              />
            ))}
        </S.CompletedSection>
      )}
    </S.ListContainer>
  );
};

export default TaskList;

const AnimatedTaskRow: React.FC<{
  task: Task;
  onEditTask: (id: string) => void;
  onCompleteTask: (id: string) => void;
  onDeleteTask: (id: string) => void;
  onPress: () => void;
}> = ({ task, onEditTask, onCompleteTask, onDeleteTask, onPress }) => {
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const translateY = useRef(new Animated.Value(0)).current;
  const [isAnimating, setIsAnimating] = useState(false);

  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handleCompleteTask = () => {
    setIsAnimating(true);
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(translateY, {
        toValue: 10,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: 1.2,
          duration: 150,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 0,
          duration: 150,
          useNativeDriver: true,
        }),
      ]),
    ]).start(() => {
      onCompleteTask(task.id);
      setIsAnimating(false);
    });
  };

  return (
    <Animated.View
      style={{
        opacity: fadeAnim,
        transform: [{ translateY }, { scale: scaleAnim }],
      }}
    >
      <S.TaskRow>
        <View>
          <CustomCheckBox
            value={task.completed}
            onValueChange={handleCompleteTask}
          />
        </View>
        <TaskItem
          task={task}
          onEdit={onEditTask}
          onComplete={onCompleteTask}
          onDelete={onDeleteTask}
          completed={task.completed}
          onPress={onPress}
        />
      </S.TaskRow>
    </Animated.View>
  );
};
