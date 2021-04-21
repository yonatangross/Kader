import { Button, Icon } from '@ui-kitten/components';
import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { PostType } from '../../types/PostType';

export interface PostTypeSelectorProps {
  active: boolean;
  dispatch: Function;
  setActiveSection: Function;
}
const PlusIcon = () => <Icon name="plus-circle-outline" style={{ width: 32, height: 32 }} fill={'#000000'} />;

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
            props.setActiveSection([false, true, false, false]);
            props.active = false;
          }}
        >
          {(buttonProps: any) => (
            <Text {...buttonProps} style={{ color: '#000000' }}>
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
            props.setActiveSection([false, true, false, false]);
            props.active = false;
          }}
        >
          {(buttonProps: any) => (
            <Text {...buttonProps} style={{ color: '#000000' }}>
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
            props.setActiveSection([false, true, false, false]);
            props.active = false;
          }}
        >
          {(buttonProps: any) => (
            <Text {...buttonProps} style={{ color: '#000000' }}>
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
    backgroundColor:
  '#007aff',
    borderWidth: 0.5,
    borderColor:'black',
  },
});

export default PostTypeSelector;
