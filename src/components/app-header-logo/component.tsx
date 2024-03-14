import { Logo } from '@ya.praktikum/react-developer-burger-ui-components';
import logoS from '../../images/small_logo.svg';
import logoM from '../../images/mid_logo.svg';
import styles from './styles.module.css';
import { useScreenSize } from '../../device-context/hook';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames';

interface AppHeaderLogoProps {
  className?: string;
}

export const AppHeaderLogo = ({ className }: AppHeaderLogoProps) => {
  const { isDesktop, isMobile } = useScreenSize();
  const navigate = useNavigate();
  return (
    <div
      className={classNames(className, styles.logo)}
      onClick={() => navigate('/')}
    >
      {isDesktop && <Logo />}
      {!isDesktop && (
        <img
          src={isMobile ? logoS : logoM}
          alt='Логотип Stellar Burgers'
          className={isMobile ? styles.logoMobile : styles.logoRegular}
        />
      )}
    </div>
  );
};
