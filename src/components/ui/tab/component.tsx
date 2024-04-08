import classNames from 'classnames';
import styles from './styles.module.css';
import { useScreenSize } from '../../../device-context/hook';
import { textDefault, textS } from '../../../utils/constants-kit-styles';
import { ReactNode } from 'react';

interface TabProps {
  children: ReactNode;
  value: string;
  current: string;
  onClick: () => void;
}

export const Tab = ({ children, value, current, onClick }: TabProps) => {
  const { isMobile } = useScreenSize();
  return (
    <span
      className={classNames(
        isMobile ? textS : textDefault,
        styles.tab,
        'pt-4 pb-4',
        {
          [styles.active]: current === value,
        }
      )}
      onClick={onClick}
    >
      {children}
    </span>
  );
};
