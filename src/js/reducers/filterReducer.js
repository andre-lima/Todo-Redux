const INITIAL_STATE = 'FILTER_ALL';

const filterReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'SET_DISPLAY_FILTER': {
      return action.payload;
    }
    default:
      break;
  }
  return state;
};

export default filterReducer;
