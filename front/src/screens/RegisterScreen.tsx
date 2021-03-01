import * as React from 'react';
const logo = require('../assets/images/bigLogo.png');
import { Text, View, StyleSheet, Image, TextInput, Dimensions, TouchableOpacity } from 'react-native';
import { MaterialIcons, Feather, AntDesign, Octicons } from '@expo/vector-icons';

const { width: WIDTH } = Dimensions.get('window');
export default function RegisterScreen() {
  return (
    <View style={styles.container}>
      <View>
        <Image source={logo} style={styles.logo} />
      </View>

      <View style={styles.inputContainer}>
        <MaterialIcons name="person" size={24} color="black" style={styles.inputIcon} />
        <TextInput style={styles.input} placeholder={'First Name'} placeholderTextColor={'rgba(255, 255, 255, 0.7)'} underlineColorAndroid="transparent" />

        <TextInput style={styles.input} placeholder={'Last Name'} placeholderTextColor={'rgba(255, 255, 255, 0.7)'} underlineColorAndroid="transparent" />

        <View>
          <MaterialIcons name="mail" size={24} color="black" style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder={'Email'}
            keyboardType={'email-address'}
            textContentType={'emailAddress'}
            placeholderTextColor={'rgba(255, 255, 255, 0.7)'}
            underlineColorAndroid="transparent"
          />
        </View>
        <View>
          <AntDesign name="lock1" size={24} color="black" style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder={'Password'}
            secureTextEntry={true}
            placeholderTextColor={'rgba(255, 255, 255, 0.7)'}
            underlineColorAndroid="transparent"
          />
          <TouchableOpacity style={styles.btnEye}>
            <Octicons name="eye" size={24} color="black" />
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity activeOpacity={0.6} style={styles.btnLogin}>
        <Text style={styles.text}>Login</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
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
