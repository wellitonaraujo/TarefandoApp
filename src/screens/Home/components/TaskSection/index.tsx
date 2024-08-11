import { Animated, Pressable } from 'react-native';
import { TaskType } from '@/src/models/TaskType';
import { imgs } from '@/src/screens/imgs';
import Task from '@/src/components/Task';
import * as S from "./styles";
import React from 'react';

type TaskSectionProps = {
  title: string;
  tasks: TaskType[];
  isExpanded: boolean;
  toggleSection: () => void;
  iconRotation: Animated.Value;
  handleSelect: (index: number) => void;
  openEditModal: (task: TaskType) => void;
  handleDeleteSpecificTask: (task: TaskType) => void;
  animations: Animated.Value[];
};

const TaskSection: React.FC<TaskSectionProps> = ({
  title,
  tasks,
  isExpanded,
  toggleSection,
  iconRotation,
  handleSelect,
  openEditModal,
  handleDeleteSpecificTask,
  animations,
}) => {
  if (tasks.length === 0) {
    return null;
  }

  return (
    <>
      <Pressable onPress={toggleSection}>
        <S.SeparatorView>
          <S.SeparatorText>{title}</S.SeparatorText>
          <S.AnimatedSeparatorIcon
            resizeMode="contain"
            source={imgs.arrowbottom}
            style={{
              transform: [
                {
                  rotate: iconRotation.interpolate({
                    inputRange: [0, 1],
                    outputRange: ['0deg', '180deg'],
                  }),
                },
              ],
            }}
          />
        </S.SeparatorView>
      </Pressable>
      {isExpanded && (
        <>
          {tasks.map((task, index) => (
            <Animated.View
              key={index.toString()}
              style={{ transform: [{ translateX: animations[index] || 0 }] }}
            >
              <Task
                title={task.title}
                priority={task.priority}
                date={new Date(task.date)}
                handleSelect={async () => handleSelect(index)}
                isSelected={task.isSelected}
                onPress={() => openEditModal(task)}
                onDelete={() => handleDeleteSpecificTask(task)}
              />
            </Animated.View>
          ))}
        </>
      )}
    </>
  );
};

export default TaskSection;
