import { ReactNode } from 'react';
import { inactive, textDefault, textS } from '../../utils/constants-kit-styles';
import * as classNames from 'classnames';
import styles from './styles.module.css';
import { NavLink } from 'react-router-dom';

export interface AppNavItemProps {
  path: string;
  icon: ReactNode;
  title: string;
  isDesktop: boolean;
  onClick?: () => void;
  className?: string;
}

export const AppNavItem = ({
  icon,
  title,
  path,
  isDesktop,
  className,
}: AppNavItemProps) => {
  return (
    <div className={className}>
      <NavLink
        to={path}
        className={({ isActive }) =>
          classNames(inactive, styles.navItem, {
            [styles.active]: isActive,
            [textDefault]: isDesktop,
            [textS]: !isDesktop,
          })
        }
      >
        {icon}
        {title}
      </NavLink>
    </div>
  );
};
