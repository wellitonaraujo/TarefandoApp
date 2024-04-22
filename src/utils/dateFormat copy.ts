// Simulação: avançar a data para amanhã
const simulatedDate = new Date();
simulatedDate.setDate(simulatedDate.getDate() + 1);

// Separar as tarefas em tarefas de hoje e tarefas futuras
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
  return taskDate > simulatedDate;
});

// Remove tarefas que já chegaram ao dia agendado da lista de tarefas futuras
upcomingTasks = upcomingTasks.filter(task => {
  const taskDate = new Date(task.date);
  return (
    taskDate.getDate() !== simulatedDate.getDate() ||
    taskDate.getMonth() !== simulatedDate.getMonth() ||
    taskDate.getFullYear() !== simulatedDate.getFullYear()
  );
});
