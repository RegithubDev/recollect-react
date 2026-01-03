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

const ACTIVITY = [
  {
    id: "1",
    title: "Recyclable Plastics Pickup",
    user: "David Lee",
    date: "Jan 3, 2026",
    amount: "+$15.00",
  },
  {
    id: "2",
    title: "Electronic Waste Collection",
    user: "Anna Martinez",
    date: "Jan 2, 2026",
    amount: "+$22.50",
  },
];

export default function EarningsScreen() {
  const [tab, setTab] = useState("Overview");

  const renderActivity = ({ item }) => (
    <View style={styles.activityCard}>
      <View style={styles.iconCircle}>
        <Ionicons name="cash-outline" size={20} color="#19A463" />
      </View>

      <View style={{ flex: 1, marginLeft: 10 }}>
        <Text style={styles.activityTitle}>{item.title}</Text>
        <Text style={styles.activityUser}>{item.user}</Text>
      </View>

      <View style={{ alignItems: "flex-end" }}>
        <Text style={styles.amount}>{item.amount}</Text>
        <Text style={styles.activityDate}>{item.date}</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* HEADER */}
        <View style={styles.header}>
          <Text style={styles.title}>Earnings</Text>
          <Text style={styles.subtitle}>Track your income & payouts</Text>
        </View>

        {/* BALANCE CARD */}
        <View style={styles.balanceCard}>
          <Text style={styles.balanceLabel}>Available Balance</Text>
          <Text style={styles.balance}>1245.50</Text>

          {/* <View style={styles.walletIcon}> */}
            {/* <Ionicons name="wallet-outline" size={22} color="#19A463" /> */}
          {/* </View> */}

          <TouchableOpacity style={styles.withdrawBtn}>
            {/* <Ionicons name="card-outline" size={18} color="#fff" /> */}
            <Text style={styles.withdrawText}>Withdraw Funds</Text>
          </TouchableOpacity>
        </View>

        {/* SUMMARY CARDS */}
        <View style={styles.summaryRow}>
          <View style={styles.summaryCard}>
            <Text style={styles.summaryLabel}>This Week</Text>
            <Text style={styles.summaryAmount}>2278.25</Text>

            <View style={styles.growthRow}>
              {/* <Ionicons name="trending-up-outline" size={14} color="#19A463" /> */}
              <Text style={styles.growth}>12.5%</Text>
            </View>
          </View>

          <View style={styles.summaryCard}>
            <Text style={styles.summaryLabel}>This Month</Text>
            <Text style={styles.summaryAmount}>892.00</Text>

            <View style={styles.growthRow}>
              {/* <Ionicons name="trending-up-outline" size={14} color="#19A463" /> */}
              <Text style={styles.growth}>8.3%</Text>
            </View>
          </View>
        </View>

        {/* PENDING BOX */}
        <View style={styles.pendingBox}>
          <View>
            <View style={styles.pendingRow}>
              {/* <Ionicons name="trending-up-outline" size={18} color="#D8A11B" /> */}
              <Text style={styles.pendingTitle}>Pending Payout</Text>
            </View>
            <Text style={styles.pendingSub}>Processing in 2–3 days</Text>
          </View>

          <Text style={styles.pendingAmount}>2156.75</Text>
        </View>

        {/* TABS */}
        <View style={styles.tabs}>
          {["Overview", "Transactions", "Payouts"].map((t) => (
            <TouchableOpacity
              key={t}
              onPress={() => setTab(t)}
              style={[styles.tab, tab === t && styles.tabActive]}
            >
              <Text style={[styles.tabText, tab === t && styles.tabActiveText]}>
                {t}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* RECENT ACTIVITY */}
        <Text style={styles.sectionTitle}>Recent Activity</Text>

        <FlatList
          scrollEnabled={false}
          data={ACTIVITY}
          keyExtractor={(item) => item.id}
          renderItem={renderActivity}
          contentContainerStyle={{ paddingBottom: 100 }}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#183528" },

  header: { paddingHorizontal: 18, paddingTop: '10%' },
  title: { fontSize: 22, fontWeight: "800",color: "#ffffffff" },
  subtitle: { color: "#7B8A96", marginTop: 2 },

  balanceCard: {
    margin: 16,
    backgroundColor: "#19A463",
    borderRadius: 22,
    padding: 18,
  },

  balanceLabel: { color: "#EAFBEF" },
  balance: { color: "#fff", fontSize: 30, fontWeight: "900", marginTop: 6 },

  walletIcon: {
    position: "absolute",
    right: 18,
    top: 18,
    backgroundColor: "#EAFBEF",
    padding: 10,
    borderRadius: 16,
  },

  withdrawBtn: {
    marginTop: 14,
    backgroundColor: "rgba(255,255,255,0.25)",
    borderRadius: 14,
    paddingVertical: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  withdrawText: { color: "#fff", fontWeight: "700", marginLeft: 6 },

  summaryRow: { flexDirection: "row", justifyContent: "space-between", margin: 16 },

  summaryCard: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 14,
    borderRadius: 18,
    marginHorizontal: 4,
    elevation: 3,
  },

  summaryLabel: { color: "#6E7A89" },
  summaryAmount: { fontWeight: "800", fontSize: 18, marginTop: 4 },

  growthRow: { flexDirection: "row", alignItems: "center", marginTop: 4 },
  growth: { color: "#19A463", marginLeft: 4 },

  pendingBox: {
    marginHorizontal: 16,
    backgroundColor: "#FFF4D9",
    padding: 14,
    borderRadius: 18,
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 6,
  },

  pendingRow: { flexDirection: "row", alignItems: "center" },
  pendingTitle: { marginLeft: 6, fontWeight: "700" },
  pendingSub: { color: "#8A8F96", marginTop: 2 },
  pendingAmount: { color: "#C98C00", fontWeight: "800" },

  tabs: {
    flexDirection: "row",
    backgroundColor: "#c2c2c2ff",
    margin: 16,
    borderRadius: 20,
    padding: 6,
  },

  tab: { flex: 1, paddingVertical: 10, alignItems: "center", borderRadius: 16 },
  tabActive: { backgroundColor: "#fff" },

  tabText: { color: "#000000ff" },
  tabActiveText: { color: "#19A463", fontWeight: "800" },

  sectionTitle: {
    marginLeft: 16,
    fontWeight: "800",
    marginTop: 4,
    marginBottom: 4,
    color: "#ffffffff"
  },

  activityCard: {
    flexDirection: "row",
    backgroundColor: "#fff",
    marginHorizontal: 14,
    marginTop: 10,
    borderRadius: 18,
    padding: 14,
    elevation: 3,
    alignItems: "center",
  },

  iconCircle: {
    width: 34,
    height: 34,
    borderRadius: 20,
    backgroundColor: "#EAFBEF",
    alignItems: "center",
    justifyContent: "center",
  },

  activityTitle: { fontWeight: "700" },
  activityUser: { color: "#7A8A95", fontSize: 12 },

  amount: { color: "#19A463", fontWeight: "800" },
  activityDate: { color: "#7A8A95", fontSize: 12 },
});
