import React, { useContext } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AuthContext } from "../context/AuthContext";

import Splash1 from "../Components/SplashScreens/Splash1";
import Splash2 from "../Components/SplashScreens/Welcome";
import SignInScreen from "../Components/Individual/Login/Login";
import OtpScreen from "../Components/Individual/Login/VerifyOTP";
import HomeScreen from "../Components/HomeScreen/home";
import BottomTabsNavigator from "./BottomBarNavigation";
import WalletScreen from "../Components/Profile/Wallet/wallet";
import AboutUsScreen from "../Components/Profile/AboutUs/AboutUs";
import ScrapMoneyScreen from "../Components/Profile/ScrapMoney/ScrapMoney";
import MyAddressesScreen from '../Components/Addresses/MyAddresses';
import MyOrdersScreen from '../Components/OrderHistory/OrderHistory';
import SelectItemScreen from '../Components/SelectCategory/SelectCategory';
import ConfirmPickupScreen from '../Components/SelectCategory/ConfirmPickup';
import SchedulePickupScreen from '../Components/Schedule/SchedulePickup';
import PickupSuccessScreen from '../Components/SelectCategory/PickupSuccess';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  const { userToken, isLoading } = useContext(AuthContext);

  if (isLoading) return null; 
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      
      {userToken === null ? (
        <>
          <Stack.Screen name="Splash1" component={Splash1} />
          <Stack.Screen name="Splash2" component={Splash2} />
          <Stack.Screen name="Login" component={SignInScreen} />
          <Stack.Screen name="OtpScreen" component={OtpScreen} />
        </>
      ) : (
        <>
          <Stack.Screen name="HomeTabs" component={BottomTabsNavigator} />
          <Stack.Screen name="Wallet" component={WalletScreen} />
          <Stack.Screen name="Home" component={HomeScreen} />
           <Stack.Screen name="AboutUs" component={AboutUsScreen} />
            <Stack.Screen name="Scrap" component={ScrapMoneyScreen} />
             <Stack.Screen name="Address" component={MyAddressesScreen} />
              <Stack.Screen name="History" component={MyOrdersScreen} />
               <Stack.Screen name="SelectItem" component={SelectItemScreen} />
                   <Stack.Screen name="ConfirmPickup" component={ConfirmPickupScreen} />
                   <Stack.Screen name="Schedule" component={SchedulePickupScreen} />
                   <Stack.Screen
  name="PickupSuccess"
  component={PickupSuccessScreen}
/>

        </>
      )}
    </Stack.Navigator>
  );
};

export default AppNavigator;
