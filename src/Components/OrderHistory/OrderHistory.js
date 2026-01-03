import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  ActivityIndicator,
  FlatList,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { getOrderHistory } from "../../services/auth";

const MyOrdersScreen = ({ navigation }) => {
  const [orders, setOrders] = useState([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    if (loadingMore || !hasMore) return;

    try {
      setLoadingMore(true);

      const data = await getOrderHistory({
        page,
        size: 20,
        sort: "id",
        direction: "DESC",
      });

      // data should be array (content)
      const list = data || [];

      setOrders(prev => [...prev, ...list]);

      // if API returned less than size → no more pages
      setHasMore(list.length === 20);

      setPage(prev => prev + 1);
    } catch (err) {
      console.log(err);
    } finally {
      setLoadingMore(false);
    }
  };

  const renderStatus = status => {
    if (status === "completed") {
      return (
        <View style={[styles.statusPill, styles.completed]}>
          <Ionicons name="checkmark-circle" size={16} color="#2ED573" />
          <Text style={styles.statusText}> Completed</Text>
        </View>
      );
    }

    return (
      <View style={[styles.statusPill, styles.scheduled]}>
        <Text style={styles.statusText}> Scheduled</Text>
      </View>
    );
  };

  const renderItem = ({ item }) => {
    const isBio = item.type === "biowaste";

    return (
      <View style={styles.card}>
        <View style={styles.topRow}>
          <View style={styles.leftRow}>
            <View
              style={[
                styles.iconCircle,
                { backgroundColor: isBio ? "#3A2A12" : "#1F3C2E" },
              ]}
            >
              <Image
                source={
                  isBio
                    ? require("../../../assets/hazard.png")
                    : require("../../../assets/waste.png")
                }
                style={styles.icon}
              />
            </View>

            <View>
              <Text style={styles.typeText}>
                {isBio ? "DH Waste" : "Scrap"}
              </Text>

              <Text style={styles.dateText}>
                {new Date(item.scheduleDate).toDateString()}
              </Text>
            </View>
          </View>

          {renderStatus(item.status)}
        </View>

        <View style={styles.bottomRow}>
          {/* <Text style={styles.weightText}>
            Weight:{" "}
            <Text style={styles.bold}>
              {item.weight ? `${item.weight} kg` : "--"}
            </Text>
          </Text> */}

          {item.amount && (
            <Text style={styles.amount}>+₹{item.amount}</Text>
          )}
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Pickup History</Text>
        <Text style={styles.subtitle}>Track all your waste pickups</Text>
      </View>

      <FlatList
        data={orders}
        keyExtractor={item => item.id?.toString()}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 60 }}
        showsVerticalScrollIndicator={false}
        onEndReached={loadOrders}
        onEndReachedThreshold={0.4}
        ListFooterComponent={
          loadingMore ? (
            <ActivityIndicator
              size="large"
              color="#2ED573"
              style={{ marginVertical: 20 }}
            />
          ) : null
        }
      />
    </SafeAreaView>
  );
};

export default MyOrdersScreen;



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0B1512',
    paddingHorizontal: 16,
  },

  header: {
    marginTop: '13%',
    // marginBottom: 20,
  },

  title: {
    fontSize: 26,
    fontFamily: 'Poppins-SemiBold',
    color: '#FFFFFF',
  },

  subtitle: {
    marginTop: 4,
    fontSize: 14,
    color: '#9CA3AF',
  },

  card: {
    backgroundColor: '#0F1F19',
    borderRadius: 20,
    padding: 16,
    marginTop: '5%',
    borderWidth: 1.5,
    borderColor: '#1E3D2B',
    shadowColor: '#2ED573',
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 6,
  },

  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  leftRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  iconCircle: {
    width: 52,
    height: 52,
    borderRadius: 26,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },

  icon: {
    width: 26,
    height: 26,
    tintColor: '#F97316',
  },

  typeText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
  },

  dateRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },

  dateText: {
    marginLeft: 6,
    color: '#9CA3AF',
    fontSize: 13,
  },

  statusPill: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },

  completed: {
    backgroundColor: '#0F3D2E',
  },

  scheduled: {
    backgroundColor: '#3D2F0F',
  },

  statusText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#FFFFFF',
  },

  bottomRow: {
    marginTop: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  weightText: {
    color: '#9CA3AF',
    fontSize: 14,
  },

  bold: {
    color: '#FFFFFF',
    fontWeight: '600',
  },

  amount: {
    fontSize: 20,
    fontWeight: '700',
    color: '#2ED573',
  },
});
