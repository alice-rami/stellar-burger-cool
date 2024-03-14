import { InfoIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './styles.module.css';
import classNames from 'classnames';
import { textDefault } from '../../../utils/constants-kit-styles';

interface SuccessProps {
  message: string | null;
}

export const Success = ({ message }: SuccessProps) => {
  return (
    <div className={classNames(styles.container)}>
      <div className={classNames(styles.error, 'ml-10 mr-10')}>
        <InfoIcon type='success' />
        <p className={textDefault}>{message}</p>
      </div>
    </div>
  );
}
