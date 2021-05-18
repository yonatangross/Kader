import { Text, Button, Divider, Icon, Input } from '@ui-kitten/components';
import React, { useEffect, useState } from 'react';
import { KeyboardAvoidingView, StyleSheet } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { CreatePostStateType } from '../../types/CreatePostTypes';
import UploadImage from '../UploadImage';

export interface PostDetailsFormProps {
  active: number;
  state: CreatePostStateType;
  dispatch: Function;
  setActiveSection: Function;
  setSubmitFlag: Function;
  finalStage: boolean;
  numberOfSections: number;
}
const StarIcon = (props: any) => <Icon {...props} name="star" />;

const formatAddress = (addressDetails: any) => {
  if (!!addressDetails) {
    let addDetails = addressDetails.address_components.slice(0, 3);
    let finalAddress = addDetails[1].long_name.concat(' ', addDetails[0].long_name.concat(', ', addDetails[2].long_name));
    return finalAddress;
  }
};

const PostDetailsForm = (props: PostDetailsFormProps) => {
  const [postImage, setPostImage] = useState<any>(null);

  useEffect(() => {
    props.dispatch({
      type: 'Details',
      payload: {
        title: props.state.details.title,
        description: props.state.details.description,
        location: props.state.details.location,
        image: postImage,
      },
    });
  }, [postImage, props.setActiveSection]);
  if (props.active === 2) {
    return (
      <>
        <Text style={styles.text} category="label">
          Title
        </Text>
        <Input
          value={props.state.details.title}
          placeholder="Post Title"
          onChangeText={(title) => {
            props.dispatch({
              type: 'Details',
              payload: {
                title: title,
                description: props.state.details.description,
                location: props.state.details.location,
                image: props.state.details.image,
              },
            });
          }}
        />
        <Text style={styles.text} category="label">
          Description
        </Text>
        <Input
          multiline={true}
          textStyle={{ minHeight: 64 }}
          placeholder="Post Description"
          value={props.state.details.description}
          onChangeText={(description) => {
            props.dispatch({
              type: 'Details',
              payload: {
                title: props.state.details.title,
                description: description,
                location: props.state.details.location,
                image: props.state.details.image,
              },
            });
          }}
        />
        <Text style={styles.text} category="label">
          Post primary location
        </Text>
        <Divider />
        <KeyboardAvoidingView behavior="padding" style={{ height: 300, flex: 1 }}>
          <GooglePlacesAutocomplete
            placeholder="Search"
            onPress={(data, details = null) => {
              // 'details' is provided when fetchDetails = true
              // console.log(data.description, details);
              props.dispatch({
                type: 'Details',
                payload: {
                  title: props.state.details.title,
                  description: props.state.details.description,
                  location: formatAddress(details),
                  images: props.state.details.image,
                },
              });
            }}
            query={{
              key: 'AIzaSyDtlSYdojyjmTTwvSYaIP3N50n-OzrWcUg',
              language: 'iw',
              components: 'country:il',
            }}
            currentLocation={true}
            currentLocationLabel="Current location"
            fetchDetails={true}
            styles={{
              textInput: {
                color: '#5d5d5d',
              },
              container: {
                zIndex: 1,
                overflow: 'visible',
                height: 50,
              },
            }}
          />
        </KeyboardAvoidingView>
        <Divider />

        <UploadImage postImage={postImage} setPostImage={setPostImage} />
        <Button
          style={styles.button}
          status="success"
          accessoryLeft={StarIcon}
          size="small"
          onPress={() => {
            if (props.finalStage) {
              props.setActiveSection(-1);
              props.setSubmitFlag(true);
            } else {
              props.setActiveSection(3);
            }
          }}
        >
          {(buttonProps: any) =>
            props.finalStage ? (
              <Text {...buttonProps} style={{ color: 'rgba(34, 83, 231,1)' }}>
                Submit details
              </Text>
            ) : (
              <Text {...buttonProps} style={{ color: 'rgba(34, 83, 231,1)' }}>
                Submit post
              </Text>
            )
          }
        </Button>
      </>
    );
  } else {
    return null;
  }
};

const styles = StyleSheet.create({
  button: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    margin: 10,
    marginRight: 40,
    marginLeft: 40,
    padding: 10,
  },
  text: { margin: 5 },
});

export default PostDetailsForm;
