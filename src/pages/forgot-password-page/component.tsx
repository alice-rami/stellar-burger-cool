import { EmailInput } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './styles.module.css';
import { InputConfig } from '../../utils/inputs-config';
import { AuthLink } from '../../components/auth-link/component';
import { AuthForm } from '../../components/auth-form/component';
import classNames from 'classnames';
import { textL } from '../../utils/constants-kit-styles';
import { BASE } from '../../utils/constants-urls';

interface ForgotPasswordPageProps {
  emailConfig: InputConfig;
  onSubmit: (evt: React.FormEvent<HTMLFormElement>) => void;
  isValid: boolean;
  message: string;
}

export const ForgotPasswordPage = ({
  onSubmit,
  message,
  emailConfig,
  isValid,
}: ForgotPasswordPageProps) => {
  return (
    <div className={styles.container}>
      <h1 className={classNames('mb-6', textL)}>Восстановление пароля</h1>
      <AuthForm
        onSubmit={onSubmit}
        message={message}
        submitButtonTitle='Восстановить'
        isValid={isValid}
      >
        <EmailInput {...emailConfig} placeholder='Укажите e-mail' required />
      </AuthForm>
      <AuthLink path={`${BASE}login`} description='Уже зарегистрированы?'>
        Войти
      </AuthLink>
    </div>
  );
};
