import styles from './styles.module.css';
import { AppHeader } from '../../app-header/component';
import { Outlet } from 'react-router-dom';

export const Layout = () => {
  return (
    <div className={styles.container}>
      <AppHeader className={styles.header} />
      <main className={styles.content}>
        <Outlet />
      </main>
    </div>
  );
};
