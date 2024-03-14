import styles from './styles.module.css';
import ReactDOM from 'react-dom';
import { useEffect } from 'react';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useScreenSize } from '../../../device-context/hook';
import { ModalOverlay } from '../modal-overlay/component';
import classNames from 'classnames';

interface ModalProps {
  children: JSX.Element;
  onClose: () => void;
}

export const Modal = ({
  children,
  onClose,
}: ModalProps) => {
  const { isMobile } = useScreenSize();
  const modalRoot = document.getElementById('react-modal');

  useEffect(() => {
    const onEsc = (evt: KeyboardEvent) => {
      if (evt.key === 'Escape') {
        onClose();
      }
    };
    document.addEventListener('keydown', onEsc);
    return () => document.removeEventListener('keydown', onEsc);
  }, [onClose]);

  if (!modalRoot) {
    return null;
  }

  return ReactDOM.createPortal(
    <>
      <div
        className={classNames(
          isMobile ? 'pl-2 pr-2 pt-4' : 'pl-10 pr-10 pt-10',
          styles.modal
        )}
      >
        <button className={styles.button}>
          <CloseIcon onClick={onClose} type='primary' />
        </button>
        {children}
      </div>
      <ModalOverlay closePopup={onClose} />
    </>,
    modalRoot
  );
};
