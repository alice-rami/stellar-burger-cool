import { useCallback, useState } from 'react';
import styles from './styles.module.css';
import { useAppDispatch } from '../../hooks/rtkHooks';
import { AppNavItem } from '../app-nav-item/component';
import {
  ArrowDownIcon,
  ArrowUpIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { modalActions } from '../../redux/ui/modal';
import { config } from './config';
import { textM } from '../../utils/constants-kit-styles';
import { ProfileNav } from '../profile-nav/component';

export const AppNavMobile = () => {
  const [subnavIsOpened, setSubnavIsOpened] = useState(false);
  const dispatch = useAppDispatch();

  const showSubMenu = useCallback(() => {
    setSubnavIsOpened(true);
  }, []);

  const hideSubMenu = useCallback(() => {
    setSubnavIsOpened(false);
  }, []);

  const hideMenu = useCallback(() => {
    dispatch(modalActions.closeModal());
  }, [dispatch]);

  return (
    <div className={styles.container}>
      <header className='pt-4 pl-2 pr-4 pb-4'>
        <h2 className={textM}>Меню</h2>
      </header>
      <nav className={styles.list}>
        <div className={styles.itemContainer}>
          <AppNavItem
            {...config.profile}
            onClick={() => setSubnavIsOpened(!subnavIsOpened)}
          />
          <div className={styles.icon}>
            {subnavIsOpened ? (
              <ArrowUpIcon type='primary' onClick={hideSubMenu} />
            ) : (
              <ArrowDownIcon type='primary' onClick={showSubMenu} />
            )}
          </div>
        </div>
        {subnavIsOpened && <ProfileNav onClick={hideMenu} />}
        <AppNavItem {...config.constructor} onClick={hideMenu} />
        <AppNavItem {...config.feed} onClick={hideMenu} />
      </nav>
    </div>
  );
};
