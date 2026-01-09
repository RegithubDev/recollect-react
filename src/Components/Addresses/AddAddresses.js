import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Image,
  ScrollView,
} from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";
import DropDownPicker from "react-native-dropdown-picker";

import {
 
  addCustomerAddress,
  getScrapRegionList,
  getWardList,
} from "../../services/auth";

const AddAddressScreen = ({ navigation, route }) => {
  /* -------------------- COORDS (SAFE DEFAULT) -------------------- */
const incomingCoords = route?.params?.coords;

const [coords, setCoords] = useState({
  latitude: incomingCoords?.latitude ?? 17.4448,
  longitude: incomingCoords?.longitude ?? 78.3498,
  address: incomingCoords?.address ?? "",
});

  const [residenceDetails, setResidenceDetails] = useState("");
  const [landmark, setLandmark] = useState("");
  const [residenceType, setResidenceType] = useState("Home");
  const [customerId, setCustomerId] = useState(null);

  // Ward
  const [wardOpen, setWardOpen] = useState(false);
  const [wardItems, setWardItems] = useState([]);
  const [wardId, setWardId] = useState(null);

  // Scrap region
  const [regionOpen, setRegionOpen] = useState(false);
  const [regionItems, setRegionItems] = useState([]);
  const [scrapRegionId, setScrapRegionId] = useState(null);

  /* -------------------- INITIAL LOAD -------------------- */
  useEffect(() => {
    AsyncStorage.getItem("customerId").then(id => {
      if (id) setCustomerId(Number(id));
    });
  }, []);

  /* -------------------- FETCH LISTS -------------------- */
  useEffect(() => {
    getWardList(100).then(res => {
      setWardItems(
        res.map(i => ({
          label: i.wardName,
          value: i.id,
          districtName: i.districtName,
          stateName: i.stateName,
          countryName: i.countryName,
        }))
      );
    });

    getScrapRegionList(100).then(res => {
      setRegionItems(
        res.map(i => ({
          label: i.name,
          value: i.id,
          districtName: i.districtName,
          stateName: i.stateName,
          countryName: i.countryName,
        }))
      );
    });
  }, []);

  /* -------------------- SAVE -------------------- */
  const handleSave = async () => {
    if (!residenceDetails || !wardId) {
      Alert.alert("Missing fields", "Please fill required fields");
      return;
    }

    if (!coords?.latitude || !coords?.longitude) {
      Alert.alert("Error", "Location not found");
      return;
    }

    const payload = {
      customerId,
      wardId,
      scrapRegionId,
      residenceType,
      residenceDetails,
      landmark,
      latitude: coords.latitude.toString(),
      longitude: coords.longitude.toString(),
      // isScrapService: true,
      isScrapLocationActive: true,
      // isBioWasteService: true,
      isBioWasteLocationActive: true,
    };

    await addCustomerAddress(payload);
    console.log("cords",payload)
    Alert.alert("Success", "Address added");
    // navigation.goBack();
//     navigation.navigate({
//   name: "Address",
//   params: { refresh: true },
//   merge: true,
// });
navigation.pop(2);


  };

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.headerRow}>
           <TouchableOpacity
             style={styles.backButton}
             onPress={() => navigation.goBack?.()}
           >
             <Image
               source={require('../../../assets/back.png')}
               style={styles.backIcon}
             />
           </TouchableOpacity>
   
           <Text style={styles.headerTitle}>Add Location</Text>
   
           <View style={{ width: 36 }} />
         </View>
   

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* ADDRESS */}
        {coords?.address ? (
          <>
            <Text style={styles.detected}>Detected Address</Text>
            <Text style={styles.address}>{coords.address}</Text>
          </>
        ) : null}

        {/* FORM */}
        <Text style={styles.label}>Residential Address</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter address"
          placeholderTextColor="#666"
          onChangeText={setResidenceDetails}
        />

    <Text style={styles.label}>Ward</Text>

<DropDownPicker
  open={wardOpen}
  value={wardId}
  items={wardItems}
  setOpen={setWardOpen}
  setValue={() => {}}   // ❗ required
  setItems={setWardItems}
  listMode="MODAL"
  searchable={true}
  placeholder="Select Ward"
  searchPlaceholder="Search ward, district, state..."

  searchTextInputProps={{
    autoCorrect: false,
  }}

  renderListItem={({ item, onPress, isSelected }) => (
    <TouchableOpacity
      onPress={() => {
        onPress();
        setWardId(Number(item.value));
      }}
      style={{
        paddingVertical: 10,
        paddingHorizontal: 14,
        backgroundColor: isSelected ? "#f2f2f2" : "#fff",
        borderBottomWidth: 0.6,
        borderColor: "#ddd",
      }}
    >
      <Text style={{ fontWeight: "700", fontSize: 15 }}>
        {item.label}
      </Text>

      <Text style={{ fontSize: 12, color: "#6e6e6e", marginTop: 2 }}>
        {item.districtName} • {item.stateName} • {item.countryName}
      </Text>
    </TouchableOpacity>
  )}

  style={{ backgroundColor: "#e2e2e2ff", borderColor: "#444" }}
  dropDownContainerStyle={{ backgroundColor: "#fff", borderColor: "#ccc" }}
/>


     <Text style={styles.label}>Scrap Region</Text>

<DropDownPicker
  open={regionOpen}
  value={scrapRegionId}
  items={regionItems}
  setOpen={setRegionOpen}
  setValue={() => {}}   // ❗ required
  setItems={setRegionItems}
  listMode="MODAL"
  searchable={true}
  placeholder="Select Scrap Region"
  searchPlaceholder="Search region, district, state..."

  searchTextInputProps={{
    autoCorrect: false,
  }}

  renderListItem={({ item, onPress, isSelected }) => (
    <TouchableOpacity
      onPress={() => {
        onPress();
        setScrapRegionId(Number(item.value));
      }}
      style={{
        paddingVertical: 10,
        paddingHorizontal: 14,
        backgroundColor: isSelected ? "#f2f2f2" : "#fff",
        borderBottomWidth: 0.6,
        borderColor: "#ddd",
      }}
    >
      <Text style={{ fontWeight: "700", fontSize: 15 }}>
        {item.label}
      </Text>

      <Text style={{ fontSize: 12, color: "#6e6e6e", marginTop: 2 }}>
        {item.districtName} • {item.stateName} • {item.countryName}
      </Text>
    </TouchableOpacity>
  )}

  style={{ backgroundColor: "#e2e2e2ff", borderColor: "#444" }}
  dropDownContainerStyle={{ backgroundColor: "#fff", borderColor: "#ccc" }}
/>


        <Text style={styles.label}>Landmark</Text>
        <TextInput
          style={styles.input}
          placeholder="Landmark"
          placeholderTextColor="#666"
          onChangeText={setLandmark}
        />

        <View style={{ flexDirection: "row", marginBottom: 14 }}>
          {["Home", "Office", "Others"].map(t => (
            <TouchableOpacity
              key={t}
              style={[
                styles.typeBtn,
                residenceType === t && styles.typeBtnActive,
              ]}
              onPress={() => setResidenceType(t)}
            >
              <Text style={{ color: "#fff" }}>{t}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity style={styles.addBtn} onPress={handleSave}>
          <Text style={styles.addBtnText}>Add Address</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default AddAddressScreen;

/* -------------------- STYLES -------------------- */
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0b1410", padding: 16 },
  headerRow: { flexDirection: "row", alignItems: "center", marginBottom: 10 },
  avatarImage: { width: 30, height: 30, tintColor: "#fff" },

  detected: { color: "#9ca3af", marginTop: 10 },
  address: { color: "#fff", marginBottom: 10 },
  label: { color: "#fff", marginTop: '2%',marginBottom:'2%' },
  input: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 12,
    marginBottom: 10,
    color: "#000",
  },
  typeBtn: {
    padding: 10,
    borderRadius: 12,
    marginRight: 8,
    backgroundColor: "#333",
  },

    headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 18,
    paddingTop: '12%',
    paddingBottom: 8,
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255, 255, 255, 0.27)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backIcon: {
    width: 18,
    height: 18,
    resizeMode: 'contain',
    tintColor: '#ffffffff',
  },
  headerTitle: {
    flex: 1,
    textAlign: 'center',
    fontSize: 20,
    color: '#ffffffff',
    fontFamily: 'Poppins-SemiBold',
  },
  typeBtnActive: { backgroundColor: "#1f8f5f" },
  addBtn: {
    backgroundColor: "#1f8f5f",
    padding: 14,
    borderRadius: 16,
    marginTop: 10,
  },
  addBtnText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "700",
  },
});
