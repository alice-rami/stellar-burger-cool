import { useDrop } from 'react-dnd';
import { useScreenSize } from '../../../device-context/hook';
import { useAppDispatch } from '../../../hooks/rtkHooks';
import { Ingredient } from '../../../utils/types';
import styles from './styles.module.css';
import { burgerActions } from '../../../redux/ui/burger';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import { nameTypeConfig } from './config';
import bun_image from '../../../images/bun-02.png';
import classNames from 'classnames';
import { textS } from '../../../utils/constants-kit-styles';

interface BurgerBunProps {
  bun: Ingredient | null;
  type: 'top' | 'bottom';
}

export const BurgerBun = ({ bun, type }: BurgerBunProps) => {
  const { isMobile } = useScreenSize();
  const dispatch = useAppDispatch();
  const [, dropRef] = useDrop({
    accept: 'bun',
    drop(bun: Ingredient) {
      dispatch(burgerActions.addBun(bun));
    },
  });

  return (
    <div ref={dropRef} className='bun_location'>
      <ConstructorElement
        type={type}
        isLocked={true}
        extraClass={classNames('ml-10', styles.burgerBun, isMobile && textS)}
        text={
          bun === null
            ? 'Добавьте булку'
            : `${bun.name} (${nameTypeConfig[type]})`
        }
        price={bun === null ? 0 : bun.price}
        thumbnail={bun === null ? bun_image : bun.image_mobile}
      />
    </div>
  );
};
