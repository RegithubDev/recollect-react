import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  FlatList
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { getAssignableOrders } from "../../../services/Providerauth/auth";

const ORDERS = [
  {
    id: "1",
    name: "John Smith",
    orderId: "#1234",
    address: "123 Green Street, Eco City, EC 12345",
    type: "Recyclable Plastics",
    time: "Today, 2:00 PM",
    status: "Pending"
  },
  {
    id: "2",
    name: "Sarah Johnson",
    orderId: "#1235",
    address: "456 Oak Avenue, Greenville, GV 67890",
    type: "Electronic Waste",
    time: "Today, 4:30 PM",
    status: "Pending"
  }
];

export default function ProviderHome() {
  const [orders, setOrders] = useState([]);
const [loading, setLoading] = useState(true);

useEffect(() => {
  fetchOrders();
}, []);

const fetchOrders = async () => {
  try {
    const res = await getAssignableOrders();
    console.log("orderlistresponse:",res);
    setOrders(res.data?.data?.content || []);
  } catch (err) {
    console.log("ORDER LIST ERROR", err?.response?.data || err);
  } finally {
    setLoading(false);
  }
};

  const renderOrder = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
   <Text style={styles.cardTitle}>{item.fullName}</Text>

        <View style={styles.badge}>
        <Text style={styles.badgeText}>{item.status}</Text>
        </View>
      </View>

     <Text style={styles.orderId}>Order {item.code}</Text>

      <View style={styles.row}>
        <Ionicons name="location-outline" size={18} color="#19A463" />
        {/* <Text style={styles.detailText}>{item.address}</Text> */}
        <Text style={styles.detailText}>
  {item.residenceDetails} {item.landmark}
</Text>
      </View>

      <View style={styles.row}>
        <Ionicons name="cube-outline" size={18} color="#19A463" />
       <Text style={styles.detailText}>{item.type}</Text>
      </View>

      <View style={styles.row}>
        <Ionicons name="time-outline" size={18} color="#19A463" />
       <Text style={styles.detailText}>{item.scheduleDate}</Text>
      </View>

      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.acceptBtn}>
          <Text style={styles.acceptText}>Accept Order</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.outlineBtn}>
          <Text style={styles.outlineText}>View Details</Text>
          {/* <Ionicons name="chevron-forward" size={16} color="#19A463" /> */}
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <View>
          <Text style={styles.smallText}>Good Morning,</Text>
          <Text style={styles.name}>Alex Picker</Text>
        </View>

        <TouchableOpacity style={styles.bell}>
          <Ionicons name="notifications-outline" size={24} color="#19A463" />
        </TouchableOpacity>
      </View>

      {/* STATS */}
      <View style={styles.statsRow}>
        <View style={styles.statBox}>
          <Text style={styles.statLabel}>Pending</Text>
          <Text style={styles.statNumber}>2</Text>
        </View>

        <View style={styles.statBox}>
          <Text style={styles.statLabel}>Active</Text>
          <Text style={styles.statNumber}>2</Text>
        </View>
      </View>

      {/* SEARCH BAR */}
      <View style={styles.searchBox}>
        <Ionicons name="search" size={20} color="#9aa4b2" />
        <TextInput
          placeholder="Search orders..."
          style={styles.searchInput}
        />
        <TouchableOpacity style={styles.filterBtn}>
          <Ionicons name="filter-outline" size={20} color="#1a1a1a" />
        </TouchableOpacity>
      </View>

      {/* ORDER LIST */}
      <View style={styles.listHeader}>
        <Text style={styles.sectionTitle}>Order Requests</Text>
        <Text style={styles.count}>4 orders</Text>
      </View>

      <FlatList
      data={orders}

        keyExtractor={(item) => item.id}
        renderItem={renderOrder}
        contentContainerStyle={{ paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      />

      {/* BOTTOM NAV (STATIC UI) */}
      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="home" size={22} color="#19A463" />
          <Text style={styles.navActive}>Home</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="time-outline" size={22} color="#8b98a8" />
          <Text style={styles.navText}>History</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="person-outline" size={22} color="#8b98a8" />
          <Text style={styles.navText}>Profile</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#183528" },

  header: {
    backgroundColor: "#19A463",
    padding: 40,
    paddingBottom: 70,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  smallText: { color: "#E8FFF1" },
  name: { color: "#fff", fontWeight: "bold", fontSize: 22 },

  bell: {
    backgroundColor: "#E9FFF2",
    padding: 10,
    borderRadius: 30
  },

  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: -45,
    paddingHorizontal: 20
  },

  statBox: {
    flex: 1,
    backgroundColor: "#183528",
    borderColor:'#2de39e',
    marginHorizontal: 6,
    borderRadius: 20,
    padding: 18
  },

  statLabel: { color: "#D8FFE9" },
  statNumber: { color: "#fff", fontSize: 22, fontWeight: "bold" },

  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    margin: 20,
    backgroundColor: "#fff",
    borderRadius: 20,
    paddingHorizontal: 14,
    elevation: 4
  },

  searchInput: { flex: 1, marginLeft: 10 },

  filterBtn: {
    backgroundColor: "#F3F6F8",
    padding: 10,
    borderRadius: 12
  },

  listHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20
  },

  sectionTitle: { fontWeight: "bold", fontSize: 16, color: "#ffffffff"  },
  count: { color: "#ffffffff" },

  card: {
    backgroundColor: "#fff",
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 20,
    padding: 16,
    elevation: 4
  },

  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },

  cardTitle: { fontWeight: "bold", fontSize: 16 },

  badge: {
    backgroundColor: "#FFF5D9",
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12
  },

  badgeText: { color: "#D8A000", fontWeight: "600" },

  orderId: { color: "#6d7885", marginBottom: 6 },

  row: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 2
  },

  detailText: {
    marginLeft: 8,
    color: "#495566"
  },

  buttonRow: {
    flexDirection: "row",
    marginTop: 14
  },

  acceptBtn: {
    flex: 1,
    backgroundColor: "#19A463",
    paddingVertical: 12,
    borderRadius: 14,
    alignItems: "center",
    marginRight: 10
  },

  acceptText: { color: "#fff", fontWeight: "bold" },

  outlineBtn: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1.5,
    borderColor: "#19A463",
    borderRadius: 14,
    paddingHorizontal: 14
  },

  outlineText: { color: "#19A463", marginRight: 4, fontWeight: "600" },

  bottomBar: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 10,
    backgroundColor: "#fff",
    elevation: 6
  },

  navItem: { alignItems: "center" },
  navActive: { color: "#19A463", fontWeight: "bold" },
  navText: { color: "#8b98a8" }
});
