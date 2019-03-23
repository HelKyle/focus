import * as React from 'react';
import * as styles from './ActionContainer.scss';
import Menu from './Menu';

type Props = {
  children?: React.ReactNode
};

export default function ActionContainer(props: Props) {
  return (
    <div className={styles.actionContainer}>
      <div className={styles.children}>{props.children}</div>
      <Menu className={styles.menu} />
    </div>
  );
}
