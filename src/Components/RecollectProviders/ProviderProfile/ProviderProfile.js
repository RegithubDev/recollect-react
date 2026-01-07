import { useNavigation } from "@react-navigation/native";
import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Alert,
  Image
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { AuthContext } from "../../../context/AuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function ProviderProfile() {
  const { logout } = useContext(AuthContext);
const navigation = useNavigation();
const [name, setName] = useState("");
const [email, setEmail] = useState("");
const [phone, setPhone] = useState("");

useEffect(() => {
  const loadProfile = async () => {
    const storedName  = await AsyncStorage.getItem("providerName");
    const storedEmail = await AsyncStorage.getItem("providerEmail");
    const storedPhone = await AsyncStorage.getItem("providerMobile");

    setName(storedName || "");
    setEmail(storedEmail || "");
    setPhone(storedPhone || "");
  };

  loadProfile();
}, []);


  const handleLogout = () => {
    Alert.alert(
      "Log Out",
      "Are you sure you want to log out?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Log Out",
          style: "destructive",
          onPress: async () => {
            await logout();   // <-- ONLY THIS
          }
        }
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* HEADER */}
        <View style={styles.header} />

        {/* PROFILE CARD */}
        <View style={styles.card}>
          <View style={styles.avatarWrap}>
            <View style={styles.avatarCircle}>
               <Image
                 source={require('../../../../assets/user_indi.png')}
                 style={styles.avatar}
                 resizeMode="contain"
               />
            </View>
           
          </View>

       <Text style={styles.name}>{name}</Text>

          {/* Rating */}
          <View style={styles.rating}>
            <Ionicons name="star" size={18} color="#F5B000" />
            <Text style={styles.ratingText}>4.9 Rating</Text>
          </View>

          {/* STATS */}
          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>247</Text>
              <Text style={styles.statLabel}>Pickups</Text>
            </View>

            <View style={styles.divider} />

            <View style={styles.statItem}>
              <Text style={styles.statNumber}>98%</Text>
              <Text style={styles.statLabel}>On-Time</Text>
            </View>

            <View style={styles.divider} />

            <View style={styles.statItem}>
              <Text style={styles.statNumber}>2yr</Text>
              <Text style={styles.statLabel}>Experience</Text>
            </View>
          </View>

          {/* CONTACT */}
       <View style={styles.infoRow}>
  {/* <Ionicons name="mail-outline" size={20} color="#19A463" /> */}
    <Image
                 source={require('../../../../assets/email.png')}
                 style={styles.arrowImage}
                 resizeMode="contain"
               />
  <Text style={styles.infoText}>{email}</Text>
</View>

<View style={styles.infoRow}>
 <Image
                 source={require('../../../../assets/phone-call.png')}
                 style={styles.arrowImage}
                 resizeMode="contain"
               />
  <Text style={styles.infoText}>{phone}</Text>
</View>

          <View style={styles.infoRow}>
        <Image
                 source={require('../../../../assets/location.png')}
                 style={styles.arrowImage}
                 resizeMode="contain"
               />
            <Text style={styles.infoText}> Hyderabad City, Telanagana</Text>
          </View>
        </View>

        {/* MENU LIST */}
        <View style={styles.menu}>
          <TouchableOpacity style={styles.menuItem}>
            <Image
                 source={require('../../../../assets/settings.png')}
                 style={styles.iconImage}
                 resizeMode="contain"
               />
            <Text style={styles.menuText}>Settings</Text>
             <Image
                 source={require('../../../../assets/right.png')}
                 style={styles.arrowImage}
                 resizeMode="contain"
               />
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
             <Image
                 source={require('../../../../assets/insurance.png')}
                 style={styles.iconImage}
                 resizeMode="contain"
               />
            <Text style={styles.menuText}>Privacy & Security</Text>
            <Image
                 source={require('../../../../assets/right.png')}
                 style={styles.arrowImage}
                 resizeMode="contain"
               />
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
             <Image
                 source={require('../../../../assets/costumer-service.png')}
                 style={styles.iconImage}
                 resizeMode="contain"
               />
            <Text style={styles.menuText}>Help & Support</Text>
           <Image
                 source={require('../../../../assets/right.png')}
                 style={styles.arrowImage}
                 resizeMode="contain"
               />
          </TouchableOpacity>
        </View>

        {/* SIGN OUT */}
   <TouchableOpacity style={styles.signOutBtn} onPress={handleLogout}>
  <Text style={styles.signOutText}>Sign Out</Text>
</TouchableOpacity>


        <View style={{ height: 90 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#183528" },

  header: {
    height: 170,
    backgroundColor: "#19A463",
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40
  },

  card: {
    backgroundColor: "#fff",
    marginHorizontal: 18,
    marginTop: -70,
    borderRadius: 24,
    padding: 18,
    elevation: 6
  },
    arrowImage: {
  width: 15,
  height: 15,

},
    avatar: {
  width: 30,
  height: 30,
tintColor:'#fff'
},

iconImage: {
 width: 25,
  height: 25,
},
  avatarWrap: { alignItems: "center", marginBottom: 8 },

  avatarCircle: {
    width: 70,
    height: 70,
    borderRadius: 40,
    backgroundColor: "#19A463",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 6
  },

  title: { color: "#19A463", fontWeight: "600" },

  name: { fontSize: 20, fontWeight: "700", textAlign: "center" },

  role: {
    textAlign: "center",
    color: "#7b8997",
    marginTop: 2,
    marginBottom: 6
  },

  rating: {
    alignSelf: "center",
    flexDirection: "row",
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 12,
    backgroundColor: "#FFF6DB",
    marginBottom: 10
  },

  ratingText: { marginLeft: 6, color: "#B68400", fontWeight: "600" },

  statsRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 8,
    marginTop: 6,
    borderBottomWidth: 1,
    borderColor: "#E9EEF3",
    borderTopWidth: 1
  },

  statItem: { alignItems: "center" },

  statNumber: { fontSize: 18, fontWeight: "700" },

  statLabel: { color: "#7b8997", fontSize: 12 },

  divider: {
    width: 1,
    backgroundColor: "#E9EEF3",
    marginVertical: 4
  },

  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10
  },

  infoText: { marginLeft: 10, color: "#44515f" },

  menu: {
    backgroundColor: "#fff",
    marginTop: 14,
    marginHorizontal: 14,
    borderRadius: 18,
    elevation: 4
  },

  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderColor: "#EEF2F5"
  },

  menuText: {
    flex: 1,
    marginLeft: 12,
    fontSize: 15,
    color: "#1A1A1A"
  },

  signOutBtn: {
    marginTop: 18,
    marginHorizontal: 16,
    backgroundColor: "#E94343",
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: "center"
  },

  signOutText: { color: "#fff", fontWeight: "bold" }
});
