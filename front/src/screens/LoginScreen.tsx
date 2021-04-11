import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Input, Text } from '@ui-kitten/components';
import { ImageOverlay } from '../layouts/auth/login/extra/image-overlay.component';
import { ArrowForwardIcon } from '../layouts/auth/login/extra/icons';
import { KeyboardAvoidingView } from '../layouts/auth/login/extra/3rd-party';
import { useState } from 'react';
import { useAuth } from '../contexts/Auth';
import { ActivityIndicator } from 'react-native';

export interface LoginScreenProps {}

export default function LoginScreen(navigation: any) {
  const [loading, isLoading] = useState(false);
  const auth = useAuth();
  const signIn = async () => {
    isLoading(true);
    await auth.signIn('matan', 'Bolila1!');
  };
  const [username, setUsername] = React.useState<string>();
  const [password, setPassword] = React.useState<string>();

  const onSignUpButtonPress = (): void => {
    navigation && navigation.navigate('SignUp1');
  };

  return (
    <KeyboardAvoidingView>
      <ImageOverlay style={styles.container} source={require('../assets/images/image-background.jpg')}>
        <View style={styles.signInContainer}>
          <Text style={styles.signInLabel} status="control" category="h4">
            SIGN IN
          </Text>
          <Button style={styles.signUpButton} appearance="ghost" status="control" size="giant" accessoryLeft={ArrowForwardIcon} onPress={onSignUpButtonPress}>
            Sign Up
          </Button>
        </View>
        <View style={styles.formContainer}>
          <Input label="EMAIL" placeholder="Email" status="control" value={username} onChangeText={setUsername} />
          <Input
            style={styles.passwordInput}
            secureTextEntry={true}
            placeholder="Password"
            label="PASSWORD"
            status="control"
            value={password}
            onChangeText={setPassword}
          />
        </View>
        <View style={styles.submitContainer}>
          <Text style={styles.submitHeader} status="control" category="h4">
            Enter Kader
          </Text>
          {loading ? (
            <ActivityIndicator color={'#000'} animating={true} size="small" />
          ) : (
            <Button style={styles.submitButton} status="control" size="large" onPress={signIn}>
              SUBMIT
            </Button>
          )}
        </View>
      </ImageOverlay>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  submitContainer: {
    marginBottom: 140,
  },
  submitHeader: { alignSelf: 'center', marginBottom: 30 },
  submitButton: {},
  container: {
    flex: 1,
    paddingVertical: 24,
    paddingHorizontal: 16,
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
