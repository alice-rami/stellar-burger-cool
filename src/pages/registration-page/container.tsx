import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../hooks/rtkHooks';
import useFormInputValidation, {
  InputsData,
} from '../../hooks/useFormInputValidation';
import { registerThunk } from '../../redux/ui/user/thunks/register-thunk';
import { modalActions } from '../../redux/ui/modal';
import { getInputsConfig } from '../../utils/inputs-config';
import { RegistrationPage } from './component';
import { BASE } from '../../utils/constants-urls';

type RequiredInputsData = Omit<InputsData, 'newCode'>;

export const RegistrationPageContainer = () => {
  const initialState: RequiredInputsData = {
    newName: { value: '', error: false, required: true },
    newEmail: { value: '', error: false, required: true },
    newPassword: { value: '', error: false, required: true },
  };
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const {
    newValues,
    handleInputChange,
    isValid,
    setIsValid,
    message,
    setMessage,
  } = useFormInputValidation(initialState);

  const onSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    const { newName, newEmail, newPassword } = newValues;
    if (newName && newEmail && newPassword) {
      dispatch(
        registerThunk({
          email: newEmail.value,
          password: newPassword.value,
          name: newName.value,
        })
      )
        .unwrap()
        .then(() => {
          navigate(BASE, { replace: true });
        })
        .catch((error) => {
          if (error.message === 'User already exists') {
            navigate(`${BASE}login`);
            dispatch(
              modalActions.showError(
                'Пользователь с таким адресом уже зарегистрирован. Выполните вход'
              )
            );
          } else {
            setMessage('Что-то пошло не так. Попробуйте еще раз');
            setIsValid(false);
          }
        });
    }
  };

  const [emailConfig, passwordConfig, nameConfig] = getInputsConfig(
    ['newEmail', 'newPassword', 'newName'],
    newValues,
    handleInputChange
  );

  return (
    <RegistrationPage
      emailConfig={emailConfig}
      passwordConfig={passwordConfig}
      nameConfig={nameConfig}
      onSubmit={onSubmit}
      message={message}
      isValid={isValid}
    />
  );
};
