import { FontAwesome, FontAwesome5, Ionicons } from '@expo/vector-icons';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';

import HomeScreen from '../screens/HomeScreen';

import { MainTabParamList, HomeParamList, NotificationsParamList, GroupsParamList, ProfileParamList } from '../types/Tabs';
import NotificationsScreen from '../screens/NotificationsScreen';
import ProfileScreen from '../screens/ProfileScreen';
import GroupsScreen from '../screens/GroupsScreen';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

const MainTab = createMaterialBottomTabNavigator<MainTabParamList>();

export default function MainTabNavigator() {
  return (
    <MainTab.Navigator
      initialRouteName="Home"
      activeColor="#4975aa"
      barStyle={{
        borderTopColor: '#f1efee',
        borderTopWidth: 0.5,
        backgroundColor: 'white',
      }}
    >
      <MainTab.Screen
        name="Home"
        component={HomeNavigator}
        options={{
          tabBarIcon: ({ color }) => <FontAwesome5 name="home" color={'#4975aa'} size={22} />,
        }}
      />
      <MainTab.Screen
        name="Groups"
        component={GroupsNavigator}
        options={{
          tabBarIcon: ({ color }) => <FontAwesome name="group" color={'#4975aa'} size={22} />,
        }}
      />
      <MainTab.Screen
        name="Profile"
        component={ProfileNavigator}
        options={{
          tabBarIcon: ({ color }) => <Ionicons name="person" color={'#4975aa'} size={22} />,
        }}
      />
    </MainTab.Navigator>
  );
}

const HomeStack = createStackNavigator<HomeParamList>();

function HomeNavigator() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="HomeScreen" component={HomeScreen} options={{ headerTitle: 'Home', headerShown: false }} />
    </HomeStack.Navigator>
  );
}

const GroupsStack = createStackNavigator<GroupsParamList>();

function GroupsNavigator() {
  return (
    <GroupsStack.Navigator>
      <GroupsStack.Screen name="GroupsScreen" component={GroupsScreen} options={{ headerTitle: 'Groups', headerShown: false }} />
    </GroupsStack.Navigator>
  );
}

const ProfileStack = createStackNavigator<ProfileParamList>();

function ProfileNavigator() {
  return (
    <ProfileStack.Navigator>
      <ProfileStack.Screen name="ProfileScreen" component={ProfileScreen} options={{ headerTitle: 'Profile', headerShown: false }} />
    </ProfileStack.Navigator>
  );
}

const NotificationsStack = createStackNavigator<NotificationsParamList>();

function NotificationsNavigator() {
  return (
    <NotificationsStack.Navigator>
      <NotificationsStack.Screen name="NotificationsScreen" component={NotificationsScreen} options={{ headerTitle: 'Notifications', headerShown: false }} />
    </NotificationsStack.Navigator>
  );
}
