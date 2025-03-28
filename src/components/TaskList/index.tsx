import { Task } from "@/src/context/TaskContext";
import { useTaskList } from "./hook/useTaskList";
import CustomCheckBox from "../CustomCheckBox";
import { View, Animated } from "react-native";
import TaskItem from "../TaskItem";
import * as S from "./styles";

interface TaskListProps {
  tasks: Task[];
  onEditTask: (id: string) => void;
  onCompleteTask: (id: string) => void;
  onDeleteTask: (id: string) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onEditTask, onCompleteTask, onDeleteTask }) => {
  const { handleTaskPress, useAnimatedTaskRow } = useTaskList(onCompleteTask);

  return (
    <S.ListContainer showsVerticalScrollIndicator={false}>
      {tasks.filter((task) => !task.completed).map((task) => (
        <AnimatedTaskRow
          key={task.id}
          task={task}
          onEditTask={onEditTask}
          onCompleteTask={onCompleteTask}
          onDeleteTask={onDeleteTask}
          onPress={() => handleTaskPress(task)}
          useAnimatedTaskRow={useAnimatedTaskRow}
        />
      ))}

      {tasks.some((task) => task.completed) && (
        <S.CompletedSection>
          {tasks.filter((task) => task.completed).map((task) => (
            <AnimatedTaskRow
              key={task.id}
              task={task}
              onEditTask={onEditTask}
              onCompleteTask={onCompleteTask}
              onDeleteTask={onDeleteTask}
              onPress={() => handleTaskPress(task)}
              useAnimatedTaskRow={useAnimatedTaskRow}
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
  useAnimatedTaskRow: (taskId: string) => {
    fadeAnim: Animated.Value;
    translateY: Animated.Value;
    scaleAnim: Animated.Value;
    handleCompleteTask: () => void;
    isAnimating: boolean;
  };
}> = ({ task, onEditTask, onCompleteTask, onDeleteTask, onPress, useAnimatedTaskRow }) => {
  const { fadeAnim, translateY, scaleAnim, handleCompleteTask } = useAnimatedTaskRow(task.id);

  return (
    <Animated.View
      style={{
        opacity: fadeAnim,
        transform: [{ translateY }, { scale: scaleAnim }],
      }}
    >
      <S.TaskRow>
        <View>
          <CustomCheckBox value={task.completed} onValueChange={handleCompleteTask} />
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
