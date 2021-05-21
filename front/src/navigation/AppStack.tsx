import * as React from 'react';
import { View, Text, StyleSheet, Image, ImageStyle } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import MainTabNavigator from './MainTabNavigator';
import Colors from '../constants/Colors';
import NotFoundScreen from '../screens/NotFoundScreen';
import SinglePostScreen from '../screens/SinglePostScreen';
import SingleGroupScreen from '../screens/SingleGroupScreen';
import SingleGroupDetailsScreen from '../screens/SingleGroupDetailsScreen';
import { RootStackParamList } from '../types/Tabs';
import UserProfileScreen from '../screens/UserProfileScreen';
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { getPostTypeName } from '../types/PostType';
import UserPostsScreen from '../screens/UserPostsScreen';
import UserGroupsScreen from '../screens/UserGroupsScreen';
import UserSettingsScreen from '../screens/UserSettingsScreen';
import ClosePostScreen from '../screens/ClosePostScreen';
import EditPostScreen from '../screens/EditPostScreen';

const Stack = createStackNavigator<RootStackParamList>();

export const AppStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: 'white',
          elevation: 0,
        },
        headerTintColor: Colors.light.tint,
        headerTitleAlign: 'left',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        headerStatusBarHeight: 30,
      }}
    >
      <Stack.Screen
        name="Root"
        component={MainTabNavigator}
        options={{
          title: 'Kader',
          headerTintColor: Colors.light.tint,

          cardStyle: { backgroundColor: '#dedcdf' },
        }}
      />

      <Stack.Screen
        name="SinglePost"
        component={SinglePostScreen}
        options={({ route, navigation }) => ({
          headerTintColor: Colors.light.tint,
          paddingLeft: 100,
          title: '',
          header: () => {
            // @ts-ignore
            const { post } = route.params;

            if (!!post)
              return (
                <View style={styles.headerContainer}>
                  <View style={styles.headerLeftContainer}>
                    <TouchableOpacity
                      onPress={() => {
                        navigation.goBack();
                      }}
                      style={styles.backButtonContainer}
                    >
                      <Ionicons name="arrow-back" color={'#4975aa'} size={24} />
                    </TouchableOpacity>
                  </View>
                  <View style={styles.headerRightContainer}>
                    <View style={styles.ImageContainer}>
                      {!!post.creator.imageUri ? (
                        <Image source={{ uri: post.creator.imageUri }} style={styles.imageDesign as ImageStyle} />
                      ) : (
                        <Image source={require('../assets/images/imagePlaceholder.png')} style={styles.imageDesign as ImageStyle} />
                      )}
                    </View>
                    <View style={styles.creatorContainer}>
                      <View style={styles.upperCreatorContainer}>
                        <Text style={styles.creatorTitle}>{post.creator.firstName + ' ' + post.creator.lastName}</Text>
                      </View>
                      <View style={styles.lowerCreatorContainer}>
                        <Text style={styles.postTypeTitle}>{getPostTypeName(post.type)}</Text>
                      </View>
                    </View>
                  </View>
                  <View style={styles.categoryContainer}>{!!post.category ? <Text style={styles.categoryText}>{post.category.name}</Text> : <></>}</View>
                </View>
              );
          },
          cardStyle: { backgroundColor: '#dedcdf' },
        })}
      />
      <Stack.Screen
        name="SingleGroup"
        component={SingleGroupScreen}
        options={({ route }) => ({
          title: route.params.name,
          headerTintColor: Colors.light.tint,
          cardStyle: { backgroundColor: '#dedcdf' },
        })}
      />
      <Stack.Screen
        name="SingleGroupDetails"
        component={SingleGroupDetailsScreen}
        options={({ route }) => ({
          title: route.params.name,
          headerTintColor: Colors.light.tint,
          cardStyle: { backgroundColor: '#dedcdf' },
        })}
      />
      <Stack.Screen
        name="UserProfile"
        component={UserProfileScreen}
        options={({ route }) => ({
          title: route.params.name,
          headerTintColor: Colors.light.tint,
          cardStyle: { backgroundColor: '#dedcdf' },
        })}
      />
      <Stack.Screen
        name="UserPosts"
        component={UserPostsScreen}
        options={({ route }) => ({
          title: route.params.user.firstName + ' ' + route.params.user.lastName + ' posts',
          headerTintColor: Colors.light.tint,
          cardStyle: { backgroundColor: '#dedcdf' },
        })}
      />
      <Stack.Screen
        name="UserGroups"
        component={UserGroupsScreen}
        options={({ route }) => ({
          title: route.params.user.firstName + ' ' + route.params.user.lastName + ' groups',
          headerTintColor: Colors.light.tint,
          cardStyle: { backgroundColor: '#dedcdf' },
        })}
      />
      <Stack.Screen
        name="UserSettings"
        component={UserSettingsScreen}
        options={({ route }) => ({
          title: route.params.user.firstName + ' ' + route.params.user.lastName + ' settings',
          headerTintColor: Colors.light.tint,
          cardStyle: { backgroundColor: '#dedcdf' },
        })}
      />
      <Stack.Screen
        name="EditPost"
        component={EditPostScreen}
        options={({ route }) => ({
          title: 'Edit Post',
          headerTintColor: Colors.light.tint,
          cardStyle: { backgroundColor: '#dedcdf' },
        })}
      />
      <Stack.Screen
        name="ClosePost"
        component={ClosePostScreen}
        options={({ route }) => ({
          title: 'Close Post',
          headerTintColor: Colors.light.tint,
          cardStyle: { backgroundColor: '#dedcdf' },
        })}
      />
      <Stack.Screen
        name="NotFound"
        component={NotFoundScreen}
        options={{
          title: 'Oops!',
          headerTintColor: Colors.light.tint,
          cardStyle: { backgroundColor: '#dedcdf' },
        }}
      />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  headerContainer: { flexDirection: 'row', paddingTop: 40, backgroundColor: 'white', justifyContent: 'space-between' },
  locationText: { paddingHorizontal: 0, marginTop: -2 },
  creatorContainer: { flexDirection: 'column', marginTop: 10, marginLeft: 10 },
  categoryContainer: {
    margin: 10,
    marginVertical: 15,
    backgroundColor: '#f2a853',
    borderRadius: 30,
    alignItems: 'center',
    width: 120,
    height: 40,
    justifyContent: 'center',
    shadowColor: 'rgba(0, 0, 0, 0.1)',
    shadowOpacity: 0.8,
    elevation: 6,
    shadowRadius: 15,
    shadowOffset: { width: 1, height: 13 },
  },
  creatorTitle: { fontWeight: 'bold', marginRight: 5, fontSize: 16 },
  postTypeTitle: { fontWeight: '100', fontSize: 16, color: '#848484' },
  categoryText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  lowerCreatorContainer: {
    flexDirection: 'row',
    paddingTop: 5,
  },
  postDate: { paddingHorizontal: 0, color: 'black' },
  backButtonContainer: {
    margin: 20,
  },
  headerRightContainer: {
    flexDirection: 'row',
  },
  headerLeftContainer: {
    flexDirection: 'column',
  },
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
});
