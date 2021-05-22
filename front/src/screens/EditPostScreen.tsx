import { Text } from '@ui-kitten/components';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { ImageStyle, StyleSheet, Image, TouchableOpacity, SafeAreaView, TextInput } from 'react-native';
import { View } from '../components/Themed';
import { IPost } from '../types/IPost';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Rating } from 'react-native-elements';
import { FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
import moment from '../services/moment';
import { updatePost } from '../services/posts';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import UploadImage from '../components/UploadImage';

export interface EditPostScreenProps {}

const EditPostScreen = (props: EditPostScreenProps) => {
  const route = useRoute();
  const navigation = useNavigation();
  const [loading, setLoading] = useState<boolean>(true);
  const [post, setPost] = useState<IPost>();
  const [postImage, setPostImage] = useState<any>(null);

  useEffect(() => {
    let isMounted = true;
    if (!!route.params) {
      if (isMounted) {
        const params: any = route.params;
        setPost(params.post);
        setPostImage(post?.image);
        setLoading(false);
      }
    }

    () => {
      isMounted = false;
    };
  }, [setPost, setPostImage]);

  const formatAddress = (addressDetails: any) => {
    if (!!addressDetails) {
      let addDetails = addressDetails.address_components.slice(0, 3);
      let finalAddress = addDetails[1].long_name.concat(' ', addDetails[0].long_name.concat(', ', addDetails[2].long_name));
      return finalAddress;
    }
  };

  const editPostHandler = (updatedPost: IPost) => {
    updatePost(updatedPost)
      .then((response) => {
        console.log(`edited post ${updatedPost.postId} successfully, response:`);
        console.log(response);
        navigation.goBack();
      })
      .catch((error) => {
        console.log(`error editing post ${updatedPost.postId}:`);
        console.log(error);
      });
  };

  if (!!post) {
    return (
      <View style={styles.container}>
        <Text style={styles.EditPostText}>Edit Post</Text>
        <View style={styles.postDetailsContainer}>
          <Text style={styles.labelText}>Title</Text>
          <TextInput
            placeholder={'Post Title'}
            style={styles.textInput}
            numberOfLines={1}
            value={post.title}
            onChangeText={(title) => {
              post.title = title;
            }}
          />

          <Text style={styles.labelText}>Description</Text>
          <TextInput
            placeholder={'Post Description'}
            style={styles.textInput}
            numberOfLines={2}
            value={post.description}
            onChangeText={(description) => {
              post.description = description;
            }}
          />

          <Text style={styles.labelText}>Post primary location</Text>
          <SafeAreaView style={{ height: '15%', backgroundColor: 'white', zIndex: 1 }}>
            <GooglePlacesAutocomplete
              placeholder={post.address}
              onPress={(data, details = null) => {
                // 'details' is provided when fetchDetails = true
                // console.log(data.description, details);
                post.location = formatAddress(details);
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
        </View>
        <View style={styles.container}>
          <TouchableOpacity activeOpacity={0.7} onPress={() => editPostHandler(post)} style={styles.settingButton}>
            <Text style={styles.buttonText}>Submit edited post</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  } else return <View>{loading ? <Text>loading...</Text> : <Text>Fetched!!</Text>}</View>;
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
  settingButton: {
    margin: 10,
    marginVertical: 15,
    backgroundColor: '#f2a853',
    borderRadius: 30,
    alignItems: 'center',
    width: 120,
    height: 40,
    justifyContent: 'center',
    alignSelf: 'center',
    shadowColor: 'rgba(0, 0, 0, 0.1)',
    shadowOpacity: 0.8,
    elevation: 6,
    shadowRadius: 15,
    shadowOffset: { width: 1, height: 13 },
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  postCreationText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  postCreationButton: {
    backgroundColor: 'white',
    position: 'absolute',
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    right: 15,
    bottom: 30,
    shadowColor: 'rgba(0, 0, 0, 0.1)',
    shadowOpacity: 0.8,
    elevation: 6,
    shadowRadius: 15,
    shadowOffset: { width: 1, height: 13 },
    borderColor: 'black',
    borderWidth: 0.8,
  },
  floatingButtonStyle: {
    resizeMode: 'contain',
    width: 32,
    height: 32,
    //backgroundColor:'black'
  },
  buttonsContainer: { flexDirection: 'row', justifyContent: 'center' },
  descriptionContainer: {
    flexDirection: 'column',
    backgroundColor: '#fefefe',
    paddingTop: 0,
    marginHorizontal: 10,
    marginVertical: 10,
    width: '95%',
    paddingHorizontal: 15,
  },
  ratingBar: { justifyContent: 'center', alignContent: 'center' },
  descriptionHeader: { alignSelf: 'flex-start', justifyContent: 'center', fontWeight: 'bold', fontSize: 20 },
  description: { fontFamily: 'Rubik', alignSelf: 'flex-start', marginVertical: 20, padding: 0, fontSize: 14, color: 'grey' },
  ratingText: { color: '#f3a953', fontSize: 18, fontWeight: 'bold', alignSelf: 'center', justifyContent: 'center' },
  postDateContainer: { flexDirection: 'column', alignItems: 'center' },
  locationContainer: { flexDirection: 'column', alignItems: 'center' },
  viewContainer: {
    flex: 1,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  postContainer: {
    flexDirection: 'column',
    backgroundColor: 'white',
    width: '100%',
  },
  container: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  middleDataContainer: { flexDirection: 'column', justifyContent: 'center', alignSelf: 'flex-start', marginTop: 20 },
  extraDataContainer: { flexDirection: 'row', justifyContent: 'center', alignContent: 'center' },
  headerContainer: {
    flexDirection: 'row',
    backgroundColor: '#fefefe',
    width: '100%',
  },
  postDataContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 20,
    paddingBottom: 20,
    width: '100%',
    backgroundColor: '#fefefe',
  },
  userImageAndRatingContainer: { flexDirection: 'column', backgroundColor: '#fefefe' },
  avatar: {
    margin: 8,
    borderRadius: 15,
    width: 50,
    height: 50,
    alignSelf: 'center',
  },
  creatorContainer: { flexDirection: 'column', width: '95%' },
  upperCreatorContainer: {
    flexDirection: 'row',
  },
  lowerDataContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: '100%',
    margin: 10,
  },
  postDate: { paddingHorizontal: 0 },
  locationText: { paddingHorizontal: 0, marginTop: -2 },
  postImageContainer: {
    margin: 15,
    shadowOffset: { width: 15, height: 15 },
    shadowColor: 'black',
    shadowOpacity: 0.8,
    elevation: 10,
    borderRadius: 15,
    overflow: 'hidden',
    backgroundColor: '#0000',
  },
  postImage: {
    width: 200,
    height: 200,
    borderRadius: 15,
    resizeMode: 'contain',
  },
  creatorTitle: { fontWeight: 'bold', alignSelf: 'flex-start', marginTop: 10, marginRight: 5, fontSize: 16 },
  postTypeTitle: { fontWeight: '100', alignSelf: 'flex-start', marginTop: 10, fontSize: 16 },
  categoryContainer: { flexDirection: 'row' },
  categoryText: { fontWeight: 'bold', fontSize: 16 },
  commentsNumber: { alignSelf: 'flex-start', justifyContent: 'center', marginLeft: 5, fontWeight: 'bold', fontSize: 20 },
  profileAvatar: {
    width: 15,
    height: 15,
    marginHorizontal: 2,
    paddingRight: 2,
  },
  ImageContainer: {
    margin: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
    backgroundColor: '#fefefe',
  },
  imageDesign: {
    width: 100,
    height: 100,
    borderRadius: 15,
  },
  commentsHeader: { alignSelf: 'center', justifyContent: 'center', fontSize: 24, margin: 10 },
  titleText: { fontWeight: '700', fontSize: 24 },

  postTabsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  postData: {
    backgroundColor: '#fefefe',
    padding: 15,
    alignItems: 'center',
    borderRadius: 30,
    width: '95%',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {},
  commentsContainer: { width: '100%', backgroundColor: 'transparent', flexDirection: 'column' },
  commentsList: {
    paddingTop: 0,
    marginVertical: 10,
    width: '100%',
    paddingHorizontal: 15,
  },
  inputBoxContainer: {
    alignItems: 'center',
    paddingHorizontal: 15,
    backgroundColor: 'transparent',
  },
  EditPostText: { fontSize: 32, fontWeight: 'bold', backgroundColor: 'white', textAlign: 'center', width: '100%', padding: 10 },
});

export default EditPostScreen;
