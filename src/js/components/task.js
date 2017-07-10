import { removeTask, toggleTaskCompleted } from '../actions/tasksActions';
import store from '../store';

export default class Task {
  constructor(content, date = new Date()) {
    this.content = content;
    this.id = 0;
    this.dueDate = date;
    this.completed = false;
    this.completeTask = this.completeTask.bind(this);
    this.removeTask = this.removeTask.bind(this);
  }

  completeTask() {
    store.dispatch(toggleTaskCompleted(this.id));
  }

  removeTask() {
    store.dispatch(removeTask(this.id));
  }

  toHTML() {
    const todoContainer = document.createElement('div');
    todoContainer.classList.add('task');

    const todoContent = document.createElement('h3');
    const contentText = document.createTextNode(this.content);
    todoContent.appendChild(contentText);

    const todoDueDate = document.createElement('p');
    const dateText = document.createTextNode(`Due date: ${this.dueDate}`);
    todoDueDate.appendChild(dateText);

    const todoCheckCompleted = document.createElement('input');
    todoCheckCompleted.type = 'checkbox';
    todoCheckCompleted.checked = this.completed;
    todoCheckCompleted.addEventListener('click', this.completeTask);

    const todoRemoveButton = document.createElement('input');
    todoRemoveButton.type = 'button';
    todoRemoveButton.value = 'X';
    todoRemoveButton.addEventListener('click', this.removeTask);

    todoContainer.appendChild(todoContent);
    todoContainer.appendChild(todoDueDate);
    todoContainer.appendChild(todoCheckCompleted);
    todoContainer.appendChild(todoRemoveButton);

    return todoContainer;
  }
}
