import styles from './styles.module.css';

interface ModalOverlayProps {
  closePopup?: () => void;
}

export const ModalOverlay = ({ closePopup }: ModalOverlayProps) => {
  return <div className={styles.overlay} onClick={closePopup}></div>;
};
