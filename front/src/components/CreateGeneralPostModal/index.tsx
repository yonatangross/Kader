import React, { useEffect, useReducer, useState } from 'react';
import { Modal } from 'react-native';
import { addPost } from '../../services/posts';
import { createPostReducer, initCreatePost } from '../../reducers/createPostReducer';
import { PostType } from '../../types/PostType';
import GroupsSelector from '../GroupsSelector';
import PostCreationProgressBar from '../PostCreationProgressBar';
import PostDetailsForm from '../PostDetailsForm';
import PostTypeSelector from '../PostTypeSelector';

export interface CreateGeneralPostModalProps {
  visible: boolean;
  setVisible: Function;
}

const createPostInitState = {
  postType: PostType.Request,
  details: { title: '', description: '', location: '', image: undefined },
  groups: [],
};

const CreateGeneralPostModal = (props: CreateGeneralPostModalProps) => {
  const [state, dispatch] = useReducer(createPostReducer, createPostInitState, initCreatePost);
  const [activeSection, setActiveSection] = useState<number>(0);
  const [submitFlag, setSubmitFlag] = useState<boolean>(false);
  const numberOfSections = 3;

  const submitPost = async () => {
    state.groups.forEach((groupId) => {
      addPost({
        type: state.postType,
        title: state.details.title,
        description: state.details.description,
        groupId: groupId,
        address: state.details.location,
        image: state.details.image,
      });
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
      props.setVisible(false);
    }
  }, [props.visible, setSubmitFlag, setActiveSection]);

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
          finalStage={false}
          setSubmitFlag={setSubmitFlag}
          numberOfSections={numberOfSections}
        />

        <GroupsSelector
          active={activeSection}
          state={state}
          dispatch={dispatch}
          setActiveSection={setActiveSection}
          setVisible={props.setVisible}
          setSubmitFlag={setSubmitFlag}
          numberOfSections={numberOfSections}
        />
      </Modal>
    </>
  );
};

export default CreateGeneralPostModal;
