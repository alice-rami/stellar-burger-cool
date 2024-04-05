import { Input, InputsData } from '../hooks/useFormInputValidation';

export interface InputConfig {
  value: string;
  name: Input;
  onChange: (evt: React.ChangeEvent<HTMLInputElement>) => void;
  extraClass: string;
  error: boolean;
  errorText: string;
  size: 'small' | 'default';
}

export const getInputsConfig = (
  fieldsArr: Input[],
  newValues: Partial<InputsData>,
  handleInputChange: (evt: React.ChangeEvent<HTMLInputElement>) => void
): InputConfig[] => {
  const errorTextbyType = {
    newEmail: 'Введите корректный адрес электронной почты',
    newPassword: 'Пароль должен быть не менее 6 символов',
    newName: 'Имя должно быть не менее двух символов',
    newCode: 'Введите корректный код',
  };
  return fieldsArr.map((field) => ({
    value: newValues[field]?.value || '',
    name: field,
    onChange: handleInputChange,
    extraClass: 'mb-6 mr-2',
    error: newValues[field]?.error || false,
    errorText: errorTextbyType[field],
    size: 'default',
  }));
};

interface ButtonConfig {
  htmlType: 'submit' | 'reset';
  type: 'secondary' | 'primary';
  size: 'small' | 'medium' | 'large';
  extraClass: string;
}

export const submitButtonConfig: ButtonConfig = {
  htmlType: 'submit',
  type: 'primary',
  size: 'large',
  extraClass: 'mb-20',
};

export const resetButtonConfig: ButtonConfig = {
  htmlType: 'reset',
  type: 'secondary',
  size: 'large',
  extraClass: 'mb-20',
};
