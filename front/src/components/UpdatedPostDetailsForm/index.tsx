import React, { useEffect, useRef, useState } from 'react';
import { Button, Keyboard, LogBox, Platform, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { CreatePostStateType } from '../../types/CreatePostTypes';
import UploadImage from '../UploadImage';
import { Formik, Field } from 'formik';
import * as yup from 'yup';
import CustomInput from '../validation/CustomInput';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { IPost } from '../../types/IPost';
const blogValidationSchema = yup.object().shape({
  title: yup.string().required('Title is required'),
  description: yup
    .string()
    .min(10, ({ min, value }) => `${min - value.length} characters to go`)
    .required('Description is required'),
  address: yup.string().required('please enter main address'),
  image: yup.object().required('please upload an image'),
});

interface FormValues {
  title: string;
  description: string;
  address: string;
  image: any;
}

export interface UpdatedPostDetailsFormProps {
  active: number;
  state: CreatePostStateType;
  dispatch: Function;
  setActiveSection: Function;
  setSubmitFlag: Function;
  finalStage: boolean;
}

const formatAddress = (addressDetails: any) => {
  var routeName: string = '';
  var streetNumber: number = 0;
  var locality: string = '';
  var finalAddress: string = '';

  if (!!addressDetails) {
    let addressComponents = addressDetails.address_components;

    addressComponents.forEach((addressComponent: any) => {
      if (addressComponent.types[0] === 'route') routeName = addressComponent.long_name;
      if (addressComponent.types[0] === 'street_number') streetNumber = addressComponent.long_name;
      if (addressComponent.types[0] === 'locality') locality = addressComponent.long_name;
    });

    if (streetNumber == 0) {
      finalAddress = routeName + ', ' + locality;
    } else finalAddress = routeName + ' ' + streetNumber + ', ' + locality;

    return finalAddress;
  }
  return '';
};

const UpdatedPostDetailsForm = (props: UpdatedPostDetailsFormProps) => {
  const [postImage, setPostImage] = useState<any>(null);
  const handleSubmit = (values: FormValues) => {
    props.dispatch({
      type: 'Details',
      payload: {
        title: values.title,
        description: values.description,
        address: values.address,
        image: postImage,
      },
    });
    if (props.finalStage) {
      props.setSubmitFlag(true);
      props.setActiveSection(-1);
    } else {
      props.setActiveSection(2);
    }
  };

  useEffect(() => {
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
    props.dispatch({
      type: 'Details',
      payload: {
        title: props.state.details.title,
        description: props.state.details.description,
        address: props.state.details.address,
        image: postImage,
      },
    });
  }, [postImage, props.setActiveSection, setPostImage]);
  if (props.active === 1) {
    return (
      // <View style={styles.viewContainer} behavior={Platform.OS === 'ios' ? 'padding' : 'position'}>
      <KeyboardAwareScrollView style={styles.viewContainer} keyboardShouldPersistTaps={'always'}>
        <Formik
          validationSchema={blogValidationSchema}
          initialValues={{
            title: props.state.details.title,
            description: props.state.details.description,
            address: props.state.details.address,
            image: props.state.details.image,
          }}
          onSubmit={(values) => handleSubmit(values)}
        >
          {({ handleSubmit, isValid, values, setFieldValue, setFieldTouched, setValues }) => (
            <>
              <Field
                component={CustomInput}
                name="title"
                placeholder="Enter post title..."
                multiline
                numberOfLines={1}
                value={values.title}
                onChangeText={(title: string) => {
                  setFieldValue('title', title);
                  props.dispatch({
                    type: 'Details',
                    payload: {
                      title: title,
                      description: props.state.details.description,
                      address: props.state.details.address,
                      image: props.state.details.image,
                    },
                  });
                }}
                onBlur={() => setFieldTouched('title')}
              />
              <Field
                component={CustomInput}
                name="description"
                placeholder="Write post..."
                multiline
                numberOfLines={2}
                value={values.description}
                onChangeText={(description: string) => {
                  setFieldValue('description', description);
                  props.dispatch({
                    type: 'Details',
                    payload: {
                      title: props.state.details.title,
                      description: description,
                      address: props.state.details.address,
                      image: props.state.details.image,
                    },
                  });
                }}
                onBlur={() => setFieldTouched('description')}
              />
              <UploadImage postImage={postImage} setPostImage={setPostImage} setFieldValue={setFieldValue} />
              <View style={{ width: '100%', minHeight: 200, maxHeight: 400 }}>
                <GooglePlacesAutocomplete
                  placeholder="Choose group primary address"
                  debounce={200}
                  autoFocus={true}
                  onPress={(data, details = null) => {
                    if (!!details) {
                      props.dispatch({
                        type: 'Details',
                        payload: {
                          title: props.state.details.title,
                          description: props.state.details.description,
                          address: formatAddress(details),
                          image: props.state.details.image,
                        },
                      });
                      setFieldValue('address', formatAddress(details));
                    }
                  }}
                  query={{
                    key: 'AIzaSyDkrbVxjoYBgsnGT2v3QfqYVFzZRsHuwyE',
                    language: 'iw',
                    components: 'country:il',
                  }}
                  fetchDetails={true}
                  listViewDisplayed={'auto'}
                  renderDescription={(row) => row.description} // custom description render
                  styles={{
                    container: {
                      flexDirection: 'column',
                    },
                    listView: {
                      height: 200,
                      backgroundColor: 'white',
                      borderRadius: 15,
                      marginHorizontal: 20,
                      elevation: 3,
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
              </View>
              <TouchableOpacity activeOpacity={0.7} disabled={!isValid || values.title === ''} onPress={handleSubmit} style={styles.finishButton}>
                {!props.finalStage ? <Text style={styles.finishButtonText}>Continue</Text> : <Text style={styles.finishButtonText}>Submit post</Text>}
              </TouchableOpacity>
            </>
          )}
        </Formik>
      </KeyboardAwareScrollView>
    );
  } else {
    return null;
  }
};

const styles = StyleSheet.create({
  viewContainer: {
    width: '100%',
    height: '100%',
  },
  autocompleteContainer: { width: '100%', height: 200, position: 'relative' },
  innerContainer: { flexDirection: 'column', width: '100%', flex: 1, height: '100%' },
  labelText: { fontSize: 16, paddingLeft: 10, paddingTop: 5 },
  finishButton: {
    backgroundColor: '#047cfb',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    borderWidth: 0.8,
    borderColor: '#394d51',
    marginRight: 40,
    marginLeft: 40,
    padding: 10,
  },
  finishButtonText: { fontSize: 20, fontWeight: 'bold' },

  text: { margin: 5 },
  textInput: { fontSize: 16, backgroundColor: '#f1f0f0', borderRadius: 15, marginBottom: 20, marginHorizontal: 20, padding: 10 },
});

export default UpdatedPostDetailsForm;
