import React from 'react';
import { useField } from '@unform/core';
import { IconBaseProps } from 'react-icons';
import { FiAlertCircle } from 'react-icons/fi';

import { Container, Error } from './styles';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  icon?: React.ComponentType<IconBaseProps>;
}

const Input: React.FC<InputProps> = ({ name, icon: Icon, ...rest }) => {
  const [isFilled, setIsFilled] = React.useState(false);
  const [isFocused, setIsFocused] = React.useState(false);

  const inputRef = React.useRef<HTMLInputElement>(null);

  const { fieldName, defaultValue, error, registerField } = useField(name);

  React.useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
    });
  }, [fieldName, registerField]);

  const handleInputFocus = React.useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleInputBlur = React.useCallback(() => {
    setIsFocused(false);

    setIsFilled(!!inputRef.current?.value);
  }, []);

  return (
    <Container isErrored={!!error} isFocused={isFocused} isFilled={isFilled}>
      {Icon ? <Icon size={20} /> : null}
      <input
        onFocus={() => handleInputFocus()}
        onBlur={() => handleInputBlur()}
        defaultValue={defaultValue}
        ref={inputRef}
        {...rest}
      />

      {error ? (
        <Error title={error}>
          <FiAlertCircle color="#c53030" size={20} />
        </Error>
      ) : null}
    </Container>
  );
};

export default Input;
