const INITIAL_STATE = {
  todoList: [],
  todosLength: 0,
  lastIdUsed: -1,
};

const tasksReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'ADD_NEW_TASK': {
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
        todosLength: state.todosLength - 1,
        todoList: newList
      };
    }
    case 'TOGGLE_TASK_COMPLETED': {
      const newList = state.todoList.map((todo) => {
        if (todo.id === action.payload) {
          return { ...todo, completed: !todo.completed };
        }
        return { ...todo };
      });
      
      return {
        ...state,
        todoList: newList
      };
    }
    default:
      break;
  }
  return state;
};

export default tasksReducer;
