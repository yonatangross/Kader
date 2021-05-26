import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import { View, TextInput } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { addComment } from '../../services/comments';
import styles from './style';

export interface InputBoxProps {
  postId: string;
  setPostUpdated: Function;
}

const InputBox = (props: InputBoxProps) => {
  const [message, setMessage] = useState<string>('');

  const onPressHandler = () => {
    if (!!message) {
      addComment(message, props.postId)
        .then((response) => {
          const postResponse: any = response;
          setMessage('');
          props.setPostUpdated(true);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  useEffect(() => {
    setMessage('');
    return () => {
      setMessage('');
    };
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.mainContainer}>
        <TextInput placeholder={'Add a comment'} style={styles.textInput} multiline numberOfLines={2} value={message} onChangeText={setMessage} />
      </View>
      <TouchableOpacity onPress={onPressHandler}>
        <View style={styles.buttonContainer}>
          <Ionicons name="send" size={22} color="white" />
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default InputBox;
