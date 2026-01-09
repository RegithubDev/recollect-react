import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
  Image,Alert
} from "react-native";
import { getCustomerAddressDetails, getScrapRegionList, getWardList, updateCustomerAddress } from "../../services/auth";

import DropDownPicker from "react-native-dropdown-picker";


const { width } = Dimensions.get("window");

const EditAddressScreen = ({ navigation, route }) => {

const { addressId, coords: routeCoords } = route.params || {};


const [coords, setCoords] = useState(null);

const [wardOpen, setWardOpen] = useState(false);
const [wardItems, setWardItems] = useState([]);
const [wardLoading, setWardLoading] = useState(true);
const [residenceType, setResidenceType] = useState("");
const [regionOpen, setRegionOpen] = useState(false);
const [regionItems, setRegionItems] = useState([]);
const [regionLoading, setRegionLoading] = useState(true);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState({
    id: "",
    customerId: "",
    scrapRegionId: "",
    wardId: "",
    // isScrapService: false,
    isScrapLocationActive: false,
    // isBioWasteService: false,
    isBioWasteLocationActive: false,
    residenceType: "",
    residenceDetails: "",
    landmark: "",
    latitude: "",
    longitude: ""
  });

  useEffect(() => {
  const fetchWards = async () => {
    try {
      setWardLoading(true);
      const res = await getWardList(100);

      const dropdownData = res.map(item => ({
        label: item.wardName,
        value: item.id,
        districtName: item.districtName,
        stateName: item.stateName,
        countryName: item.countryName
      }));

      setWardItems(dropdownData);
    } finally {
      setWardLoading(false);
    }
  };

  fetchWards();
}, []);

useEffect(() => {
  const fetchRegions = async () => {
    try {
      setRegionLoading(true);
      const list = await getScrapRegionList(100);

      const dropdownData = list.map(item => ({
        label: item.name,
        value: item.id,
        districtName: item.districtName,
        stateName: item.stateName,
        countryName: item.countryName
      }));

      setRegionItems(dropdownData);
    } finally {
      setRegionLoading(false);
    }
  };

  fetchRegions();
}, []);

const loadDetails = async () => {
  try {
    setLoading(true);

    const data = await getCustomerAddressDetails(addressId);

    // 🔥 Decide which coords to use
    const finalLatitude =
      routeCoords?.latitude ?? Number(data.latitude);

    const finalLongitude =
      routeCoords?.longitude ?? Number(data.longitude);

    const finalAddress =
      routeCoords?.address ?? data.residenceDetails ?? "";

    setForm({
      id: data.id,
      customerId: data.customerId,
      scrapRegionId: data.scrapRegionId,
      wardId: data.wardId,
      // isScrapService: data.isScrapService,
      isScrapLocationActive: data.isScrapLocationActive,
      // isBioWasteService: data.isBioWasteService,
      isBioWasteLocationActive: data.isBioWasteLocationActive,
      residenceType: data.residenceType || "",
      residenceDetails: finalAddress,
      landmark: data.landmark || "",
      latitude: finalLatitude.toString(),
      longitude: finalLongitude.toString(),
    });

    setCoords({
      latitude: finalLatitude,
      longitude: finalLongitude,
      address: finalAddress,
    });

    setResidenceType(data.residenceType || "");

  } catch (err) {
    Alert.alert("Error", "Unable to load address");
  } finally {
    setLoading(false);
  }
};


  useEffect(() => {
    loadDetails();
  }, []);

  const handleChange = (key, value) => {
    setForm({ ...form, [key]: value });
  };

  const saveAddress = async () => {
    try {
      setSaving(true);
      await updateCustomerAddress(form);
      Alert.alert("Success", "Address updated successfully");
navigation.pop(2);

    } catch (err) {
      Alert.alert("Error", "Failed to update address");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator size="large" color="#00b894" />
      </View>
    );
  }





  return (
   <SafeAreaView style={styles.container}>
 <ScrollView
  style={styles.content}
  contentContainerStyle={{ paddingBottom: 40 }}
  nestedScrollEnabled={true}
>


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
                      <Text style={styles.headerTitle}>Edit Addresses</Text>
                    </View>

   {coords?.address ? (
          <>
            <Text style={styles.detected}>Detected Address</Text>
            <Text style={styles.address}>{coords.address}</Text>
          </>
        ) : null}

   <Text style={{ color: "#fff", marginBottom: 6,marginTop:'2%',fontWeight:'500' }}>
          Residence Type
        </Text>
  
        <View style={{ flexDirection: "row", marginBottom: 14 }}>
       {["Home", "Office", "Others"].map(type => (
  <TouchableOpacity
    key={type}
    onPress={() => {
      setResidenceType(type);
      handleChange("residenceType", type);
    }}
    style={[
      styles.typeBtn,
      residenceType === type && styles.typeBtnActive
    ]}
  >
    <Text
      style={[
        styles.typeBtnText,
        residenceType === type && styles.typeBtnTextActive
      ]}
    >
      {type}
    </Text>
  </TouchableOpacity>
))}

        </View>
 <Text style={{ color: "#fff", marginBottom: 6,marginTop:'2%',fontWeight:'500' }}>
        Ward Name
        </Text>
  
  <View style={{ zIndex: 2000 }}>
        
      <DropDownPicker
  open={wardOpen}
  value={form.wardId}
  items={wardItems}
  setOpen={setWardOpen}
  setValue={() => {}}                // we handle selection manually
  setItems={setWardItems}
  loading={wardLoading}

  placeholder={wardLoading ? "Loading wards..." : "Select Ward"}
  listMode="MODAL"
  searchable={true}
  searchPlaceholder="Search ward, district, state..."

  renderListItem={(props) => {
    const { item, onPress, isSelected } = props;

    return (
      <TouchableOpacity
        onPress={() => {
          onPress();
          handleChange("wardId", Number(item.value));
        }}
        style={{
          paddingVertical: 10,
          paddingHorizontal: 14,
          backgroundColor: isSelected ? "#f2f2f2" : "#fff",
          borderBottomWidth: 0.6,
          borderColor: "#ddd"
        }}
      >
        <Text style={{ fontWeight: "700", fontSize: 15 }}>
          {item.label}
        </Text>

        <Text style={{ fontSize: 12, color: "#6e6e6e", marginTop: 2 }}>
          {item.districtName} • {item.stateName} • {item.countryName}
        </Text>
      </TouchableOpacity>
    );
  }}

 
  style={{
    backgroundColor: "#000",      // 🔥 black input
    borderColor: "#333",
  }}

  textStyle={{
    color: "#fff",                // 🔥 white text
  }}

  placeholderStyle={{
    color: "#aaa",                // grey placeholder
  }}

  dropDownContainerStyle={{
    backgroundColor: "#000",      // 🔥 black dropdown list
    borderColor: "#333",
  }}
/>
<Text style={{ color: "#fff", marginBottom: 6,marginTop:'2%',fontWeight:'500' }}>
        Scrap Region
        </Text>
<DropDownPicker
  open={regionOpen}
  value={form.scrapRegionId}
  items={regionItems}
  setOpen={setRegionOpen}
  setValue={() => {}}
  setItems={setRegionItems}
  multiple={false}
  loading={regionLoading}

  placeholder="Select Scrap Region"
  listMode="MODAL"
  searchable={true}
  searchPlaceholder="Search region, district, state..."

  renderListItem={(props) => {
    const { item, onPress, isSelected } = props;

    return (
      <TouchableOpacity
        onPress={() => {
          onPress();
          handleChange("scrapRegionId", Number(item.value));
        }}
        style={{
          paddingVertical: 10,
          paddingHorizontal: 14,
          backgroundColor: isSelected ? "#f2f2f2" : "#fff",
          borderBottomWidth: 0.6,
          borderColor: "#ddd"
        }}
      >
        <Text style={{ fontWeight: "700", fontSize: 15 }}>
          {item.label}
        </Text>

        <Text style={{ fontSize: 12, color: "#6e6e6e", marginTop: 2 }}>
          {item.districtName} • {item.stateName} • {item.countryName}
        </Text>
      </TouchableOpacity>
    );
  }}


  style={{
    backgroundColor: "#000",      // 🔥 black input
    borderColor: "#333",
  }}

  textStyle={{
    color: "#fff",                // 🔥 white text
  }}

  placeholderStyle={{
    color: "#aaa",                // grey placeholder
  }}

  dropDownContainerStyle={{
    backgroundColor: "#000",      // 🔥 black dropdown list
    borderColor: "#333",
  }}
/>



      </View>
<Text style={{ color: "#fff", marginBottom: 6,marginTop:'2%',fontWeight:'500' }}>
      Residence Details
        </Text>
        <TextInput
          placeholder="Residence Details"
          value={form.residenceDetails}
          onChangeText={(t) => handleChange("residenceDetails", t)}
          style={styles.input}
        />
<Text style={{ color: "#fff", marginBottom: 6,marginTop:'2%',fontWeight:'500' }}>
     Landmark
        </Text>
        <TextInput
          placeholder="Landmark"
          value={form.landmark}
          onChangeText={(t) => handleChange("landmark", t)}
          style={styles.input}
        />

        <TouchableOpacity
          style={[styles.saveBtn, saving && { opacity: 0.7 }]}
          onPress={saveAddress}
          disabled={saving}
        >
          {saving ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.saveText}>Save Changes</Text>
          )}
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};


const styles = {
  container: {
    flex: 1,
    backgroundColor: "#0b1410"
  },

  content: {
    paddingHorizontal: 16,
    paddingBottom: 24,
    marginTop:'10%'
  },
   detected: { color: "#9ca3af", marginTop: 10 },
  address: { color: "#fff", marginBottom: 10 },
    headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 18,
   marginTop:'5%',
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
 typeBtn: {
  paddingVertical: 10,
  paddingHorizontal: 14,
  borderRadius: 12,
  borderWidth: 0.7,
  borderColor: "#2f3f37",
  marginRight: 8,
},

typeBtnActive: {
  backgroundColor: "#1f8f5f",
  borderColor: "#1f8f5f",
},

typeBtnText: {
  color: "#9ca3af",
},

typeBtnTextActive: {
  color: "#fff",
  fontWeight: "700",
},
  title: {
    color: "#ffffff",
    fontSize: width * 0.05, // responsive
    fontWeight: "600",
    marginBottom: 16
  },

  input: {
    backgroundColor: "#111c17",
    color: "#fff",
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 14,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: "#1f3b2f",
    fontSize: width * 0.04 // responsive
  },

  row: {
    flexDirection: "row",
    gap: 10
  },

  half: {
    flex: 1
  },

  saveBtn: {
    backgroundColor: "#32c784",
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: "center",
    marginTop: 10
  },

  saveText: {
    color: "#fff",
    fontSize: width * 0.045,
    fontWeight: "700"
  }
};

export default EditAddressScreen;
