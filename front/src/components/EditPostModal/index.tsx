import React, { useEffect, useReducer, useState } from 'react';
import { StyleSheet, Modal, View } from 'react-native';
import { addPost, updatePost } from '../../services/posts';
import { createPostReducer, initCreatePost } from '../../reducers/createPostReducer';
import { PostType } from '../../types/PostType';
import PostCreationProgressBar from '../PostCreationProgressBar';
import PostDetailsForm from '../PostDetailsForm';
import PostTypeSelector from '../PostTypeSelector';
import { useNavigation } from '@react-navigation/core';
import { IPost } from '../../types/IPost';
import UpdatedPostDetailsForm from '../UpdatedPostDetailsForm';

export interface EditPostModalProps {
  visible: boolean;
  setVisible: Function;
  post: IPost;
}

const EditPostModal = (props: EditPostModalProps) => {
  const navigation = useNavigation();

  const [activeSection, setActiveSection] = useState<number>(0);
  const [post, setPost] = useState<IPost>();
  const [state, dispatch] = useReducer(createPostReducer, {
    postType: PostType.Request,
    details: { title: '', description: '', address: '', image: undefined },
    groups: [],
  });
  const [submitFlag, setSubmitFlag] = useState<boolean>(false);
  const numberOfSections = 2;

  useEffect(() => {
    if (submitFlag) {
      submitUpdatedPost(props.post.groupId);
      props.setVisible(false);
      setSubmitFlag(false);
    }
    if (props.visible) {
      //modal opened after was closed
      setPost(post);
      setActiveSection(0);
      dispatch({
        type: 'PostType',
        payload: props.post.type,
      });
      dispatch({
        type: 'Details',
        payload: {
          title: props.post.title,
          description: props.post.description,
          address: props.post.address,
          image: props.post.imagesUri[0],
        },
      });
    } else {
      // modal closed after was open.
      props.setVisible(false);
      setActiveSection(-1);
    }
  }, [props.visible, setPost, setSubmitFlag, setActiveSection, submitFlag]);

  const submitUpdatedPost = async (groupId: string) => {
    console.log(`submitUpdatedPost: props.groupId:${props.post.groupId}`);

    updatePost({
      type: state.postType,
      title: state.details.title,
      description: state.details.description,
      groupId: groupId,
      address: state.details.address,
      image: state.details.image,
    })
      .then((response) => {
        props.setVisible(false);
        console.log(`updated post successfully:`);
        navigation.navigate('SinglePost', {
          id: response.data.postId,
          post: response.data,
          title: response.data.title,
        });
      })
      .catch((error) => {
        console.log(`error while updating post:`);
        console.log(error);
      });
  };

  return (
    <>
      <Modal
        animationType={'slide'}
        transparent={false}
        visible={props.visible}
        onRequestClose={() => {
          props.setVisible(false);
          console.log('Modal has now been closed.');
        }}
      >
        <PostCreationProgressBar activeSection={activeSection} numberOfSections={numberOfSections} />
        <PostTypeSelector active={activeSection} dispatch={dispatch} setActiveSection={setActiveSection} numberOfSections={numberOfSections} />
        <UpdatedPostDetailsForm
          active={activeSection}
          state={state}
          dispatch={dispatch}
          setActiveSection={setActiveSection}
          finalStage={true}
          setSubmitFlag={setSubmitFlag}
        />
      </Modal>
    </>
  );
};

export default EditPostModal;
