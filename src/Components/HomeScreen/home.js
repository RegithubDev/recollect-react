// src/screens/HomeScreen.js
import React, { useContext, useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Alert,
} from 'react-native';
import WasteGauge from '../HomeScreen/WasteGauge';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from '../../context/AuthContext';
import { getPickupServices, buildServiceIconUrl } from '../../services/auth';
import LinearGradient from 'react-native-linear-gradient';

const sanitaryIcon = require('../../../assets/hazard.png');
const scrapIcon = require('../../../assets/waste.png');
const chevronIcon = require('../../../assets/rightarrow.png');
const TOKEN_KEY = 'tempToken';
const getServiceIcon = (serviceName) => {
  if (serviceName.toLowerCase().includes('bio')) {
    return sanitaryIcon; // hazard.png
  }
  if (serviceName.toLowerCase().includes('scrap')) {
    return scrapIcon; // waste.png
  }
  return sanitaryIcon; // fallback
};

const getServiceBg = (serviceName) => {
  if (serviceName.toLowerCase().includes('bio')) {
    return '#3A2C18';
  }
  if (serviceName.toLowerCase().includes('scrap')) {
    return '#1C2E3A';
  }
  return '#333';
};
const HomeScreen = ({ navigation }) => {
  const [services, setServices] = useState([]);
  const [loadingServices, setLoadingServices] = useState(false);
  const [servicesError, setServicesError] = useState(null);
  const { userToken } = useContext(AuthContext);

 useEffect(() => {
    let mounted = true;
    (async () => {
      setLoadingServices(true);
      setServicesError(null);
      try {
        const token = await AsyncStorage.getItem(TOKEN_KEY); // TOKEN_KEY defined above
        const data = await getPickupServices(token);
        console.log("data",data)
        if (!mounted) return;
        setServices(data);
      } catch (err) {
        if (!mounted) return;
        setServicesError('Failed to load services');
        console.error('pickup services load error', err);
      } finally {
        if (mounted) setLoadingServices(false);
      }
    })();
    return () => { mounted = false; };
  }, []);

  const onServicePress= (svc) =>{
    console.log("svc",svc)
 navigation.navigate('Address',{  serviceType: svc.name,});

  }

return (
  <View style={styles.container}>
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.scroll}
    >
      {/* HEADER */}
      <View style={styles.headerRow}>
        <View>
          <Text style={styles.welcomeText}>Welcome</Text>
          <Text style={styles.userName}>Lakshmi Monika 👋</Text>
        </View>

        <View style={styles.bellWrap}>
          <Image
            source={require('../../../assets/notification.png')}
            style={styles.bellIcon}
          />
        </View>
      </View>

      {/* IMPACT CARD */}
    <LinearGradient
  colors={['#07291eff', '#1E6F52']}
  start={{ x: 0, y: 0 }}
  end={{ x: 1, y: 1 }}
  style={styles.impactCard}
>
  <View style={styles.impactHeader}>
    <Text style={styles.impactLabel}>YOUR IMPACT ↗</Text>
    <View style={styles.leafCircle}>
      <Image
        source={require('../../../assets/leaf.png')}
        style={styles.leafIcon}
      />
    </View>
  </View>

  <Text style={styles.impactValue}>
    127.5 <Text style={styles.impactUnit}>kg</Text>
  </Text>
  <Text style={styles.impactSub}>Total waste recycled</Text>

  <View style={styles.impactStats}>
    <View style={styles.statItem}>
      <Text style={[styles.statValue, { color: '#FF9F1C' }]}>77</Text>
      <Text style={styles.statLabel}>DH Waste</Text>
    </View>

    <View style={styles.statItem}>
      <Text style={[styles.statValue, { color: '#3B82F6' }]}>51</Text>
      <Text style={styles.statLabel}>Scrap</Text>
    </View>

    <View style={styles.statItem}>
      <Text style={[styles.statValue, { color: '#2DE39E' }]}>319</Text>
      <Text style={styles.statLabel}>CO₂ Saved</Text>
    </View>
  </View>
</LinearGradient>


      {/* SCHEDULE */}
      <View style={styles.sectionRow}>
        <Text style={styles.sectionTitle}>Schedule Pickup</Text>
        {/* <Image
          source={require('../../../assets/calendar.png')}
          style={styles.calendarIcon}
        /> */}
      </View>
<View style={styles.pickupRow}>
  {services.map((svc) => (
    <TouchableOpacity
      key={svc.id}
      style={styles.pickupCard}
      disabled={svc.isDisabled}
      onPress={() => onServicePress(svc)}
      activeOpacity={0.85}
    >
      <View
        style={[
          styles.pickupIconWrap,
          { backgroundColor: getServiceBg(svc.name) },
        ]}
      >
        <Image
          source={getServiceIcon(svc.name)}   // ✅ SAME ICONS
          style={styles.pickupIcon}
        />
      </View>

      <Text style={styles.pickupTitle}>
        {svc.name === 'Bio Medical Waste' ? 'DH Waste' : svc.name}
      </Text>

      <Text style={styles.pickupSub}>{svc.subtitle}</Text>
    </TouchableOpacity>
  ))}
</View>


      {/* IMPACT SUMMARY */}
      <View style={styles.sectionRow}>
        <Text style={styles.sectionTitle}>Your Impact</Text>
        <Text style={styles.viewAll}>View All →</Text>
      </View>

      <View style={styles.impactMiniCard}>
        <View style={styles.earthCircle}>
          <Image
            source={require('../../../assets/globe.png')}
            style={styles.earthIcon}
          />
        </View>
        <View>
          <Text style={styles.miniLabel}>Trees Equivalent Saved</Text>
          <Text style={styles.miniValue}>12 Trees</Text>
        </View>
      </View>
    </ScrollView>
  </View>
);

};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0b1410',
  },

  scroll: {
    padding: 20,
    paddingBottom: 120,
  },

  /* HEADER */
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  marginTop:'10%'
  },

  welcomeText: {
    color: '#9CA3AF',
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
  },

  userName: {
    color: '#FFFFFF',
    fontSize: 22,
    fontFamily: 'Poppins-SemiBold',
  },

  bellWrap: {
    width: 46,
    height: 46,
    borderRadius: 23,
    borderWidth: 1,
    borderColor: '#2DE39E55',
    alignItems: 'center',
    justifyContent: 'center',
  },

  bellIcon: {
    width: 22,
    height: 22,
    tintColor: '#2DE39E',
  },

  /* IMPACT CARD */
  impactCard: {
    backgroundColor: '#143C2B',
    borderRadius: 22,
    padding: 20,
    marginTop: '3%',
    borderWidth: 1,
    borderColor: '#2DE39E33',
  },

  impactHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },

  impactLabel: {
    color: '#2DE39E',
    fontFamily: 'Poppins-SemiBold',
    fontSize: 14,
  },

  leafCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    // backgroundColor: '#1E5A3E',
    alignItems: 'center',
    justifyContent: 'center',
  },

  leafIcon: {
    width: 38,
    height: 38,
    // tintColor: '#2DE39E',
  },

  impactValue: {
    color: '#FFFFFF',
    fontSize: 40,
    fontFamily: 'Poppins-SemiBold',
  },

  impactUnit: {
    fontSize: 18,
    color: '#9CA3AF',
  },

  impactSub: {
    color: '#9CA3AF',
    marginBottom: 20,
  },

  impactStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  statItem: {
    alignItems: 'center',
    flex: 1,
  },

  statValue: {
    fontSize: 20,
    fontFamily: 'Poppins-SemiBold',
  },

  statLabel: {
    color: '#9CA3AF',
    fontSize: 12,
  },

  /* SECTIONS */
  sectionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: '3%',
  },

  sectionTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
  },

  viewAll: {
    color: '#2DE39E',
    fontFamily: 'Poppins-Medium',
  },

  calendarIcon: {
    width: 22,
    height: 22,
    tintColor: '#9CA3AF',
  },

  /* PICKUP */
  pickupRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },

  pickupCard: {
    width: '48%',
    backgroundColor: '#0F1F18',
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: '#2DE39E33',
  },

  pickupIconWrap: {
    width: 54,
    height: 54,
    borderRadius: 27,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },

  pickupIcon: {
    width: 26,
    height: 26,
    tintColor: '#FFFFFF',
  },

  pickupTitle: {
    color: '#FFFFFF',
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
  },

  pickupSub: {
    color: '#9CA3AF',
    fontSize: 12,
  },

  /* MINI CARD */
  impactMiniCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0F1F18',
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: '#2DE39E33',
  },

  earthCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    // backgroundColor: '#1E5A3E',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },

  earthIcon: {
    width: 30,
    height: 30,
  },

  miniLabel: {
    color: '#9CA3AF',
    fontSize: 12,
  },

  miniValue: {
    color: '#FFFFFF',
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
  },
});

