import type { Dispatch as ReduxDispatch, Store as ReduxStore } from 'redux';

export type Task = {
  name: string,
  plan: number,
  remain: number,
  done: boolean
};

export type StateType = {
  +tasks: {
    rows: Task[],
    currentId: string
  }
};

export type Action = {
  +type: string,
  +payload: any
};

export type GetState = () => StateType;

export type Dispatch = ReduxDispatch<Action>;

export type Store = ReduxStore<GetState, Action>;
