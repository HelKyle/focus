// @flow
import { GEN_TASK } from '../utils';

export const SELECT_TASK = 'SELECT_TASK';
export const TOGGLE_STATE = 'TOGGLE_STATE';
export const ADD_TASK = 'ADD_TASK';
export const REMOVE_TASK = 'REMOVE_TASK';
export const TOGGLE_COUNTING = 'TOGGLE_COUNTING';
export const UPDATE_TASK_NAME = 'UPDATE_TASK_NAME';

export function addTaskByName(name: string) {
  return {
    type: ADD_TASK,
    payload: {
      ...GEN_TASK(name)
    }
  };
}

export function removeTask(id: string) {
  return {
    type: REMOVE_TASK,
    payload: id
  };
}

export function toggleState(id: string) {
  return {
    type: TOGGLE_STATE,
    payload: id
  };
}

export function selectTask(id: any) {
  return {
    type: SELECT_TASK,
    payload: id
  };
}

export function toggleCounting() {
  return {
    type: TOGGLE_COUNTING
  };
}

export function updateTaskName(name: string) {
  return {
    type: UPDATE_TASK_NAME,
    payload: name
  };
}
