export interface PrioritySelectorProps {
  onPressPriority: (priority: 'low' | 'average' | 'high' | null) => void;
  priority: 'low' | 'average' | 'high' | null;
  priorities: PriorityType[];
}
interface PriorityType {
  type: 'low' | 'average' | 'high';
  color: string;
  label: string;
}
