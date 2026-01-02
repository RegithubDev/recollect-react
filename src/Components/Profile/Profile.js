// // src/screens/ProfileScreen.js
// import React, { useContext, useState } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   SafeAreaView,
//   StatusBar,
//   ScrollView,
//   TouchableOpacity,
//   Image,
//   Alert,
// } from 'react-native';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import { AuthContext } from '../../context/AuthContext';

// const PROFILE_ITEMS = [
//   { id: 'wallet', label: 'Recollect Wallet', image: require('../.././../assets/walleticon.png') },
//   { id: 'scrap', label: 'Scrap Money', image: require('../.././../assets/money.png') },
//   { id: 'coupons', label: 'Coupons and offers', image: require('../.././../assets/coupon.png') },
//   { id: 'orders', label: 'Order History', image: require('../.././../assets/orderhis.png') },
//   { id: 'faq', label: 'FAQ', image: require('../.././../assets/help.png') },
//   { id: 'policies', label: 'Policies', image: require('../.././../assets/policy.png') },
//   { id: 'about', label: 'About us', image: require('../.././../assets/aboutus.png') },
//   { id: 'call', label: 'Call us', image: require('../.././../assets/contact.png') },
//   { id: 'share', label: 'Share App', image: require('../.././../assets/share.png') },
//   { id: 'delete', label: 'Delete Account', image: require('../.././../assets/delete.png') },
//   { id: 'chat', label: 'Chat with us', image: require('../.././../assets/callus.png') },
//   { id: 'logout', label: 'Logout', image: require('../.././../assets/logout.png') },
// ];

// const POLICY_SUB_ITEMS = [
//   { id: 'privacy', label: 'Privacy Policy' },
//   { id: 'terms', label: 'Terms And Conditions' },
//   { id: 'refund', label: 'Refund Policy' },
//   { id: 'cancel', label: 'Cancellation Policy' },
// ];

// // map each id to the route name you registered in your navigator
// const SCREEN_MAP = {
//   wallet: 'Wallet',
//   scrap: 'Scrap',
//   coupons: 'CouponsScreen',
//   orders: 'History',
//   faq: 'FaqScreen',
//   about: 'AboutUs',
//   call: 'CallUsScreen',
//   share: 'ShareAppScreen',
//   delete: 'DeleteAccountScreen',
//   chat: 'ChatScreen',

//   // policy sub screens
//   privacy: 'PrivacyPolicyScreen',
//   terms: 'TermsConditionsScreen',
//   refund: 'RefundPolicyScreen',
//   cancel: 'CancellationPolicyScreen',
// };

// const ProfileScreen = ({ navigation }) => {
//    const [isPoliciesOpen, setIsPoliciesOpen] = useState(false);
// const { logout } = useContext(AuthContext);

// const handleItemPress = (id) => {
//   console.log('Pressed:', id);

//   if (id === 'logout') {
//     Alert.alert(
//       "Sign Out",
//       "Are you sure you want to sign out?",
//       [
//         { text: "Cancel", style: "cancel" },
//         { 
//           text: "Yes", 
//           style: "destructive",
//           onPress: async () => {
//             await logout();   
//             navigation.reset({
//               index: 0,
//               routes: [{ name: "Splash2" }],  
//             });
//           }
//         }
//       ],
//       { cancelable: true }
//     );
//     return; 
//   }

 
//   const routeName = SCREEN_MAP[id];
//   if (routeName) {
//     navigation.navigate(routeName);
//   } else {
//     console.warn(`No route mapped for id: ${id}`);
//   }
// };


//   return (
//     <SafeAreaView style={styles.safe}>
//       <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
//       <View style={styles.container}>
//         {/* Header */}
//         <View style={styles.headerRow}>
//           <TouchableOpacity
//             onPress={() => navigation.goBack?.()}
//             style={styles.backButton}
//           >
//            <Image
//                 source={require('../../../assets/back.png')}
//                 style={styles.avatarImage}
//               />
//           </TouchableOpacity>
//           <Text style={styles.headerTitle}>Profile</Text>
//           <View style={{ width: 22 }} />
//         </View>

//         <ScrollView
//           showsVerticalScrollIndicator={false}
//           contentContainerStyle={styles.scrollContent}
//         >
//           {/* Profile card */}
//           <View style={styles.profileCard}>
//             <View style={styles.avatarCircle}>
//               <Image
//                 source={require('../../../assets/avatar.png')}
//                 style={styles.avatarImage}
//               />
//             </View>

//             <View style={styles.profileInfo}>
//               <Text style={styles.profileName}>Lakshmi Monika</Text>
//               <Text style={styles.profilePhone}>+917997661770</Text>
//             </View>

//             <TouchableOpacity>
//               <Text style={styles.editText}>Edit</Text>
//             </TouchableOpacity>
//           </View>

//           {/* Menu items */}
//           <View style={styles.menuWrapper}>
//             {PROFILE_ITEMS.map((item) => {
//               if (item.id === 'policies') {
//                 // special expandable "Policies" block
//                 return (
//                   <View key="policies" style={styles.policiesBlock}>
//                     <TouchableOpacity
//                       style={styles.menuRow}
//                       activeOpacity={0.5}
//                       onPress={() => setIsPoliciesOpen((prev) => !prev)}
//                     >
//                       <View style={styles.menuLeft}>
//                         <View style={styles.menuIconCircle}>
//                           <Image source={item.image} style={styles.menuIcon} />
//                         </View>
//                         <Text style={styles.menuLabel}>{item.label}</Text>
//                       </View>

//                        <Image
//                 source={require('../../../assets/rightarrow.png')}
//                 style={styles.avatarImage}
//               />
//                     </TouchableOpacity>

//                     {isPoliciesOpen && (
//                       <View style={styles.policySubContainer}>
//                         {POLICY_SUB_ITEMS.map((sub) => (
//                           <TouchableOpacity
//                             key={sub.id}
//                             style={styles.policyRow}
//                             activeOpacity={0.7}
//                             onPress={() => handleItemPress(sub.id)}
//                           >
//                             <View style={styles.policyLeft}>
                            
//                               <Ionicons
//                                 name="document-text-outline"
//                                 size={18}
//                                 color="#000"
//                                 style={{ marginRight: 12 }}
//                               />
//                               <Text style={styles.policyLabel}>{sub.label}</Text>
//                             </View>
//                              <Image
//                 source={require('../../../assets/rightarrow.png')}
//                 style={styles.avatarImage}
//               />
//                           </TouchableOpacity>
//                         ))}
//                       </View>
//                     )}
//                   </View>
//                 );
//               }

//               // normal rows
//               return (
//                 <TouchableOpacity
//                   key={item.id}
//                   style={styles.menuRow}
//                   activeOpacity={0.7}
//                   onPress={() => handleItemPress(item.id)}
//                 >
//                   <View style={styles.menuLeft}>
//                     <View style={styles.menuIconCircle}>
//                       <Image source={item.image} style={styles.menuIcon} />
//                     </View>
//                     <Text style={styles.menuLabel}>{item.label}</Text>
//                   </View>

//                    <Image
//                 source={require('../../../assets/rightarrow.png')}
//                 style={styles.avatarImage}
//               />
//                 </TouchableOpacity>
//               );
//             })}
//           </View>

//           {/* Footer info */}
//           <View style={styles.footer}>
//             <Text style={styles.footerText}>Owned And Managed By</Text>
//             <Text style={styles.footerBrand}>Recollect Impact Pvt Ltd</Text>

//             <Text style={[styles.footerText, { marginTop: 24 }]}>
//               Powered By RE Sustainability
//             </Text>
//             {/* <Text style={styles.footerVersion}>V 3.0.8</Text> */}
//           </View>

//           <View style={{ height: 40 }} />
//         </ScrollView>
//       </View>
//     </SafeAreaView>
//   );
// };

// export default ProfileScreen;

// const BG_BLACK = '#ffffffff';
// const BG_CARD = '#bdc9a1ff';
// const BG_ROW = '#bdc9a1ff';
// const LIME = '#e7e7e7ff';
// const TEXT_PRIMARY = '#000000ff';
// const TEXT_SECONDARY = '#000000ff';

// const styles = StyleSheet.create({
//   safe: {
//     flex: 1,
//     backgroundColor: BG_BLACK,
//   },
//   container: {
//     flex: 1,
//     backgroundColor: BG_BLACK,
//   },
//   headerRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingHorizontal: 18,
//     paddingBottom: 12,
//     marginTop: '16%',
//   },
//   backButton: {
//     width: 32,
//     height: 32,
//     borderRadius: 16,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   headerTitle: {
//     flex: 1,
//     textAlign: 'center',
//     fontSize: 20,
//     fontFamily: 'Poppins-SemiBold',
//     color: TEXT_PRIMARY,
//   },
//   scrollContent: {
//     paddingHorizontal: 16,
//     paddingBottom: 24,
//   },
//   menuIcon: {
//     width: 22,
//     height: 22,
//     resizeMode: 'contain',
//   },

//   profileCard: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: BG_CARD,
//     borderRadius: 24,
//     paddingHorizontal: 16,
//     paddingVertical: 14,
//     marginBottom: 18,
//   },
//   avatarCircle: {
//     width: 56,
//     height: 56,
//     borderRadius: 28,
//     backgroundColor: LIME,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   avatarImage: {
//     width: 30,
//     height: 30,
//     resizeMode: 'contain',
//   },

//   profileInfo: {
//     flex: 1,
//     marginLeft: 14,
//   },
//   profileName: {
//     color:'#000',
//     fontSize: 16,
//     fontFamily: 'Poppins-SemiBold',
//   },
//   profilePhone: {
//     color: TEXT_SECONDARY,
//     fontSize: 13,
//     fontFamily: 'Poppins-Regular',
//     marginTop: 2,
//   },
//   editText: {
//     color: '#000',
//     fontSize: 14,
//     fontFamily: 'Poppins-Medium',
//   },
//   menuWrapper: {
//     marginTop: 4,
//   },
//   menuRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     backgroundColor: BG_ROW,
//     borderRadius: 22,
//     paddingHorizontal: 16,
//     paddingVertical: 14,
//     marginBottom: 10,
//   },
//   menuLeft: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   menuIconCircle: {
//     width: 40,
//     height: 40,
//     borderRadius: 20,
//     backgroundColor: LIME,
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginRight: 12,
//   },
//   menuLabel: {
//     color: TEXT_PRIMARY,
//     fontSize: 14,
//     fontFamily: 'Poppins-Medium',
//   },

//   // policies
//   policiesBlock: {
//     marginBottom: 10,
//   },
//   policySubContainer: {
//     marginTop: 6,
//     borderRadius: 18,
//     backgroundColor: '#f5f5f5',
//     paddingVertical: 4,
//   },
//   policyRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     paddingHorizontal: 18,
//     paddingVertical: 10,
//   },
//   policyLeft: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   policyLabel: {
//     fontSize: 13,
//     color: '#000',
//     fontFamily: 'Poppins-Regular',
//   },

//   footer: {
//     marginTop: 28,
//     alignItems: 'center',
//   },
//   footerText: {
//     color: TEXT_PRIMARY,
//     fontSize: 12,
//     fontFamily: 'Poppins-Regular',
//   },
//   footerBrand: {
//     color: '#000',
//     fontSize: 13,
//     fontFamily: 'Poppins-SemiBold',
//     marginTop: 4,
//   },
//   footerVersion: {
//     color: TEXT_PRIMARY,
//     fontSize: 13,
//     fontFamily: 'Poppins-SemiBold',
//     marginTop: 8,
//   },
// });



import React, { useContext } from 'react';
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
  wallet: 'WalletScreen',
  scrap: 'ScrapMoneyScreen',
  coupons: 'CouponsScreen',
  orders: 'MyOrdersScreen',
  faq: 'FaqScreen',
  policies: 'PoliciesScreen',
  about: 'AboutUsScreen',
  call: 'ContactScreen',
  share: 'ShareScreen',
  chat: 'ChatScreen',
  delete: 'DeleteAccountScreen',
};


const ProfileScreen = ({navigation}) => {
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
                <Ionicons name="person-outline" size={28} color="#42ffb7" />
              </View>

              <View style={{ flex: 1, marginLeft: 14 }}>
                <Text style={styles.name}>Lakshmi Monika</Text>
                <Text style={styles.phone}>+91 98765 43210</Text>
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
