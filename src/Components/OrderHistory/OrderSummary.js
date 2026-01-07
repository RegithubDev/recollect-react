import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, ActivityIndicator } from "react-native";
import { getOrderDetails } from "../../services/auth";


export default function OrderSummary({ navigation , route}) {

  const { orderId } = route.params;

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDetails();
  }, []);

  const loadDetails = async () => {
    try {
      const data = await getOrderDetails(orderId);
      setOrder(data);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  // 👉 IMPORTANT GUARD
  if (loading) {
    return (
      <View style={styles.loaderWrapper}>
        <ActivityIndicator size="large" color="#2ED573" />
      </View>
    );
  }

  if (!order) {
    return (
      <View style={styles.loaderWrapper}>
        <Text style={{ color: "#fff" }}>No details found</Text>
      </View>
    );
  }
const getStatusColor = (status) => {
  switch (status?.toLowerCase()) {
    case "completed":
      return { backgroundColor: "#2F9E44" };
    case "open":
    case "scheduled":
      return { backgroundColor: "#3B82F6" };
    case "in progress":
      return { backgroundColor: "#6C9A3B" };
    case "cancelled":
      return { backgroundColor: "#EF4444" };
    default:
      return { backgroundColor: "#6B7280" };
  }
};

return (
  <View style={styles.container}>
    
    {/* Header */}
    <View style={styles.headerRow}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack?.()}
        >
          <Image
            source={require('../../../assets/back.png')}
            style={styles.backIcon}
          />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Order Summary</Text>

        <View style={{ width: 36 }} />
      </View>

    <Text style={styles.subText}>
      Track your waste collection orders and their status
    </Text>

    {/* CARD */}
    <View style={styles.card}>
      
      {/* top row */}
      <View style={styles.cardHeader}>
        <View style={{ gap: 4 }}>
          <Text style={styles.smallLabel}>ORDER ID</Text>
          <Text style={styles.orderCode}>#{order.code}</Text>
        </View>

        <View style={[styles.statusPill, getStatusColor(order.status)]}>
          <Text style={styles.statusText}>{order.status}</Text>
        </View>
      </View>

      {/* Waste Type */}
      <View style={styles.row}>
             <Image
    source={require('../../../assets/cat.png')}
    style={styles.icon}
  />
        <View>
          <Text style={styles.label}>Waste Type</Text>
          <Text style={styles.value}>
            {order.type === "biowaste" ? "Bio Waste" : "Scrap"}
          </Text>
        </View>
      </View>

      {/* Created & Scheduled */}
      <View style={styles.rowSplit}>
        <View style={styles.row}>
               <Image
    source={require('../../../assets/clock.png')}
    style={styles.icon}
  />
          <View>
            <Text style={styles.label}>Created</Text>
            <Text style={styles.value}>
              {new Date(order.orderDate).toDateString()}
            </Text>
          </View>
        </View>

        <View style={styles.row}>
             <Image
    source={require('../../../assets/schedule.png')}
    style={styles.icon}
  />
          <View>
            <Text style={styles.label}>Scheduled</Text>
            <Text style={styles.value}>
              {new Date(order.scheduleDate).toDateString()}
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.divider} />

      {/* Address */}
      <View style={styles.row}>
       <Image
    source={require('../../../assets/locate.png')}
    style={styles.icon}
  />
        <View style={{ flex: 1 }}>
          <Text style={styles.label}>Pickup Address</Text>
          <Text style={styles.value}>{order.residenceDetails || "-"}</Text>
        </View>
      </View>
    </View>
  </View>
);

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0B1512",
    padding: 16,
  },
icon: {
  width: 26,
  height: 26,
  resizeMode: "contain",
  tintColor:'#187D57'
},

   headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 18,
    paddingTop: '12%',
    paddingBottom: 8,
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255, 255, 255, 0.27)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backIcon: {
    width: 18,
    height: 18,
    resizeMode: 'contain',
    tintColor: '#ffffffff',
  },
  headerTitle: {
    flex: 1,
    textAlign: 'center',
    fontSize: 20,
    color: '#ffffffff',
    fontFamily: 'Poppins-SemiBold',
  },




  subText: {
    color: "#c9caccff",
    marginTop: 8,
    marginBottom: 14,
  },

  card: {
    backgroundColor: "#cececeff",
    borderRadius: 18,
    padding: 16,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },

  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 14,
  },

  smallLabel: {
    fontSize: 10,
    color: "#353535ff",
  },

  orderCode: {
    fontSize: 16,
    fontWeight: "700",
    color: "#0F172A",
  },

  statusPill: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },

  statusText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#fff",
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginVertical: 10,
  },

  rowSplit: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 6,
  },

  label: {
    fontSize: 12,
    color: "#6B7280",
  },

  value: {
    fontSize: 14,
    fontWeight: "600",
    color: "#111827",
  },

  divider: {
    height: 1,
    backgroundColor: "#E5E7EB",
    marginVertical: 10,
  },
});

