import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Image,
  ScrollView
} from "react-native";
import Geolocation from "@react-native-community/geolocation";
import { WebView } from "react-native-webview";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { addCustomerAddress } from "../../services/auth";
import DropDownPicker from "react-native-dropdown-picker";



const TOKEN_KEY = "tempToken";
const AddAddressScreen = ({ navigation,route }) => {
  const [coords, setCoords] = useState(null);
  const [fullName, setFullName] = useState("");
  const [residenceDetails, setResidenceDetails] = useState("");
const [wardId, setWardId] = useState("");
const [landmark, setLandmark] = useState("");
const [residenceType, setResidenceType] = useState("individual");
const [customerId, setCustomerId] = useState(null);
const region = route?.params?.region || {};
// Ward dropdown
const [wardOpen, setWardOpen] = useState(false);

const [wardItems, setWardItems] = useState([
  { label: "Ward 1", value: 1 },
  { label: "Ward 2", value: 2 },
  { label: "Ward 3", value: 3 },
]);

// Scrap region dropdown
const [regionOpen, setRegionOpen] = useState(false);
const [scrapRegionId, setScrapRegionId] = useState(null);
const [regionItems, setRegionItems] = useState([
  { label: "North Zone", value: 1 },
  { label: "South Zone", value: 2 },
  { label: "East Zone", value: 3 },
]);


useEffect(() => {
  const loadData = async () => {
    const storedId = await AsyncStorage.getItem("customerId");
    if (storedId) setCustomerId(Number(storedId));
  };

  loadData();

  Geolocation.getCurrentPosition(
    pos => setCoords(pos.coords),
    err => Alert.alert("Error", "Unable to get location"),
    { enableHighAccuracy: true }
  );
}, []);

const handleSave = async () => {
  if (!residenceDetails || !wardId) {
    Alert.alert("Missing fields", "Please fill all required fields.");
    return;
  }

  if (!customerId) {
    Alert.alert("Error", "Customer not found — please login again.");
    return;
  }

  const payload = {
    customerId,
 scrapRegionId: Number(scrapRegionId),
    wardId: Number(wardId),
    isScrapService: true,
    isScrapLocationActive: true,
    isBioWasteService: true,
    isBioWasteLocationActive: true,
    residenceType,
    residenceDetails,
    landmark,
    latitude: coords?.latitude?.toString(),
    longitude: coords?.longitude?.toString(),
  };

  try {
    console.log("SENDING →", payload);

    const res = await addCustomerAddress(payload);

    console.log("RESPONSE →", res);

    Alert.alert("Success", "Address added successfully!");
    navigation.goBack();
  } catch (err) {
    console.log("ADDRESS ERROR:", err?.response?.data || err);
    Alert.alert(
      "Error",
      err?.response?.data?.message || "Failed to add address"
    );
  }
};



  // Map HTML (OpenStreetMap + Leaflet)
  const mapHtml = coords
    ? `
      <!DOCTYPE html>
      <html>
        <head>
          <meta name="viewport" content="initial-scale=1, maximum-scale=1">
          <style>
            html, body, #map { height: 100%; margin: 0; padding: 0; }
          </style>

          <link rel="stylesheet" href="https://unpkg.com/leaflet/dist/leaflet.css" />
          <script src="https://unpkg.com/leaflet/dist/leaflet.js"></script>
        </head>

        <body>
          <div id="map"></div>

          <script>
            var map = L.map('map').setView(
              [${coords.latitude}, ${coords.longitude}],
              17
            );

            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
              maxZoom: 19
            }).addTo(map);

            var marker = L.marker(
              [${coords.latitude}, ${coords.longitude}],
              { draggable: true }
            ).addTo(map);

            marker.on('dragend', function() {
              var latlng = marker.getLatLng();
              window.ReactNativeWebView.postMessage(
                JSON.stringify({
                  latitude: latlng.lat,
                  longitude: latlng.lng
                })
              );
            });
          </script>
        </body>
      </html>
    `
    : null;

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
          style={styles.avatarImage}
        />
      </TouchableOpacity>

      <Text style={styles.headerTitle}>Add Addressess</Text>
    </View>

    {/* SCROLLABLE CONTENT */}
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: 30 }}
    >

      {/* MAP */}
      {mapHtml && (
        <View style={styles.mapBox}>
          <WebView
            originWhitelist={["*"]}
            source={{ html: mapHtml }}
            onMessage={(e) => {
              const data = JSON.parse(e.nativeEvent.data);
              setCoords(data);
            }}
          />
        </View>
      )}

      {/* FORM */}
      <Text style={{ color: "#fff", marginTop: 14, marginBottom: 6 }}>
        Residential Address
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Residential Address"
        placeholderTextColor="#8a8a8a"
        onChangeText={setResidenceDetails}
      />

      <Text style={{ color: "#fff", marginBottom: 6 }}>
        Ward
      </Text>

      <View style={{ zIndex: 2000 }}>
        <DropDownPicker
          open={wardOpen}
          value={wardId}
          items={wardItems}
          setOpen={setWardOpen}
          setValue={setWardId}
          setItems={setWardItems}
          placeholder="Select Ward"
          style={{ backgroundColor: "#e2e2e2ff", borderColor: "#444" }}
          dropDownContainerStyle={{ backgroundColor: "#ccccccff", borderColor: "#444" }}
        />
      </View>

      <Text style={{ color: "#fff", marginTop: 14, marginBottom: 6 }}>
        Scrap Region
      </Text>

      <View style={{ zIndex: 1000 }}>
        <DropDownPicker
          open={regionOpen}
          value={scrapRegionId}
          items={regionItems}
          setOpen={setRegionOpen}
          setValue={setScrapRegionId}
          setItems={setRegionItems}
          placeholder="Select Scrap Region"
          style={{ backgroundColor: "#e2e2e2ff", borderColor: "#444" }}
          dropDownContainerStyle={{ backgroundColor: "#ccccccff", borderColor: "#444" }}
        />
      </View>

      <Text style={{ color: "#fff", marginTop: 14, marginBottom: 6 }}>
        LandMark
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Landmark (optional)"
        placeholderTextColor="#8a8a8a"
        value={landmark}
        onChangeText={setLandmark}
      />

      <Text style={{ color: "#fff", marginBottom: 6 }}>
        Residence Type
      </Text>

      <View style={{ flexDirection: "row", marginBottom: 14 }}>
        {["individual", "apartment", "Others"].map(type => (
          <TouchableOpacity
            key={type}
            onPress={() => setResidenceType(type)}
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

      <TouchableOpacity style={styles.addBtn} onPress={handleSave}>
        <Text style={styles.addBtnText}>Add Address</Text>
      </TouchableOpacity>

    </ScrollView>
  </View>
);

};

export default AddAddressScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0b1410",
    padding: 16,
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


  backArrow: {
    color: "#ffffff",
    fontSize: 20,
    fontWeight: "700",
  },


  headerTitle: {
    fontSize: 22,
    color: '#ffffffff',
    fontFamily: 'Poppins-SemiBold',
  },

  mapBox: {
    height: 300,
    width: "100%",
    borderRadius: 16,
    overflow: "hidden",
    marginBottom: 14,
    backgroundColor: "#000",
  },

  input: {
    backgroundColor: "#cfcfcfff",
    borderRadius: 14,
    paddingVertical: 14,
    paddingHorizontal: 14,
    color: "#ffffff",
    marginBottom: 14,
    borderWidth: 0.6,
    borderColor: "#2f3f37",
  },

  addBtn: {
    backgroundColor: "#1f8f5f",
    paddingVertical: 14,
    borderRadius: 16,
    alignItems: "center",
    marginTop: 10,
  },

  addBtnText: {
    color: "#ffffff",
    fontWeight: "700",
    fontSize: 16,
  },
  dropdownWrapper: {
    marginBottom: 14,
    zIndex: 1000, // important (prevents overlapping issues)
  },

  dropdown: {
    backgroundColor: "#1f1f1f",
    borderColor: "#3a3a3a",
    borderWidth: 1,
    borderRadius: 10,
    minHeight: 48,
  },

  dropdownContainer: {
    backgroundColor: "#1f1f1f",
    borderColor: "#3a3a3a",
    borderWidth: 1,
    borderRadius: 10,
  },

  dropdownText: {
    color: "#fff",
    fontSize: 14,
  },

  dropdownPlaceholder: {
    color: "#ffffffff",
  },

  label: {
    color: "#fff",
    marginBottom: 6,
    fontSize: 14,
    fontWeight: "500",
  }
});
