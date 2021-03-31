import { Button, Icon, Input } from '@ui-kitten/components';
import React from 'react';
import { Text, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { CreatePostStateType } from '../../types/CreatePostTypes';
import { PostType } from '../../types/PostType';

export interface PostDetailsFormProps {
  active: boolean;
  state: CreatePostStateType;
  dispatch: Function;
  setActiveSection: Function;
  setSubmitFlag: Function;
  finalStage: boolean;
}
const AlertIcon = (props: any) => <Icon {...props} name="alert-circle-outline" />;
const StarIcon = (props: any) => <Icon {...props} name="star" />;

const PostDetailsForm = (props: PostDetailsFormProps) => {
  if (props.active) {
    return (
      <>
        <Input
          value={props.state.details.title}
          label="Post Title"
          placeholder="Please fill the post title here."
          caption="Should contain at least 8 symbols"
          captionIcon={AlertIcon}
          onChangeText={(title) => {
            props.dispatch({
              type: 'Details',
              payload: {
                title: title,
                description: props.state.details.description,
                location: props.state.details.location,
                images: props.state.details.location,
              },
            });
            console.log(props.state);
          }}
        />
        <Input
          multiline={true}
          textStyle={{ minHeight: 64 }}
          placeholder="Post Description."
          value={props.state.details.description}
          onChangeText={(description) => {
            props.dispatch({
              type: 'Details',
              payload: {
                title: props.state.details.title,
                description: description,
                location: props.state.details.location,
                images: props.state.details.location,
              },
            });
          }}
        />
        <Button
          style={styles.button}
          status="success"
          accessoryLeft={StarIcon}
          size="small"
          onPress={() => {
            if (props.finalStage) {
              props.setSubmitFlag(true);
              props.setActiveSection([false, false, false, false]);
            } else {
              props.setActiveSection([false, false, false, true]);
            }
          }}
        >
          {(buttonProps: any) =>
            props.finalStage ? (
              <Text {...buttonProps} style={{ color: 'rgba(34, 83, 231,1)' }}>
                Submit details
              </Text>
            ) : (
              <Text {...buttonProps} style={{ color: 'rgba(34, 83, 231,1)' }}>
                Submit post
              </Text>
            )
          }
        </Button>
      </>
    );
  } else {
    return null;
  }
};

const styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    margin: 10,
    marginRight: 40,
    marginLeft: 40,
    padding: 10,
  },
});

export default PostDetailsForm;