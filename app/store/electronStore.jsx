const Store = require('electron-store');

const store = new Store();

export default {
  setTasks: data => store.set('tasks', data),
  getTasks: () => store.get('tasks')
};
