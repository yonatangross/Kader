import React from 'react';
import { Text, StyleSheet, Modal, Alert, Image } from 'react-native';
import * as Progress from 'react-native-progress';
const testImage = require('../../assets/images/scooby.jpeg');

export interface CreatePostModalProps {
  visible: boolean;
  onChange: Function;
}

const CreatePostModal = (props: CreatePostModalProps) => {
  return (
    <Modal
      animationType={'slide'}
      transparent={false}
      visible={props.visible}
      onRequestClose={() => {
        Alert.alert('Modal has now been closed.');
      }}
    >
      <Text style={styles.progressStatus}>Post Creation Status</Text>
      <Progress.Bar progress={0.3} width={250} style={styles.progressBar} />
      <Image source={testImage} style={styles.image} />
      <Text
        style={styles.closeText}
        onPress={() => {
          props.onChange(!props.visible);
        }}
      >
        Cancel post creation
      </Text>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    margin: 10,
    backgroundColor: 'transparent',
  },
  roundButton: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 100,
    margin: 10,
    marginRight: 40,
    marginLeft: 40,
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    margin: 10,
    marginRight: 40,
    marginLeft: 40,
    padding: 10,
  },

  modalButton: {
    display: 'flex',
    height: 60,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    backgroundColor: '#2AC062',
    shadowColor: '#2AC062',
    shadowOpacity: 0.5,
    shadowOffset: {
      height: 10,
      width: 0,
    },
    shadowRadius: 25,
  },
  closeButton: {
    display: 'flex',
    height: 60,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FF3974',
    shadowColor: '#2AC062',
    shadowOpacity: 0.5,
    shadowOffset: {
      height: 10,
      width: 0,
    },
    shadowRadius: 25,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 22,
  },
  image: {
    marginTop: 50,
    marginBottom: 10,
    width: '100%',
    height: 300,
  },
  text: {
    fontSize: 24,
    marginBottom: 30,
    padding: 40,
  },
  closeText: {
    fontSize: 24,
    color: '#00479e',
    textAlign: 'center',
  },
  progressBar: { display: 'flex', justifyContent: 'center', alignSelf: 'center', marginTop: 20 },
  progressStatus: {
    marginTop: 20,
    display: 'flex',
    justifyContent: 'center',
    alignSelf: 'center',
  },
});

export default CreatePostModal;
