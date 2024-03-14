import {
  Button,
  EmailInput,
  Input,
  PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './styles.module.css';
import { Error } from '../../components/ui/error/error';
import { Success } from '../../components/ui/success/component';
import {
  InputConfig,
  resetButtonConfig,
  submitButtonConfig,
} from '../../utils/inputs-config';

interface ProfilePageProps {
  emailConfig: InputConfig;
  passwordConfig: InputConfig;
  nameConfig: InputConfig;
  onSubmit: (evt: React.FormEvent<HTMLFormElement>) => void;
  onReset: () => void;
  isChanged: boolean;
  isValid: boolean;
  message: string;
  requestStatus: 'success' | 'error' | null;
}

export const ProfilePage = ({
  emailConfig,
  passwordConfig,
  nameConfig,
  onSubmit,
  onReset,
  isChanged,
  isValid,
  message,
  requestStatus,
}: ProfilePageProps) => {
  return (
    <form className={styles.inputContainer} onSubmit={onSubmit} noValidate>
      {Boolean(message) && (
        <div className='mb-5'>
          {requestStatus === 'error' && <Error message={message} />}
          {requestStatus === 'success' && <Success message={message} />}
        </div>
      )}
      <Input {...nameConfig} placeholder={'Имя'} icon={'EditIcon'} />
      <EmailInput {...emailConfig} placeholder='Логин' />
      <PasswordInput {...passwordConfig} />
      {isChanged && (
        <div className={styles.buttonContainer}>
          <Button {...resetButtonConfig} onClick={onReset}>
            Отмена
          </Button>
          <Button {...submitButtonConfig} disabled={!isValid}>
            Сохранить
          </Button>
        </div>
      )}
    </form>
  );
};
