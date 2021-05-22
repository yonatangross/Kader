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
import SinglePostHeaderItem from '../components/SinglePostHeaderItem';

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

            if (!!post) return <SinglePostHeaderItem post={post} />;
          },
          cardStyle: { backgroundColor: '#dedcdf' },
        })}
      />
      <Stack.Screen
        name="SingleGroup"
        component={SingleGroupScreen}
        options={({ route }) => ({
          title: '',
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
          title: '',
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

const styles = StyleSheet.create({});
