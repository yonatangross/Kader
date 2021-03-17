import { Entypo, FontAwesome5, Fontisto, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { View, TextInput } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { addComment } from '../../api/comments';
import { IPost } from '../../types/IPost';
import styles from './style';

export interface InputBoxProps {
  post: IPost;
}

const InputBox = (props: InputBoxProps) => {
  const [message, setMessage] = useState('');

  const onSendPress = () => {
    console.warn(`Sending ${message}`);
    // send the message to the backend
    setMessage('');
    addComment({ content: message, post: props.post });
  };

  const onPress = () => {
    if (!message) {
    } else onSendPress();
  };

  return (
    <View style={styles.container}>
      <View style={styles.mainContainer}>
        {/* <FontAwesome5 name="laugh-beam" size={24} color="grey" /> */}
        <TextInput placeholder={'Type a comment'} style={styles.textInput} multiline numberOfLines={2} value={message} onChangeText={setMessage} />
      </View>
      <TouchableOpacity onPress={onPress}>
        <View style={styles.buttonContainer}>
          <MaterialIcons name="send" size={28} color="white" />
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default InputBox;
