import { FontAwesome, FontAwesome5, Ionicons } from '@expo/vector-icons';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import HomeScreen from '../screens/HomeScreen';

import { MainTabParamList, HomeParamList, NotificationsParamList, GroupsParamList, ProfileParamList } from '../types/Tabs';
import NotificationsScreen from '../screens/NotificationsScreen';
import ProfileScreen from '../screens/ProfileScreen';
import GroupsScreen from '../screens/GroupsScreen';

const MainTab = createMaterialTopTabNavigator<MainTabParamList>();

export default function MainTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <MainTab.Navigator
      initialRouteName="Home"
      tabBarOptions={{
        style: {
          backgroundColor: '#f5f5f5',
        },
        indicatorStyle: {
          backgroundColor: '#4975aa',
          height: 4,
        },
        labelStyle: {
          fontWeight: 'bold',
        },
        showIcon: true,
      }}
    >
      <MainTab.Screen
        name="Home"
        component={HomeNavigator}
        options={{
          tabBarIcon: ({ color }) => <FontAwesome5 name="home" color={"#4975aa"}  size={22} />,
          tabBarLabel: () => null,
        }}
      />
      <MainTab.Screen
        name="Groups"
        component={GroupsNavigator}
        options={{
          tabBarIcon: ({ color }) => <FontAwesome name="group" color={"#4975aa"}  size={22} />,
          tabBarLabel: () => null,
        }}
      />
      <MainTab.Screen
        name="Profile"
        component={ProfileNavigator}
        options={{
          tabBarIcon: ({ color }) => <Ionicons name="person" color={"#4975aa"} size={22} />,
          tabBarLabel: () => null,
        }}
      />
      <MainTab.Screen
        name="Notifications"
        component={NotificationsNavigator}
        options={{
          tabBarIcon: ({ color }) => <FontAwesome name="bell" color={"#4975aa"} size={22} />,
          tabBarLabel: () => null,
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

