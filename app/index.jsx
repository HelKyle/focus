import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import throttle from 'lodash/throttle';
import { ipcRenderer } from 'electron';
import Root from './containers/Root';
import { configureStore, history } from './store/configureStore';
import './app.global.css';
import { TICK } from './utils/actionTypes';
import electronStore from './store/electronStore';

const store = configureStore({
  tasks: electronStore.getTasks()
});

ipcRenderer.send('store-ready');
ipcRenderer.on('tick', () => {
  store.dispatch({
    type: TICK
  });
});

const sync = throttle(tasks => {
  electronStore.setTasks(tasks);
}, 1000);

store.subscribe(() => {
  const { tasks } = store.getState();
  sync(tasks);
});

render(
  <AppContainer>
    <Root store={store} history={history} />
  </AppContainer>,
  document.getElementById('root')
);

if (module.hot) {
  module.hot.accept('./containers/Root', () => {
    // eslint-disable-next-line global-require
    const NextRoot = require('./containers/Root').default;
    render(
      <AppContainer>
        <NextRoot store={store} history={history} />
      </AppContainer>,
      document.getElementById('root')
    );
  });
}
