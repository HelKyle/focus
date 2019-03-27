import * as React from 'react';
import { NavLink } from 'react-router-dom';
import * as classnames from 'classnames';
import { remote } from 'electron';
import * as styles from './Menu.scss';
import Play from './svgrs/play-shape';
import List from './svgrs/list';
import Settings from './svgrs/settings';
import routes from '../constants/routes';

const { Menu, MenuItem } = remote;

type Props = {
  className: string
};

export default function (props: Props) {
  const handleSettingClick = () => {
    const menu = new Menu();
    menu.append(
      new MenuItem({
        label: '退出',
        click: () => {
          remote.app.quit();
        }
      })
    );
    menu.popup({ window: remote.getCurrentWindow() })
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
