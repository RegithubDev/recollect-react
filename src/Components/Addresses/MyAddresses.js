import React, { useCallback, useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Image,
  Alert,
  FlatList,
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import { deleteCustomerAddress, getCustomerAddresses } from '../../services/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

const TOKEN_KEY = 'tempToken';

const MyAddressesScreen = ({ navigation,route }) => {
   const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(false);
const { serviceType } = route.params || {};
useFocusEffect(
  useCallback(() => {
    fetchAddresses();
    return () => {};
  }, [])
);



const fetchAddresses = async () => {
  setLoading(true);
  try {
    const token = await AsyncStorage.getItem(TOKEN_KEY);
    const res = await getCustomerAddresses(token);

    console.log("RAW getCustomerAddresses():", res);

    const list = Array.isArray(res)
      ? res
      : res?.content || res?.data?.content || [];

    console.log("Parsed addresses:", list);

    setAddresses(list);
  } catch (err) {
    console.log("Address load failed", err);
  } finally {
    setLoading(false);
  }
};



  const deleteAddress = (id) => {
  Alert.alert(
    "Delete Address",
    "Are you sure you want to delete this address?",
    [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Yes, Delete",
        style: "destructive",
        onPress: async () => {
          try {
            const res = await deleteCustomerAddress(id);

            if (res.ok) {
              Alert.alert("Address deleted successfully");
              fetchAddresses();   // refresh list
            } else {
              Alert.alert(res?.data?.message || "Failed to delete address");
            }
          } catch (err) {
            console.log(err);
            Alert.alert("Something went wrong");
          }
        },
      },
    ]
  );
};


const editAddress = (item) => {
  navigation.navigate("EditAddress", { address: item, regionId: item.scrapRegionId, });
};


  return (
    <LinearGradient
      colors={['#0b1410', '#0b1410', '#0b1410']}
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
          {/* <TouchableOpacity style={styles.addCard}>
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
          </TouchableOpacity> */}

          <View style={styles.topRow}>
  <View style={styles.searchBox}>
    {/* <Image
      source={require('../../../assets/search.png')}
      style={styles.searchIcon}
    /> */}
    <Text style={styles.searchPlaceholder}>Search addresses...</Text>
  </View>

<TouchableOpacity
  style={styles.addBtn}
  onPress={() => navigation.navigate('ConfirmLocation')}
>
  <Text style={styles.addBtnText}>＋ Add Address</Text>
</TouchableOpacity>

</View>


          {/* Section Title */}
          <Text style={styles.sectionTitle}>Your Saved Addresses</Text>

          {/* Address List */}
<FlatList
  data={addresses}
  keyExtractor={(item) => item.id.toString()}
  contentContainerStyle={{ paddingBottom: 60 }}
  renderItem={({ item }) => (
    <TouchableOpacity
      style={styles.addressCard}
      activeOpacity={0.9}
      onPress={() => {
        if (serviceType?.toLowerCase().includes('scrap')) {
          navigation.navigate('SelectScrap', {
            address: item,
            serviceType,
            regionId: item.scrapRegionId,
            districtId: item.districtId, 
          });
        } else {
          navigation.navigate('SelectDHWaste', {
            address: item,
            serviceType,
            regionId: item.scrapRegionId,
          });
        }
      }}
    >
      {item.isPrimary && (
        <View style={styles.primaryBadge}>
          <Text style={styles.primaryText}>★ Primary</Text>
        </View>
      )}
{item.isScrapService === false && item.isBioWasteService === false && (
  <View style={styles.noServiceTagRight}>
    <Text style={styles.noServiceText}>No Service</Text>
  </View>
)}


      <View style={styles.addressRow}>
        <View style={styles.iconCircle}>
          <Image source={require('../../../assets/locate.png')} style={styles.addIcon} />
        </View>

        <View style={styles.addressText}>
          <Text style={styles.addressTitle}>{item.residenceType || 'Address'}</Text>
          <Text style={styles.addressSub}>{item.residenceDetails}</Text>
          <Text style={styles.addressSub}>
            {item.wardName}
            {/* , {item.districtName} */}
          </Text>
        </View>
      </View>

      <View style={styles.actions}>
        <TouchableOpacity style={styles.actionBtn}onPress={() =>
  navigation.navigate("ConfirmEditAddress", {
    addressId: item.id,
     latitude: Number(item.latitude),
      longitude: Number(item.longitude),
      fullAddress: item.residenceDetails,
  })
}
>
          <Image source={require('../../../assets/pencil.png')} style={styles.Icon} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionBtn} onPress={() => deleteAddress(item.id)}>
          <Image source={require('../../../assets/deletebin.png')} style={styles.Icon} />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  )}
/>





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
topRow: {
  flexDirection: 'row',
  alignItems: 'center',
  padding: 16,
},
noServiceTagRight: {
  position: 'absolute',
  top: 12,
  right: 12,
  backgroundColor: '#ffebeb',
  borderRadius: 6,
  paddingHorizontal: 8,
  paddingVertical: 4,
  zIndex: 10,
},

noServiceText: {
  color: '#d32f2f',
  fontSize: 11,
  fontWeight: '600',
},


searchBox: {
  flex: 1,
  flexDirection: 'row',
  alignItems: 'center',
  backgroundColor: '#101915',
  borderRadius: 14,
  padding: 14,
  marginRight: 12,
  borderWidth:0.1,
  borderColor:'#ccc'
},

searchIcon: {
  width: 18,
  height: 18,
  tintColor: '#6b7280',
  marginRight: 8,
},

searchPlaceholder: {
  color: '#6b7280',
  fontSize: 14,
},

addBtn: {
  backgroundColor: '#1f8f5f',
  borderRadius: 14,
  paddingVertical: 12,
  paddingHorizontal: 16,
},

addBtnText: {
  color: '#ffffff',
  fontWeight: '600',
},

addressCard: {
  backgroundColor: '#0f1b16',
  borderRadius: 18,
  padding: 16,
  marginBottom: 16,
  borderWidth: 1,
  borderColor: '#1f3a2c',
},

primaryBadge: {
  alignSelf: 'flex-start',
  backgroundColor: '#1f8f5f',
  borderRadius: 20,
  paddingHorizontal: 10,
  paddingVertical: 4,
  marginBottom: 10,
},

primaryText: {
  color: '#ffffffff',
  fontSize: 12,
  fontWeight: '700',
},

moreIcon: {
  width: 18,
  height: 18,
  tintColor: '#9ca3af',
},

tag: {
  alignSelf: 'flex-start',
  backgroundColor: '#1a2a22',
  borderRadius: 10,
  paddingHorizontal: 10,
  paddingVertical: 4,
  marginTop: 12,
},

tagText: {
  color: '#9ca3af',
  fontSize: 12,
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
    tintColor:'#fff'
  },
    avatarImage: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
     tintColor:'#fff'
  },

  headerTitle: {
    fontSize: 22,
    color: '#ffffffff',
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
  tintColor:'#2de39e'

},

Icon : {
 width: 22,
  height: 22,
  resizeMode: 'contain',
  tintColor:'#c4c4c4ff'
},

  addText: {
    color: '#000000ff',
    fontSize: 16,
    marginLeft: 10,
    fontWeight: '500',
  },

  sectionTitle: {
    color: '#2de39e',
    fontSize: 18,
    marginVertical: 20,
    fontWeight: '900',
    fontFamily: 'Poppins-SemiBold',
  },

  // addressCard: {
  //   paddingVertical: 18,
  //   borderBottomWidth: 1,
  //   borderColor: '#2a2a2a',
  // },

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
    color: '#ffffffff',
    fontSize: 16,
    fontWeight: '600',
  },

  addressSub: {
    color: '#ffffffff',
    marginTop: 2,
    fontSize: 14,
  },

actions: {
  flexDirection: 'row',
  justifyContent: 'flex-end',
  marginTop: 14,
},

actionBtn: {
  width: 40,
  height: 40,
  borderRadius: 12,
  borderWidth: 1,
  borderColor: '#2f3f37',
  justifyContent: 'center',
  alignItems: 'center',
  marginLeft: 12,
  backgroundColor: '#0f1b16',
},

});
