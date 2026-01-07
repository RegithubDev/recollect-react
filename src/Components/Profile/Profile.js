


import React, { useCallback, useContext, useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { AuthContext } from '../../context/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';


const PROFILE_ITEMS = [
  { id: 'wallet', label: 'Recollect Wallet', image: require('../../../assets/walleticon.png') },
  { id: 'scrap', label: 'Scrap Money', image: require('../../../assets/money.png') },
  { id: 'coupons', label: 'Coupons and offers', image: require('../../../assets/coupon.png') },
  { id: 'orders', label: 'Order History', image: require('../../../assets/orderhis.png') },
  { id: 'faq', label: 'FAQ', image: require('../../../assets/help.png') },
  { id: 'policies', label: 'Policies', image: require('../../../assets/policy.png') },
  { id: 'about', label: 'About us', image: require('../../../assets/aboutus.png') },
  { id: 'call', label: 'Call us', image: require('../../../assets/contact.png') },
  { id: 'share', label: 'Share App', image: require('../../../assets/share.png') },
  { id: 'chat', label: 'Chat with us', image: require('../../../assets/callus.png') },
  { id: 'delete', label: 'Delete Account', image: require('../../../assets/delete.png') },
];

const SCREEN_MAP = {

  wallet: 'Wallet',
  scrap: 'Scrap',
  coupons: 'Coupons',
  orders: 'History',
  faq: 'FaqScreen',
  policies: 'PoliciesScreen',
  about: 'AboutUs',
  call: 'ContactScreen',
  share: 'ShareScreen',
  chat: 'ChatScreen',
  delete: 'DeleteAccountScreen',
};


const ProfileScreen = ({navigation}) => {
  const [name, setName] = useState("");
const [phone, setPhone] = useState("");
const[email, setEmail] = useState("");


useFocusEffect(
  useCallback(() => {
    const loadData = async () => {
      try {
        const savedPhone = await AsyncStorage.getItem("phone");
        const customerName = await AsyncStorage.getItem("fullname");
        const customerEmail = await AsyncStorage.getItem("email");

        console.log("PROFILE RELOAD ===>", savedPhone, customerName, customerEmail);

        if (savedPhone) setPhone(savedPhone);
        if (customerName) setName(customerName);
        if (customerEmail) setEmail(customerEmail);
      } catch (e) {
        console.log("Profile load error:", e);
      }
    };

    loadData();
  }, [])
);


  const { logout } = useContext(AuthContext);
const handleItemPress = (id) => {
  console.log('Pressed:', id);

  if (id === 'logout') {
    Alert.alert(
      "Sign Out",
      "Are you sure you want to sign out?",
      [
        { text: "Cancel", style: "cancel" },
        { 
          text: "Yes", 
          style: "destructive",
          onPress: async () => {
            await logout();   
            navigation.reset({
              index: 0,
              routes: [{ name: "Splash2" }],  
            });
          }
        }
      ],
      { cancelable: true }
    );
    return; 
  }

 
  const routeName = SCREEN_MAP[id];
  if (routeName) {
    navigation.navigate(routeName);
  } else {
    console.warn(`No route mapped for id: ${id}`);
  }
};
  
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar barStyle="light-content" />

      <LinearGradient
        colors={['#0b1410', '#0b1410']}
        style={styles.container}
      >
       <ScrollView
  showsVerticalScrollIndicator={false}
  contentContainerStyle={{ paddingBottom: 120 }}
>

          <Text style={styles.header}>Profile</Text>

          {/* PROFILE CARD */}
          <View style={styles.profileCard}>
            <View style={styles.profileRow}>
              <View style={styles.avatar}>
                 <Image
      source={require('../../../assets/user_indi.png')}
      style={styles.profileImage}
      resizeMode="contain"
    />
              </View>

              <View style={{ flex: 1, marginLeft: 14 }}>
               <Text style={styles.name}>{name || "Guest User"}</Text>
<Text style={styles.phone}>+91 {phone}</Text>
<Text style={styles.phone}>{email}</Text>
              </View>

             
            </View>

            {/* STATS */}
            <View style={styles.statsRow}>
              <Stat value="127.5" label="Total Kg" color="#42ffb7" />
              <Stat value="24" label="Pickups" />
              <Stat value="₹2,450" label="Earned" color="#ffcc4d" />
            </View>
          </View>

          {/* MENU */}
       <View style={styles.menuCard}>
  {/* STATIC */}
  <MenuItem
    image={require('../../../assets/edit.png')}
    label="Edit Profile"
     tintColor="#2de39e"
onPress={() => navigation.navigate("EditProfile")}
  />
  {/* <MenuItem
    image={require('../../../assets/location.png')}
    label="Saved Addresses"
  /> */}
 

  {/* DYNAMIC (FROM PROFILE_ITEMS) */}
  {PROFILE_ITEMS.map(item => (
    <MenuItem
      key={item.id}
      label={item.label}
      image={item.image}
       tintColor="#2de39e"
     onPress={() => handleItemPress(item.id)}
    />
  ))}
</View>


          {/* LOGOUT */}
      <TouchableOpacity
  style={styles.logout}
  onPress={async () => {
    Alert.alert(
      'Sign Out',
      'Are you sure you want to sign out?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Yes',
          style: 'destructive',
          onPress: async () => {
            await logout();
            navigation.reset({
              index: 0,
              routes: [{ name: 'Splash2' }],
            });
          },
        },
      ],
      { cancelable: true }
    );
  }}
>

               <Image
     source={require('../../../assets/loggingout.png')}
     style={styles.arrowImage}
     resizeMode="contain"
   />
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>

          <View style={{ height: 40 }} />
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
};

export default ProfileScreen;

/* COMPONENTS */
const Stat = ({ value, label, color = '#fff' }) => (
  <View style={styles.statItem}>
    <Text style={[styles.statValue, { color }]}>{value}</Text>
    <Text style={styles.statLabel}>{label}</Text>
  </View>
);

const MenuItem = ({ label, image, onPress, tintColor }) => (
  <TouchableOpacity style={styles.menuRow} onPress={onPress}>
    <View style={styles.menuLeft}>
      <Image
        source={image}
        style={[
          styles.menuIcon,
          tintColor && { tintColor },
        ]}
        resizeMode="contain"
      />
      <Text style={styles.menuText}>{label}</Text>
    </View>

    <Image
      source={require('../../../assets/right.png')}
      style={styles.arrowImage}
      resizeMode="contain"
    />
  </TouchableOpacity>
);



/* STYLES */
const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
menuIcon: {
  width: 20,
  height: 20,
},

  header: {
    fontSize: 24,
    color: '#fff',
    fontFamily: 'Poppins-SemiBold',
   marginTop:'6%'
  },

  profileCard: {
    backgroundColor: '#0f2a1e',
    borderRadius: 22,
    padding: 18,
    borderWidth: 1,
    borderColor: '#2cffb3',
    marginBottom: 24,
  },

  profileRow: { flexDirection: 'row', alignItems: 'center' },

  avatar: {
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: '#0c3b2a',
    justifyContent: 'center',
    alignItems: 'center',
  },

  editBtn: {
    backgroundColor: '#42ffb7',
    padding: 8,
    borderRadius: 20,
  },
    arrowImage: {
  width: 15,
  height: 15,

},

    profileImage: {
  width: 25,
  height: 25,

},

  name: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
  },

  phone: {
    color: '#9ca3af',
    fontSize: 13,
    marginTop: 2,
  },

  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 18,
  },

  statItem: { alignItems: 'center', flex: 1 },

  statValue: {
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
  },

  statLabel: {
    color: '#9ca3af',
    fontSize: 12,
    marginTop: 4,
  },

  menuCard: {
    backgroundColor: '#0f2a1e',
    borderRadius: 22,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#1f4f3a',
  },

  menuRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    alignItems: 'center',
  },

  menuLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  menuText: {
    color: '#fff',
    fontSize: 14,
    marginLeft: 14,
    fontFamily: 'Poppins-Medium',
  },

  logout: {
    marginTop: 20,
    backgroundColor: '#0f2a1e',
    borderRadius: 18,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },

  logoutText: {
    color: '#ff4d4d',
    fontFamily: 'Poppins-SemiBold',
    fontSize: 14,
  },
});
