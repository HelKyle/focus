// @flow
import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Home.scss';
import CountDown from './CountDown';
import type { Task } from '../reducers/types';
import routes from '../constants/routes';
import { toggleCounting, updateTaskName } from '../actions/tasks';

import target from '../../static/target.png';
import EditableLabel from './EditableName';

type Props = {
  current: Task,
  counting: boolean,
  dispatch: any => void
};

export default function Home(props: Props) {
  const { current, counting, dispatch } = props;
  if (!current) {
    return (
      <div className={styles.empty}>
        <img className={styles.target} src={target} alt="" />
        <Link className={styles.link} to={routes.TASKS}>
          创建任务
        </Link>
      </div>
    );
  }
  const { name, done, plan, remain } = current;
  return (
    <div className={styles.container} data-tid="container">
      <EditableLabel
        done={done}
        value={name}
        onSubmit={value => dispatch(updateTaskName(value))}
      />
      <CountDown
        plan={plan}
        remain={remain}
        counting={counting}
        onToggleCounting={() => dispatch(toggleCounting())}
      />
    </div>
  );
}
