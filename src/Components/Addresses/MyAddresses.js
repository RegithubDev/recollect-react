import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import { getCustomerAddresses } from '../../services/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

const TOKEN_KEY = 'tempToken';

const MyAddressesScreen = ({ navigation,route }) => {
   const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(false);
const { serviceType } = route.params || {};
  useEffect(() => {
    fetchAddresses();
  }, []);

  const fetchAddresses = async () => {
    setLoading(true);
    try {
      const token = await AsyncStorage.getItem(TOKEN_KEY);
      const data = await getCustomerAddresses(token);
      setAddresses(data);
    } catch (err) {
      console.log('Address load failed');
    } finally {
      setLoading(false);
    }
  };
  return (
    <LinearGradient
      colors={['#3d4b10', '#c0c0c0ff', '#c0c0c0ff']}
      style={styles.container}
    >
      <SafeAreaView style={{ flex: 1 }}>
        {/* Header */}
    <View style={styles.headerRow}>
                <TouchableOpacity
                  style={styles.backButton}
                  onPress={() => navigation.goBack?.()}
                >
                <Image
                                source={require('../../../assets/back.png')}
                                style={styles.avatarImage}
                              />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>My Addresses</Text>
              </View>

        <ScrollView contentContainerStyle={styles.content}>
          {/* Add New Address */}
          <TouchableOpacity style={styles.addCard}>
          <View style={styles.addLeft}>
  <Image
    source={require('../../../assets/add.png')}
    style={styles.addIcon}
  />
  <Text style={styles.addText}>Add New Address</Text>
</View>

         <Image
    source={require('../../../assets/right-arrow.png')}
    style={styles.addIcon}
  />
          </TouchableOpacity>

          {/* Section Title */}
          <Text style={styles.sectionTitle}>Your Saved Addresses</Text>

          {/* Address List */}
    {addresses.map(item => (
  <TouchableOpacity
    key={item.id}
    style={styles.addressCard}
    activeOpacity={0.8}
    onPress={() =>
      navigation.navigate('SelectItem', { address: item,serviceType })
    }
  >
    <View style={styles.addressRow}>
      <View style={styles.iconCircle}>
        <Image
          source={require('../../../assets/locate.png')}
          style={styles.addIcon}
        />
      </View>

      <View style={styles.addressText}>
        <Text style={styles.addressTitle}>
          {item.residenceType || 'Address'}
        </Text>

        <Text style={styles.addressSub}>
          {item.residenceDetails}
        </Text>

        <Text style={styles.addressSub}>
          {item.localBodyName}, {item.districtName}
        </Text>
      </View>

      <Image
        source={require('../../../assets/right-arrow.png')}
        style={styles.addIcon}
      />
    </View>

    <View style={styles.actions}>
      <TouchableOpacity style={styles.actionBtn}>
        <Image
          source={require('../../../assets/pencil.png')}
          style={styles.addIcon}
        />
      </TouchableOpacity>

      <TouchableOpacity style={styles.actionBtn}>
        <Image
          source={require('../../../assets/deletebin.png')}
          style={styles.addIcon}
        />
      </TouchableOpacity>
    </View>
  </TouchableOpacity>
))}



        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default MyAddressesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 18,
   marginTop:'10%',
    paddingBottom: 18,
  },
  backButton: {
    paddingRight: 10,
    paddingVertical: 4,
  },
    avatarImage: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },

  headerTitle: {
    fontSize: 22,
    color: '#000000ff',
    fontFamily: 'Poppins-SemiBold',
  },

  content: {
    padding: 16,
  },

  addCard: {
    backgroundColor: '#c5c5c5ff',
    borderRadius: 16,
    padding: 18,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#c5c5c5ff',
  },

  addLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
addIcon: {
  width: 22,
  height: 22,
  resizeMode: 'contain',
},

  addText: {
    color: '#000000ff',
    fontSize: 16,
    marginLeft: 10,
    fontWeight: '500',
  },

  sectionTitle: {
    color: '#b7e44c',
    fontSize: 18,
    marginVertical: 20,
    fontWeight: '900',
    fontFamily: 'Poppins-SemiBold',
  },

  addressCard: {
    paddingVertical: 18,
    borderBottomWidth: 1,
    borderColor: '#2a2a2a',
  },

  addressRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  iconCircle: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#2b3215',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },

  addressText: {
    flex: 1,
  },

  addressTitle: {
    color: '#000000ff',
    fontSize: 16,
    fontWeight: '600',
  },

  addressSub: {
    color: '#000000ff',
    marginTop: 2,
    fontSize: 14,
  },

  actions: {
    flexDirection: 'row',
    marginLeft: 56,
    marginTop: 12,
  },

  actionBtn: {
    width: 42,
    height: 42,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#2a2a2a',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
});
