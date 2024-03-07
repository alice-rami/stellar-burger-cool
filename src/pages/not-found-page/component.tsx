import { BurgerIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';
import styles from './styles.module.css';
import classNames from 'classnames';
import { accent, textDefault, textM } from '../../utils/constants-kit-styles';

export const NotFoundPage = () => {
  return (
    <div className={styles.container}>
      <h1 className={classNames('mt-5 mb-20', textM)}>Страница не найдена</h1>
      <div className={styles.linkContainer}>
        <BurgerIcon type='secondary' />
        <BurgerIcon type='primary' />
        <BurgerIcon type='success' />
        <Link to='/' className={classNames(styles.link, textDefault, accent)}>
          {`--> На главную`}
        </Link>
      </div>
    </div>
  );
};
