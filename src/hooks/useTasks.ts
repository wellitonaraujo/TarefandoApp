import { useTask } from '../context/TaskContext';
import { TaskType } from '../models/TaskType';
import { useState, useEffect } from 'react';
import { Animated } from 'react-native';

export function useTasks() {
  const { tasks, updateTasks } = useTask();
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [tasksWithSelection, setTasksWithSelection] = useState<TaskType[]>([]);
  const [animations, setAnimations] = useState<{ [key: number]: Animated.Value }>({});

  const [todayIconRotation] = useState(new Animated.Value(0));
  const [upcomingIconRotation] = useState(new Animated.Value(0));
  const [pastIconRotation] = useState(new Animated.Value(1));
  const [completedIconRotation] = useState(new Animated.Value(1));

  const [isTodayExpanded, setIsTodayExpanded] = useState<boolean>(true);
  const [isUpcomingExpanded, setIsUpcomingExpanded] = useState<boolean>(true);
  const [isPastExpanded, setIsPastExpanded] = useState<boolean>(false);
  const [isCompletedExpanded, setIsCompletedExpanded] = useState<boolean>(false);

  const [editModalVisible, setEditModalVisible] = useState(false);
  const [selectedTask, setSelectedTask] = useState<TaskType | null>(null);

  const filteredTasks = tasksWithSelection.filter(task =>
    task.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    setTasksWithSelection(tasks);
  }, [tasks]);

  useEffect(() => {
    const newAnimations: { [key: number]: Animated.Value } = {};
    tasksWithSelection.forEach((task, index) => {
      if (task.isSelected) {
        newAnimations[index] = new Animated.Value(0);
      }
    });
    setAnimations(newAnimations);
  }, [tasksWithSelection]);

  const sortedTasks = [...filteredTasks].sort((a, b) => {
    const dateA = new Date(a.date).getTime();
    const dateB = new Date(b.date).getTime();
    return dateA - dateB;
  });

  const todayTasks = sortedTasks.filter(task => {
    const taskDate = new Date(task.date);
    const currentDate = new Date();
    return (
      taskDate.getDate() === currentDate.getDate() &&
      taskDate.getMonth() === currentDate.getMonth() &&
      taskDate.getFullYear() === currentDate.getFullYear() &&
      !task.isSelected
    );
  });

  const upcomingTasks = sortedTasks.filter(task => {
    const taskDate = new Date(task.date);
    const currentDate = new Date();
    return (
      taskDate > currentDate &&
      (taskDate.getDate() !== currentDate.getDate() ||
        taskDate.getMonth() !== currentDate.getMonth() ||
        taskDate.getFullYear() !== currentDate.getFullYear()) &&
      !task.isSelected
    );
  });

  const pastTasks = sortedTasks.filter(task => {
    const taskDate = new Date(task.date);
    const currentDate = new Date();
    return (
      taskDate < currentDate &&
      (taskDate.getDate() !== currentDate.getDate() ||
        taskDate.getMonth() !== currentDate.getMonth() ||
        taskDate.getFullYear() !== currentDate.getFullYear()) &&
      !task.isSelected
    );
  });

  const completedTasks = sortedTasks.filter(task => task.isSelected);

  const handleSelect = async (index: number) => {
    const updatedTasks = [...tasksWithSelection];
    updatedTasks[index] = {
      ...updatedTasks[index],
      isSelected: !updatedTasks[index].isSelected
    };
    setTasksWithSelection(updatedTasks);
    updateTasks(updatedTasks);
  };

  const handleDeleteSpecificTask = (taskToDelete: TaskType) => {
    const updatedTasks = tasksWithSelection.filter(task => task !== taskToDelete);
    const updatedAnimations: { [key: number]: Animated.Value } = {};
  
    updatedTasks.forEach((task, index) => {
      updatedAnimations[index] = animations[tasksWithSelection.indexOf(task)] || new Animated.Value(0);
    });
  
    const taskIndex = tasksWithSelection.indexOf(taskToDelete);
    if (taskIndex !== -1 && animations[taskIndex]) {
      Animated.timing(animations[taskIndex], {
        toValue: -10,
        duration: 500,
        useNativeDriver: true
      }).start(() => {
        delete animations[taskIndex];
      });
    }
  
    updateTasks(updatedTasks);
    setTasksWithSelection(updatedTasks);
    setAnimations(updatedAnimations);
  };

  return {
    searchTerm,
    setSearchTerm,
    tasksWithSelection,
    setTasksWithSelection,
    animations,
    setAnimations,
    todayIconRotation,
    upcomingIconRotation,
    pastIconRotation,
    completedIconRotation,
    isTodayExpanded,
    setIsTodayExpanded,
    isUpcomingExpanded,
    setIsUpcomingExpanded,
    isPastExpanded,
    setIsPastExpanded,
    isCompletedExpanded,
    setIsCompletedExpanded,
    editModalVisible,
    setEditModalVisible,
    selectedTask,
    setSelectedTask,
    filteredTasks,
    sortedTasks,
    todayTasks,
    upcomingTasks,
    pastTasks,
    completedTasks,
    handleSelect,
    handleDeleteSpecificTask
  };
}
