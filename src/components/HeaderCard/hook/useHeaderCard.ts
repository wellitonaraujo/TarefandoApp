import { useMemo } from "react";

const useHeaderCard = (totalTasks: number, completedTasks: number) => {

    const formattedDate = useMemo(() => {
        const today = new Date();
        const day = String(today.getDate()).padStart(2, '0');
        const monthNames = [
            "janeiro", "fevereiro", "março", "abril", "maio", "junho",
            "julho", "agosto", "setembro", "outubro", "novembro", "dezembro"
        ];
        const month = monthNames[today.getMonth()];
        return `${day}, ${month}`;
    }, []);

    const taskProgress = useMemo(() => {
        return `${completedTasks}/${totalTasks}`;
    }, [completedTasks, totalTasks]);

    return {
        formattedDate,
        taskProgress,
    };
};

export default useHeaderCard;
