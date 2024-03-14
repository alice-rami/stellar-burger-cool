import { useAppDispatch } from '../../hooks/rtkHooks';
import { logoutThunk } from '../../redux/ui/user/thunks/logout-thunk';
import { AppNavItem } from '../app-nav-item/component';
import { config } from './config';
import styles from './styles.module.css';
import { useNavigate } from 'react-router-dom';

interface ProfileNavProps {
  onClick?: () => void;
}

export const ProfileNav = ({ onClick }: ProfileNavProps) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const logout = () => {
    dispatch(logoutThunk())
      .unwrap()
      .then(() => {
        navigate('/');
      })
      .catch(console.error);
  };

  return (
    <nav className={styles.container}>
      <AppNavItem {...config.profile} onClick={onClick} />
      <AppNavItem {...config.history} onClick={onClick} />
      <AppNavItem {...config.logout} onClick={logout} />
    </nav>
  );
};
