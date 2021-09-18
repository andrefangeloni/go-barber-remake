import React from 'react';
import { TextInputProps } from 'react-native';

import { useField } from '@unform/core';

import { Container, TextInput, Icon } from './styles';

interface InputProps extends TextInputProps {
  name: string;
  icon: string;
}

interface InputValueReference {
  value: string;
}

interface InputRef {
  focus(): void;
}

const Input: React.ForwardRefRenderFunction<InputRef, InputProps> = (
  { name, icon, ...rest },
  ref,
) => {
  const inputElementRef = React.useRef<any>(null);

  const { registerField, defaultValue = '', fieldName, error } = useField(name);

  const inputValueRef = React.useRef<InputValueReference>({
    value: defaultValue,
  });

  const [isFilled, setIsFilled] = React.useState(false);
  const [isFocused, setIsFocused] = React.useState(false);

  const handleInputFocus = React.useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleInputBlur = React.useCallback(() => {
    setIsFocused(false);

    setIsFilled(!!inputValueRef.current.value);
  }, []);

  React.useImperativeHandle(ref, () => ({
    focus() {
      inputElementRef.current.focus();
    },
  }));

  React.useEffect(() => {
    registerField<string>({
      name: fieldName,
      ref: inputValueRef.current,
      path: 'value',
      setValue(ref: any, value) {
        inputValueRef.current.value = value;
        inputElementRef.current.setNativeProps({ text: value });
      },
      clearValue() {
        inputValueRef.current.value = '';
        inputElementRef.current.clear();
      },
    });
  }, [fieldName, registerField]);

  return (
    <Container isFocused={isFocused}>
      <Icon name={icon} highlight={isFocused || isFilled} />

      <TextInput
        ref={inputElementRef}
        placeholderTextColor="#666360"
        {...rest}
        defaultValue={defaultValue}
        onFocus={() => handleInputFocus()}
        onBlur={() => handleInputBlur()}
        onChangeText={(text) => {
          inputValueRef.current.value = text;
        }}
      />
    </Container>
  );
};

export default React.forwardRef(Input);
