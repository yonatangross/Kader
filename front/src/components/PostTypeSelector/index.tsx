import { Button, Icon } from '@ui-kitten/components';
import React, { useEffect, useReducer, useState } from 'react';
import { Text, StyleSheet, Modal, Alert, Image } from 'react-native';
import * as Progress from 'react-native-progress';
import createPostReducer from '../../reducers/createPostReducer';
import { IPost } from '../../types/IPost';
import { PostType } from '../../types/PostType';

export interface PostTypeSelectorProps {
  active: boolean;
  dispatch: Function;
}
const PlusIcon = () => <Icon name="plus-circle-outline" style={{ width: 32, height: 32 }} fill={'rgba(34, 83, 231)'} />;

const PostTypeSelector = (props: PostTypeSelectorProps) => {
  if (props.active) {
    return (
      <>
        <Button
          style={styles.button}
          status="success"
          accessoryRight={PlusIcon}
          size="small"
          onPress={() => {
            props.dispatch({ type: 'PostType', payload: PostType.REQUEST });
          }}
        >
          {(buttonProps: any) => (
            <Text {...buttonProps} style={{ color: 'rgba(34, 83, 231,1)' }}>
              Request Help
            </Text>
          )}
        </Button>

        <Button
          style={styles.button}
          status="success"
          accessoryRight={PlusIcon}
          size="small"
          onPress={() => {
            props.dispatch({ type: 'PostType', payload: PostType.OFFER });
          }}
        >
          {(buttonProps: any) => (
            <Text {...buttonProps} style={{ color: 'rgba(34, 83, 231,1)' }}>
              Offer Help
            </Text>
          )}
        </Button>
        <Button
          style={styles.button}
          status="success"
          accessoryRight={PlusIcon}
          size="small"
          onPress={() => {
            props.dispatch({ type: 'PostType', payload: PostType.HANDOVER });
          }}
        >
          {(buttonProps: any) => (
            <Text {...buttonProps} style={{ color: 'rgba(34, 83, 231,1)' }}>
              Handover an item
            </Text>
          )}
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

export default PostTypeSelector;
