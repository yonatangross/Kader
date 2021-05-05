import React, { useEffect, useReducer, useState } from 'react';
import { Text, StyleSheet, Modal, View } from 'react-native';
import { addPost } from '../../services/posts';
import { createPostReducer, initCreatePost } from '../../reducers/createPostReducer';
import { IPost } from '../../types/IPost';
import { PostType } from '../../types/PostType';
import CancelPostCreationButton from '../CancelPostCreationButton';
import GroupsSelector from '../GroupsSelector';
import PostCategorySelector from '../PostCategorySelector';
import PostCreationProgressBar from '../PostCreationProgressBar';
import PostDetailsForm from '../PostDetailsForm';
import PostTypeSelector from '../PostTypeSelector';

export interface CreateGeneralPostModalProps {
  visible: boolean;
  onChange: Function;
}

const createPostInitState = {
  postType: PostType.REQUEST,
  category: '',
  details: { title: '', description: '', location: '', images: [] },
  groups: [],
};

const CreateGeneralPostModal = (props: CreateGeneralPostModalProps) => {
  const [state, dispatch] = useReducer(createPostReducer, createPostInitState, initCreatePost);
  const [activeSection, setActiveSection] = useState<boolean[]>([false, false, false, false]);
  const [submitFlag, setSubmitFlag] = useState<boolean>(false);
  const submitPost = () => {
    state.groups.forEach((groupId) => {
      addPost({
        type: state.postType,
        category: state.category,
        creator: '0c3084e2-8799-48ff-8b55-e9a24cc7d026', //todo: userId
        title: state.details.title,
        description: state.details.description,
        groupId: groupId,
        comments: [],
        location: '',
        images: state.details.images,
      });
    });
  };

  useEffect(() => {
    if (props.visible) {
      //modal opened after was closed
      setActiveSection([true, false, false, false]);
      dispatch({ type: 'Reset' });
    } else {
      // modal closed after was open.
      setActiveSection([false, false, false, false]);
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
          props.onChange(false);
          console.log('Modal has now been closed.');
        }}
      >
        <PostCreationProgressBar activeSection={activeSection} />
        <PostTypeSelector active={activeSection[0]} dispatch={dispatch} setActiveSection={setActiveSection} />
        <PostCategorySelector active={activeSection[1]} dispatch={dispatch} setActiveSection={setActiveSection} />
        <PostDetailsForm
          active={activeSection[2]}
          state={state}
          dispatch={dispatch}
          setActiveSection={setActiveSection}
          finalStage={false}
          setSubmitFlag={setSubmitFlag}
        />

        <GroupsSelector
          active={activeSection[3]}
          state={state}
          dispatch={dispatch}
          setActiveSection={setActiveSection}
          setVisible={props.onChange}
          setSubmitFlag={setSubmitFlag}
        />
        <View style={styles.bottom}>
          <CancelPostCreationButton active={props.visible} activeSections={activeSection} setActiveSection={setActiveSection} setActive={props.onChange} />
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  bottom: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 36,
  },
});

export default CreateGeneralPostModal;
