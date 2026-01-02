// // src/screens/HomeScreen.js
// import React from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   Image,
//   StatusBar,
//   TouchableOpacity,
//   SafeAreaView,
//   ScrollView,
// } from 'react-native';

// const Splash2 = ({ navigation }) => {
//   const handleIndividualPress = () => {
//     navigation.navigate('Login'); // hook this to your screen
//   };

//   const handleOrganizationPress = () => {
//     // navigation.navigate('Organization'); // hook this to your screen
//   };

//   return (
//     <SafeAreaView style={styles.safeArea}>
//       <StatusBar barStyle="dark-content" backgroundColor="#F5F7FB" />

//       <View style={styles.container}>
//         <ScrollView
//           contentContainerStyle={styles.scrollContent}
//           showsVerticalScrollIndicator={false}
//         >
//           {/* Top text */}
//           <View style={styles.headerTextContainer}>
//             <Text style={styles.title}>
//               Together, let’s build a{'\n'}waste free future
//             </Text>
//             <Text style={styles.subtitle}>
//               Pick your path to sustainability.
//             </Text>
//           </View>

//           {/* Illustration */}
//           <View style={styles.illustrationContainer}>
//             <Image
//               source={require('../../../assets/splash2.png')}
//               style={styles.illustration}
//               resizeMode="contain"
//             />
//           </View>

//           {/* Cards */}
//           <View style={styles.cardsCenterContainer}>
//           <View style={styles.cardsWrapper}>
//             {/* Individual */}
//             <TouchableOpacity
//               style={styles.card}
//               activeOpacity={0.8}
//               onPress={handleIndividualPress}
//             >
//               <View style={styles.cardTop}>
//                 <View style={styles.cardIconCircle}>
//                   <Image
//                     source={require('../../../assets/homIcon.png')}
//                     style={styles.cardIcon}
//                     resizeMode="contain"
//                   />
//                 </View>
//               </View>

//               <View style={styles.cardBottom}>
//                 <Text style={styles.cardLabel}>Individual</Text>
                              
//                 <Image
//   source={require('../../../assets/next.png')}
//   style={styles.arrowImage}
//   resizeMode="contain"
// />
//               </View>
//             </TouchableOpacity>

//             {/* Organization */}
//             <TouchableOpacity
//               style={styles.card}
//               activeOpacity={0.8}
//               onPress={handleOrganizationPress}
//             >
//               <View style={styles.cardTop}>
//                 <View style={styles.cardIconCircle}>
//                   <Image
//                     source={require('../../../assets/building.png')}
//                     style={styles.cardIcon}
//                     resizeMode="contain"
//                   />
//                 </View>
//               </View>

//               <View style={styles.cardBottom}>
//                 <Text style={styles.cardLabel}>Organization</Text>
              
//                 <Image
//   source={require('../../../assets/next.png')}
//   style={styles.arrowImage}
//   resizeMode="contain"
// />

//               </View>
//             </TouchableOpacity>
//           </View>
// </View>
//           {/* Optional bottom city outline */}
//           <View style={styles.cityOutlineContainer}>
//             {/* <Image
//               source={require('../assets/city_outline_light.png')}
//               style={styles.cityOutline}
//               resizeMode="contain"
//             /> */}
//           </View>
//         </ScrollView>
//       </View>
//     </SafeAreaView>
//   );
// };

// export default Splash2;

// const NEON_GREEN = '#64b140ff'; // soft light green
// const DARK_TEXT = '#111827';
// const MUTED_TEXT = '#4B5563';

// const styles = StyleSheet.create({
//   safeArea: {
//     flex: 1,
//     backgroundColor: '#F5F7FB',
//   },
//   container: {
//     flex: 1,
//     backgroundColor: '#F5F7FB', // light background

//   },
//   scrollContent: {
//     paddingHorizontal: 20,
//     paddingTop: 24,
//     paddingBottom: 32,
//     marginTop:'25%'
//   },

//   headerTextContainer: {
//     marginBottom: 24,
//   },
//   title: {
//     fontSize: 28,
//     lineHeight: 36,
//     fontWeight: '800',
//     color: DARK_TEXT,
//      fontFamily:'Poppins-Bold'
//   },
//   subtitle: {
//     marginTop: 11,
//     fontSize: 20,
//     color: MUTED_TEXT,
//      fontFamily:'Poppins-Regular'
//   },

//   illustrationContainer: {
//     alignItems: 'center',
//     marginBottom: 30,
//   },
//   illustration: {
//     width: '150%',
//     height: 280,
//   },
// cardsCenterContainer: {
//   width: '100%',
//   alignItems: 'center',   // centers horizontally
//   justifyContent: 'center', // centers vertically if needed
//   marginBottom: 24,
// },

// cardsWrapper: {
//   flexDirection: 'row',
//   alignItems: 'center',
//   justifyContent: 'center',
//   gap: 16,
// },



//   card: {
//     flex: 1,
//     backgroundColor: NEON_GREEN,
//     borderRadius: 24,
//     paddingHorizontal: 16,
//     paddingVertical: 28,
//     justifyContent: 'space-between',
//     shadowColor: '#000',
//     shadowOpacity: 0.1,
//     shadowOffset: { width: 0, height: 4 },
//     shadowRadius: 8,
//     elevation: 4,
//   },
//   cardTop: {
//     alignItems: 'flex-start',
//     marginBottom: 24,
//   },
//   cardIconCircle: {
//     width: 44,
//     height: 44,
//     borderRadius: 22,
//     borderWidth: 1.6,
//     borderColor: '#111827',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   cardIcon: {
//     width: 22,
//     height: 22,
//   },
//   cardBottom: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//   },
//   cardLabel: {
//     fontSize: 16,
//     fontWeight: '600',
//     color: DARK_TEXT,
//     fontFamily:'Poppins-Bold'
//   },
//   arrowCircle: {
//     width: 40,
//     height: 40,
//     borderRadius: 20,
//     backgroundColor: '#111827',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   arrowImage: {
//   width: 28,
//   height: 28,

// },

//   arrowText: {
//     fontSize: 20,
//     color: '#FFFFFF',
//     marginBottom: 2,
//   },

//   cityOutlineContainer: {
//     marginTop: 12,
//     alignItems: 'center',
//   },
//   cityOutline: {
//     width: '100%',
//     height: 120,
//     opacity: 0.4,
//   },
// });



import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const GetStartedScreen = ({ navigation }) => {
    const handleIndividualPress = () => {
    navigation.navigate('Login'); 
  };

  const handleOrganizationPress = () => {
    // navigation.navigate('Organization'); // hook this to your screen
  };
  return (
    <SafeAreaView style={styles.container}>
      {/* Logo */}
      <View style={styles.logoWrapper}>
        <View style={styles.logoBox}>
          <Image
            source={require('../../../assets/recycle.png')} // replace with your icon
            style={styles.logo}
          />
        </View>
      </View>

      {/* Title */}
      <Text style={styles.title}>Recollect</Text>
      <Text style={styles.subtitle}>Sustainable waste management</Text>

      {/* Card */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Get Started</Text>
        <Text style={styles.cardSubtitle}>
          Choose how you want to contribute
        </Text>

        {/* Individual */}
        <TouchableOpacity
          style={[styles.option, styles.greenBorder]}
         onPress={handleIndividualPress}
          activeOpacity={0.8}
        >
          <View style={[styles.iconCircle, { backgroundColor: '#1f3d2e' }]}>
           <Image
                    source={require('../../../assets/user_indi.png')}
                    style={styles.cardIcon}
                    resizeMode="contain"
                  />
          </View>

          <View style={{ flex: 1 }}>
            <Text style={styles.optionTitle}>Individual</Text>
            <Text style={styles.optionSubtitle}>
              Personal waste recycling
            </Text>
          </View>

            <Image
  source={require('../../../assets/right.png')}
  style={styles.arrowImage}
  resizeMode="contain"
/>
        </TouchableOpacity>

        {/* Organisation */}
        <TouchableOpacity
          style={[styles.option, styles.blueBorder]}
         onPress={handleOrganizationPress}
          activeOpacity={0.8}
        >
          <View style={[styles.iconCircle, { backgroundColor: '#1f2f3d' }]}>
           <Image
                    source={require('../../../assets/org.png')}
                    style={styles.cardIcon}
                    resizeMode="contain"
                  />
          </View>

          <View style={{ flex: 1 }}>
            <Text style={styles.optionTitle}>Organisation</Text>
            <Text style={styles.optionSubtitle}>
              Business waste management
            </Text>
          </View>

            <Image
  source={require('../../../assets/right.png')}
  style={styles.arrowImage}
  resizeMode="contain"
/>
        </TouchableOpacity>
      </View>

      {/* Footer */}
      <Text style={styles.footer}>
        By continuing, you agree to our Terms of Service and Privacy Policy
      </Text>
    </SafeAreaView>
  );
};

export default GetStartedScreen;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0b1410',
    paddingHorizontal: 20,
  },

  logoWrapper: {
    alignItems: 'center',
    marginTop: '18%',
  },
  logoBox: {
    width: 88,
    height: 88,
    borderRadius: 22,
    backgroundColor: '#121f18',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#2de39e',
    shadowOpacity: 0.5,
    shadowRadius: 20,
    elevation: 10,
  },
  logo: {
    width: 44,
    height: 44,
    tintColor: '#2de39e',
  },
  arrowImage: {
  width: 15,
  height: 15,

},
  title: {
    textAlign: 'center',
    fontSize: 28,
    fontWeight: '700',
    color: '#ffffff',
    marginTop: 20,
  },
  subtitle: {
    textAlign: 'center',
    color: '#9aa7a0',
    marginTop: 6,
  },

  card: {
    marginTop: 40,
    backgroundColor: '#0f1d16',
    borderRadius: 26,
    padding: 20,
    borderWidth: 1,
    borderColor: '#173026',
  },

  cardTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#ffffff',
    textAlign: 'center',
  },
  cardSubtitle: {
    textAlign: 'center',
    color: '#9aa7a0',
    marginTop: 6,
    marginBottom: 20,
  },

  option: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 18,
    marginBottom: 14,
    backgroundColor: '#0b1611',
  },
  greenBorder: {
    borderWidth: 1,
    borderColor: '#187D57',
  },
  blueBorder: {
    borderWidth: 1,
    borderColor: '#4da6ff',
  },
  cardIcon: {
    width: 22,
    height: 22,
  },
  iconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },

  optionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
  },
  optionSubtitle: {
    fontSize: 13,
    color: '#9aa7a0',
    marginTop: 2,
  },

  footer: {
    textAlign: 'center',
    color: '#6f7d76',
    fontSize: 12,
    marginTop: 24,
  },
});
