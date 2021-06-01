import { Text } from '@ui-kitten/components';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Image, ImageStyle, KeyboardAvoidingView, Platform, StyleSheet, TouchableOpacity } from 'react-native';
import { View } from '../components/Themed';
import { IPost } from '../types/IPost';
import { getPost, updatePost } from '../services/posts';
import { useNavigation, useRoute } from '@react-navigation/native';
import SinglePostItem from '../components/SinglePostItem';
import { Rating } from 'react-native-elements';
import { addRating } from '../services/users';
import { FlatList } from 'react-native-gesture-handler';
import CommenterListItem from '../components/CommenterListItem';
import { IComment } from '../types/IComment';
import LoadingIndicator from '../components/LoadingIndicator';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import * as _ from 'lodash';
import { imageBaseUrl } from '../services/axios';
import { capitalize } from '../utils/text';

export interface ClosePostScreenProps {}

const ClosePostScreen = (props: ClosePostScreenProps) => {
  const route = useRoute();
  const navigation = useNavigation();
  const [loading, setLoading] = useState<boolean>(true);
  const [post, setPost] = useState<IPost>();
  const [selectedCommenter, setSelectedCommenter] = useState<IComment>();
  const [showRating, setShowRating] = useState<boolean>(false);
  const [uniqueComments, setUniqueComments] = useState<IComment[]>([]);

  useEffect(() => {
    let isMounted = true;
    if (!!route.params) {
      if (isMounted) {
        const params: any = route.params;
        getPost(params.postId)
          .then((response) => {
            const postResponse: IPost = response.data;
            setPost(postResponse);
            const uniqueMembersResponse: IComment[] = _.uniqBy(postResponse.comments, 'creator.userId');
            setUniqueComments(uniqueMembersResponse);
            setLoading(false);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    }
    () => {
      isMounted = false;
    };
  }, [showRating, selectedCommenter, setUniqueComments]);

  const onFinishRating = (rating: number) => {
    if (!!selectedCommenter)
      addRating(selectedCommenter?.creator.userId, rating)
        .then(() => {
          console.log(`rated ${selectedCommenter.creator.userId} successfully.`);
          if (!!post) {
            let ratedPost: IPost = post;
            ratedPost.isActive = false;
            closePostHandler(ratedPost);
          }
        })
        .catch((error) => {
          console.log(`error rating:`);
          console.log(error);
        });
  };

  const closePostHandler = (updatedPost: IPost) => {
    updatePost(updatedPost)
      .then(() => {
        console.log(`closed post ${updatedPost.postId} successfully.`);
        navigation.navigate('SinglePost', { id: updatedPost.postId });
      })
      .catch((error) => {
        console.log(`error closing post ${updatedPost.postId}:`);
        console.log(error);
      });
  };

  const renderCommenterListItem = ({ item: item }: { item: IComment }) => {
    return <CommenterListItem comment={item} setShowRating={setShowRating} setSelectedUser={setSelectedCommenter} />;
  };

  if (!!post) {
    return (
      <View style={styles.container}>
        <Text style={styles.closePostText}>Close Post</Text>
        <SinglePostItem post={post} />
        {showRating === false && (
          <>
            <KeyboardAwareScrollView style={styles.viewContainer}>
              <FlatList
                style={styles.commentsList}
                data={uniqueComments}
                renderItem={renderCommenterListItem}
                keyExtractor={(item) => item.commentId}
                showsVerticalScrollIndicator={true}
              />
            </KeyboardAwareScrollView>
            <View style={styles.buttonContainer}>
              <TouchableOpacity activeOpacity={0.7} onPress={() => closePostHandler(post)} style={styles.closeWithoutRatingButton}>
                <Text style={styles.buttonText}>Close without rating</Text>
              </TouchableOpacity>
            </View>
          </>
        )}

        {showRating === true && (
          <>
            <View style={styles.selectContainer}>
              <View style={styles.ImageContainer}>
                {!!selectedCommenter?.creator && !!selectedCommenter.creator.imageUri ? (
                  <Image source={{ uri: imageBaseUrl + selectedCommenter.creator.imageUri }} style={styles.imageDesign as ImageStyle} />
                ) : (
                  <Image source={require('../assets/images/imagePlaceholder.png')} style={styles.imageDesign as ImageStyle} />
                )}
              </View>
              {!!selectedCommenter?.creator && (
                <View style={styles.selectedCreatorContainer}>
                  <Text style={styles.creatorTitle}>
                    {capitalize(selectedCommenter.creator.firstName) + ' ' + capitalize(selectedCommenter.creator.lastName)}
                  </Text>
                </View>
              )}
              <View style={styles.buttonContainer}>
                <Rating ratingColor="#f3a953" imageSize={22} startingValue={3} ratingCount={5} onFinishRating={onFinishRating} />
              </View>
            </View>
          </>
        )}
      </View>
    );
  } else return loading && <LoadingIndicator />;
};

const styles = StyleSheet.create({
  selectContainer: { flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center', width: '100%', backgroundColor: 'white', flex: 1 },

  selectedCreatorContainer: { flexDirection: 'column', backgroundColor: 'white' },
  creatorContainer: { flexDirection: 'column', marginLeft: 10, marginRight: 75, width: 100 },
  creatorTitle: { fontWeight: 'bold', marginRight: 5, fontSize: 16 },

  ImageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
    backgroundColor: '#fefefe',
  },
  upperCreatorContainer: {
    flexDirection: 'row',
  },
  imageDesign: {
    width: 40,
    height: 40,
    borderRadius: 15,
  },
  buttonContainer: { backgroundColor: 'white', alignSelf: 'center', alignItems: 'center', justifyContent: 'center' },
  closeWithoutRatingButton: {
    marginVertical: 15,
    backgroundColor: 'red',
    borderRadius: 30,
    alignItems: 'center',
    width: 180,
    height: 40,
    justifyContent: 'center',
    alignSelf: 'center',
    shadowColor: 'rgba(0, 0, 0, 0.1)',
    shadowOpacity: 0.8,
    elevation: 6,
    shadowRadius: 15,
    shadowOffset: { width: 1, height: 13 },
  },
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
  container: { flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: '100%', backgroundColor: 'white', flex: 1 },
  closePostText: { fontSize: 32, fontWeight: 'bold', backgroundColor: 'white', textAlign: 'center', width: '100%' },
  commentsContainer: { width: '100%', backgroundColor: 'transparent', flexDirection: 'column' },
  commentsList: {
    paddingTop: 0,
    marginBottom: -10,
    width: '100%',
    backgroundColor: 'white',
  },
  viewContainer: {
    backgroundColor: 'white',
    width: '100%',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  commentsNumber: { alignSelf: 'flex-start', justifyContent: 'center', marginLeft: 5, fontWeight: 'bold', fontSize: 20 },
});

export default ClosePostScreen;
