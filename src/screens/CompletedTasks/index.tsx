import React from "react";
import { View, TouchableOpacity, Image, Pressable } from "react-native";
import { useTaskManager } from "../../context/TaskContext";
import TaskList from "@/src/components/TaskList";
import * as S from "./styles";
import EmptyState from "@/src/components/EmptyState";
import colors from "@/src/themes/colors";

const CompletedTasks: React.FC = () => {
  const {
    tasks,
    updateKey,
    handleEditTask,
    handleDeleteTask,
    handleCompleteTask,
    handleDeleteAllCompletedTasks,
  } = useTaskManager();

  const completedTasks = tasks.filter((task) => task.completed);

  return (
    <S.Container>
      <S.Wrapper>
        <Pressable onPress={handleDeleteAllCompletedTasks}>
          <S.Icon
            source={require("../../assets/icons/delete-filled.png")}
            tintColor={colors.gray_200}
            style={{
              opacity: completedTasks.length === 0 ? 0.5 : 1,
            }}
          />
        </Pressable>
      </S.Wrapper>

      {completedTasks.length === 0 ? (
        <EmptyState tabIndex={3} />
      ) : (
        <TaskList
          tasks={completedTasks}
          updateKey={updateKey}
          onEditTask={handleEditTask}
          onDeleteTask={handleDeleteTask}
          onCompleteTask={handleCompleteTask}
        />
      )}
    </S.Container>
  );
};

export default CompletedTasks;
