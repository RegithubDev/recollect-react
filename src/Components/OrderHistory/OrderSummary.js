import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, ActivityIndicator,Modal,FlatList,Pressable} from "react-native";
import { getCancellationReasons, getOrderDetails } from "../../services/auth";
import CancelOrderModal from '../OrderHistory/CancelOrderModal';

export default function OrderSummary({ navigation , route}) {

  const { orderId } = route.params;
const [showCancelModal, setShowCancelModal] = useState(false);

const [reasons, setReasons] = useState([]);
const [selectedReason, setSelectedReason] = useState(null);
const [loadingReasons, setLoadingReasons] = useState(false);

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDetails();
  }, []);

  useEffect(() => {
  console.log("Modal visible:", showCancelModal);
}, [showCancelModal]);


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
  // if (loading) {
  //   return (
  //     <View style={styles.loaderWrapper}>
  //       <ActivityIndicator size="large" color="#2ED573" />
  //     </View>
  //   );
  // }

  // if (!order) {
  //   return (
  //     <View style={styles.loaderWrapper}>
  //       <Text style={{ color: "#fff" }}>No details found</Text>
  //     </View>
  //   );
  // }

const openCancelModal = async () => {
  setShowCancelModal(true);
  setLoadingReasons(true);

  try {
    const res = await getCancellationReasons();
console.log("cancellation", res.data.data)
    if (res.ok && Array.isArray(res.data?.data)) {
      setReasons(res.data.data.filter(r => r.isActive));
    } else {
      setReasons([]);
      console.log("Unexpected response", res);
    }
  } catch (e) {
    console.log(e);
    setReasons([]);
  } finally {
    setLoadingReasons(false);
  }
};







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
        <Text style={styles.orderCode}>#{order?.code ?? "-"}</Text>

        </View>

        <View style={[styles.statusPill, getStatusColor(order?.status)]}>
          <Text style={styles.statusText}>{order?.status}</Text>
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
            {order?.type === "biowaste" ? "Bio Waste" : "Scrap"}
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
              {new Date(order?.orderDate).toDateString()}
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
              {new Date(order?.scheduleDate).toDateString()}
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
          <Text style={styles.value}>{order?.residenceDetails || "-"}</Text>
        </View>
        {/* ACTION BUTTONS */}


      </View>
      <View style={styles.actionRow}>
  <TouchableOpacity onPress={openCancelModal} style={[styles.actionButton, styles.cancelBtn]}>
    <Text style={styles.actionText}>Cancel</Text>
  </TouchableOpacity>

  <TouchableOpacity style={[styles.actionButton, styles.rescheduleBtn]}>
    <Text style={styles.actionText}>Reschedule</Text>
  </TouchableOpacity>
</View>
{showCancelModal && (
  <View style={styles.sheetOverlay}>
    <Pressable
      style={{ flex: 1 }}
      onPress={() => setShowCancelModal(false)}
    />

    <View style={styles.sheet}>
      {/* Drag Indicator */}
      <View style={styles.dragHandle} />

      <Text style={styles.sheetTitle}>Cancel Order</Text>
      <Text style={styles.sheetSub}>Select a reason</Text>

      {/* SCROLLABLE CONTENT */}
      <View style={{ flex: 1 }}>
        {loadingReasons ? (
          <ActivityIndicator color="#187D57" />
        ) : (
          <FlatList
            data={reasons}
            keyExtractor={(item) => item.id.toString()}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 20 }}
            renderItem={({ item }) => (
              <Pressable
                onPress={() => setSelectedReason(item)}
                style={[
                  styles.reasonRow,
                  selectedReason?.id === item.id && styles.reasonActive,
                ]}
              >
                <Text style={styles.reasonText}>{item.reason}</Text>
              </Pressable>
            )}
          />
        )}
      </View>

      {/* FIXED ACTION BUTTONS */}
      <View style={styles.modalActions}>
        <TouchableOpacity
          style={styles.modalCancel}
          onPress={() => setShowCancelModal(false)}
        >
          <Text style={styles.modalCancelText}>Close</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.modalConfirm,
            !selectedReason && { opacity: 0.5 },
          ]}
          disabled={!selectedReason}
        >
          <Text style={styles.modalConfirmText}>Confirm</Text>
        </TouchableOpacity>
      </View>
    </View>
  </View>
)}


    </View>




  </View>
);

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0B1512",
    padding: 8,
    
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
  



  actionRow: {
  flexDirection: "row",
  justifyContent: "space-between",
  marginTop: 16,
  gap: 12,
},

actionButton: {
  flex: 1,
  paddingVertical: 12,
  borderRadius: 12,
  alignItems: "center",
},

cancelBtn: {
  backgroundColor: "#EF4444",
},

rescheduleBtn: {
  backgroundColor: "#187D57",
},

actionText: {
  color: "#fff",
  fontSize: 14,
  fontFamily: "Poppins-SemiBold",
},
modalOverlay: {
  flex: 1,
  backgroundColor: "rgba(0,0,0,0.6)",
  justifyContent: "flex-end",
},

modalCard: {
  backgroundColor: "#fff",
  borderTopLeftRadius: 20,
  borderTopRightRadius: 20,
  padding: 20,
  maxHeight: "70%",
},

modalTitle: {
  fontSize: 18,
  fontFamily: "Poppins-SemiBold",
  color: "#111",
},

modalSub: {
  fontSize: 12,
  color: "#6B7280",
  marginBottom: 10,
},

reasonRow: {
  padding: 14,
  borderRadius: 12,
  borderWidth: 1,
  borderColor: "#E5E7EB",
  marginVertical: 6,
},

reasonActive: {
  borderColor: "#187D57",
  backgroundColor: "#E9F7F1",
},

reasonText: {
  fontSize: 14,
  color: "#111",
},

modalActions: {
  flexDirection: "row",
  marginTop: 16,
  gap: 12,
},

modalCancel: {
  flex: 1,
  padding: 12,
  borderRadius: 12,
  borderWidth: 1,
  borderColor: "#EF4444",
  alignItems: "center",
},

modalCancelText: {
  color: "#EF4444",
  fontFamily: "Poppins-SemiBold",
},

modalConfirm: {
  flex: 1,
  padding: 12,
  borderRadius: 12,
  backgroundColor: "#187D57",
  alignItems: "center",
},

modalConfirmText: {
  color: "#fff",
  fontFamily: "Poppins-SemiBold",
},

sheetOverlay: {
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(0,0,0,0.6)",
  justifyContent: "flex-end",
},

dragHandle: {
  width: 40,
  height: 4,
  backgroundColor: "#D1D5DB",
  borderRadius: 10,
  alignSelf: "center",
  marginBottom: 10,
},

sheet: {
  backgroundColor: "#fff",
  borderTopLeftRadius: 22,
  borderTopRightRadius: 22,
  padding: 20,
  height: "80%",          // 🔥 FIX: use height instead of maxHeight
  paddingBottom: 30,      // 🔥 FIX: prevents cutting
},


sheetTitle: {
  fontSize: 18,
  fontFamily: "Poppins-SemiBold",
},

sheetSub: {
  fontSize: 12,
  color: "#6B7280",
  marginBottom: 10,
},


});

