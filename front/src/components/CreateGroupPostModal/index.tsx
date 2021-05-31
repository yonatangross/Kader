import React, { useEffect, useReducer, useState } from 'react';
import { StyleSheet, Modal, View } from 'react-native';
import { addPost } from '../../services/posts';
import { createPostReducer, initCreatePost } from '../../reducers/createPostReducer';
import { PostType } from '../../types/PostType';
import PostCreationProgressBar from '../PostCreationProgressBar';
import PostDetailsForm from '../PostDetailsForm';
import PostTypeSelector from '../PostTypeSelector';
import { useNavigation } from '@react-navigation/core';

export interface CreateGroupPostModalProps {
  visible: boolean;
  setVisible: Function;
  groupId: string;
}

const createPostInitState = {
  postType: PostType.Request,
  details: { title: '', description: '', address: '', image: undefined },
  groups: [],
};

const CreateGroupPostModal = (props: CreateGroupPostModalProps) => {
  const navigation = useNavigation();
  const [state, dispatch] = useReducer(createPostReducer, createPostInitState, initCreatePost);
  const [activeSection, setActiveSection] = useState<number>(0);
  const [submitFlag, setSubmitFlag] = useState<boolean>(false);
  const numberOfSections = 2;

  useEffect(() => {
    if (submitFlag) {
      submitPost(props.groupId);
      props.setVisible(false);
      setSubmitFlag(false);
    }
    if (props.visible) {
      //modal opened after was closed
      setActiveSection(0);
      dispatch({ type: 'Reset' });
    } else {
      // modal closed after was open.
      props.setVisible(false);
      setActiveSection(-1);
    }
  }, [props.visible, setSubmitFlag, setActiveSection, submitFlag]);

  const submitPost = async (groupId: string) => {
    console.log(`submitPost: props.groupId:${props.groupId}`);

    addPost({
      type: state.postType,
      title: state.details.title,
      description: state.details.description,
      groupId: groupId,
      address: state.details.address,
      image: state.details.image,
    })
      .then((response) => {
        props.setVisible(false);
        console.log(`posted successfully:`);
        navigation.navigate('SinglePost', {
          id: response.data.postId,
          post: response.data,
          title: response.data.title,
        });
      })
      .catch((error) => {
        console.log(`error while creating post:`);
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
        <PostDetailsForm
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

export default CreateGroupPostModal;
