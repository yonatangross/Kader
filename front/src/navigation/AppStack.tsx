import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { View } from 'react-native';

import NotFoundScreen from '../screens/NotFoundScreen';
import { RootStackParamList } from '../types/Tabs';
import MainTabNavigator from './MainTabNavigator';
import Colors from '../constants/Colors';
import SinglePostScreen from '../screens/SinglePostScreen';
import SingleGroupScreen from '../screens/SingleGroupScreen';

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
          headerTintColor: "#4975aa",
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
        }}
      />

      <Stack.Screen
        name="SinglePost"
        component={SinglePostScreen}
        options={{
          headerTintColor: '#4975aa',
          title:"",
        }}
      />
      <Stack.Screen
        name="SingleGroup"
        component={SingleGroupScreen}
        options={{
          title: '',
          headerTintColor: '#4975aa',
        }}
      />
       <Stack.Screen
        name="NotFound"
        component={NotFoundScreen}
        options={{
          title: 'Oops!',
          headerTintColor: '#4975aa',
        }}
      />

    </Stack.Navigator>
  );
};
