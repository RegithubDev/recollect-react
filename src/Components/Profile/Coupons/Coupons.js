// import React from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   SafeAreaView,
//   TouchableOpacity,
//   Image,
//   ScrollView,
//   Dimensions,
// } from 'react-native';
// import LinearGradient from 'react-native-linear-gradient';

// const { width } = Dimensions.get('window');

// const COUPONS = [
//   require('../assets/tata1mg.png'),
//   require('../assets/adidas.png'),
//   require('../assets/amazon.png'),
//   require('../assets/firstcry.png'),
//   require('../assets/flipkart.png'),
//   require('../assets/friends.png'),
//   require('../assets/healthkart.png'),
//   require('../assets/medplus.png'),
//   require('../assets/netmeds.png'),
//   require('../assets/nike.png'),
//   require('../assets/fashion.png'),
// ];

// const CouponsAndOffersScreen = ({ navigation }) => {
//   return (
//     <LinearGradient colors={['#2d330f', '#000']} style={styles.container}>
//       <SafeAreaView style={{ flex: 1 }}>
//         {/* Header */}
//         <View style={styles.header}>
//           <TouchableOpacity onPress={() => navigation.goBack()}>
//             <Image
//               source={require('../assets/back.png')}
//               style={styles.backIcon}
//             />
//           </TouchableOpacity>
//           <Text style={styles.headerTitle}>Coupons And Offers</Text>
//         </View>

//         <ScrollView showsVerticalScrollIndicator={false}>
//           {/* Coupon Illustration */}
//           <View style={styles.illustrationWrapper}>
//             <Image
//               source={require('../assets/coupon.png')}
//               style={styles.couponImage}
//               resizeMode="contain"
//             />
//           </View>

//           {/* Coupon Grid */}
//           <View style={styles.couponCard}>
//             <View style={styles.grid}>
//               {COUPONS.map((item, index) => (
//                 <View key={index} style={styles.couponTile}>
//                   <Image source={item} style={styles.couponLogo} />
//                 </View>
//               ))}
//             </View>
//           </View>

//           {/* Bottom Wave */}
//           <View style={styles.bottomWave} />
//         </ScrollView>
//       </SafeAreaView>
//     </LinearGradient>
//   );
// };

// export default CouponsAndOffersScreen;


// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },

//   /* Header */
//   header: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingHorizontal: 16,
//     paddingVertical: 12,
//   },
//   backIcon: {
//     width: 26,
//     height: 26,
//     tintColor: '#fff',
//   },
//   headerTitle: {
//     color: '#fff',
//     fontSize: 20,
//     fontWeight: '600',
//     marginLeft: 12,
//   },

//   /* Illustration */
//   illustrationWrapper: {
//     alignItems: 'center',
//     marginVertical: 30,
//   },
//   couponImage: {
//     width: width * 0.8,
//     height: 220,
//   },

//   /* Coupon Card */
//   couponCard: {
//     backgroundColor: '#1c1c1c',
//     borderTopLeftRadius: 26,
//     borderTopRightRadius: 26,
//     paddingVertical: 30,
//     paddingHorizontal: 20,
//   },

//   grid: {
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     justifyContent: 'space-between',
//   },

//   couponTile: {
//     width: '30%',
//     height: 70,
//     backgroundColor: '#fff',
//     borderRadius: 14,
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginBottom: 16,
//   },

//   couponLogo: {
//     width: 60,
//     height: 40,
//     resizeMode: 'contain',
//   },

//   /* Bottom Wave */
//   bottomWave: {
//     height: 60,
//     backgroundColor: '#7ea640',
//     borderTopLeftRadius: 60,
//     borderTopRightRadius: 60,
//     marginTop: 20,
//   },
// });
