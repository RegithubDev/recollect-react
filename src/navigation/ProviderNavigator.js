import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

/* Screens */

import ProfileScreen from '../Components/Profile/Profile';

const Tab = createBottomTabNavigator();

const ProviderBottomTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,

        tabBarStyle: {
          position: 'absolute',
          backgroundColor: '#0B0F0C',
          borderTopWidth: 0,
          height: 72,
        },

        tabBarBackground: () => (
          <View style={styles.glowContainer} />
        ),

        tabBarActiveTintColor: '#ff9f43',
        tabBarInactiveTintColor: '#9CA3AF',

        tabBarLabelStyle: {
          fontSize: 11,
          fontFamily: 'Poppins-Medium',
          marginBottom: 2,
        },

        tabBarIcon: ({ focused }) => {
          let iconSource;

          if (route.name === 'Pickups') {
            iconSource = focused
              ? require('../../assets/house.png')
              : require('../../assets/houseoutline.png');
          } else if (route.name === 'Requests') {
            iconSource = focused
            ? require('../../assets/orderhistory.png')
              : require('../../assets/orderoutline.png');
          } else if (route.name === 'Earnings') {
            iconSource = focused
             ? require('../../assets/orderhistory.png')
              : require('../../assets/orderoutline.png');
          } else if (route.name === 'Profile') {
            iconSource = focused
             ? require('../../assets/profileuser.png')
              : require('../../assets/profileuseroutline.png');
          }

          return (
            <Image
              source={iconSource}
              style={{ width: 26, height: 26 }}
              resizeMode="contain"
            />
          );
        },
      })}
    >
      <Tab.Screen name="Pickups" component={ProfileScreen} />
      <Tab.Screen name="Requests" component={ProfileScreen} />
      <Tab.Screen name="Earnings" component={ProfileScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

export default ProviderBottomTabs;

const styles = StyleSheet.create({
  glowContainer: {
    flex: 1,
    backgroundColor: '#0B0F0C',
    shadowColor: '#ff9f43',
    shadowOffset: { width: 0, height: -6 },
    shadowOpacity: 0.35,
    shadowRadius: 18,
    elevation: 20,
  },
});
