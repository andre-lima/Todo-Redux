import store from './store';

import { addNewTask } from './actions/tasksActions';
import { setDisplayFilter } from './actions/filterActions';
import Task from './components/task';

// FILTER LIST
function filterList(currentFilter, currentList) {
  let todoList = [];

  switch (currentFilter) {
    case 'FILTER_ALL':
      todoList = [...currentList];
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
  return todoList;
}

// RENDER TODO LIST
function renderList(filteredList) {
  const todos = document.getElementById('todos');
  todos.innerHTML = '';

  filteredList.forEach(todo => {
    todos.appendChild(todo.toHTML(todo.completed));
  });
}

// ADD TASK
const textInput = document.getElementById('textInput');
const addButton = document.getElementById('addButton');
const datePicker = document.getElementById('datePicker');

addButton.addEventListener('click', () => {
  if (textInput.value !== '') {
    const task = new Task(textInput.value, datePicker.value);
    store.dispatch(addNewTask(task));
    textInput.value = '';
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

// Triggered when the store changes
store.subscribe(() => {
  const currentFilter = store.getState().visibilityFilter;
  const currentList = store.getState().tasks.todoList;

  const filteredList = filterList(currentFilter, currentList);

  renderList(filteredList);
});
