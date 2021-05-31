import React, { useEffect } from 'react';
import { Modal, StyleSheet, View, Text, Button, TouchableOpacity } from 'react-native';

interface AlertProps {
  title: string;
  message: string;
  showErrorCreatingPost: boolean;
  setShowErrorCreatingPost: Function;
}

const Alert = (props: AlertProps) => {
  const { title, message, showErrorCreatingPost, setShowErrorCreatingPost } = props;

  useEffect(() => {
    console.log(showErrorCreatingPost);
  }, [props.showErrorCreatingPost]);

  return (
    <Modal
      animationType={'slide'}
      transparent={true}
      visible={showErrorCreatingPost}
      onRequestClose={() => {
        props.setShowErrorCreatingPost(false);
        console.log('Modal has now been closed.');
      }}
      style={styles.modalView}
    >
      <View style={styles.viewContainer}>
        <Text style={styles.titleText}>{title}</Text>
        <Text style={styles.messageText}>{message}</Text>
        <TouchableOpacity activeOpacity={0.7} onPress={() => props.setShowErrorCreatingPost(false)} style={styles.closeButton}>
          <Text style={styles.closeButtonText}>Done</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

export default Alert;

const styles = StyleSheet.create({
  closeButton: {
    marginTop: 30,
    backgroundColor: 'red',
    borderRadius: 30,
    alignItems: 'center',
    width: '80%',
    height: 40,
    justifyContent: 'center',
   
  },
  closeButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  titleText: { fontSize: 24, color: 'black', marginBottom: 20 },
  messageText: { fontSize: 16, color: 'black',fontWeight:'100' },
  viewContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '80%',
    height: 200,
    borderColor: '#ccc',
    borderWidth: 1,
    borderStyle: 'solid',
    backgroundColor: 'white',
    elevation: 20,
    margin: 50,
    borderRadius: 15,
  },
  modalView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
});
