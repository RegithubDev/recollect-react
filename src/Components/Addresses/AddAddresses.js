import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert
} from "react-native";
import Geolocation from "@react-native-community/geolocation";
import { WebView } from "react-native-webview";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { addCustomerAddress } from "../../services/auth";



const TOKEN_KEY = "tempToken";
const AddAddressScreen = ({ navigation }) => {
  const [coords, setCoords] = useState(null);
  const [fullName, setFullName] = useState("");
  const [residenceDetails, setResidenceDetails] = useState("");
const [wardId, setWardId] = useState("");
const [landmark, setLandmark] = useState("");
const [residenceType, setResidenceType] = useState("individual");
const [customerId, setCustomerId] = useState(null);


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
    scrapRegionId: 4,
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

    console.log("RESPONSE →", res?.data);

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
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Text style={styles.backArrow}>←</Text>
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Add Address</Text>
      </View>

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
      {/* <TextInput
        style={styles.input}
        placeholder="Full Name"
        placeholderTextColor="#8a8a8a"
        onChangeText={setFullName}
      /> */}

      <TextInput
        style={styles.input}
        placeholder="Residential Address"
        placeholderTextColor="#8a8a8a"
        onChangeText={setResidenceDetails}
      />

      <TextInput
  style={styles.input}
  placeholder="Ward Number"
  placeholderTextColor="#8a8a8a"
  keyboardType="numeric"
  value={wardId}
  onChangeText={setWardId}
/>

<TextInput
  style={styles.input}
  placeholder="Landmark (optional)"
  placeholderTextColor="#8a8a8a"
  value={landmark}
  onChangeText={setLandmark}
/>
{/* <Text style={{ color: "#fff", marginBottom: 6 }}>Residence Type</Text> */}

{/* <View style={{ flexDirection: "row", marginBottom: 14 }}>
  {["individual", "apartment", "villa"].map(type => (
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
</View> */}


      <TouchableOpacity style={styles.addBtn} onPress={handleSave}>
        <Text style={styles.addBtnText}>Add Address</Text>
      </TouchableOpacity>
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
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 14,
  },

  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 12,
    borderWidth: 0.6,
    borderColor: "#2f3f37",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
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
    color: "#ffffff",
    fontSize: 20,
    fontWeight: "700",
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
    backgroundColor: "#101915",
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
});
