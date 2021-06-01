import { useNavigation } from '@react-navigation/core';
import moment from 'moment';
import React, { createRef, useEffect, useRef, useState } from 'react';
import { StyleSheet, Modal, View, Text, TextInput, TouchableOpacity, Image, ImageStyle } from 'react-native';
import { imageBaseUrl } from '../../services/axios';
import { deleteComment, getComment, updateComment } from '../../services/comments';
import { IComment } from '../../types/IComment';
import { capitalize } from '../../utils/text';

export interface CommentActionsModalProps {
  commentId: string;
  visible: boolean;
  setVisible: Function;
  setPostUpdated: Function;
}

const CommentActionsModal = (props: CommentActionsModalProps) => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState<boolean>(false);
  const [comment, setComment] = useState<IComment>();
  const [content, setContent] = useState<string>('');
  const [showSubmitUpdateButton, setShowSubmitUpdateButton] = useState<boolean>(true);
  const [showSubmitDeleteButton, setShowSubmitDeleteButton] = useState<boolean>(false);
  const commentRef = useRef();

  useEffect(() => {
    let isMounted = true;
    if (props.visible === true) {
      // console.log(`trying to getComment for ${props.commentId}`);
      getComment(props.commentId)
        .then((response) => {
          if (isMounted) {
            const commentResult: IComment = response.data;
            setContent(commentResult.content);
            setComment(commentResult);
            setLoading(false);
            if (!!commentRef && !!commentRef.current) {
              commentRef.current.focus();
            }
          }
        })
        .catch((error) => {
          props.setVisible(false);
          console.log(props.visible);
          console.log(`error while fetching comment ${error}`);
        });
    }
    () => {
      props.setVisible(false);
      isMounted = false;
    };
  }, [props.visible, setComment, setContent, showSubmitDeleteButton, showSubmitDeleteButton]);

  const onPressUpdateComment = () => {
    if (!!comment?.content) {
      comment.content = content;
    }
    //todo: add updated time

    updateComment(comment)
      .then((response) => {
        console.log(`updated ${comment?.commentId} successfully`);
        props.setVisible(false);
        props.setPostUpdated(true);
      })
      .catch((error) => {
        console.log(`error while updating comment ${error}`);
      });
  };

  const onPressDeleteComment = () => {
    deleteComment(props.commentId)
      .then((response) => {
        console.log(`deleted ${comment?.commentId} successfully`);
        props.setVisible(false);
        props.setPostUpdated(true);
        navigation.navigate('SinglePost', {
          id: comment?.postId,
        });
      })
      .catch((error) => {
        console.log(`error while deleting comment ${comment?.commentId} ${error}`);
      });
  };

  if (!!comment && !!comment.creator) {
    return (
      <>
        <Modal
          animationType={'slide'}
          transparent={true}
          visible={props.visible}
          onRequestClose={() => {
            props.setVisible(false);
            console.log('CommentActionsModal has now been closed.');
          }}
          style={styles.modalView}
        >
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'space-around',
              alignItems: 'flex-end',
            }}
          >
            <View style={styles.modalContent}>
              <View style={styles.commentContainer}>
                <View style={styles.profileImageContainer}>
                  {!!comment.creator && !!comment.creator.imageUri ? (
                    <Image source={{ uri: imageBaseUrl + comment.creator.imageUri }} style={styles.profileImage as ImageStyle} />
                  ) : (
                    <Image source={require('../../assets/images/celebrity.png')} style={styles.profileImage as ImageStyle} />
                  )}
                </View>
                <View style={styles.commentDetailsContainer}>
                  <Text style={styles.commenterName}>
                    {capitalize(comment.creator.firstName)} {capitalize(comment.creator.lastName)}
                  </Text>
                  <TextInput
                    ref={commentRef}
                    placeholder={comment.content}
                    style={styles.commentContentText}
                    numberOfLines={2}
                    value={content}
                    multiline={true}
                    onChangeText={(content) => {
                      setContent(content);
                    }}
                  />
                  <View style={styles.commentDataContainer}>
                    <Text style={styles.commentDate}>{moment(comment.created).fromNow()}</Text>
                  </View>
                </View>
              </View>
              <View style={styles.buttonsContainer}>
                {/* <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() => {
                    setHideUpdateButton(false);
                  }}
                  style={styles.updateButtonContainer}
                >
                  <Text style={styles.postCreationText}>Update Comment</Text>
                </TouchableOpacity> */}

                {showSubmitUpdateButton && (
                  <TouchableOpacity activeOpacity={0.7} onPress={onPressUpdateComment} style={styles.updateButtonContainer}>
                    <Text style={styles.postCreationText}>Update</Text>
                  </TouchableOpacity>
                )}

                {!showSubmitDeleteButton && (
                  <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() => {
                      setShowSubmitDeleteButton(true);
                      setShowSubmitUpdateButton(false);
                    }}
                    style={styles.deleteButtonContainer}
                  >
                    <Text style={styles.postCreationText}>Delete</Text>
                  </TouchableOpacity>
                )}
                {showSubmitDeleteButton && (
                  <TouchableOpacity activeOpacity={0.7} onPress={onPressDeleteComment} style={styles.deleteButtonContainer}>
                    <Text style={styles.postCreationText}>Delete!</Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          </View>
        </Modal>
      </>
    );
  } else return <></>;
};

const styles = StyleSheet.create({
  modalView: {
    margin: 0,
    justifyContent: 'flex-end',
  },
  modalContent: {
    width: '100%',
    height: '50%',
    backgroundColor: '#dedcdf',
    overflow: 'hidden',
  },
  postCreationText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  buttonsContainer: {
    marginVertical: 0,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
  },
  updateButtonContainer: {
    margin: 10,
    backgroundColor: '#4975aa',
    borderRadius: 30,
    alignItems: 'center',
    width: 80,
    height: 40,
    justifyContent: 'center',
    shadowColor: 'rgba(0, 0, 0, 0.1)',
    shadowOpacity: 0.8,
    elevation: 6,
    shadowRadius: 15,
    shadowOffset: { width: 1, height: 13 },
  },
  cancelButtonContainer: {
    margin: 10,
    backgroundColor: '#4975aa',
    borderRadius: 30,
    alignItems: 'center',
    width: 80,
    height: 40,
    justifyContent: 'center',
    shadowColor: 'rgba(0, 0, 0, 0.1)',
    shadowOpacity: 0.8,
    elevation: 6,
    shadowRadius: 15,
    shadowOffset: { width: 1, height: 13 },
  },
  deleteButtonContainer: {
    margin: 10,
    backgroundColor: 'red',
    borderRadius: 30,
    alignItems: 'center',
    width: 80,
    height: 40,
    justifyContent: 'center',
    shadowColor: 'rgba(0, 0, 0, 0.1)',
    shadowOpacity: 0.8,
    elevation: 6,
    shadowRadius: 15,
    shadowOffset: { width: 1, height: 13 },
  },
  commentDataContainer: { flexDirection: 'row', width: '100%', justifyContent: 'space-between', marginBottom: 3 },
  commentContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingHorizontal: 10,
    borderRadius: 30,
    backgroundColor: 'white',
    marginVertical: 10,
  },
  commentDetailsContainer: { flexDirection: 'column' },
  commentContentContainer: { flexDirection: 'row' },
  commentContentText: { width: '80%' },
  commenterName: {
    fontWeight: 'bold',
  },
  commentDate: {
    alignSelf: 'flex-end',
    marginRight: 10,
    fontSize: 12,
    color: 'grey',
  },
  editText: {
    alignSelf: 'flex-end',
    fontSize: 12,
    color: 'blue',
  },
  profileImageContainer: {
    marginHorizontal: 15,
    marginVertical: 18,
    borderRadius: 100,
    overflow: 'hidden',
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    width: 40,
    borderWidth: 1,
    borderColor: 'black',
  },
  profileImage: {
    margin: 15,
    height: 50,
    width: 50,
    resizeMode: 'contain',
    borderRadius: 100,
  },
  postDetailsContainer: { flexDirection: 'column', width: '100%' },
  labelText: { fontSize: 12, paddingLeft: 10, paddingTop: 10 },
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

  text: { margin: 5 },
  textInput: { fontSize: 16, backgroundColor: '#f1f0f0', borderRadius: 15, padding: 10, width: '100%' },
  inputField: {
    marginBottom: 20,
    marginTop: 20,
  },
  bottom: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 10,
    marginTop: 20,
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    marginRight: 40,
    marginLeft: 40,
    backgroundColor: '#007aff',
    borderWidth: 0.5,
    borderColor: 'black',
  },
});

export default CommentActionsModal;
