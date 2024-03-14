import { useState } from 'react';
import { useScreenSize } from '../../device-context/hook';
import { useAppDispatch, useAppSelector } from '../../hooks/rtkHooks';
import { selectUserModule } from '../../redux/ui/user/selectors';
import useFormInputValidation, {
  InputsData,
} from '../../hooks/useFormInputValidation';
import { updateUserDataThunk } from '../../redux/ui/user/thunks/update-user-data-thunk';
import { getInputsConfig } from '../../utils/inputs-config';
import { ProfilePage } from './component';

type RequiredInputsData = Omit<InputsData, 'newCode'>;

export const ProfilePageContainer = () => {
  const { isMobile } = useScreenSize();
  const [requestStatus, setRequestStatus] = useState<
    'success' | 'error' | null
  >(null);
  const { user } = useAppSelector(selectUserModule);

  const initialState: RequiredInputsData = {
    newName: { value: user?.name || '', error: false, required: false },
    newEmail: { value: user?.email || '', error: false, required: false },
    newPassword: { value: '', error: false, required: false },
  };
  const dispatch = useAppDispatch();

  const {
    isChanged,
    setIsChanged,
    newValues,
    handleInputChange,
    onReset,
    isValid,
    message,
    setMessage,
  } = useFormInputValidation(initialState);

  const onSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    const { newName, newEmail, newPassword } = newValues;
    dispatch(
      updateUserDataThunk({
        name: newName?.value,
        email: newEmail?.value,
        password: newPassword?.value,
      })
    ).then((res) => {
      if (res.type === 'user/updateData/fulfilled') {
        setMessage('Данные успешно обновлены');
        setIsChanged(false);
        setRequestStatus('success');
      } else {
        setMessage('Не удалось изменить данные. Попробуйте еще раз');
        setRequestStatus('error');
      }
    });
  };

  const [emailConfig, passwordConfig, nameConfig] = getInputsConfig(
    ['newEmail', 'newPassword', 'newName'],
    newValues,
    handleInputChange,
    isMobile
  );

  return (
    <ProfilePage
      emailConfig={emailConfig}
      passwordConfig={passwordConfig}
      nameConfig={nameConfig}
      onSubmit={onSubmit}
      isChanged={isChanged}
      onReset={onReset}
      isValid={isValid}
      message={message}
      requestStatus={requestStatus}
    />
  );
};
