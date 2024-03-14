import classNames from 'classnames';
import styles from './styles.module.css';
import { inactive, textDefault } from '../../utils/constants-kit-styles';
import { Link } from 'react-router-dom';

interface AuthLinkProps {
  description: string;
  path: string;
  children: string;
}

export const AuthLink = ({ children, description, path }: AuthLinkProps) => {
  return (
  <span className={classNames(textDefault, styles.linkContainer)}>
    <p className={inactive}>{description}</p>
    <Link to={path} className={styles.link}>
      {children}
    </Link>
  </span>
  )
};
