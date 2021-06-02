import * as React from 'react';
import { StyleSheet } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import MainTabNavigator from './MainTabNavigator';
import Colors from '../constants/Colors';
import NotFoundScreen from '../screens/NotFoundScreen';
import SinglePostScreen from '../screens/SinglePostScreen';
import SingleGroupScreen from '../screens/SingleGroupScreen';
import SingleGroupDetailsScreen from '../screens/SingleGroupDetailsScreen';
import { RootStackParamList } from '../types/Tabs';
import UserPostsScreen from '../screens/UserPostsScreen';
import UserGroupsScreen from '../screens/UserGroupsScreen';
import GroupMembersScreen from '../screens/GroupMembersScreen';
import UserSettingsScreen from '../screens/UserSettingsScreen';
import ClosePostScreen from '../screens/ClosePostScreen';
import SinglePostHeaderItem from '../components/SinglePostHeaderItem';
import UserProfileScreen from '../screens/UserProfileScreen';
import { capitalize } from '../utils/text';

const Stack = createStackNavigator<RootStackParamList>();

function AppStack() {
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
            const { post, groupName, groupCategory } = route.params;

            if (!!post) return <SinglePostHeaderItem post={post} groupName={groupName} groupCategory={groupCategory} />;
          },
          cardStyle: { backgroundColor: '#dedcdf' },
        })}
      />

      <Stack.Screen
        name="UserProfile"
        component={UserProfileScreen}
        options={({ route }) => ({
          title: '',
          headerTintColor: Colors.light.tint,
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
        name="GroupMembers"
        component={GroupMembersScreen}
        options={({ route }) => ({
          title: '',
          headerTintColor: Colors.light.tint,
          cardStyle: { backgroundColor: '#dedcdf' },
        })}
      />
      <Stack.Screen
        name="UserPosts"
        component={UserPostsScreen}
        options={({ route }) => ({
          title: '',
          headerTintColor: Colors.light.tint,
          cardStyle: { backgroundColor: '#dedcdf' },
        })}
      />
      <Stack.Screen
        name="UserGroups"
        component={UserGroupsScreen}
        options={({ route }) => ({
          title: '',
          headerTintColor: Colors.light.tint,
          cardStyle: { backgroundColor: '#dedcdf' },
        })}
      />
      <Stack.Screen
        name="UserSettings"
        component={UserSettingsScreen}
        options={({ route }) => ({
          title: capitalize(route.params.user.firstName) + ' ' + capitalize(route.params.user.lastName) + ' settings',
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
}

const styles = StyleSheet.create({});
export default AppStack;
