import { Subtask } from "../context/TaskContext";

export type RootParamList = {
    Home: undefined;
  };
  
  export type RootStackParamList = {
    Home: undefined;
    TaskDetails: {
      id: string
      name: string;
      date: string;
      subtasks: Subtask[];
    };
    CompletedTasks: undefined;
  };
  