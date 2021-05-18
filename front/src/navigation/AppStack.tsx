import * as React from 'react';
import { View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import MainTabNavigator from './MainTabNavigator';
import Colors from '../constants/Colors';
import NotFoundScreen from '../screens/NotFoundScreen';
import SinglePostScreen from '../screens/SinglePostScreen';
import SingleGroupScreen from '../screens/SingleGroupScreen';
import SingleGroupDetailsScreen from '../screens/SingleGroupDetailsScreen';
import { RootStackParamList } from '../types/Tabs';
import UserProfileScreen from '../screens/UserProfileScreen';

const Stack = createStackNavigator<RootStackParamList>();

export const AppStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: 'white',
          shadowOpacity: 0,
          elevation: 0,
        },
        headerTintColor: Colors.light.background,
        headerTitleAlign: 'left',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Stack.Screen
        name="Root"
        component={MainTabNavigator}
        options={{
          title: 'Kader',
          headerTintColor: '#4975aa',
          headerRight: () => (
            <View
              style={{
                flexDirection: 'row',
                width: 60,
                justifyContent: 'space-between',
                marginRight: 10,
              }}
            ></View>
          ),
          cardStyle: { backgroundColor: '#dedcdf' },
        }}
      />

      <Stack.Screen
        name="SinglePost"
        component={SinglePostScreen}
        options={({ route }) => ({
          headerTintColor: '#4975aa',
          paddingLeft: 100,
          title: route.params.title,
          cardStyle: { backgroundColor: '#dedcdf' },
        })}
      />
      <Stack.Screen
        name="SingleGroup"
        component={SingleGroupScreen}
        options={({ route }) => ({
          title: route.params.name,
          headerTintColor: '#4975aa',
          cardStyle: { backgroundColor: '#dedcdf' },
        })}
      />
      <Stack.Screen
        name="SingleGroupDetails"
        component={SingleGroupDetailsScreen}
        options={({ route }) => ({
          title: route.params.name,
          headerTintColor: '#4975aa',
          cardStyle: { backgroundColor: '#dedcdf' },
        })}
      />
      <Stack.Screen
        name="UserProfile"
        component={UserProfileScreen}
        options={({ route }) => ({
          title: route.params.name,
          headerTintColor: '#4975aa',
          cardStyle: { backgroundColor: '#dedcdf' },
        })}
      />
      <Stack.Screen
        name="NotFound"
        component={NotFoundScreen}
        options={{
          title: 'Oops!',
          headerTintColor: '#4975aa',
          cardStyle: { backgroundColor: '#dedcdf' },
        }}
      />
    </Stack.Navigator>
  );
};
