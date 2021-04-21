import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { Button, Icon } from '@ui-kitten/components';

export interface CancelPostCreationButtonProps {
  active: boolean;
  activeSections: boolean[];
  setActiveSection: Function;
  setActive: Function;
}

const CancelPostCreationButton = (props: CancelPostCreationButtonProps) => {
  if (props.active && props.activeSections[0] === true) {
    return (
      <>
        <Button
          style={styles.button}
          status="success"
          size="small"
          onPress={() => {
            props.setActiveSection([false, false, false, false]);
            props.setActive(false);
          }}
        >
          {(buttonProps: any) => (
            <Text {...buttonProps} style={{ color: '#000000' }}>
              Cancel post creation
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
    borderColor:'black'
  },
});

export default CancelPostCreationButton;
