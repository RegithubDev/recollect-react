import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ProviderHome from '../Components/RecollectProviders/ProviderHome/ProviderHome';
/* Screens */
import ProviderHistory from '../Components/RecollectProviders/ProviderHistory/ProviderHistory';
import EarningsScreen from '../Components/RecollectProviders/ProviderEarnings/ProviderEarnings';
import ProviderProfile from '../Components/RecollectProviders/ProviderProfile/ProviderProfile';
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

        tabBarActiveTintColor: '#19A463',
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
          } else if (route.name === 'History') {
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
      <Tab.Screen name="Pickups" component={ProviderHome} />
      <Tab.Screen name="History" component={ProviderHistory} />
      <Tab.Screen name="Earnings" component={EarningsScreen} />
      <Tab.Screen name="Profile" component={ProviderProfile} />
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
