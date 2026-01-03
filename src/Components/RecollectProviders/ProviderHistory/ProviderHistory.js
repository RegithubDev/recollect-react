import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

const DATA = [
  {
    id: "1",
    name: "David Lee",
    type: "Recyclable Plastics",
    date: "Jan 2, 2026 - 3:45 PM",
    amount: "2115.00",
  },
  {
    id: "2",
    name: "Sruthi",
    type: "Electronic Waste",
    date: "Jan 2, 2026 - 11:20 AM",
    amount: "2244.50",
  },
  {
    id: "3",
    name: "Chris Taylor",
    type: "Organic Waste",
    date: "Jan 1, 2026 - 4:15 PM",
    amount: "12.00",
  },
  {
    id: "4",
    name: "Lisa White",
    type: "Glass Waste",
    date: "Dec 31, 2025 - 7:10 PM",
    amount: "18.75",
  },
];

export default function ProviderHistory() {
  const [tab, setTab] = useState("all");

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <View>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.type}>{item.type}</Text>

        <View style={styles.row}>
          <Ionicons name="calendar-outline" size={16} color="#7B8A96" />
          <Text style={styles.date}>{item.date}</Text>
        </View>
      </View>

      <Text style={styles.amount}>{item.amount}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* HEADER */}
        <View style={styles.header}>
          <Text style={styles.title}>History</Text>
          <Text style={styles.subtitle}>Your completed pickups</Text>
        </View>

        {/* EARNINGS CARD */}
        <View style={styles.earnCard}>
          <Text style={styles.earnLabel}>Total Earnings</Text>
          <Text style={styles.earnAmount}>3778.25</Text>

          <View style={styles.earnRow}>
            <Ionicons name="checkmark-circle-outline" size={18} color="#E9FFF2" />
            <Text style={styles.earnSub}>5 completed pickups</Text>
          </View>

          <View style={styles.trendIcon}>
            <Ionicons name="trending-up-outline" size={20} color="#19A463" />
          </View>
        </View>

        {/* TABS */}
        <View style={styles.tabs}>
          {["All", "This Week", "This Month"].map((t) => (
            <TouchableOpacity
              key={t}
              style={[styles.tab, tab === t && styles.activeTab]}
              onPress={() => setTab(t)}
            >
              <Text style={[styles.tabText, tab === t && styles.activeText]}>
                {t}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* LIST */}
        <FlatList
          scrollEnabled={false}
          data={DATA}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={{ paddingBottom: 90 }}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#183528" },

  header: { paddingHorizontal: 18, paddingTop: '10%' },
  title: { fontSize: 22, fontWeight: "700", color: "#ffffffff" },
  subtitle: { color: "#7A8A95", marginTop: 2 },

  earnCard: {
    margin: 16,
    backgroundColor: "#1AA65B",
    borderRadius: 24,
    padding: 18,
  },

  earnLabel: { color: "#Eafbef" },
  earnAmount: {
    color: "#fff",
    fontSize: 28,
    fontWeight: "800",
    marginVertical: 4,
  },

  earnRow: { flexDirection: "row", alignItems: "center" },
  earnSub: { color: "#EAFBEF", marginLeft: 6 },

  trendIcon: {
    position: "absolute",
    right: 18,
    top: 18,
    backgroundColor: "#EAFBEF",
    padding: 10,
    borderRadius: 14,
  },

  tabs: {
    flexDirection: "row",
    backgroundColor: "#c5c5c5ff",
    marginHorizontal: 16,
    padding: 6,
    borderRadius: 20,
  },

  tab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: "center",
    borderRadius: 16,
  },

  activeTab: { backgroundColor: "#fff" },

  tabText: { color: "#000000ff" },
  activeText: { color: "#19A463", fontWeight: "700" },

  card: {
    backgroundColor: "#fff",
    marginHorizontal: 14,
    marginTop: 12,
    borderRadius: 18,
    padding: 14,
    elevation: 4,
    flexDirection: "row",
    justifyContent: "space-between",
  },

  name: { fontWeight: "700", fontSize: 15 },
  type: { color: "#6E7A89", marginTop: 2 },

  row: { flexDirection: "row", alignItems: "center", marginTop: 4 },

  date: { marginLeft: 6, color: "#7B8A96" },

  amount: { color: "#19A463", fontWeight: "800", alignSelf: "center" },
});
