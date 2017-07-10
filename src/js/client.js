import store from './store';

import { addNewTask, setDisplayFilter } from './actions/tasksActions';
import Task from './components/task';

// Triggered when the store changes
store.subscribe(() => {
  const currentFilter = store.getState().tasks.displayFilter;
  const currentList = store.getState().tasks.todoList;
  let todoList = [];

  switch (currentFilter) {
    case 'FILTER_ALL':
      todoList = currentList;
      break;
    case 'FILTER_COMPLETED':
      todoList = currentList.filter(todo => todo.completed);
      break;
    case 'FILTER_NOT_COMPLETED':
      todoList = currentList.filter(todo => !todo.completed);
      break;
    case 'FILTER_DELAYED': {
      const now = new Date();
      todoList = currentList.filter(todo => !todo.completed && (new Date(todo.dueDate)).getTime() < now.getTime());
      break;
    }
    default:
      break;
  }

  const todos = document.getElementById('todos');
  todos.innerHTML = '';

  todoList.forEach(todo => todos.appendChild(todo.toHTML()));
});


// ADD TASK
const textInput = document.getElementById('textInput');
const addButton = document.getElementById('addButton');
const datePicker = document.getElementById('datePicker');

addButton.addEventListener('click', () => {
  if(textInput.value !== '') {
    const task = new Task(textInput.value, datePicker.value);
    store.dispatch(addNewTask(task));
  } else {
    alert('You have to put a task description');
  }
});

// RADIO FILTER
document.getElementById('filter').addEventListener('click', (event) => {
  const target = event.target;
  if (target.type === 'radio') {
    store.dispatch(setDisplayFilter(target.value));
  }
});
