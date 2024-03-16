import { ReactNode } from 'react';
import { inactive, textDefault, textS } from '../../utils/constants-kit-styles';

import styles from './styles.module.css';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';

export interface AppNavItemProps {
  path: string;
  title: string;
  icon?: ReactNode;
  isDesktop?: boolean;
  onClick?: () => void;
  className?: string;
}

export const AppNavItem = ({
  icon,
  title,
  path,
  isDesktop,
  className,
  onClick,
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
        onClick={onClick}
      >
        {icon}
        {title}
      </NavLink>
    </div>
  );
};
