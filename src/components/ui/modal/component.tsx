import { ReactNode, useCallback, useEffect, useRef } from 'react';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './styles.module.css';
import { createPortal } from 'react-dom';

interface ModalProps {
  onClose: () => void;
  children: ReactNode;
}

export const Modal = ({ children, onClose }: ModalProps) => {
  const modalRef = useRef(null);

  const onClickOnOverlay = useCallback(
    (evt) => {
      if (evt.target !== modalRef.current) {
        evt.stopPropagation();
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    const onEsc = (evt: KeyboardEvent) => {
      if (evt.key === 'Escape') {
        evt.stopPropagation();
        onClose();
      }
    };
    document.addEventListener('keydown', onEsc);

    return () => {
      document.removeEventListener('keydown', onEsc);
    };
  }, [onClose]);

  return createPortal(
    <div className={styles.overlay} onClick={(evt) => onClickOnOverlay(evt)}>
      <div className={styles.modal} ref={modalRef}>
        <button className={styles.button}>
          <CloseIcon onClick={onClose} type='primary' />
        </button>
        {children}
      </div>
    </div>,
    document.getElementById('modal')!
  );
};
