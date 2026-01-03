import { useNavigation } from "@react-navigation/native";
import React, { useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Alert
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { AuthContext } from "../../../context/AuthContext";

export default function ProviderProfile() {
  const { logout } = useContext(AuthContext);
const navigation = useNavigation();


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
              <Ionicons name="person-outline" size={36} color="#fff" />
            </View>
            <Text style={styles.title}>Profile</Text>
          </View>

          <Text style={styles.name}>Alex Picker</Text>
          <Text style={styles.role}>Waste Collection Specialist</Text>

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
            <Ionicons name="mail-outline" size={20} color="#19A463" />
            <Text style={styles.infoText}>alex.picker@recollect.com</Text>
          </View>

          <View style={styles.infoRow}>
            <Ionicons name="call-outline" size={20} color="#19A463" />
            <Text style={styles.infoText}>+917663553637</Text>
          </View>

          <View style={styles.infoRow}>
            <Ionicons name="location-outline" size={20} color="#19A463" />
            <Text style={styles.infoText}> Hyderabad City, Telanagana</Text>
          </View>
        </View>

        {/* MENU LIST */}
        <View style={styles.menu}>
          <TouchableOpacity style={styles.menuItem}>
            <Ionicons name="settings-outline" size={20} color="#111" />
            <Text style={styles.menuText}>Settings</Text>
            <Ionicons name="chevron-forward" size={18} color="#999" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <Ionicons name="shield-outline" size={20} color="#111" />
            <Text style={styles.menuText}>Privacy & Security</Text>
            <Ionicons name="chevron-forward" size={18} color="#999" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <Ionicons name="help-circle-outline" size={20} color="#111" />
            <Text style={styles.menuText}>Help & Support</Text>
            <Ionicons name="chevron-forward" size={18} color="#999" />
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
