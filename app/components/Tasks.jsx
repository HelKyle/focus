import React, { Component } from 'react';
import * as classnames from 'classnames';
import SearchInput from './SearchInput';
import type { Task } from '../reducers/types';
import {
  addTaskByName,
  removeTask,
  toggleState,
  selectTask
} from '../actions/tasks';
import Play from './svgrs/play-shape';
import Delete from './svgrs/delete';
import Tick from './svgrs/tick';
import TickBox from './svgrs/tick-box';

import styles from './Tasks.scss';

type Props = {
  rows: Array<Task>,
  dispatch: any => any
};

type State = {
  search: string,
  displayRows: Task[]
};

export default class Home extends Component<Props, State> {
  static defaultProps = {
    rows: [],
    current: {}
  };

  state = {
    search: '',
    displayRows: []
  };

  static getDerivedStateFromProps(props: Props, state: State) {
    const { rows } = props;
    return {
      ...state,
      displayRows: rows.filter(
        (row): boolean => row.name.includes(state.search)
      )
    };
  }

  createTask = (name: string) => {
    this.props.dispatch(addTaskByName(name));
  };

  handleRemove = (id: string) => {
    this.props.dispatch(removeTask(id));
  };

  handleSeachChange = (value: string) => {
    this.setState({
      search: value
    });
  };

  handleSubmit = (value: string) => {
    if (value && value.trim()) {
      this.createTask(value);
      this.handleSeachChange('');
    }
  };

  toggleState = (id: string) => {
    this.props.dispatch(toggleState(id));
  };

  selectTask = (task: Task) => {
    this.props.dispatch(selectTask(task));
    this.props.history.push('/'); // eslint-disable-line
  };

  render() {
    const { displayRows } = this.state;
    const { rows } = this.props;
    return (
      <div className={styles.container}>
        <SearchInput
          value={this.state.search}
          onChange={this.handleSeachChange}
          onSubmit={this.handleSubmit}
          placeholder="搜索/创建任务"
        />
        <div className={styles.listWrapper}>
          <div className={styles.stickyHeader}>{rows.length} 个任务</div>
          <ul className={styles.list}>
            {displayRows.map(row => {
              const { done, remain } = row;
              const itemCls = classnames(styles.item, {
                [styles.done]: done
              });
              return (
                <li key={row.id} className={itemCls}>
                  {row.name}
                  <div className={styles.operation}>
                    {done ? (
                      <Tick
                        disabled
                        onClick={() => remain > 0 && this.toggleState(row.id)}
                      />
                    ) : (
                      <TickBox
                        disabled={remain === 0}
                        onClick={() => remain > 0 && this.toggleState(row.id)}
                      />
                    )}
                    <Play
                      fill="#2B69B1"
                      disabled={done}
                      onClick={() => !done && this.selectTask(row.id)}
                    />
                    <Delete
                      fill="#E74424"
                      onClick={() => this.handleRemove(row.id)}
                    />
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    );
  }
}
