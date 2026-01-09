import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Image,
} from "react-native";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import Geolocation from "@react-native-community/geolocation";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";

const GOOGLE_API_KEY = "AIzaSyDlNPkq6tsfSF5qaE8yBn8U2HTvqeO1jLo";

const ConfirmEditScreen = ({ navigation,route }) => {
  const [region, setRegion] = useState(null);
  const [coords, setCoords] = useState(null);
   const {
    latitude,
    longitude,
    addressId,fullAddress
  } = route.params || {};

  /* -------------------- INITIAL LOCATION -------------------- */
useEffect(() => {
  if (latitude && longitude) {
    const lat = Number(latitude);
    const lng = Number(longitude);

    const r = {
      latitude: lat,
      longitude: lng,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    };

    setRegion(r);
    fetchAddress(lat, lng);
  }
}, []);

const moveToCurrentLocation = () => {
  Geolocation.getCurrentPosition(
    pos => {
      const lat = pos.coords.latitude;
      const lng = pos.coords.longitude;

      const r = {
        latitude: lat,
        longitude: lng,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      };

      setRegion(r);
      fetchAddress(lat, lng);
    },
    () => Alert.alert("Error", "Unable to fetch current location"),
    { enableHighAccuracy: true }
  );
};


  /* -------------------- REVERSE GEOCODE -------------------- */
  const fetchAddress = async (lat, lng) => {
    try {
      const res = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${GOOGLE_API_KEY}`
      );
      const json = await res.json();
      if (json.results?.length) {
        setCoords({
          latitude: lat,
          longitude: lng,
          address: json.results[0].formatted_address,
        });
      }
    } catch (e) {
      console.log("Geocode error", e);
    }
  };

  if (!region) return null;

  return (
    <View style={styles.container}>
      {/* SEARCH BAR */}
      <View style={styles.searchBox}>
        <GooglePlacesAutocomplete
          placeholder="Search your location"
          placeholdertextcolor='#fff'
          fetchDetails
          onPress={(data, details) => {
            const loc = details.geometry.location;
            const r = {
              latitude: loc.lat,
              longitude: loc.lng,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            };
            setRegion(r);
            fetchAddress(loc.lat, loc.lng);
          }}
          query={{ key: GOOGLE_API_KEY, language: "en" }}
          styles={{
            textInput: styles.searchInput,
            listView: { backgroundColor: "#000" },
          }}
        />
      </View>

      {/* MAP */}
      <MapView
        provider={PROVIDER_GOOGLE}
        style={StyleSheet.absoluteFillObject}
        region={region}
        onRegionChangeComplete={r => {
          setRegion(r);
          fetchAddress(r.latitude, r.longitude);
        }}
        customMapStyle={darkMapStyle}
      />
<TouchableOpacity
  style={styles.gpsBtn}
  onPress={moveToCurrentLocation}
  activeOpacity={0.8}
>
  <Image
    source={require("../../../assets/gps.png")}
    style={styles.gpsIcon}
    resizeMode="contain"
  />
</TouchableOpacity>


      {/* CENTER PIN */}
      <View style={styles.centerPin}>
        <View style={styles.pinDot} />
      </View>

      {/* BOTTOM ADDRESS CARD */}
      {coords && (
        <View style={styles.bottomCard}>
          <Text style={styles.pickupText}>Pickup your order from</Text>

          <Text style={styles.addressMain}>
            {coords.address.split(",")[0]}
          </Text>

          <Text style={styles.addressSub}>{coords.address}</Text>

          <TouchableOpacity
            style={styles.addMoreBtn}
            onPress={() =>
              navigation.navigate("EditAddress", {  coords,
    addressId,fullAddress })
            }
          >
            <Text style={styles.addMoreText}>
              Edit More Address Details
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default ConfirmEditScreen;

/* -------------------- MAP DARK THEME -------------------- */
const darkMapStyle = [
  { elementType: "geometry", stylers: [{ color: "#0b1410" }] },
  { elementType: "labels.text.fill", stylers: [{ color: "#9ca3af" }] },
  { elementType: "labels.text.stroke", stylers: [{ color: "#0b1410" }] },
];

/* -------------------- STYLES -------------------- */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0b1410",
  },
gpsBtn: {
  position: "absolute",
  top: 115,
  right: 16,
  zIndex: 20,
  backgroundColor: "#000",
  borderColor:'#fff',
  width: 46,
  height: 46,
  borderRadius: 23,
  alignItems: "center",
  justifyContent: "center",
  elevation: 6, // Android shadow
  borderWidth:0.5
},

gpsIcon: {
  width: 22,
  height: 22,
  tintColor: "#c5dad2ff", // optional (remove if icon already colored)
},


gpsText: {
  fontSize: 22,
},

  searchBox: {
    position: "absolute",
    top: 50,
    left: 16,
    right: 16,
    zIndex: 10,
  },

  searchInput: {
    backgroundColor: "#000",
    color: "#fff",
    borderRadius: 14,
    paddingHorizontal: 14,
    height: 50,
    fontSize: 16,
  },

  centerPin: {
    position: "absolute",
    top: "50%",
    left: "50%",
    marginLeft: -10,
    marginTop: -20,
  },

  pinDot: {
    width: 20,
    height: 20,
    backgroundColor: "#187D57",
    borderRadius: 10,
    borderWidth: 3,
    borderColor: "#000",
  },

  bottomCard: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#000",
    padding: 16,
    borderTopLeftRadius: 22,
    borderTopRightRadius: 22,
  },

  pickupText: {
    color: "#9ca3af",
    fontSize: 14,
  },

  addressMain: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
    marginTop: 4,
  },

  addressSub: {
    color: "#9ca3af",
    fontSize: 14,
    marginTop: 2,
  },

  addMoreBtn: {
    backgroundColor: "#187D57",
    paddingVertical: 14,
    borderRadius: 16,
    marginTop: 16,
  },

  addMoreText: {
    textAlign: "center",
    fontWeight: "700",
    fontSize: 16,
    color: "#ffffffff",
  },
});
