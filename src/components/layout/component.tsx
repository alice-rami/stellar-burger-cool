import { ReactNode } from 'react';
import styles from './styles.module.css';
import { AppHeader } from '../app-header/component';

interface LayoutProps {
  children?: ReactNode;
}
export const Layout = ({ children }: LayoutProps) => {
  return (
    <div className={styles.container}>
      <AppHeader className={styles.header} />
      <main className={styles.content}>{children}</main>
    </div>
  );
};
