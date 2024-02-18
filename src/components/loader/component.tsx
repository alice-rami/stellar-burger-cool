import { SyncLoader } from 'react-spinners';
import styles from './styles.module.css';
import { loaderCSSProps } from '../../utils/loaderCSSProps.ts';

export default function Loader() {
  return (
    <div className={styles.container}>
      <SyncLoader
        color='#ff8c00'
        size={10}
        speedMultiplier={1}
        loading={true}
        cssOverride={loaderCSSProps}
      />
    </div>
  );
}
