import { RootStackParamList } from "@/src/navigation/AppNavigator";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";
import { Task } from "@/src/context/TaskContext";
import { useRef, useState } from "react";
import { Animated } from "react-native";

export const useTaskList = (onCompleteTask: (id: string) => void) => {
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

  const useAnimatedTaskRow = (taskId: string) => {
    const fadeAnim = useRef(new Animated.Value(1)).current;
    const translateY = useRef(new Animated.Value(0)).current;
    const scaleAnim = useRef(new Animated.Value(1)).current;
    const [isAnimating, setIsAnimating] = useState(false);

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
        onCompleteTask(taskId);
        setIsAnimating(false);
      });
    };

    return { fadeAnim, translateY, scaleAnim, handleCompleteTask, isAnimating };
  };

  return { handleTaskPress, useAnimatedTaskRow };
};
