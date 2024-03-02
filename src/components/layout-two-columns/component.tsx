import { ReactNode } from 'react';
import styles from './styles.module.css';
import { textM } from '../../utils/constants-kit-styles';
import classNames from 'classnames';

interface LayoutTwoColumnsProps {
  title: string;
  children?: ReactNode;
}
export const LayoutTwoColumns = ({ children, title }: LayoutTwoColumnsProps) => {
  return (
    <div className={styles.container}>
      <h2 className={classNames(textM, 'mt-10 mb-5', styles.title)}>{title}</h2>
      {children}
    </div>
  );
};
