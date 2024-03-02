import { ReactNode, useEffect } from 'react';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './styles.module.css';
import { createPortal } from 'react-dom';

interface IngredientModalProps {
  onClose: () => void;
  children: ReactNode;
}

export const IngredientModal = ({
  children,
  onClose,
}: IngredientModalProps) => {
  useEffect(() => {
    const onEsc = (evt: KeyboardEvent) => {
      if (evt.key === 'Escape') {
        onClose();
      }
    };
    document.addEventListener('keydown', onEsc);
    return () => {
      document.removeEventListener('keydown', onEsc);
    };
  }, [onClose]);

  return createPortal(
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <button className={styles.button}>
          <CloseIcon onClick={onClose} type='primary' />
        </button>
        {children}
      </div>
    </div>,
    document.getElementById('ingredient-modal')!
  );
};
