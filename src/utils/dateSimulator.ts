// Simulação: avançar a data para amanhã
const simulatedDate = new Date();
simulatedDate.setDate(simulatedDate.getDate() + 1);

// Separar as tarefas em tarefas de hoje, futuras, passadas e presente
const todayTasks = sortedTasks.filter(task => {
  const taskDate = new Date(task.date);
  return (
    taskDate.getDate() === simulatedDate.getDate() &&
    taskDate.getMonth() === simulatedDate.getMonth() &&
    taskDate.getFullYear() === simulatedDate.getFullYear()
  );
});

let upcomingTasks = sortedTasks.filter(task => {
  const taskDate = new Date(task.date);
  return (
    taskDate > simulatedDate &&
    (taskDate.getDate() !== simulatedDate.getDate() ||
      taskDate.getMonth() !== simulatedDate.getMonth() ||
      taskDate.getFullYear() !== simulatedDate.getFullYear())
  );
});

let pastTasks = sortedTasks.filter(task => {
  const taskDate = new Date(task.date);
  return (
    taskDate < simulatedDate &&
    (taskDate.getDate() !== simulatedDate.getDate() ||
      taskDate.getMonth() !== simulatedDate.getMonth() ||
      taskDate.getFullYear() !== simulatedDate.getFullYear())
  );
});

let presentTasks = sortedTasks.filter(task => {
  const taskDate = new Date(task.date);
  return (
    taskDate.getDate() === simulatedDate.getDate() &&
    taskDate.getMonth() === simulatedDate.getMonth() &&
    taskDate.getFullYear() === simulatedDate.getFullYear()
  );
});
