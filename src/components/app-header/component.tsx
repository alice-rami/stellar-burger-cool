import { useScreenSize } from '../../device-context/hook';
import styles from './styles.module.css';

export const AppHeader = () => {
  const { isMobile, isDesktop } = useScreenSize();
  console.log(`isMobile: ${isMobile}, isDesktop: ${isDesktop}`);
  return (
    <div>
      <p>Device: </p>
      {isMobile && <p className={styles.green}>mobile</p>}
      {isDesktop && <p className={styles.purple}>desktop</p>}
    </div>
  );
};
