import { useState, useEffect } from 'react';
import { Animated } from 'react-native';
import { TaskType } from '../models/TaskType';

export function useAnimations(tasksWithSelection: TaskType[]) {
  const [animations, setAnimations] = useState<{ [key: number]: Animated.Value }>({});

  useEffect(() => {
    const newAnimations: { [key: number]: Animated.Value } = {};
    tasksWithSelection.forEach((task, index) => {
      if (task.isSelected) {
        newAnimations[index] = new Animated.Value(0);
      }
    });
    setAnimations(newAnimations);
  }, [tasksWithSelection]);

  return {
    animations,
    setAnimations
  };
}
