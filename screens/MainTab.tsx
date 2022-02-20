import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import {MainTabParamList} from './types';
import ArticlesScreen from './ArticlesScreen';

const Tab = createBottomTabNavigator<MainTabParamList>();

function MainTab() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name={'Articles'}
        component={ArticlesScreen}
        options={{
          title: '게시글 목록',
          tabBarIcon: ({color, size}) => (
            <MaterialIcons name={'article'} color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
export default MainTab;
