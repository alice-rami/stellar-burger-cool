import {
  EmailInput,
  PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { InputConfig } from '../../utils/inputs-config';
import styles from './styles.module.css';
import classNames from 'classnames';
import { textL } from '../../utils/constants-kit-styles';
import { AuthForm } from '../../components/auth-form/component';
import { AuthLink } from '../../components/auth-link/component';

interface LoginPageProps {
  emailConfig: InputConfig;
  passwordConfig: InputConfig;
  onSubmit: (evt: React.FormEvent<HTMLFormElement>) => void;
  isValid: boolean;
  message: string;
}

export const LoginPage = ({
  onSubmit,
  emailConfig,
  passwordConfig,
  isValid,
  message,
}: LoginPageProps) => {
  return (
    <div className={styles.container}>
      <h1 className={classNames('mb-6', textL)}>Вход</h1>
      <AuthForm
        onSubmit={onSubmit}
        message={message}
        submitButtonTitle='Войти'
        isValid={isValid}
      >
        <EmailInput {...emailConfig} placeholder='E-mail' required />
        <PasswordInput {...passwordConfig} placeholder='Пароль' required />
      </AuthForm>
      <AuthLink path={'/register'} description='Вы — новый пользователь?'>
        Зарегистрироваться
      </AuthLink>
      <AuthLink path={'/forgot-password'} description='Забыли пароль?'>
        Восстановить пароль
      </AuthLink>
    </div>
  );
};
