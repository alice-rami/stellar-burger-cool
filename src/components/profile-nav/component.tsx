import { useAppDispatch } from '../../hooks/rtkHooks';
import { logoutThunk } from '../../redux/ui/user/thunks/logout-thunk';
import styles from './styles.module.css';
import { NavLink, useNavigate } from 'react-router-dom';

interface ProfileNavItem {
  path: string;
  onClick: () => void;
  title: string;
}
interface ProfileNavProps {
  onClick?: () => void;
}

export default function ProfileNav({ onClick }: ProfileNavProps) {
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

  const profileNavConfig: ProfileNavItem[] = [
    {
      path: '/profile',
      title: 'Профиль',
      onClick: onClick,
    },
    {
      path: '/profile/orders',
      title: 'История заказов',
      onClick: onClick,
    },
    {
      path: '/login',
      title: 'Выход',
      onClick: logout,
    },
  ];

  return (
    <nav className={styles.container}>
      {profileNavConfig.map(({ path, title, onClick }, index) => (
        <NavLink key={index} to={path} onClick={onClick}>
          {title}
        </NavLink>
      ))}
    </nav>
  );
}
