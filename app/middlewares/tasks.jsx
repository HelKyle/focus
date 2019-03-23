import { ipcRenderer } from 'electron';
import image from '../../resources/icons/48x48.png';
import secondFormat from '../utils/secondFormat';

const getTimeEndTaksCount = getState => {
  const {
    tasks: { rows = [] }
  } = getState();
  return rows.filter(task => task.remain > 0).length;
};

const getCurrentTask = getState => {
  const {
    tasks: { rows = [], currentId }
  } = getState();
  return rows.find(item => item.id === currentId);
};

export default ({ getState }) => next => action => {
  if (typeof action === 'object' && action.type === 'TICK') {
    const beforeCount = getTimeEndTaksCount(getState);
    next(action);
    const afterCount = getTimeEndTaksCount(getState);
    const task = getCurrentTask(getState);

    if (task) {
      ipcRenderer.send('setTitle', secondFormat(task.remain));
    } else {
      ipcRenderer.send('setTitle', '');
    }

    if (beforeCount !== afterCount && task) {
      // eslint-disable-next-line
      new Notification('Focus，任务完成了吗？', {
        body: `${task.name}`,
        image
      });
    }
  } else {
    next(action);
  }
};
