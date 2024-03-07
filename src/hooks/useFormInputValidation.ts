import { useState } from 'react';

const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export type Input = 'newEmail' | 'newPassword' | 'newName' | 'newCode';
export interface InputData {
  value: string;
  error: boolean;
  required: boolean;
}
export type InputsData = Record<Input, InputData>;

export default function useFormInputValidation(
  initialState: Partial<InputsData>
) {
  const [isChanged, setIsChanged] = useState(false);
  const [newValues, setNewValues] = useState(initialState);
  const [isValid, setIsValid] = useState(false);
  const [message, setMessage] = useState<string>('');

  const handleInputChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    if (evt.target) {
      setNewValues({
        ...newValues,
        [evt.target.name]: {
          value: evt.target.value,
          error: !validateField(evt.target),
        },
      });
      setIsChanged(true);
      setMessage('');
    }
  };

  const checkRuleByInputName = (input: HTMLInputElement, name: string) => {
    const isRequired = input.hasAttribute('required');
    if (name === 'newEmail') {
      return re.test(input.value);
    }
    if (name === 'newPassword') {
      return (
        (!isRequired && input.value.length === 0) || input.value.length > 5
      );
    }
    return input.value.length > 1;
  };

  const validateField = (input: HTMLInputElement) => {
    const hadErrorsOrRequiredEmpty = Object.entries(newValues)
      .filter((item) => item[0] !== input.name)
      .some((item) => item[1].error || item[1].required);

    const fieldIsValid = checkRuleByInputName(input, input.name);
    setIsValid(!hadErrorsOrRequiredEmpty && fieldIsValid);
    return fieldIsValid;
  };

  const onReset = () => {
    setNewValues(initialState);
    setIsChanged(false);
  };

  return {
    isChanged,
    setIsChanged,
    newValues,
    handleInputChange,
    onReset,
    isValid,
    setIsValid,
    message,
    setMessage,
  };
}
