import classNames from 'classnames';
import styles from './styles.module.css';
import { error, textDefault } from '../../utils/constants-kit-styles';
import Error from '../ui/error/error';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { submitButtonConfig } from '../../utils/inputs-config';
import { FormEvent, ReactNode } from 'react';

interface AuthFormProps {
  children: ReactNode;
  onSubmit: (evt: FormEvent<HTMLFormElement>) => void;
  message: string;
  isValid: boolean;
  submitButtonTitle: string;
}

export const AuthForm = ({
  children,
  onSubmit,
  message,
  isValid,
  submitButtonTitle,
}: AuthFormProps) => {
  return (
    <form noValidate onSubmit={onSubmit} className={styles.form}>
      <div
        className={classNames(
          'mb-5',
          error,
          textDefault,
          styles.errorContainer
        )}
      >
        {message.length > 0 && <Error message={message} />}
      </div>
      {children}
      <Button {...submitButtonConfig} disabled={!isValid}>
        {submitButtonTitle}
      </Button>
    </form>
  );
};
