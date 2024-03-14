import { OrderConfirmation } from '../../components/orders/order-confirmation/component';
import { Error } from '../../components/ui/error/error';
import { Loader } from '../../components/ui/loader/component';
import { Modal } from '../../components/ui/modal/component';
import { useAppDispatch, useAppSelector } from '../../hooks/rtkHooks';
import { selectOrderTotal } from '../../redux/ui/burger/selectors';
import { modalActions } from '../../redux/ui/modal';
import {
  selectModalContent,
  selectModalMessage,
  selectModalModule,
} from '../../redux/ui/modal/selectors';
import { textM } from '../../utils/constants-kit-styles';
import { ConstructorPage } from './component';
import styles from './styles.module.css';

export const ConstructorPageContainer = () => {
  const dispatch = useAppDispatch();
  const orderTotal = useAppSelector(selectOrderTotal);
  const { isModalOpen } = useAppSelector(selectModalModule);
  const { isOrderConfirmation, isLoader, isError } =
    useAppSelector(selectModalContent);
  const errorMessage = useAppSelector(selectModalMessage);
  return (
    <>
      <ConstructorPage orderTotal={orderTotal} />
      {isModalOpen && (isLoader || isError || isOrderConfirmation) && (
        <Modal
          onClose={() => {
            dispatch(modalActions.closeModal());
          }}
        >
          <>
            {isLoader && (
              <div className={styles.loaderContainer}>
                <h2 className={textM}>Оформляем заказ</h2>
                <Loader />
              </div>
            )}
            {isError && <Error message={errorMessage} />}
            {isOrderConfirmation && <OrderConfirmation />}
          </>
        </Modal>
      )}
    </>
  );
};
