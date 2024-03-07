import {
  EmailInput,
  Input,
  PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { InputConfig } from '../../utils/inputs-config';
import styles from './styles.module.css';
import classNames from 'classnames';
import { textL } from '../../utils/constants-kit-styles';
import { AuthForm } from '../../components/auth-form/component';
import { AuthLink } from '../../components/auth-link/component';

interface RegistrationPageProps {
  emailConfig: InputConfig;
  passwordConfig: InputConfig;
  nameConfig: InputConfig;
  onSubmit: (evt: React.FormEvent<HTMLFormElement>) => void;
  isValid: boolean;
  message: string;
}

export const RegistrationPage = ({
  onSubmit,
  message,
  nameConfig,
  emailConfig,
  passwordConfig,
  isValid,
}: RegistrationPageProps) => {
  return (
    <div className={styles.container}>
      <h1 className={classNames('mb-6', textL)}>Регистрация</h1>
      <AuthForm
        onSubmit={onSubmit}
        message={message}
        submitButtonTitle='Зарегистрироваться'
        isValid={isValid}
      >
        <Input {...nameConfig} placeholder={'Имя'} icon={'EditIcon'} required />
        <EmailInput {...emailConfig} placeholder='E-mail' required />
        <PasswordInput {...passwordConfig} required />
      </AuthForm>
      <AuthLink path={'/login'} description='Уже зарегистрированы?'>
        Войти
      </AuthLink>
    </div>
  );
};
