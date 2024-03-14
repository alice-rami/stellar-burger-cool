import { Outlet } from 'react-router-dom';
import styles from './styles.module.css';
import { useScreenSize } from '../../../device-context/hook';
import ProfileNav from '../../profile-nav/component';
import classNames from 'classnames';
import { inactive, textDefault } from '../../../utils/constants-kit-styles';

export const LayoutProfile = () => {
  const { isMobile } = useScreenSize();
  return (
    <div className={styles.container}>
      {!isMobile && (
        <div className={styles.navContainer}>
          <ProfileNav />
          <p className={classNames(textDefault, inactive, 'ml-8 mt-20')}>
            В этом разделе вы можете изменить свои персональные данные
          </p>
        </div>
      )}
      <Outlet />
    </div>
  );
};
