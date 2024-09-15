export interface TaskCardProps {
  id: string;
  description: string;
  startTime: string;
  endTime: string;
  completed: boolean;
  onToggleComplete: () => void;
}
