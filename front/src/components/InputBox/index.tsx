import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import { View, TextInput } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { addComment } from '../../services/comments';
import { IPost } from '../../types/IPost';
import styles from './style';

export interface InputBoxProps {
  post: IPost;
  setPostUpdated: Function;
}

const InputBox = (props: InputBoxProps) => {
  const [message, setMessage] = useState<string>('');

  const onPressHandler = () => {
    if (!!message) {
      console.warn(`Sending ${message}`);
      addComment(message, props.post.postId)
        .then((response) => {
          const postResponse: any = response;
          console.warn(`added comment: ${message}`);
          props.setPostUpdated(true);
        })
        .catch((error) => {
          console.log(error);
        });
      setMessage('');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.mainContainer}>
        <TextInput placeholder={'Add a comment'} style={styles.textInput} multiline numberOfLines={2} value={message} onChangeText={setMessage} />
      </View>
      <TouchableOpacity onPress={onPressHandler}>
        <View style={styles.buttonContainer}>
          <Ionicons name="send" size={28} color="black" />
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default InputBox;
