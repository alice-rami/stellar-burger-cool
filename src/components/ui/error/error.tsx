import { InfoIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './error.module.css';
import { textDefault } from '../../../utils/constants-kit-styles';
import classNames from 'classnames';

interface ErrorProps {
  message: string | null;
}

export default function Error({ message }: ErrorProps) {
  return (
    <div className={styles.container}>
      <div className={classNames(styles.error, 'ml-10 mr-10')}>
        <InfoIcon type='error' />
        <p className={textDefault}>{message}</p>
      </div>
    </div>
  );
}
