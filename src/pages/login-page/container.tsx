import { useLocation, useNavigate } from 'react-router-dom';
import { useScreenSize } from '../../device-context/hook';
import useFormInputValidation, {
  InputsData,
} from '../../hooks/useFormInputValidation';
import { useAppDispatch } from '../../hooks/rtkHooks';
import { loginThunk } from '../../redux/ui/user/thunks/login-thunk';
import { modalActions } from '../../redux/ui/modal';
import { getInputsConfig } from '../../utils/inputs-config';
import { LoginPage } from './component';

type RequiredInputsData = Pick<InputsData, 'newEmail' | 'newPassword'>;

export const LoginPageContainer = () => {
  const { isMobile } = useScreenSize();
  const initialState: RequiredInputsData = {
    newEmail: { value: '', error: false, required: true },
    newPassword: { value: '', error: false, required: true },
  };
  const {
    newValues,
    handleInputChange,
    isValid,
    setIsValid,
    setMessage,
    message,
  } = useFormInputValidation(initialState);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const onSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    const { newEmail, newPassword } = newValues;
    if (newEmail && newPassword) {
      dispatch(
        loginThunk({ email: newEmail.value, password: newPassword.value })
      )
        .unwrap()
        .then(() => {
          const fromValue: null | string =
            location.state && location.state.from;
          fromValue ? navigate(fromValue) : navigate('/');
        })
        .then(() => {
          const isFromModal: null | boolean =
            location.state && location.state.modal;
          if (isFromModal) {
            dispatch(modalActions.showConstructor());
          }
        })
        .catch((error) => {
          if (error.message === 'email or password are incorrect') {
            setMessage(
              'Логин или пароль не найдены. Проверьте правильность введенных данных или воспользуйтесь ссылками ниже.'
            );
            setIsValid(false);
          }
        });
    }
  };

  const [emailConfig, passwordConfig] = getInputsConfig(
    ['newEmail', 'newPassword'],
    newValues,
    handleInputChange,
    isMobile
  );

  return (
    <LoginPage
      onSubmit={onSubmit}
      emailConfig={emailConfig}
      passwordConfig={passwordConfig}
      message={message}
      isValid={isValid}
    />
  );
};
