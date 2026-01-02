// Splash1.js
import React, { useEffect } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  StatusBar,
} from 'react-native';

const Splash1 = ({ navigation }) => {
  useEffect(() => {
    // navigate to your next screen after 2 seconds
    const timer = setTimeout(() => {
      // change Home to whatever your first screen is
      navigation.replace('Splash2');
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#1f3d2e" />

      {/* Top – bin image */}
      <View style={styles.topContainer}>
          <View style={styles.logoWrapper}>
               <View style={styles.logoBox}>
                 <Image
                   source={require('../../../assets/recycle.png')} // replace with your icon
                   style={styles.logo}
                 />
               </View>
             </View>
      </View>

      {/* Middle – app name */}
<View style={styles.middleContainer}>
  <View style={styles.textBlock}>
    <Text style={styles.boldLine}>
      <Text style={styles.blueText}>TOGETHER </Text>
      <Text style={styles.whiteText}>FOR</Text>
    </Text>

    <Text style={styles.lightLine}>
      <Text style={styles.whiteText}>A </Text>
      <Text style={styles.greenText}>CLEANER </Text>
      <Text style={styles.whiteText}>TOMORROW</Text>
    </Text>

    <View style={styles.divider} />

    <Text style={styles.tagline}>
      Sustainable choices start here
    </Text>
  </View>
</View>





      {/* Bottom – Powered by re Sustainability */}
      <View style={styles.bottomContainer}>
        <Text style={styles.poweredBy}>Powered by</Text>

        <Image
          source={require('../../../assets/logocompany.png')}
          style={styles.reLogo}
          resizeMode="contain"
        />

       
      </View>
    </View>
  );
};

export default Splash1;

const NEON_GREEN = '#2e7903ff'; // adjust to match your brand

const styles = StyleSheet.create({
 container: {
  flex: 1,
  backgroundColor: '#183528', // deeper green = premium
  justifyContent: 'space-between',
  paddingVertical: 36,
},

/* ---------- LOGO ---------- */

logoWrapper: {
  alignItems: 'center',
  marginTop: '22%',
},

logoBox: {
  width: 96,
  height: 96,
  borderRadius: 28,
  backgroundColor: '#0f1f18',
  alignItems: 'center',
  justifyContent: 'center',

  // softer modern glow
  shadowColor: '#2de39e',
  shadowOpacity: 0.35,
  shadowRadius: 28,
  elevation: 12,
},

logo: {
  width: 62,
  height: 62,
  tintColor: '#2de39e',
},

/* ---------- TEXT ---------- */
middleContainer: {
  width: '100%',
  justifyContent: 'center',
  alignItems: 'center',   // ⬅️ CENTER horizontally
},
blueText: {
  color: '#4da6ff', // blue for TOGETHER
},

greenText: {
  color: '#2de39e', // green for CLEANER
},

whiteText: {
  color: '#ffffff',
},

textBlock: {
  alignItems: 'center',   // ⬅️ CENTER text block
},

boldLine: {
  fontSize: 48,
  fontWeight: '900',
  color: '#2de39e',
  letterSpacing: 1.6,
  textAlign: 'center',    // ⬅️ CENTER text
},

lightLine: {
  fontSize: 48,
  fontWeight: '500',
  color: '#b8dccc',
  marginTop: 6,
  letterSpacing: 0.8,
  textAlign: 'center',
},

divider: {
  width: 36,
  height: 3,
  backgroundColor: '#2de39e',
  borderRadius: 2,
  marginVertical: 14,
},

tagline: {
  fontSize: 14,
  color: '#9fbfb0',
  letterSpacing: 0.4,
  textAlign: 'center',
},


/* ---------- FOOTER ---------- */

bottomContainer: {
  alignItems: 'center',
  paddingBottom: 10,
},

poweredBy: {
  fontSize: 13,
  color: '#7d9b8e',
  marginBottom: 6,
},

reLogo: {
  width: 88,
  height: 42,
},

});
