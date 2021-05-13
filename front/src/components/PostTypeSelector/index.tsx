import { Button, Icon } from '@ui-kitten/components';
import React, { useEffect } from 'react';
import { Text, StyleSheet } from 'react-native';
import { PostType } from '../../types/PostType';

export interface PostTypeSelectorProps {
  active: number;
  dispatch: Function;
  setActiveSection: Function;
  numberOfSections: number;
}
const PlusIcon = () => <Icon name="plus-circle-outline" style={{ width: 32, height: 32 }} fill={'#000000'} />;

const PostTypeSelector = (props: PostTypeSelectorProps) => {
  useEffect(() => {}, [props.active]);
  if (props.active === 0) {
    return (
      <>
        <Button
          style={styles.button}
          status="success"
          accessoryRight={PlusIcon}
          size="small"
          onPress={() => {
            props.dispatch({ type: 'PostType', payload: PostType.Request });
            props.setActiveSection(1);
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
            props.dispatch({ type: 'PostType', payload: PostType.Offer });
            props.setActiveSection(1);
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
            props.dispatch({ type: 'PostType', payload: PostType.Handover });
            props.setActiveSection(1);
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
    backgroundColor: '#007aff',
    borderWidth: 0.5,
    borderColor: 'black',
  },
});

export default PostTypeSelector;
