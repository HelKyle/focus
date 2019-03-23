import {
  SELECT_TASK,
  ADD_TASK,
  REMOVE_TASK,
  TOGGLE_STATE,
  TOGGLE_COUNTING,
  UPDATE_TASK_NAME
} from '../actions/tasks';
import type { Action, Task } from './types';
import { TICK } from '../utils/actionTypes';

interface INITIAL_STATE {
  rows: Task[];
  currentId: string;
  counting: boolean;
}

const initialState: INITIAL_STATE = {
  rows: [],
  currentId: '',
  counting: true
};

const sortBy = (a: Task, b: Task) => {
  if (a.done && !b.done) {
    return 1;
  }
  if (!a.done && b.done) {
    return -1;
  }
  if (a.created_at < b.created_at) {
    return 1;
  }
  return -1;
};

export default function tasksReducer(
  state: INITIAL_STATE = initialState,
  action: Action
) {
  switch (action.type) {
    case TOGGLE_COUNTING:
      return {
        ...state,
        counting: !state.counting
      };
    case ADD_TASK:
      return {
        ...state,
        rows: [...state.rows, action.payload].sort(sortBy)
      };
    case REMOVE_TASK:
      return {
        ...state,
        rows: state.rows.filter(item => item.id !== action.payload)
      };
    case SELECT_TASK:
      return {
        ...state,
        counting: true,
        currentId: action.payload
      };
    case TOGGLE_STATE:
      return {
        ...state,
        rows: state.rows
          .map(task =>
            task.id === action.payload
              ? {
                  ...task,
                  done: !task.done
                }
              : task
          )
          .sort(sortBy)
      };
    case UPDATE_TASK_NAME:
      return {
        ...state,
        rows: state.rows.map(task =>
          task.id === state.currentId
            ? {
                ...task,
                name: action.payload
              }
            : task
        )
      };
    case TICK:
      return {
        ...state,
        rows: state.rows
          .map(task =>
            task.id === state.currentId && state.counting && !task.done
              ? {
                  ...task,
                  remain: Math.max(task.remain - 1, 0),
                  done: task.remain === 0
                }
              : task
          )
          .sort(sortBy)
      };
    case '@@INIT':
      return {
        ...state,
        rows: state.rows.sort(sortBy)
      };
    default:
      return state;
  }
}
