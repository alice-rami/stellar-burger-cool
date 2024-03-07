import { Navigate, useLocation } from 'react-router-dom';
import { useAppSelector } from '../../hooks/rtkHooks';
import { selectUserModule } from '../../redux/ui/user/selectors';
import { ReactNode } from 'react';

interface ProtectedProps {
  onlyUnAuth?: boolean;
  component: ReactNode;
}

const Protected = ({ onlyUnAuth = false, component }: ProtectedProps) => {
  const { isAuthChecked, user } = useAppSelector(selectUserModule);
  const location = useLocation();

  if (!isAuthChecked) {
    return null;
  }

  if (onlyUnAuth && user) {
    const { from } = location.state || { from: { pathname: '/' } };
    return <Navigate to={from} />;
  }

  if (!onlyUnAuth && !user) {
    return <Navigate to='/login' state={{ from: location }} />;
  }

  return component;
};

export const OnlyAuth = (props: any) => (
  <Protected onlyUnAuth={false} {...props} />
);
export const OnlyUnAuth = (props: any) => (
  <Protected onlyUnAuth={true} {...props} />
);
