import { useNavigate } from 'react-router-dom';
import useFormInputValidation, {
  InputsData,
} from '../../hooks/useFormInputValidation';
import { useAppDispatch } from '../../hooks/rtkHooks';
import { ForgotPasswordPage } from './component';
import { requestPasswordThunk } from '../../redux/ui/user/thunks/request-password-thunk';
import { getInputsConfig } from '../../utils/inputs-config';
import { modalActions } from '../../redux/ui/modal';
import { BASE } from '../../utils/constants-urls';

type RequiredInputsData = Pick<InputsData, 'newEmail'>;
type NavigateConfig = (
  to: string,
  options: { state: { from: 'forgot-password' } }
) => void;

export const ForgotPasswordPageContainer = () => {
  const initialState: RequiredInputsData = {
    newEmail: { value: '', error: false, required: true },
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
  const navigate: NavigateConfig = useNavigate();

  const onSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    if (newValues.newEmail) {
      dispatch(requestPasswordThunk(newValues.newEmail.value))
        .unwrap()
        .then((res) => {
          if (res.success) {
            navigate(`${BASE}reset-password`, {
              state: { from: 'forgot-password' },
            });
            dispatch(
              modalActions.showMessage(
                'Код для сброса пароля отправлен на указанный адрес'
              )
            );
          }
        })
        .catch(() => {
          setMessage('Что-то пошло не так. Попробуйте еще раз');
          setIsValid(false);
        });
    }
  };

  const [emailConfig] = getInputsConfig(
    ['newEmail'],
    newValues,
    handleInputChange
  );
  return (
    <ForgotPasswordPage
      onSubmit={onSubmit}
      message={message}
      emailConfig={emailConfig}
      isValid={isValid}
    />
  );
};
