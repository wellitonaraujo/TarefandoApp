import { useMemo } from "react";

const useHeaderCard = (totalTasks: number, completedTasks: number) => {
    const taskProgress = useMemo(() => {
        return `${completedTasks}/${totalTasks}`;
    }, [completedTasks, totalTasks]);

    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleDateString("pt-BR", {
      weekday: 'short',
      day: 'numeric',
      month: 'short',
    });
  
    const capitalizeFirstLetter = (str: string) => {
      return str
        .split(' ')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
    };
  
    const capitalizedDate = capitalizeFirstLetter(formattedDate);

    return {
        taskProgress,
        capitalizedDate
    };
};

export default useHeaderCard;
