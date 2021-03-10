import React from 'react';
import { TextInputProps } from 'react-native';
import { useField } from '@unform/core';

import { Container, TextInput, Icon } from './style';

interface InputProps extends TextInputProps {
  name: string;
  icon: string;
  containerStyle?: Record<string, unknown>;
}

interface InputValueReference {
  value: string;
}

interface InputRef {
  focus(): void;
}

const Input: React.ForwardRefRenderFunction<InputRef, InputProps> = (
  { name, icon, containerStyle = {}, ...rest },
  ref,
) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const inputElementRef = React.useRef<any>(null);
  const { registerField, defaultValue = '', fieldName, error } = useField(name);
  const inputValueRef = React.useRef<InputValueReference>({
    value: defaultValue,
  });
  const [isFocus, setIsFocus] = React.useState(false);
  const [isFild, setIsFild] = React.useState(false);
  const handleInputFocus = React.useCallback(() => {
    setIsFocus(true);
  }, []);
  const handleInputBlur = React.useCallback(() => {
    setIsFocus(false);
    setIsFild(!!inputValueRef.current.value);
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
      setValue(ref_: unknown, value) {
        inputValueRef.current.value = value;
        inputElementRef.current.setNative({ text: value });
      },
      clearValue() {
        inputValueRef.current.value = '';
        inputElementRef.current.clear();
      },
    });
  }, [fieldName, registerField]);

  return (
    <Container style={containerStyle} isFocused={isFocus} isErrored={!!error}>
      <Icon
        name={icon}
        size={20}
        color={isFocus || isFild ? '#ff9000' : '#666360'}
      />
      <TextInput
        ref={inputElementRef}
        keyboardAppearance="dark"
        placeholderTextColor="#666360"
        defaultValue={defaultValue}
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        onChangeText={value => {
          inputValueRef.current.value = value;
        }}
        {...rest}
      />
    </Container>
  );
};

export default React.forwardRef(Input);
