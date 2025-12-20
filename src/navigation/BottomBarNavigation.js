import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeScreen from '../Components/HomeScreen/home';
import ProfileScreen from '../Components/Profile/Profile';
import WalletScreen from '../Components/Profile/Wallet/wallet';
import MyOrdersScreen from '../Components/OrderHistory/OrderHistory';

const Tab = createBottomTabNavigator();


const BottomTabsNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,

        // 🔥 Transparent tab bar
        tabBarStyle: {
          position: 'absolute',
          backgroundColor: '#0B0F0C',
          borderTopWidth: 0,
          height: 72,
        
        },

        tabBarBackground: () => (
          <View style={styles.glowContainer} />
        ),

        tabBarActiveTintColor: '#2a8d67ff',
        tabBarInactiveTintColor: '#9CA3AF',

        tabBarLabelStyle: {
          fontSize: 11,
          fontFamily: 'Poppins-Medium',
          marginBottom: 2,
        },

        tabBarIcon: ({ focused }) => {
          let iconSource;

          if (route.name === 'Home') {
            iconSource = focused
              ? require('../../assets/house.png')
              : require('../../assets/houseoutline.png');
          } else if (route.name === 'Wallet') {
            iconSource = focused
              ? require('../../assets/purse.png')
              : require('../../assets/purseoutline.png');
          } else if (route.name === 'History') {
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
              style={{
                width: 26,
                height: 26,
                resizeMode: 'contain',
              }}
            />
          );
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Wallet" component={WalletScreen} />
      <Tab.Screen name="History" component={MyOrdersScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};




export default BottomTabsNavigator;

const styles = StyleSheet.create({
  glowContainer: {
    flex: 1,
    backgroundColor: '#0B0F0C',

    // 🌿 Green glow
    shadowColor: '#2de39e',
    shadowOffset: { width: 0, height: -6 },
    shadowOpacity: 0.35,
    shadowRadius: 18,

    // Android glow
    elevation: 20,
  },
});
