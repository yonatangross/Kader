import React, { useEffect, useReducer, useState } from 'react';
import { StyleSheet, Modal, View } from 'react-native';
import { addPost } from '../../services/posts';
import { createPostReducer, initCreatePost } from '../../reducers/createPostReducer';
import { PostType } from '../../types/PostType';
import PostCreationProgressBar from '../PostCreationProgressBar';
import PostDetailsForm from '../PostDetailsForm';
import PostTypeSelector from '../PostTypeSelector';

export interface CreateGroupPostModalProps {
  visible: boolean;
  setVisible: Function;
  groupId: string;
}

const createPostInitState = {
  postType: PostType.Request,
  details: { title: '', description: '', location: '', image: undefined },
  groups: [],
};

const CreateGroupPostModal = (props: CreateGroupPostModalProps) => {
  const [state, dispatch] = useReducer(createPostReducer, createPostInitState, initCreatePost);
  const [activeSection, setActiveSection] = useState<number>(0);
  const [submitFlag, setSubmitFlag] = useState<boolean>(false);
  const numberOfSections = 2;

  useEffect(() => {
    if (props.visible) {
      //modal opened after was closed
      setActiveSection(0);
      dispatch({ type: 'Reset' });
    } else {
      // modal closed after was open.
      setActiveSection(-1);
    }
    if (submitFlag) {
      submitPost();

      props.setVisible(false);
      setSubmitFlag(false);
    }
  }, [props.setVisible, setSubmitFlag, setActiveSection]);

  const submitPost = async () => {
    addPost({
      type: state.postType,
      title: state.details.title,
      description: state.details.description,
      groupId: props.groupId,
      address: state.details.location,
      image: state.details.image,
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
          numberOfSections={numberOfSections}
        />
      </Modal>
    </>
  );
};

export default CreateGroupPostModal;
