import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Image, Dimensions, ActivityIndicator } from 'react-native';
const { width: WIDTH } = Dimensions.get('window');
import { Formik, Field } from 'formik';
import * as yup from 'yup';
import CustomInput from '../components/validation/CustomInput';
import { useAuth } from '../contexts/Auth';
import { Button, Text } from '@ui-kitten/components';
import { ImageOverlay } from '../layouts/auth/login/extra/image-overlay.component';
import { KeyboardAvoidingView } from '../layouts/auth/login/extra/3rd-party';
import { ArrowForwardIcon } from '../layouts/auth/login/extra/icons';
import { useNavigation } from '@react-navigation/core';

interface FormValues {
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  passwordConfirmation: string;
  phoneNumber: string;
}
const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const registerValidationSchema = yup.object().shape({
  username: yup.string().required('username'),
  email: yup.string().email('Email is not valid').required('Email is required'),
  firstName: yup.string().required('First name required.').min(2, 'First name is too short - should be 2 chars minimum'),
  lastName: yup.string().required('Last name required.').min(2, 'Last name is too short - should be 2 chars minimum'),
  phoneNumber: yup.string().matches(phoneRegExp, 'Phone number is not valid'),
  password: yup
    .string()
    .required('No password provided.')
    .min(8, 'Password is too short - must contain 8 chars that includes.')
    .matches(/[a-zA-Z]/, 'Password should contain english letters with capital letters and special chars.'),
  passwordConfirmation: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match'),
});
export default function RegisterScreen() {
  const [loading, isLoading] = useState(false);

  const auth = useAuth();
  const navigation = useNavigation();

  useEffect(() => {
    return () => {};
  }, []);

  const onSignInButtonPress = (): void => {
    navigation.navigate('Login');
  };

  const handleSubmit = (values: FormValues) => {
    isLoading(true);
    auth
      .signUp(values)
      .then(async () => {
        console.log('pressed handleSubmit');
      })
      .catch((error) => {
        console.log('errorText:');
        console.log(error);
      });
  };

  return (
    <KeyboardAvoidingView>
      <ImageOverlay style={styles.container} source={require('../assets/images/bg2.jpg')}>
        <View style={styles.signUpContainer}>
          <Text style={styles.signUpLabel} status="control" category="h4">
            SIGN UP
          </Text>
          <Button style={styles.signInButton} appearance="ghost" status="control" size="giant" accessoryLeft={ArrowForwardIcon} onPress={onSignInButtonPress}>
            Sign In
          </Button>
        </View>
        <View style={styles.innerContainer}>
          <Formik
            validationSchema={registerValidationSchema}
            initialValues={{
              username: '',
              email: '',
              password: '',
              passwordConfirmation: '',
              firstName: '',
              lastName: '',
              phoneNumber: '',
            }}
            onSubmit={(values) => handleSubmit(values)}
          >
            {({ handleSubmit, values, setFieldValue, setFieldTouched }) => (
              <>
                <Field
                  component={CustomInput}
                  name="username"
                  placeholder="Username"
                  multiline
                  numberOfLines={1}
                  value={values.username}
                  onChangeText={(username: string) => {
                    setFieldValue('username', username);
                  }}
                  onBlur={() => setFieldTouched('username')}
                  style={styles.fieldInputText}
                />
                <Field
                  component={CustomInput}
                  name="email"
                  placeholder="Email"
                  multiline
                  numberOfLines={1}
                  value={values.email}
                  onChangeText={(email: string) => {
                    setFieldValue('email', email);
                  }}
                  onBlur={() => setFieldTouched('email')}
                  style={styles.fieldInputText}
                />
                <Field
                  component={CustomInput}
                  name="password"
                  placeholder="Password"
                  multiline
                  numberOfLines={1}
                  value={values.password}
                  onChangeText={(password: string) => {
                    setFieldValue('password', password);
                  }}
                  onBlur={() => setFieldTouched('password')}
                  style={styles.fieldInputText}
                />
                <Field
                  component={CustomInput}
                  name="passwordConfirmation"
                  placeholder="Enter password again"
                  multiline
                  numberOfLines={1}
                  value={values.passwordConfirmation}
                  onChangeText={(passwordConfirmation: string) => {
                    setFieldValue('passwordConfirmation', passwordConfirmation);
                  }}
                  onBlur={() => setFieldTouched('passwordConfirmation')}
                  style={styles.fieldInputText}
                />
                <Field
                  component={CustomInput}
                  name="firstName"
                  placeholder="First name"
                  multiline
                  numberOfLines={1}
                  value={values.firstName}
                  onChangeText={(firstName: string) => {
                    setFieldValue('firstName', firstName);
                  }}
                  onBlur={() => setFieldTouched('firstName')}
                  style={styles.fieldInputText}
                />
                <Field
                  component={CustomInput}
                  name="lastName"
                  placeholder="Last name"
                  multiline
                  numberOfLines={1}
                  value={values.lastName}
                  onChangeText={(lastName: string) => {
                    setFieldValue('lastName', lastName);
                  }}
                  onBlur={() => setFieldTouched('lastName')}
                  style={styles.fieldInputText}
                />
                <Field
                  component={CustomInput}
                  name="phoneNumber"
                  placeholder="Phone number"
                  multiline
                  numberOfLines={1}
                  value={values.phoneNumber}
                  onChangeText={(phoneNumber: string) => {
                    setFieldValue('phoneNumber', phoneNumber);
                  }}
                  onBlur={() => setFieldTouched('phoneNumber')}
                  style={styles.fieldInputText}
                />
                <View style={styles.submitContainer}>
                  <Text style={styles.submitHeader} status="control" category="h4">
                    Sign Up to Kader!
                  </Text>
                  {loading ? (
                    <ActivityIndicator color={'#000'} animating={true} size="small" />
                  ) : (
                    <Button style={styles.submitButton} status="control" size="large" onPress={handleSubmit}>
                      SUBMIT
                    </Button>
                  )}
                </View>
              </>
            )}
          </Formik>
        </View>
      </ImageOverlay>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  signUpLabel: {
    flex: 1,
  },
  signInButton: {
    flexDirection: 'row-reverse',
    paddingHorizontal: 0,
  },
  signUpContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 24,
  },
  fieldInputText: { marginHorizontal: 20, marginVertical: 5, backgroundColor: 'white', padding: 10, borderRadius: 15, opacity: 0.6 },
  submitContainer: {
    marginBottom: 140,
  },
  submitHeader: { alignSelf: 'center', marginBottom: 30 },
  submitButton: {},
  errorContainer: { width: '100%', marginHorizontal: 40 },
  errorText: { color: 'red', fontSize: 12 },
  innerContainer: { flexDirection: 'column', width: '100%', flex: 1 },
  labelText: { fontSize: 16, paddingLeft: 10, paddingTop: 5 },
  finishButton: {
    backgroundColor: '#047cfb',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    borderWidth: 0.8,
    borderColor: '#394d51',
    margin: 10,
    marginTop: 30,
    marginHorizontal: 40,
  },
  finishButtonText: { fontSize: 20, fontWeight: 'bold' },
  textInput: { fontSize: 16, backgroundColor: '#f1f0f0', borderRadius: 15, marginBottom: 20, marginHorizontal: 20, padding: 10 },
  container: {
    flex: 1,
    paddingVertical: 24,
    paddingHorizontal: 16,
  },
  logo: {
    width: 500,
    height: 100,
    resizeMode: 'contain',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  inputContainer: {
    marginTop: 10,
  },
  input: {
    width: WIDTH - 55,
    height: 45,
    borderRadius: 25,
    fontSize: 16,
    paddingLeft: 45,
    backgroundColor: 'rgba(0, 0, 0, 0.35)',
    color: 'rgba(255, 255, 255, 0.7)',
    marginHorizontal: 25,
    marginVertical: 15,
  },
  inputIcon: {
    position: 'absolute',
    top: 25,
    left: 37,
  },
  btnEye: {
    position: 'absolute',
    top: 25,
    right: 70,
  },
  btnLogin: {
    width: WIDTH - 55,
    height: 45,
    borderRadius: 25,
    backgroundColor: '#763857',
    justifyContent: 'center',
    marginTop: 20,
  },
  text: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
});
