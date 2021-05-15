import React, { useEffect, useReducer, useState } from 'react';
import { StyleSheet, Modal, View } from 'react-native';
import { addPost } from '../../services/posts';
import { createPostReducer, initCreatePost } from '../../reducers/createPostReducer';
import { PostType } from '../../types/PostType';
import PostCategorySelector from '../PostCategorySelector';
import PostCreationProgressBar from '../PostCreationProgressBar';
import PostDetailsForm from '../PostDetailsForm';
import PostTypeSelector from '../PostTypeSelector';
import { useAuth } from '../../contexts/Auth';

export interface CreateGroupPostModalProps {
  visible: boolean;
  setVisible: Function;
  groupId: string;
}

const createPostInitState = {
  postType: PostType.Request,
  category: '',
  details: { title: '', description: '', location: '', image: undefined },
  groups: [],
};

const CreateGroupPostModal = (props: CreateGroupPostModalProps) => {
  const auth = useAuth();
  const [state, dispatch] = useReducer(createPostReducer, createPostInitState, initCreatePost);
  const [activeSection, setActiveSection] = useState<number>(0);
  const numberOfSections = 3;

  const [submitFlag, setSubmitFlag] = useState<boolean>(false);
  const submitPost = () => {
    console.log('before adding post');
    // console.log(state.details);
    addPost({
      type: state.postType,
      category: state.category,
      creator: auth.authData?.userId,
      title: state.details.title,
      description: state.details.description,
      groupId: props.groupId,
      location: state.details.location,
      image: state.details.image,
    });
  };

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
      setSubmitFlag(false);
    }
  }, [props.visible, submitFlag]);

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
        <PostCategorySelector active={activeSection} dispatch={dispatch} setActiveSection={setActiveSection} numberOfSections={numberOfSections} />
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
