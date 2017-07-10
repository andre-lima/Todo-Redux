const INITIAL_STATE = {
  todoList: [],
  todosLength: 1,
  lastIdUsed: -1,
  displayFilter: 'FILTER_ALL'
};

const tasksReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'ADD_NEW_TASK': {
      action.payload.id = state.lastIdUsed + 1;  // Set task id
      return {
        ...state,
        todoList: [...state.todoList, action.payload],
        todosLength: state.todosLength + 1,
        lastIdUsed: state.lastIdUsed + 1
      };
    }
    case 'REMOVE_TASK': {
      const newList = state.todoList.filter(todo => todo.id !== action.payload);
      return {
        ...state,
        todoList: newList
      };
    }
    case 'TOGGLE_TASK_COMPLETED': {
      const newList = [...state.todoList];
      newList[action.payload].completed = !newList[action.payload].completed;
      return {
        ...state,
        todoList: newList
      };
    }
    case 'SET_DISPLAY_FILTER': {
      return {
        ...state,
        displayFilter: action.payload
      };
    }
    default:
      break;
  }
  return state;
};

export default tasksReducer;
