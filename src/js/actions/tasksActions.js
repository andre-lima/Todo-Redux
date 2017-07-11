export function addNewTask(task) {
  return {
    type: 'ADD_NEW_TASK',
    payload: task,
  };
}

export function removeTask(id) {
  return {
    type: 'REMOVE_TASK',
    payload: id,
  };
}

export function toggleTaskCompleted(id) {
  return {
    type: 'TOGGLE_TASK_COMPLETED',
    payload: id,
  };
}
