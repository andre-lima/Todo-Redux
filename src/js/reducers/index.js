import { combineReducers } from 'redux';

import tasks from './tasksReducer';
import visibilityFilter from './filterReducer';

export default combineReducers({
  tasks,
  visibilityFilter
});
