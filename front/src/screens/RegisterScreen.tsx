import React, { useState } from 'react';
import { View, StyleSheet, Image, Dimensions, Button } from 'react-native';
const logo = require('../assets/images/bigLogo.png');
const { width: WIDTH } = Dimensions.get('window');
import { Formik, Field } from 'formik';
import * as yup from 'yup';
import CustomInput from '../components/validation/CustomInput';
import { authService } from '../services/authService';
import { useAuth } from '../contexts/Auth';

interface FormValues {
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  passwordConfirmation: string;
}

const registerValidationSchema = yup.object().shape({
  username: yup.string().required('username'),
  email: yup.string().email('Email is not valid').required('Email is required'),
  firstName: yup.string().required('First name required.').min(2, 'First name is too short - should be 2 chars minimum'),
  lastName: yup.string().required('Last name required.').min(2, 'Last name is too short - should be 2 chars minimum'),
  password: yup
    .string()
    .required('No password provided.')
    .min(8, 'Password is too short - should be 8 chars minimum.')
    .matches(/[a-zA-Z]/, 'Password can only contain Latin letters.'),
  passwordConfirmation: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match'),
});
export default function RegisterScreen() {
  const [loading, isLoading] = useState(false);
  const auth = useAuth();

  const handleSubmit = (values: FormValues) => {
    console.log(values);

    authService
      .register(values)
      .then(async (response) => {
        isLoading(true);
        await auth.signIn(values.username, values.password);
      })
      .catch((error) => {
        console.log(`Error while registering ${error}`);
      });
  };

  return (
    <View style={styles.container}>
      <View>
        <Image source={logo} style={styles.logo} />
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
          }}
          onSubmit={(values) => handleSubmit(values)}
        >
          {({ handleSubmit, isValid, values, setFieldValue, setFieldTouched, errors, touched }) => (
            <>
              <Field
                component={CustomInput}
                name="username"
                placeholder="Enter username"
                multiline
                numberOfLines={1}
                value={values.username}
                onChangeText={(username: string) => {
                  setFieldValue('username', username);
                }}
                onBlur={() => setFieldTouched('username')}
              />
              <Field
                component={CustomInput}
                name="email"
                placeholder="Enter email"
                multiline
                numberOfLines={1}
                value={values.email}
                onChangeText={(email: string) => {
                  setFieldValue('email', email);
                }}
                onBlur={() => setFieldTouched('email')}
              />
              <Field
                component={CustomInput}
                name="password"
                placeholder="Enter password"
                multiline
                numberOfLines={1}
                value={values.password}
                onChangeText={(password: string) => {
                  setFieldValue('password', password);
                }}
                onBlur={() => setFieldTouched('password')}
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
              />
              <Field
                component={CustomInput}
                name="firstName"
                placeholder="Enter firstName"
                multiline
                numberOfLines={1}
                value={values.firstName}
                onChangeText={(firstName: string) => {
                  setFieldValue('firstName', firstName);
                }}
                onBlur={() => setFieldTouched('firstName')}
              />
              <Field
                component={CustomInput}
                name="lastName"
                placeholder="Enter last name"
                multiline
                numberOfLines={1}
                value={values.lastName}
                onChangeText={(lastName: string) => {
                  setFieldValue('lastName', lastName);
                }}
                onBlur={() => setFieldTouched('lastName')}
              />

              <Button onPress={handleSubmit} title="REGISTER" disabled={!isValid} />
            </>
          )}
        </Formik>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
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
    marginRight: 40,
    marginLeft: 40,
    padding: 10,
  },
  finishButtonText: { fontSize: 20, fontWeight: 'bold' },
  textInput: { fontSize: 16, backgroundColor: '#f1f0f0', borderRadius: 15, marginBottom: 20, marginHorizontal: 20, padding: 10 },
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#f9f3f3',
    justifyContent: 'center',
    marginLeft: 10,
  },
  logo: {
    width: 500,
    height: 100,
    resizeMode: 'contain',
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
