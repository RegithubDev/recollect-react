import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Image,
  TextInput,Alert,
  ActivityIndicator
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { placeBioWasteOrder, placeScrapOrder } from '../../services/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

const TOKEN_KEY = "tempToken";

export default function ConfirmPickupScreen({ navigation,route }) {
const { selectedItems = [], address, selectedDate, serviceType,scrapRegionId  } = route.params || {};
  const [items, setItems] = useState(selectedItems);
const [showAltInput, setShowAltInput] = useState(false);
const [altNumber, setAltNumber] = useState('');

const [placingOrder, setPlacingOrder] = useState(false);

  const formatDate = (date) => {
    if (!date) return 'Schedule Pickup';
    const d = new Date(date);
    return d.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  };

const removeItem = (id) => {
  setItems(prev => prev.filter(item => item.id !== id));
};



const handleConfirmPickup = async () => {
  if (!selectedDate) return;

  try {
    setPlacingOrder(true);

    const token = await AsyncStorage.getItem(TOKEN_KEY);

    let payload;

    // 🟣 BIO / DH WASTE ORDER
if (serviceType === "bio") {
  payload = {
    scheduleDate: selectedDate,
    altNumber: altNumber || undefined,
    addressId: address?.id,
    platform: "android",
    items: items?.map(i => ({
      id: i.id,
      quantity: 1
    }))
  };

  res = await placeBioWasteOrder(payload);
}



    // 🟢 SCRAP ORDER (this API is usually different)
 else if (serviceType === "scrap") {
  payload = {
    scheduleDate: selectedDate,
    altNumber: altNumber ? `+91${altNumber}` : undefined,
    platform: "android",
    addressId: address?.id,
    items: items?.map(i => ({
      id: i.id,
      quantity: i.quantity || 1
    }))
  };

  res = await placeScrapOrder(payload);
}


    console.log("ORDER RESPONSE:", res);

    if (res?.message?.toLowerCase()?.includes("order")) {
      navigation.replace("PickupSuccess", {
        orderId: res?.data?.id,
        selectedDate: res?.data?.scheduleDate,
        serviceType: serviceType || res?.data?.type
      });
    } else {
      Alert.alert("Error", res?.message || "Failed to place order");
    }
  } catch (err) {
    Alert.alert(
      "Order Failed",
      err?.response?.data?.message || err.message || "Something went wrong"
    );
  } finally {
    setPlacingOrder(false);
  }
};

const getScrapPriceText = (item) => {
  if (!item.payable) return "";
  const unit = item.kg ? "kg" : "pc";
  return `₹${item.price}/${unit}`;
};




  return (
    <SafeAreaView style={styles.container}>
      {/* HEADER */}
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
                  <Text style={styles.headerTitle}>Confirm PickUp</Text>
                </View>
   

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 120 }}
      >
        {/* ADDRESS CARD */}
        <View style={styles.card}>
          <View style={styles.pickupRow}>
            <Text style={styles.pickupText}>Pickup at</Text>

            <View style={styles.officeBadge}>
              {/* <Image
                source={require('../../../assets/office.png')}
                style={styles.officeIcon}
              /> */}
           <Text style={styles.officeText}>
  {address?.residenceType || 'Address'}
</Text>

            </View>
          </View>

          <Text style={styles.nameText}>{address?.fullName}</Text>


        {[
  { label: 'Landmark', value: address?.landmark },
  { label: 'Local Body', value: address?.localBodyName },
  { label: 'Region', value: address?.scrapRegionName },
  { label: 'Ward', value: address?.wardName },
].map((item, index) => (
  <LinearGradient
    key={index}
    colors={['#9b9b9bff', '#969696ff']}
    style={styles.infoRow}
  >
    <Text style={styles.infoLabel}>{item.label}</Text>
    <Text style={styles.infoValue}>{item.value || '-'}</Text>
  </LinearGradient>
))}

          <View style={styles.contactRow}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          
              <Text style={styles.contactText}>
                 <Image
                source={require('../../../assets/call.png')}
                style={styles.phoneIcon}
              />
                {' '}
                <Text style={styles.phoneNumber}>   +917997661770</Text>
              </Text>
            </View>

        <TouchableOpacity
  style={styles.addButton}
  onPress={() => setShowAltInput(true)}
>
  <Text style={styles.addText}>
    {altNumber ? 'Edit' : 'Add'}
  </Text>
</TouchableOpacity>

          </View>

          {showAltInput && (
  <View style={styles.altInputContainer}>
    <Text style={styles.altLabel}>Alternative Mobile Number</Text>

    <TextInput
      style={styles.altInput}
      placeholder="Enter mobile number"
      placeholderTextColor="#444"
      keyboardType="phone-pad"
      maxLength={10}
      value={altNumber}
      onChangeText={setAltNumber}
    />

    <TouchableOpacity
      style={styles.saveAltBtn}
      onPress={() => setShowAltInput(false)}
      disabled={altNumber.length !== 10}
    >
      <Text style={styles.saveAltText}>Save</Text>
    </TouchableOpacity>
  </View>
)}

        </View>

        {/* BIOMEDICAL WASTE CARD */}
        <View style={styles.card}>
          <View style={styles.sectionHeader}>
            {/* <Image
              source={require('../../../assets/biomedical.png')}
              style={styles.bioIcon}
            /> */}
            <Text style={styles.sectionTitle}>Bio Medical Waste</Text>
          </View>

      <View style={styles.selectedBox}>
  <Text style={styles.selectedTitle}>Selected Items</Text>

{items.map((item) => (
  <View key={item.id} style={styles.selectedItemRow}>
    
    <View style={{ flex: 1 }}>
      <Text style={styles.selectedItemText}>{item.name}</Text>

      {item.payable && (
        <Text style={styles.priceText}>{getScrapPriceText(item)}</Text>
      )}
    </View>

    <TouchableOpacity
      style={styles.removeCircle}
      onPress={() => removeItem(item.id)}
    >
      <Text style={styles.removeText}>×</Text>
    </TouchableOpacity>
  </View>
))}


  <TouchableOpacity
    style={styles.addMoreBtn}
    onPress={() => navigation.goBack()}
  >
    <Text style={styles.addMoreText}>Add More Items</Text>
  </TouchableOpacity>
</View>

        </View>

        {/* SCHEDULE BUTTON */}
       <TouchableOpacity
  style={styles.scheduleBtn}
  onPress={() =>
    navigation.navigate('Schedule', {
      address,
      selectedItems: items,
      selectedDate,
       serviceType,
     scrapRegionId
    })
  }
>
  <Text style={styles.scheduleText}>
    {formatDate(selectedDate)}
  </Text>
</TouchableOpacity>

<TouchableOpacity
  style={[
    styles.confirmBtn,
    (!selectedDate || placingOrder) && { opacity: 0.4 },
  ]}
  disabled={!selectedDate || placingOrder}
  onPress={handleConfirmPickup}
>
  {placingOrder ? (
    <ActivityIndicator color="#fff" />
  ) : (
    <Text style={styles.confirmText}>Confirm Pickup</Text>
  )}
</TouchableOpacity>



      </ScrollView>
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0b1410',
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

  altInputContainer: {
  marginTop: 14,
  backgroundColor: '#ffffffff',
  borderRadius: 18,
  padding: 14,
},
priceText: {
  fontSize: 13,
  color: "#2e7d32",
  marginTop: 2,
  fontWeight: "600",
},

altLabel: {
  fontSize: 14,
  fontWeight: '600',
  marginBottom: 8,
  color: '#000',
},

altInput: {
  backgroundColor: '#fff',
  borderRadius: 12,
  paddingHorizontal: 14,
  paddingVertical: 12,
  fontSize: 16,
  color: '#000',
},

saveAltBtn: {
  backgroundColor: '#187D57',
  marginTop: 12,
  paddingVertical: 12,
  borderRadius: 14,
  alignItems: 'center',
},

saveAltText: {
  fontSize: 16,
  fontWeight: '700',
  color:'#fff'
},

altNumberText: {
  marginTop: 6,
  fontSize: 14,
  color: '#000',
  fontWeight: '600',
},


  headerTitle: {
    fontSize: 22,
    color: '#ffffffff',
    fontFamily: 'Poppins-SemiBold',
  },

  card: {
    backgroundColor: '#e1e1e1ff',
    borderRadius: 26,
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 20,
  },

  pickupRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  pickupText: {
    color: '#000000ff',
    fontSize: 14,
  },

  officeBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#000000ff',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },

  officeIcon: {
    width: 18,
    height: 18,
    tintColor: '#000000ff',
    marginRight: 6,
  },

  officeText: {
    color: '#000000ff',
    fontWeight: '600',
  },

  nameText: {
    color: '#000000ff',
    fontSize: 18,
    marginTop: 14,
    marginBottom: 10,
  },

  infoRow: {
    borderRadius: 14,
    padding: 14,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  infoLabel: {
    color: '#000000ff',
    fontSize: 15,
  },

  infoValue: {
    color: '#000000ff',
    fontSize: 15,
    fontWeight: '500',
  },

  contactRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },

  phoneIcon: {
    width: 18,
    height: 18,
    tintColor: '#000000ff',
  marginLeft:'4%'
  },

  contactText: {
    color: '#000000ff',
    fontSize: 15,
  },

  phoneNumber: {
    color: '#000000ff',
    fontWeight: '600',
  },

  addButton: {
    backgroundColor: '#636363ff',
    paddingHorizontal: 18,
    paddingVertical: 8,
    borderRadius: 18,
  },

  addText: {
    fontWeight: '700',
    color:'#fff'
  },

  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },

  bioIcon: {
    width: 32,
    height: 32,
    marginRight: 10,
  },

  sectionTitle: {
    color: '#000000ff',
    fontSize: 18,
    fontWeight: '600',
  },

  selectedBox: {
    backgroundColor: '#b7b7b7ff',
    borderRadius: 22,
    padding: 16,
  },

  selectedTitle: {
    color: '#000000ff',
    fontSize: 16,
    marginBottom: 10,
    fontWeight:'800'
  },

  selectedItemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 0.6,
    borderBottomColor: '#000000ff',
    paddingVertical: 12,
  },

  selectedItemText: {
    color: '#000000ff',
    fontSize: 16,
  },

  removeCircle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#000000ff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  removeText: {
    color: '#000000ff',
    fontSize: 18,
  },

  addMoreBtn: {
    backgroundColor: '#187D57',
    paddingVertical: 14,
    borderRadius: 24,
    alignItems: 'center',
    marginTop: 16,
  },

  addMoreText: {
    fontSize: 16,
    fontWeight: '700',
    color:'#fff'
  },

  scheduleBtn: {
    backgroundColor: '#126948ff',
    paddingVertical: 18,
    borderRadius: 30,
    alignItems: 'center',
    marginHorizontal: 16,
    marginBottom: 30,
  },

  scheduleText: {
    fontSize: 18,
    fontWeight: '700',
    color:'#fff'
  },
    confirmBtn: {
    backgroundColor: '#67adc6ff',
    paddingVertical: 18,
    borderRadius: 30,
    alignItems: 'center',
    marginHorizontal: 16,
    marginBottom: 30,
  },
  confirmText: {
     fontSize: 18,
    fontWeight: '700',
     color:'#fff'
  }
});
