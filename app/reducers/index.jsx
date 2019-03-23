import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import tasks from './tasks';

export default function createRootReducer(history: History) {
  return combineReducers({
    router: connectRouter(history),
    tasks
  });
}
