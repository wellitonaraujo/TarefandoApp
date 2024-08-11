import { TaskType } from '../models/TaskType';
import { useState, useEffect } from 'react';
import { Animated } from 'react-native';

export const useTaskAnimations = (tasks: TaskType[]) => {
  const [animations, setAnimations] = useState<{ [key: string]: Animated.Value }>({
    pastIconRotation: new Animated.Value(0),
    todayIconRotation: new Animated.Value(0),
    upcomingIconRotation: new Animated.Value(0),
    completedIconRotation: new Animated.Value(0),
  });

  useEffect(() => {
    // Animate icons when tasks are updated (if needed)
    Animated.stagger(100, Object.values(animations).map(anim =>
      Animated.timing(anim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      })
    )).start();
  }, [tasks]);

  return { animations, setAnimations };
};
