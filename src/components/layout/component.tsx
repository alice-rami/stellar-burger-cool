import { ReactNode } from 'react';
import styles from './styles.module.css';
import { DeviceProvider } from '../../device-context/component';
import { AppHeader } from '../app-header/component';

interface LayoutProps {
  children?: ReactNode;
}
export const Layout = ({ children }: LayoutProps) => {
  return (
    <div className={styles.container}>
      <DeviceProvider>
        <AppHeader className={styles.header} />
      </DeviceProvider>
      <main className={styles.content}>{children}</main>
    </div>
  );
};
