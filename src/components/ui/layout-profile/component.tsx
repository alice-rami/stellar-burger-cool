import { Outlet } from 'react-router-dom';
import styles from './styles.module.css';
import { useScreenSize } from '../../../device-context/hook';
import classNames from 'classnames';
import {
  inactive,
  textDefault,
  textS,
} from '../../../utils/constants-kit-styles';
import { ProfileNav } from '../../profile-nav/component';

export const LayoutProfile = () => {
  const { isMobile, isDesktop } = useScreenSize();
  return (
    <div className={styles.container}>
      {!isMobile && (
        <div className={styles.navContainer}>
          <ProfileNav />
          <p
            className={classNames(
              !isDesktop ? textS : textDefault,
              inactive,
              'mt-20 p-5'
            )}
          >
            В этом разделе вы можете изменить свои персональные данные
          </p>
        </div>
      )}
      <Outlet />
    </div>
  );
};
