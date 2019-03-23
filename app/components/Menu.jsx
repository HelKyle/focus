import * as React from 'react';
import { NavLink } from 'react-router-dom';
import * as classnames from 'classnames';
import { ipcRenderer } from 'electron';
import * as styles from './Menu.scss';
import Play from './svgrs/play-shape';
import List from './svgrs/list';
import Settings from './svgrs/settings';
import routes from '../constants/routes';

type Props = {
  className: string
};

export default function Menu(props: Props) {
  const handleSettingClick = () => {
    ipcRenderer.send('show-context-menu');
  };

  const cls = classnames(props.className, styles.menu);

  return (
    <div className={cls}>
      <NavLink to={routes.TASKS} exact  activeClassName={styles.active} >
        <List />
      </NavLink>
      <NavLink to={routes.HOME} exact  activeClassName={styles.active} >
        <Play />
      </NavLink>
      <button onClick={handleSettingClick} type="button">
        <Settings />
      </button>
    </div>
  );
}
