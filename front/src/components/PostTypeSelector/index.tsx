import React, { useEffect } from 'react';
import { Text, StyleSheet, View, TouchableOpacity, Image } from 'react-native';
import { PostType } from '../../types/PostType';

export interface PostTypeSelectorProps {
  active: number;
  dispatch: Function;
  setActiveSection: Function;
  numberOfSections: number;
}

const PostTypeSelector = (props: PostTypeSelectorProps) => {
  useEffect(() => {}, [props.setActiveSection]);
  if (props.active === 0) {
    return (
      <View style={styles.postTypesContainer}>
        <View style={styles.linkContainer}>
          <TouchableOpacity
            onPress={() => {
              props.dispatch({ type: 'PostType', payload: PostType.Request });
              props.setActiveSection(1);
            }}
            style={styles.buttonContainer}
          >
            <Image source={require('../../assets/images/help.png')} style={styles.floatingButtonStyle} />

            <Text style={styles.buttonText}>Request Help</Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            borderBottomColor: '#f2f2f2',
            borderBottomWidth: 0.5,
            margin: 10,
          }}
        />
        <View style={styles.linkContainer}>
          <TouchableOpacity
            onPress={() => {
              props.dispatch({ type: 'PostType', payload: PostType.Offer });
              props.setActiveSection(1);
            }}
            style={styles.buttonContainer}
          >
            <Image source={require('../../assets/images/lifebuoy.png')} style={styles.floatingButtonStyle} />

            <Text style={styles.buttonText}>Offer Help</Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            borderBottomColor: '#f2f2f2',
            borderBottomWidth: 0.5,
            margin: 10,
          }}
        />
        <View style={styles.linkContainer}>
          <TouchableOpacity
            onPress={() => {
              props.dispatch({ type: 'PostType', payload: PostType.Handover });
              props.setActiveSection(1);
            }}
            style={styles.buttonContainer}
          >
            <Image source={require('../../assets/images/gift.png')} style={styles.floatingButtonStyle} />

            <Text style={styles.buttonText}>Hand an item</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  } else {
    return <></>;
  }
};

const styles = StyleSheet.create({
  floatingButtonStyle: {
    width: 80,
    height: 80,
    marginRight: 20,
  },

  postTypeIcon: {
    marginHorizontal: 30,
    borderRadius: 30,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  linkContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    alignSelf: 'center',
    width: '80%',
    borderRadius: 20,
    height: 200,
  },
  buttonContainer: { justifyContent: 'center', alignContent: 'center', alignItems: 'center', width: '100%' },
  postTypesContainer: { justifyContent: 'space-around', height: '90%' },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    margin: 30,
    marginRight: 40,
    marginLeft: 40,
    height: 150,
    padding: 10,
    borderWidth: 0.5,
    borderColor: 'black',
  },
  buttonText: {
    marginTop: 30,
    color: '#394d51',
    fontSize: 26,
    fontWeight: 'bold',
  },
});

export default PostTypeSelector;
