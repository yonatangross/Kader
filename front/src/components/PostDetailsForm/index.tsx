import React, { useEffect, useState } from 'react';
import { Button, Keyboard, Platform, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { SafeAreaView } from 'react-native-safe-area-context';
import { KeyboardAvoidingView } from '../../layouts/auth/login/extra/3rd-party';
import { CreatePostStateType } from '../../types/CreatePostTypes';
import UploadImage from '../UploadImage';
import { Formik, Field } from 'formik';
import * as yup from 'yup';
import CustomInput from '../validation/CustomInput';

const blogValidationSchema = yup.object().shape({
  title: yup.string().required('Title is required'),
  description: yup
    .string()
    .min(20, ({ min, value }) => `${min - value.length} characters to go`)
    .required('Description is required'),
});

export interface PostDetailsFormProps {
  active: number;
  state: CreatePostStateType;
  dispatch: Function;
  setActiveSection: Function;
  setSubmitFlag: Function;
  finalStage: boolean;
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
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.outerContainer}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.innerContainer}>
            <Formik
              validationSchema={blogValidationSchema}
              initialValues={{
                title: '',
                description: '',
              }}
              onSubmit={(values) => console.log(values)}
            >
              {({ handleSubmit, isValid, values, setFieldValue, setFieldTouched, errors, touched }) => (
                <>
                  <Field
                    component={CustomInput}
                    name="title"
                    placeholder="Enter post title..."
                    multiline
                    numberOfLines={1}
                    value={props.state.details.title}
                    onChangeText={(title: string) => {
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
                  <Field
                    component={CustomInput}
                    name="description"
                    placeholder="Write post..."
                    multiline
                    numberOfLines={2}
                    value={props.state.details.description}
                    onChangeText={(description: string) => {
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

                  <Button onPress={handleSubmit} title="POST" disabled={!isValid || values.title === ''} />
                </>
              )}
            </Formik>

            <Text style={styles.labelText}>Post primary location</Text>
            <SafeAreaView style={{ backgroundColor: 'white', zIndex: 1 }}>
              <GooglePlacesAutocomplete
                placeholder="Search"
                onPress={(data, details = null) => {
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
                    flex: 1,
                    height: 200,
                    maxHeight: 200,
                    position: 'absolute',
                    backgroundColor: 'white',
                    borderRadius: 15,
                    paddingBottom: 10,
                    paddingHorizontal: 10,
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
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    );
  } else {
    return null;
  }
};

const styles = StyleSheet.create({
  outerContainer: { flex: 1 },
  innerContainer: { flexDirection: 'column', width: '100%', flex: 1 },
  labelText: { fontSize: 16, paddingLeft: 10, paddingTop: 5 },
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
  textInput: { fontSize: 16, backgroundColor: '#f1f0f0', borderRadius: 15, marginBottom: 20, marginHorizontal: 20, padding: 10 },
});

export default PostDetailsForm;
