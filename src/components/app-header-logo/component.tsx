import { Logo } from '@ya.praktikum/react-developer-burger-ui-components';
import logoS from '../../images/small_logo.svg';
import logoM from '../../images/mid_logo.svg';
import styles from './styles.module.css';
import { useScreenSize } from '../../device-context/hook';

interface AppHeaderLogoProps {
  className?: string;
}

export const AppHeaderLogo = ({ className }: AppHeaderLogoProps) => {
  const { isDesktop, isMobile } = useScreenSize();
  return (
    <div className={className}>
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
