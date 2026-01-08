import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,ActivityIndicator,
  Image,
  Linking
} from "react-native";
import { getOrderDetails } from "../../../services/Providerauth/auth";

export default function ProviderDetailsScreen({ route, navigation }) {

 const orderId = route?.params?.orderId || route?.params?.order?.id;
const openInMaps = () => {
  if (!order?.latitude || !order?.longitude) {
    alert("Location not available");
    return;
  }

  const lat = order.latitude;
  const lng = order.longitude;

  const url = `https://www.google.com/maps?q=${lat},${lng}`;

  Linking.openURL(url);
};

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDetails = async () => {
      try {
        const res = await getOrderDetails(orderId);
        console.log("orderdetailsss",res)
     setOrder(res);

      } catch (e) {
        console.log("ORDER DETAILS ERROR", e?.response?.data || e);
      } finally {
        setLoading(false);
      }
    };

    loadDetails();
  }, [orderId]);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#26d07c" />
      </View>
    );
  }

  if (!order) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text style={{ color: "#fff" }}>Order not found</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>

      {/* HEADER */}
     <View style={styles.headerRow}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack?.()}
          >
            <Image
              source={require('../../../../assets/back.png')}
              style={styles.backIcon}
            />
          </TouchableOpacity>
  
          <Text style={styles.headerTitle}>Order Details</Text>
  
          <View style={{ width: 36 }} />
        </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.card}>

          {/* TOP */}
          <View style={styles.rowBetween}>
            {/* <View style={styles.statusTag}> */}
              {/* <Text style={styles.statusText}>{order.status}</Text> */}
                 <Text style={styles.orderId}>{order?.code}</Text>
            {/* </View> */}
          
  <View style={styles.statusTag}>
              <Text style={styles.statusText}>{order.status}</Text>
                 {/* <Text style={styles.orderId}>Order #{order.code?.slice(-10)}</Text> */}
            </View>
            {/* <Text style={styles.orderId}>Order #{order.code?.slice(-10)}</Text> */}
          </View>

          {/* CUSTOMER */}
          <Text style={styles.name}>{order.fullName}</Text>
          <Text style={styles.subText}>Customer</Text>

          <Text style={styles.phone}>
            {order?.mobileNumber || "N/A"}
          </Text>

          <View className="divider" />

          {/* PICKUP */}
          <Text style={styles.sectionTitle}>Pickup Location</Text>

          <Text style={styles.address}>
            {order.residenceDetails} {"\n"}
            {order.landmark}
          </Text>

        <TouchableOpacity onPress={openInMaps}>
  <Text style={styles.mapLink}>Tap to open in Google Maps →</Text>
</TouchableOpacity>


          <View style={styles.divider} />

          {/* DETAILS */}
          <Text style={styles.sectionTitle}>Order Information</Text>

          <Text style={styles.label}>Waste Type</Text>
          <Text style={styles.value}>{order.type}</Text>

          <Text style={[styles.label, { marginTop: 15 }]}>Scheduled Date</Text>
          <Text style={styles.value}>{order.scheduleDate}</Text>

        </View>
      </ScrollView>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0b1410",
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
divider: {
  height: 1,
  backgroundColor: "#1eb77b40",
  marginVertical: 16,
},

cardButtons: {
  flexDirection: "row",
  marginTop: 18,
},

  header: {
    paddingTop: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 18,
  },

  backBtn: {
    color: "#fff",
    fontSize: 26,
  },


  card: {
    backgroundColor: "#0f3e2b",
    marginHorizontal: 15,
    marginTop: 16,
    borderRadius: 16,
    padding: 18,
    borderWidth: 1,
    borderColor: "#1eb77b",
  },

  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  statusTag: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: "#2ddc88",
  },

  statusText: {
    color: "#2ddc88",
    fontWeight: "600",
  },

  orderId: {
    color: "#d3d3d3",
  },

  name: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
    marginTop: 14,
  },

  subText: {
    color: "#b7c6b9",
    marginTop: 4,
  },

  phone: {
    color: "#39d98a",
    marginTop: 12,
    fontSize: 16,
    fontWeight: "600",
  },

  sectionTitle: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "700",
    marginBottom: 12,
  },

  address: {
    color: "#fff",
    lineHeight: 20,
  },

  mapLink: {
    color: "#3be18e",
    marginTop: 10,
    fontWeight: "600",
  },

  label: {
    color: "#c7d3c8",
  },

  value: {
    color: "#fff",
    fontWeight: "700",
    marginTop: 3,
  },

  footerBtns: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 16,
  },

  acceptBtn: {
    backgroundColor: "#26d07c",
    flex: 1,
    marginRight: 10,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
  },

  acceptText: {
    color: "#00361f",
    fontSize: 16,
    fontWeight: "700",
  },

  rejectBtn: {
    borderColor: "#ff6d6d",
    borderWidth: 2,
    flex: 1,
    marginLeft: 10,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
  },

  rejectText: {
    color: "#ff6d6d",
    fontSize: 16,
    fontWeight: "700",
  },
});
