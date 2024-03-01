import { AppNav } from '../app-nav/component';
import styles from './styles.module.css';
import * as classNames from 'classnames';
import { AppHeaderLogo } from '../app-header-logo/component';
import { MenuIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useScreenSize } from '../../device-context/hook';

interface AppHeaderProps {
  className?: string;
}

export const AppHeader = ({ className }: AppHeaderProps) => {
  const { isMobile } = useScreenSize();
  return (
    <div className={classNames(styles.container, className)}>
      {isMobile ? (
        <div className={styles.menu}>
          <MenuIcon type='primary' />
        </div>
      ) : (
        <AppNav className={styles.nav} />
      )}
      <AppHeaderLogo className={styles.logo} />
    </div>
  );
};
