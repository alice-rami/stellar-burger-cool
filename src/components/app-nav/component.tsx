import styles from './styles.module.css';
import { appNavConfig } from './config';
import { AppNavItem } from '../app-nav-item/component';
import { useScreenSize } from '../../device-context/hook';
import classNames from 'classnames';

interface AppNavProps {
  className?: string;
}

export const AppNav = ({ className }: AppNavProps) => {
  const { isDesktop } = useScreenSize();
  return (
    <nav className={classNames(className, styles.nav)}>
      {appNavConfig.map(({ icon, text, path }, index) => (
        <AppNavItem
          key={`${index}-default`}
          icon={icon}
          title={text}
          path={path}
          isDesktop={isDesktop}
        />
      ))}
    </nav>
  );
};
