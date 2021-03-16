import React, { useEffect, useReducer, useState } from 'react';
import { Text, StyleSheet, Modal } from 'react-native';
import * as Progress from 'react-native-progress';
import { createPostReducer, initCreatePost } from '../../reducers/createPostReducer';
import { PostType } from '../../types/PostType';
import PostCategorySelector from '../PostCategorySelector';
import PostTypeSelector from '../PostTypeSelector';

export interface CreatePostModalProps {
  visible: boolean;
  onChange: Function;
}

const createPostInitState = {
  postType: PostType.REQUEST,
  category: '',
  details: { title: '', description: '', location: '', images: [] },
  groups: [],
};

const CreatePostModal = (props: CreatePostModalProps) => {
  const [state, dispatch] = useReducer(createPostReducer, createPostInitState, initCreatePost);

  const [activeSection, setActiveSection] = useState<boolean[]>([false, false, false, false]);

  useEffect(() => {
    if (props.visible) {
      //modal opened after was closed
      setActiveSection([true, false, false, false]);
      //console.log(`visible:`);
      dispatch({ type: 'Reset' });
     //console.log(state);
    } else {
      // modal closed after was open.
      //console.log(`not visible:`);
      setActiveSection([false, false, false, false]);
      //console.log(state);
    }
  }, [props.visible]);

  return (
    <>
    <Modal
      animationType={'slide'}
      transparent={false}
      visible={props.visible}
      onRequestClose={() => {
       // console.log('Modal has now been closed.');
      }}
    >
      <Text style={styles.progressStatus}>Create new post</Text>
      {/* <PostCreationProgressBar  /> */}
      <Progress.Bar progress={0.3} width={250} style={styles.progressBar} />
      <PostTypeSelector active={activeSection[0]} dispatch={dispatch} />
      

      <Text
        style={styles.closeText}
        onPress={() => {
          props.onChange(!props.visible);
        }}
      >
        Cancel post creation
      </Text>
    </Modal>
    
    <PostCategorySelector active={activeSection[1]} dispatch={dispatch}/>
    {/* <PostDetailsForm active={activeSection[2]} dispatch={dispatch}/>
    <GroupsSelector active={activeSection[3]} dispatch={dispatch}/> */}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    margin: 10,
    backgroundColor: 'transparent',
  },
  roundButton: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 100,
    margin: 10,
    marginRight: 40,
    marginLeft: 40,
  },

  modalButton: {
    display: 'flex',
    height: 60,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    backgroundColor: '#2AC062',
    shadowColor: '#2AC062',
    shadowOpacity: 0.5,
    shadowOffset: {
      height: 10,
      width: 0,
    },
    shadowRadius: 25,
  },
  closeButton: {
    display: 'flex',
    height: 60,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FF3974',
    shadowColor: '#2AC062',
    shadowOpacity: 0.5,
    shadowOffset: {
      height: 10,
      width: 0,
    },
    shadowRadius: 25,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 22,
  },
  image: {
    marginTop: 50,
    marginBottom: 10,
    width: '100%',
    height: 300,
  },
  text: {
    fontSize: 24,
    marginBottom: 30,
    padding: 40,
  },
  closeText: {
    fontSize: 24,
    color: '#00479e',
    textAlign: 'center',
  },
  progressBar: { display: 'flex', justifyContent: 'center', alignSelf: 'center', marginTop: 20 },
  progressStatus: {
    marginTop: 20,
    display: 'flex',
    justifyContent: 'center',
    alignSelf: 'center',
  },
});

export default CreatePostModal;
