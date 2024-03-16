import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useScreenSize } from '../../device-context/hook';
import { useAppDispatch } from '../../hooks/rtkHooks';
import useFormInputValidation, {
  InputsData,
} from '../../hooks/useFormInputValidation';
import { resetPasswordThunk } from '../../redux/ui/user/thunks/reset-password-thunk';
import { modalActions } from '../../redux/ui/modal';
import { getInputsConfig } from '../../utils/inputs-config';
import { ResetPasswordPage } from './component';
import { BASE } from '../../utils/constants-urls';

type RequiredInputsData = Pick<InputsData, 'newPassword' | 'newCode'>;

export const ResetPasswordPageContainer = () => {
  const { isMobile } = useScreenSize();
  const initialState: RequiredInputsData = {
    newPassword: { value: '', error: false, required: true },
    newCode: { value: '', error: false, required: true },
  };
  const { newValues, handleInputChange, isValid, message, setMessage } =
    useFormInputValidation(initialState);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { state } = useLocation();
  const from: string | null = state && state.from;

  const onSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    if (newValues.newPassword && newValues.newCode) {
      dispatch(
        resetPasswordThunk({
          password: newValues.newPassword.value,
          token: newValues.newCode.value,
        })
      )
        .unwrap()
        .then((res) => {
          if (res.success) {
            navigate(`${BASE}login`, {
              replace: true,
            });
            dispatch(
              modalActions.showMessage('Ваш пароль был успешно сброшен')
            );
          }
        })
        .catch((error) => {
          if (error.message === 'Incorrect reset token') {
            setMessage('Укажите корректный токен');
          } else {
            setMessage('Что-то пошло не так. Попробуйте еще раз');
          }
        });
    }
  };

  const [passwordConfig, codeConfig] = getInputsConfig(
    ['newPassword', 'newCode'],
    newValues,
    handleInputChange,
    isMobile
  );

  return from === 'forgot-password' ? (
    <ResetPasswordPage
      passwordConfig={passwordConfig}
      codeConfig={codeConfig}
      isValid={isValid}
      onSubmit={onSubmit}
      message={message}
    />
  ) : (
    <Navigate to={BASE} />
  );
};
