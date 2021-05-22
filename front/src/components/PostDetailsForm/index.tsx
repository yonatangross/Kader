import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { SafeAreaView } from 'react-native-safe-area-context';
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
  if (props.active === 1) {
    return (
      <View style={styles.postDetailsContainer}>
        <Text style={styles.labelText}>Title</Text>
        <TextInput
          placeholder={'Post Title'}
          style={styles.textInput}
          numberOfLines={1}
          value={props.state.details.title}
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

        <Text style={styles.labelText}>Description</Text>
        <TextInput
          placeholder={'Post Description'}
          style={styles.textInput}
          numberOfLines={2}
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

        <Text style={styles.labelText}>Post primary location</Text>
        <SafeAreaView style={{ height: '15%', backgroundColor: 'white', zIndex: 1 }}>
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
              //todo: move to backend
              key: 'AIzaSyDtlSYdojyjmTTwvSYaIP3N50n-OzrWcUg',
              language: 'iw',
              components: 'country:il',
            }}
            listViewDisplayed={'auto'}
            renderDescription={(row) => row.description}
            fetchDetails={true}
            styles={{
              container: {
                flex: 1,
                flexDirection: 'column',
              },
              listView: {
                position: 'absolute',
                top: 60,
                backgroundColor: 'white',
                borderRadius: 15,
                flex: 1,
                margin: 20,
                padding: 10,
                elevation: 3,
                zIndex: 1,
              },
              textInput: {
                fontSize: 16,
                backgroundColor: '#f1f0f0',
                borderRadius: 15,
                margin: 20,
                padding: 10,
              },
              description: {
                // color: '#ac879a',
                fontWeight: '300',
              },
              predefinedPlacesDescription: {
                color: '#1faadb',
              },
            }}
          />
        </SafeAreaView>
        <Text style={styles.labelText}>Post Image</Text>
        <UploadImage postImage={postImage} setPostImage={setPostImage} />
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => {
            if (props.finalStage) {
              props.setActiveSection(-1);
              props.setSubmitFlag(true);
            } else {
              props.setActiveSection(2);
            }
          }}
          style={styles.finishButton}
        >
          {!props.finalStage ? <Text style={styles.finishButtonText}>Continue</Text> : <Text style={styles.finishButtonText}>Submit post</Text>}
        </TouchableOpacity>
      </View>
    );
  } else {
    return null;
  }
};

const styles = StyleSheet.create({
  postDetailsContainer: { flexDirection: 'column', width: '100%' },
  labelText: { fontSize: 12, paddingLeft: 10, paddingTop: 10 },
  finishButton: {
    backgroundColor: '#047cfb',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    borderWidth: 0.8,
    borderColor: '#394d51',
    margin: 10,
    marginTop: 30,
    marginRight: 40,
    marginLeft: 40,
    padding: 10,
  },
  finishButtonText: { fontSize: 20, fontWeight: 'bold' },
  
  text: { margin: 5 },
  textInput: { fontSize: 16, backgroundColor: '#f1f0f0', borderRadius: 15, margin: 20, padding: 10 },
});

export default PostDetailsForm;
