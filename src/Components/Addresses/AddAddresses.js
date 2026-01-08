import React, { useEffect, useRef, useState } from "react";
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
import { addCustomerAddress, getScrapRegionList, getWardList } from "../../services/auth";
import DropDownPicker from "react-native-dropdown-picker";



const TOKEN_KEY = "tempToken";
const AddAddressScreen = ({ navigation,route }) => {
  const [coords, setCoords] = useState(null);
  const [fullName, setFullName] = useState("");
  const [residenceDetails, setResidenceDetails] = useState("");
const [wardId, setWardId] = useState("");
const [landmark, setLandmark] = useState("");
const [residenceType, setResidenceType] = useState("Home");
const [customerId, setCustomerId] = useState(null);
const region = route?.params?.region || {};
// Ward dropdown
const [wardOpen, setWardOpen] = useState(false);
const [wardItems, setWardItems] = useState([]);
const [wardLoading, setWardLoading] = useState(true);
const [regionLoading, setRegionLoading] = useState(true);

const webViewRef = useRef(null);


// Scrap region dropdown
const [regionOpen, setRegionOpen] = useState(false);
const [scrapRegionId, setScrapRegionId] = useState(null);
const [regionItems, setRegionItems] = useState([]);

// useEffect(() => {
//   if (!coords || !webViewRef.current) return;

//   const js = `
//     (function() {
//       if (typeof setMarker === 'function') {
//         setMarker(${coords.latitude}, ${coords.longitude});
//       }
//     })();
//   `;

//   webViewRef.current.injectJavaScript(js);
// }, [coords]);


useEffect(() => {
  const fetchWards = async () => {
    try {
       setWardLoading(true);
      const res = await getWardList(100);

      console.log("wardlist", res);

      // 👉 because getWardList() ALREADY returns content[]
      const list = res || [];

  const dropdownData = res.map(item => ({
  label: item.wardName,
  value: item.id,
  districtName: item.districtName,
  stateName: item.stateName,
  countryName: item.countryName,
}));


      setWardItems(dropdownData);
    }  catch (err) {
      console.log("WARD LIST ERROR:", err);
      Alert.alert("Error", "Failed to load ward list");
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

      console.log("scrap region list ===>", list);

    const dropdownData = list.map(item => ({
  label: item.name,
  value: item.id,
  districtName: item.districtName,
  stateName: item.stateName,
  countryName: item.countryName
}));


      setRegionItems(dropdownData);
    } catch (err) {
      console.log("SCRAP REGION ERROR:", err);
      Alert.alert("Error", "Failed to load scrap regions");
    } finally {
      setRegionLoading(false);
    }
  };

  fetchRegions();
}, []);


useEffect(() => {
  const loadData = async () => {
    const storedId = await AsyncStorage.getItem("customerId");
    if (storedId) setCustomerId(Number(storedId));
  };

  loadData();

Geolocation.getCurrentPosition(
  pos =>
    setCoords(prev => ({
      ...prev,
      latitude: pos.coords.latitude,
      longitude: pos.coords.longitude
    })),
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
console.log("CURRENT COORDS ➜", coords);

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
const defaultLat = coords?.latitude || 20;
const defaultLon = coords?.longitude || 0;


const mapHtml = `
<!DOCTYPE html>
<html>
<head>
<meta name="viewport" content="initial-scale=1, maximum-scale=1">
<style>
  html, body {
    height: 100%;
    margin: 0;
    padding: 0;
    background: #f3f4f6;
  }

  #map {
    height: 100%;
    border-radius: 14px;
    overflow: hidden;
  }

  #searchBox {
    position: absolute;
    top: 14px;
    left: 14px;
    right: 14px;
    z-index: 2000;
    padding: 10px 12px;
    border-radius: 10px;
    border: 1px solid #d1d5db;
    font-size: 14px;
    outline: none;
    background: #ffffff;
    box-shadow: 0px 6px 14px rgba(0,0,0,0.12);
  }

  .center-pin {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -100%);
    z-index: 1500;
    font-size: 38px;
    pointer-events: none;
    text-shadow: 0px 4px 10px rgba(0,0,0,0.4);
  }
</style>

<link rel="stylesheet" href="https://unpkg.com/leaflet/dist/leaflet.css" />
<script src="https://unpkg.com/leaflet/dist/leaflet.js"></script>
</head>

<body>

<input id="searchBox" placeholder="Search location…" />

<div id="map"></div>

<div class="center-pin">📍</div>

<script>
  var map = L.map('map').setView([${defaultLat}, ${defaultLon}], 16);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19
  }).addTo(map);

  var marker = L.marker(
    [${defaultLat}, ${defaultLon}],
    { draggable: true }
  ).addTo(map);

  function sendLocation(lat, lon) {
    fetch(
      'https://nominatim.openstreetmap.org/reverse?format=json&lat=' +
        lat +
        '&lon=' +
        lon
    )
      .then(res => res.json())
      .then(data => {
        window.ReactNativeWebView.postMessage(
          JSON.stringify({
            latitude: lat,
            longitude: lon,
            address: data?.display_name || ""
          })
        );
      });
  }

  map.on('moveend', function() {
    var c = map.getCenter();
    marker.setLatLng([c.lat, c.lng]);
    sendLocation(c.lat, c.lng);
  });

  marker.on('dragend', function(e) {
    var p = e.target.getLatLng();
    map.setView([p.lat, p.lng]);
    sendLocation(p.lat, p.lng);
  });

  document.getElementById('searchBox').addEventListener('change', function(e) {
    var query = e.target.value;

    fetch('https://nominatim.openstreetmap.org/search?format=json&q=' + query)
      .then(res => res.json())
      .then(results => {
        if (!results.length) return;

        var place = results[0];
        var lat = parseFloat(place.lat);
        var lon = parseFloat(place.lon);

        map.setView([lat, lon], 17);
        marker.setLatLng([lat, lon]);
        sendLocation(lat, lon);
      });
  });

  function setMarker(lat, lon) {
    map.setView([lat, lon], 17);
    marker.setLatLng([lat, lon]);
    sendLocation(lat, lon);
  }
</script>

</body>
</html>
`;

console.log("SCRAP VALUE ===>", scrapRegionId);
console.log("FIRST ITEM ===>", regionItems[0]);

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
  ref={webViewRef}
  originWhitelist={['*']}
  javaScriptEnabled
  domStorageEnabled
  source={{ html: mapHtml }}
onMessage={(e) => {
  const data = JSON.parse(e.nativeEvent.data);

  setCoords(prev => ({
    ...prev,
    latitude: data.latitude,
    longitude: data.longitude,
    address: data.address ?? prev?.address ?? ""
  }));
}}


/>


        </View>
      )}
{coords?.address ? (
  <View style={{ marginTop: 10, marginBottom: 10 }}>
    <Text style={{ color: "#9ca3af", fontSize: 12 }}>Detected Address</Text>
    <Text style={{ color: "#fff", marginTop: 4 }}>
      {coords.address}
    </Text>
  </View>
) : null}

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
   setValue={() => {}}         
 
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
    );
  }}

  style={{ backgroundColor: "#e2e2e2ff", borderColor: "#444" }}
  dropDownContainerStyle={{ backgroundColor: "#fff", borderColor: "#ccc" }}
/>




      </View>

      <Text style={{ color: "#fff", marginTop: 14, marginBottom: 6 }}>
        Scrap Region
      </Text>

      <View style={{ zIndex: 1000 }}>
<DropDownPicker
  open={regionOpen}
  value={scrapRegionId ?? null}
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
          setScrapRegionId(Number(item.value));
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

        <Text style={{
          fontSize: 12,
          color: "#6e6e6e",
          marginTop: 2
        }}>
          {item.districtName} • {item.stateName} • {item.countryName}
        </Text>
      </TouchableOpacity>
    );
  }}

  style={{ backgroundColor: "#e2e2e2ff", borderColor: "#444" }}
  dropDownContainerStyle={{ backgroundColor: "#fff", borderColor: "#ccc" }}
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
        {["Home", "Office", "Others"].map(type => (
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
    color: "#000000ff",
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
