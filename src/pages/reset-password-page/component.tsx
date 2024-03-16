import {
  Input,
  PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { InputConfig } from '../../utils/inputs-config';
import styles from './styles.module.css';
import classNames from 'classnames';
import { textL } from '../../utils/constants-kit-styles';
import { AuthForm } from '../../components/auth-form/component';
import { AuthLink } from '../../components/auth-link/component';
import { BASE } from '../../utils/constants-urls';

interface ResetPasswordPageProps {
  passwordConfig: InputConfig;
  codeConfig: InputConfig;
  onSubmit: (evt: React.FormEvent<HTMLFormElement>) => void;
  isValid: boolean;
  message: string;
}

export const ResetPasswordPage = ({
  onSubmit,
  message,
  passwordConfig,
  codeConfig,
  isValid,
}: ResetPasswordPageProps) => {
  return (
    <div className={styles.container}>
      <h1 className={classNames('mb-6', textL)}>Восстановление пароля</h1>
      <AuthForm
        onSubmit={onSubmit}
        message={message}
        submitButtonTitle='Сохранить'
        isValid={isValid}
      >
        <PasswordInput
          {...passwordConfig}
          placeholder='Введите новый пароль'
          required
        />
        <Input
          {...codeConfig}
          placeholder={'Вставьте код из письма'}
          required
        />
      </AuthForm>
      <AuthLink path={`${BASE}login`} description='Вспомнили пароль?'>
        Войти
      </AuthLink>
    </div>
  );
};
