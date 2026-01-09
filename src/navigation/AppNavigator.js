import React, { useContext } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AuthContext } from "../context/AuthContext";

/* Splash & Auth */
import Splash1 from "../Components/SplashScreens/Splash1";
import Splash2 from "../Components/SplashScreens/Splash2";
import GetStartedScreen from "../Components/SplashScreens/Welcome";
import SignInScreen from "../Components/Individual/Login/Login";
import OtpScreen from "../Components/Individual/Login/VerifyOTP";

/* Bottom Tabs */
import BottomTabsNavigator from "../navigation/BottomBarNavigation";          
import OrganisationTabs from "../navigation/OrganisationNavigator";        
import ProviderTabs from "../navigation/ProviderNavigator";                

/* Provider Auth */
import ProviderLogin from '../Components/RecollectProviders/ProvidersLogin/ProviderLogin';
import AddAddressScreen from '../Components/Addresses/AddAddresses';
/* Common Screens */
import WalletScreen from "../Components/Profile/Wallet/wallet";
import AboutUsScreen from "../Components/Profile/AboutUs/AboutUs";
import ScrapMoneyScreen from "../Components/Profile/ScrapMoney/ScrapMoney";
import MyAddressesScreen from "../Components/Addresses/MyAddresses";
import MyOrdersScreen from "../Components/OrderHistory/OrderHistory";
import SelectItemScreen from "../Components/SelectCategory/SelectCategory";
import ConfirmPickupScreen from "../Components/SelectCategory/ConfirmPickup";
import SchedulePickupScreen from "../Components/Schedule/SchedulePickup";
import PickupSuccessScreen from "../Components/SelectCategory/PickupSuccess";
import SelectDHWasteScreen from "../Components/SelectCategory/SelectItemScreens/DHWasteItemsUI";
import SelectScrapScreen from '../Components/SelectCategory/SelectItemScreens/ScrapItemsUI';
import EditAddressScreen from '../Components/Addresses/EditAddresses';
import EditProfileScreen from '../Components/Profile/EditProfile/EditProfile';
import CouponsScreen from '../Components/Profile/Coupons/Coupons';
import OrderSummary from '../Components/OrderHistory/OrderSummary';
import ProviderDetailsScreen from '../Components/RecollectProviders/ProviderDetails/ProviderDetails';
import ConfirmPickupLocationScreen from '../Components/Addresses/ConfirmLocation';
import ConfirmEditScreen from '../Components/Addresses/EditConfirmAddress';
import FaqScreen from '../Components/Profile/FAQs/FAQ';
const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  const { userToken, userRole, isLoading } = useContext(AuthContext);

  if (isLoading) return null;

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>

      {/* ================= NOT LOGGED IN ================= */}
      {!userToken ? (
        <>
          <Stack.Screen name="Splash1" component={Splash1} />
          <Stack.Screen name="Splash2" component={Splash2} />

          {/* Customer flow */}
          <Stack.Screen name="Welcome" component={GetStartedScreen} />
          <Stack.Screen name="Login" component={SignInScreen} />
          <Stack.Screen name="OtpScreen" component={OtpScreen} />

          {/* Provider flow */}
          <Stack.Screen name="ProviderLogin" component={ProviderLogin} />
        </>
      ) : (
        <>
          {/* ================= ROLE BASED HOME ================= */}

          {userRole === "customer" && (
            <Stack.Screen
              name="CustomerTabs"
              component={BottomTabsNavigator}
            />
          )}

          {userRole === "organisation" && (
            <Stack.Screen
              name="OrganisationTabs"
              component={OrganisationTabs}
            />
          )}

          {userRole === "provider" && (
            <Stack.Screen
              name="ProviderTabs"
              component={ProviderTabs}
            />
          )}

          {/* ================= COMMON STACK ================= */}
          <Stack.Screen name="Wallet" component={WalletScreen} />
          <Stack.Screen name="AboutUs" component={AboutUsScreen} />
          <Stack.Screen name="Scrap" component={ScrapMoneyScreen} />
          <Stack.Screen name="Address" component={MyAddressesScreen} />
          <Stack.Screen name="History" component={MyOrdersScreen} />
            <Stack.Screen name="Coupons" component={CouponsScreen} />
             <Stack.Screen name="OrderSummary" component={OrderSummary} />
          <Stack.Screen name="SelectItem" component={SelectItemScreen} />
          <Stack.Screen name="ConfirmPickup" component={ConfirmPickupScreen} />
          <Stack.Screen name="Schedule" component={SchedulePickupScreen} />
          <Stack.Screen name="SelectScrap" component={SelectScrapScreen} />
             <Stack.Screen name="EditProfile" component={EditProfileScreen} />
<Stack.Screen name="SelectDHWaste" component={SelectDHWasteScreen} />
<Stack.Screen name="FAQ" component={FaqScreen} />
<Stack.Screen
  name="AddAddress"
  component={AddAddressScreen}
  options={{ headerShown: false }}
/>
<Stack.Screen
  name="EditAddress"
  component={EditAddressScreen}
  options={{ headerShown: false }}
/>

<Stack.Screen
  name="ConfirmEditAddress"
  component={ConfirmEditScreen}
  options={{ headerShown: false }}
/>

          <Stack.Screen
            name="PickupSuccess"
            component={PickupSuccessScreen}
          />
          <Stack.Screen
  name="ProviderDetails"
  component={ProviderDetailsScreen}
  options={{ headerShown: false }}
/>
          <Stack.Screen
  name="ConfirmLocation"
  component={ConfirmPickupLocationScreen}
  options={{ headerShown: false }}
/>
        </>
      )}
    </Stack.Navigator>
  );
};

export default AppNavigator;
