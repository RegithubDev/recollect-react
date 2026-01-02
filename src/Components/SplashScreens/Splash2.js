// src/screens/Splash2.js
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  Image,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const Splash2 = ({ navigation }) => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar barStyle="light-content" />

      <LinearGradient
        colors={['#0b1410', '#0b1410']}
        style={styles.container}
      >
        {/* ---------- HEADER TEXT ---------- */}
        <View style={styles.header}>
          <Text style={styles.title}>
             Rethink waste.{'\n'}
  Rebuild tomorrow.
          </Text>

          <Text style={styles.subtitle}>
            Start your sustainability journey with Recollect.
          </Text>
        </View>

        {/* ---------- ILLUSTRATION ---------- */}
        <View style={styles.illustrationWrapper}>
          <Image
            source={require('../../../assets/iconsplash2.png')} // replace with your illustration
            style={styles.illustration}
            resizeMode="contain"
          />
        </View>

        {/* ---------- OPTIONS ---------- */}
        <View style={styles.optionsRow}>
          {/* Individual */}
          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate('Welcome')}
          >
            <View style={styles.iconCircle}>
              <Image
                source={require('../../../assets/customer.png')}
                style={styles.icon}
              />
            </View>

            <Text style={styles.cardText}>Customer</Text>

            <View style={styles.arrowCircle}>
              <Text style={styles.arrow}>›</Text>
            </View>
          </TouchableOpacity>

          {/* Organization */}
          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate('ProviderLogin')}
          >
            <View style={styles.iconCircle}>
              <Image
                source={require('../../../assets/garbage-truck.png')}
                style={styles.icon}
              />
            </View>

            <Text style={styles.cardText}>Provider</Text>

            <View style={styles.arrowCircle}>
              <Text style={styles.arrow}>›</Text>
            </View>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
};

export default Splash2;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 40,
  },

  /* ---------- TEXT ---------- */
  header: {
    marginTop: 30,
  },
  title: {
    fontSize: 30,
    fontWeight: '700',
    color: '#ffffff',
    lineHeight: 40,
  },
  subtitle: {
    marginTop: 14,
    fontSize: 16,
    color: '#cfd7c8',
  },

  /* ---------- ILLUSTRATION ---------- */
  illustrationWrapper: {
    alignItems: 'center',
    marginVertical: 30,
  },
  illustration: {
    width: '130%',
    height: 260,
  },

  /* ---------- OPTIONS ---------- */
  optionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },

  card: {
    width: '47%',
    backgroundColor: '#45886eff',
    borderRadius: 22,
    borderColor:'#2de39e',
    borderWidth:0.5,
    padding: 20,
    justifyContent: 'space-between',
    height: 180,
    shadowColor: '#2de39e',
  shadowOpacity: 0.25,
  shadowRadius: 28,
  elevation: 12,
  },

  iconCircle: {
    width: 62,
    height: 62,
    borderRadius: 21,
    backgroundColor: '#ffffffff',
    justifyContent: 'center',
    alignItems: 'center',
  },

  icon: {
    width: 42,
    height: 42,
    // tintColor: '#000',
  },

  cardText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#ffffffff',
    marginTop: 18,
  },

  arrowCircle: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-end',
  },

  arrow: {
    color: '#c8db8a',
    fontSize: 24,
    lineHeight: 24,
  },
});
