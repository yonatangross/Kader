import React, { useEffect, useRef } from 'react';
import { Dimensions, StyleSheet, View, Image } from 'react-native';
import { Button, Input, Text } from '@ui-kitten/components';
import { ImageOverlay } from '../layouts/auth/login/extra/image-overlay.component';
import { ArrowForwardIcon } from '../layouts/auth/login/extra/icons';
import { KeyboardAvoidingView } from '../layouts/auth/login/extra/3rd-party';
import { useState } from 'react';
import { useAuth } from '../contexts/Auth';
import { ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import { Formik, Field } from 'formik';
import * as yup from 'yup';
const { width: WIDTH } = Dimensions.get('window');

import CustomInput from '../components/validation/CustomInput';

interface FormValues {
  username: string;
  password: string;
}

const loginValidationSchema = yup.object().shape({
  username: yup.string().required('username required'),
  password: yup
    .string()
    .required('No password provided.')
    .matches(/[a-zA-Z]/, 'Password should contain english letters with capital letters and special chars.'),
});

const LoginScreen = () => {
  const [loading, isLoading] = useState(false);
  const navigation = useNavigation();
  const auth = useAuth();

  useEffect(() => {
    let isMounted = true;

    return () => {
      isMounted = false;
    };
  }, [loading]);

  const handleSubmit = (values: FormValues) => {
    if (!!values.username && !!values.password)
      auth
        .signIn(values.username, values.password)
        .then(() => {})
        .catch((error) => {
          console.log('handleSubmitSignIn failed:');
          console.log(error);
        });
  };

  const onSignUpButtonPress = (): void => {
    navigation.navigate('Register');
  };

  return (
    <KeyboardAvoidingView>
      <ImageOverlay style={styles.container} source={require('../assets/images/authBg.jpg')}>
        <View style={styles.signInContainer}>
          <Text style={styles.signInLabel} status="control" category="h4">
            SIGN IN
          </Text>
          <Button style={styles.signUpButton} appearance="ghost" status="control" size="giant" accessoryLeft={ArrowForwardIcon} onPress={onSignUpButtonPress}>
            Sign Up
          </Button>
        </View>
        <View style={styles.innerContainer}>
          <Formik
            validationSchema={loginValidationSchema}
            initialValues={{
              username: '',
              password: '',
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
                  name="password"
                  placeholder="Password"
                  multiline
                  numberOfLines={1}
                  secureTextEntry={true}
                  value={values.password}
                  onChangeText={(password: string) => {
                    setFieldValue('password', password);
                  }}
                  onBlur={() => setFieldTouched('password')}
                  style={styles.fieldInputText}
                />
                <View style={styles.logoContainer}>
                  <Image source={require('../assets/images/KaderLogo.png')} style={styles.logoStyle} />
                </View>
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
};

const styles = StyleSheet.create({
  logoContainer: { justifyContent: 'center', alignItems: 'center' },
  logoStyle: { width: 300, height: 300, borderColor: 'black', borderWidth: 3, borderRadius: 150, backgroundColor: 'white', margin: 20 },
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
  fieldInputText: { marginHorizontal: 20, marginVertical: 5, backgroundColor: 'white', padding: 10, borderRadius: 15, opacity: 0.8 },
  submitContainer: {},
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
  signInContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 24,
  },
  socialAuthContainer: {
    marginTop: 48,
  },
  evaButton: {
    maxWidth: 72,
    paddingHorizontal: 0,
  },
  formContainer: {
    flex: 1,
    marginTop: 48,
  },
  passwordInput: {
    marginTop: 16,
  },
  signInLabel: {
    flex: 1,
  },
  signUpButton: {
    flexDirection: 'row-reverse',
    paddingHorizontal: 0,
  },
});

export default LoginScreen;
