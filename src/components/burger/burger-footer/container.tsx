import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../hooks/rtkHooks';
import { selectIsAuthorized } from '../../../redux/ui/user/selectors';
import { BurgerFooter } from './component';
import { selectModalModule } from '../../../redux/ui/modal/selectors';
import { modalActions } from '../../../redux/ui/modal';
import { submitOrderThunk } from '../../../redux/ui/order/thunks/submit-order-thunk';
import { resetToDefault } from '../../../redux/ui/reset-action';
import {
  selectIdsArray,
  selectIsReadyForSubmit,
  selectOrderTotal,
} from '../../../redux/ui/burger/selectors';
import { useScreenSize } from '../../../device-context/hook';

type NavigateConfig = (
  to: string,
  options: { state: { from: string; modal?: boolean } }
) => void;

export const BurgerFooterContainer = () => {
  const dispatch = useAppDispatch();
  const isAuthorized = useAppSelector(selectIsAuthorized);
  const navigate: NavigateConfig = useNavigate();
  const { isModalOpen } = useAppSelector(selectModalModule);
  const orderTotal = useAppSelector(selectOrderTotal);
  const isDisabled = useAppSelector(selectIsReadyForSubmit);
  const idsArray = useAppSelector(selectIdsArray);
  const { isMobile, isDesktop } = useScreenSize();

  const handleSubmit = (evt: React.SyntheticEvent) => {
    evt.preventDefault();
    if (!isAuthorized) {
      if (isModalOpen) {
        navigate('/login', { state: { from: '/', modal: true } });
        dispatch(modalActions.closeModal());
      } else {
        navigate('/login', { state: { from: '/' } });
      }
    } else {
      dispatch(submitOrderThunk(idsArray))
        .unwrap()
        .then(() => {
          dispatch(resetToDefault());
        })
        .catch(() => {
          dispatch(
            modalActions.showError(
              'Не удалось создать заказ. Попробуйте еще раз'
            )
          );
        });
    }
  };
  return (
    <BurgerFooter
      handleSubmit={handleSubmit}
      orderTotal={orderTotal}
      isDesktop={isDesktop}
      isMobile={isMobile}
      isDisabled={isDisabled}
    />
  );
};
