import { AppNav } from '../app-nav/component';
import styles from './styles.module.css';
import { AppHeaderLogo } from '../app-header-logo/component';
import { MenuIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useScreenSize } from '../../device-context/hook';
import { useAppDispatch, useAppSelector } from '../../hooks/rtkHooks';
import { modalActions } from '../../redux/ui/modal';
import {
  selectModalContent,
  selectModalModule,
} from '../../redux/ui/modal/selectors';
import { AppNavMobile } from '../app-nav-mobile/component';
import { Modal } from '../ui/modal/component';
import classNames from 'classnames';

interface AppHeaderProps {
  className?: string;
}

export const AppHeader = ({ className }: AppHeaderProps) => {
  const { isMobile } = useScreenSize();
  const { isModalOpen } = useAppSelector(selectModalModule);
  const { isMobileMenu } = useAppSelector(selectModalContent);
  const dispatch = useAppDispatch();
  return (
    <div className={classNames(styles.container, className)}>
      {isMobile ? (
        <>
          <div className={styles.menu}>
            <MenuIcon
              type='primary'
              onClick={() => dispatch(modalActions.showMobileMenu())}
            />
          </div>
          {isModalOpen && isMobileMenu && (
            <Modal onClose={() => dispatch(modalActions.closeModal())}>
              <AppNavMobile />
            </Modal>
          )}
        </>
      ) : (
        <AppNav className={styles.nav} />
      )}
      <AppHeaderLogo className={styles.logo} />
    </div>
  );
};
