import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  ScrollView,
  Image,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { getOrderHistory } from "../../../services/auth";



export default function ProviderHistory() {


const [tab, setTab] = useState("All");

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
const [totalOrders, setTotalOrders] = useState(0);
  const completedCount = orders.filter(
  o => o?.status?.toLowerCase() === "completed"
).length;
const totalOrdersCount = orders.length;

const filteredOrders = orders.filter((o) => {
  if (tab === "All") return true;
  if (tab === "Confirmed") return o.status === "confirmed";
  if (tab === "Open") return o.status === "open";
  if (tab === "Cancelled") return o.status === "cancelled";
  return true;
});

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      setLoading(true);
      const response = await getOrderHistory();
      console.log("response",response);
     setOrders(response || []);
  setTotalOrders(response?.totalElements || 0);
    } catch (e) {
      console.log("History fetch failed", e);
    } finally {
      setLoading(false);
    }
  };

const renderItem = ({ item }) => (
  <View style={styles.card}>
    <View>
      <Text style={styles.name}>{item.fullName}</Text>
      <Text style={styles.type}>{item.type === "scrap" ? "Scrap Pickup" : "Bio Waste"}</Text>

      <View style={styles.row}>
       <Image
                              source={require('../../../../assets/calender.png')}
                              style={styles.ordersIcon}
                            />
        <Text style={styles.date}>
          {new Date(item.orderDate).toLocaleString()}
        </Text>
      </View>
    </View>

    <Text style={styles.amount}>{item.status}</Text>
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
          <Text style={styles.earnLabel}>Total Orders</Text>
     <Text style={styles.earnAmount}>{totalOrdersCount}</Text>


          <View style={styles.earnRow}>
             <Image
                              source={require('../../../../assets/truckhistory.png')}
                              style={styles.orderIcon}
                            />
           <Text style={styles.earnSub}>
  {completedCount} completed pickups
</Text>

          </View>

          <View style={styles.trendIcon}>
            <Image
                              source={require('../../../../assets/order-history.png')}
                              style={styles.Icon}
                            />
          </View>
        </View>

        {/* TABS */}
        <View style={styles.tabs}>
          {["All", "Confirmed", "Open", "Cancelled"].map((t) => (
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
  data={filteredOrders}
  keyExtractor={(item) => item.id.toString()}
  renderItem={renderItem}
  contentContainerStyle={{ paddingBottom: 90 }}

  ListEmptyComponent={
    !loading && (
      <View style={{ alignItems: "center", marginTop: 40 }}>
        <Text style={{ fontSize: 16, color: "#aaa" }}>
          No Orders...
        </Text>
      </View>
    )
  }
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
  orderIcon:{
 width: 22,
    height: 22,
    tintColor: '#ffffffff',
  },
    ordersIcon:{
 width: 18,
    height: 18,
    tintColor: '#1AA65B',
  },
    Icon:{
 width: 28,
    height: 28,
    tintColor: '#1AA65B',
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
  type: { color: "#000000ff", marginTop: 2 },

  row: { flexDirection: "row", alignItems: "center", marginTop: 4 },

  date: { marginLeft: 6, color: "#252525ff" },

  amount: { color: "#19A463", fontWeight: "800", alignSelf: "center" },
});
