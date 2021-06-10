import React from 'react';
import { Text, TextInput, StyleSheet } from 'react-native';

export interface CustomInputProps {}

const CustomInput = (props: any) => {
  const {
    field: { name, onBlur, onChange, value },
    form: { errors, touched, setFieldTouched },
    ...inputProps
  } = props;

  const hasError = errors[name] && touched[name];

  return (
    <>
      <TextInput
        style={[styles.textInput, props.multiline && { height: props.numberOfLines * 40 }, hasError && styles.errorInput]}
        value={value}
        onChangeText={(text) => onChange(name)(text)}
        onBlur={() => {
          setFieldTouched(name);
          onBlur(name);
        }}
        {...inputProps}
      />
      {hasError && <Text style={styles.errorText}>{errors[name]}</Text>}
    </>
  );
};

const styles = StyleSheet.create({
  textInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: StyleSheet.hairlineWidth,
    textAlignVertical: 'top',
    fontSize: 16,
    backgroundColor: '#f1f0f0',
    borderRadius: 15,
    marginTop: 10,
    marginHorizontal: 20,
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  errorText: {
    fontSize: 12,
    paddingHorizontal: 10,
    marginHorizontal: 20,
    color: 'red',
  },
  errorInput: {
    borderColor: 'red',
  },
});

export default CustomInput;
