import {
  ConstructorElement,
  DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './styles.module.css';
import { useDrag, useDrop } from 'react-dnd';
import { Ingredient } from '../utils/types';
import { useAppDispatch } from '../hooks/rtkHooks';
import { burgerActions } from '../redux/ui/burger';
import classNames from 'classnames';
import { textS } from '../utils/constants-kit-styles';

interface BurgerMidIngredientProps {
  index: number;
  uid: string;
  moveCard: (uid: string, atIndex: number) => void;
  findCard: (uid: string) => { index: number };
  isMobile: boolean;
  ingredient: Pick<Ingredient, 'name' | 'price' | 'image_mobile'>;
}

interface CollectedProps {
  isOver: boolean;
}

interface DragObject {
  uid: string;
}

export const BurgerMidIngredient = ({
  index,
  uid,
  moveCard,
  findCard,
  isMobile,
  ingredient: { name, price, image_mobile },
}: BurgerMidIngredientProps) => {
  const dispatch = useAppDispatch();
  const originalIndex = index;

  const [{ isDragging }, drag, dragPreview] = useDrag(
    () => ({
      type: 'midpart',
      item: { uid, originalIndex },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
      end: (item, monitor) => {
        const { uid: droppedId, originalIndex } = item;
        const didDrop = monitor.didDrop();
        if (!didDrop) {
          moveCard(droppedId, originalIndex);
        }
      },
    }),
    [uid, originalIndex, moveCard]
  );

  const [{ isOver }, drop] = useDrop<DragObject, unknown, CollectedProps>(
    () => ({
      accept: 'midpart',
      collect: (monitor) => ({
        isOver: monitor.isOver(),
      }),
      hover({ uid: draggedId }) {
        if (draggedId !== uid) {
          const { index: overIndex } = findCard(uid);
          moveCard(draggedId, overIndex);
        }
      },
    }),
    [findCard, moveCard]
  );

  return (
    <div
      ref={drop}
      className={classNames(styles.listItem, 'pl-2', {
        [styles.isOver]: isOver,
      })}
    >
      <div className={`${styles.icon} `} ref={drag}>
        <DragIcon type='primary' />
      </div>
      <div
        ref={dragPreview}
        className={classNames(styles.elementContainer, {
          [styles.dragging]: isDragging,
        })}
      >
        <ConstructorElement
          text={name}
          price={price}
          thumbnail={image_mobile}
          extraClass={classNames(styles.element, 'mr-2', isMobile && textS)}
          handleClose={() => {
            dispatch(burgerActions.removeMidPartIngredient(uid));
          }}
        />
      </div>
    </div>
  );
};
