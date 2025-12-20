import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Image,
} from 'react-native';

const PickupSuccessScreen = ({ navigation, route }) => {
  const { orderId, selectedDate } = route.params || {};

  const formatDate = (date) => {
    const d = new Date(date);
    return d.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.center}>
        <View style={styles.checkCircle}>
          <Image
            source={require('../../../assets/check.png')}
            style={styles.checkIcon}
          />
        </View>

        <Text style={styles.thankText}>
          Thank you for choosing us
        </Text>

        <View style={styles.card}>
          <View style={styles.row}>
            <Text style={styles.label}>Order Id</Text>
            <Text style={styles.value}>{orderId}</Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.row}>
            <Text style={styles.label}>Scheduled Pickup</Text>
            <Text style={styles.value}>
              {formatDate(selectedDate)}
            </Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.row}>
            <Text style={styles.label}>Service</Text>
            <Text style={styles.value}>D H Waste</Text>
          </View>
        </View>
      </View>

      <TouchableOpacity
        style={styles.trackBtn}
      onPress={() =>
  navigation.reset({
    index: 0,
    routes: [
      {
        name: 'HomeTabs',
        state: {
          routes: [{ name: 'History' }],
        },
      },
    ],
  })
}

      >
        <Text style={styles.trackText}>Track Your Order</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default PickupSuccessScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffffff',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingBottom: 30,
  },

  center: {
    alignItems: 'center',
    marginTop: 80,
  },

  /* CHECK ICON */
  checkCircle: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: '#6f9100ff',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
    shadowColor: '#c7dd7f',
    shadowOpacity: 0.5,
    shadowRadius: 20,
    elevation: 10,
  },

  checkIcon: {
    width: 40,
    height: 40,
    tintColor: '#000',
    resizeMode: 'contain',
  },

  /* THANK YOU TEXT */
  thankText: {
    fontSize: 18,
    color: '#000000ff',
    marginBottom: 30,
    fontFamily: 'Poppins-SemiBold',
  },

  /* INFO CARD */
  card: {
    width: '100%',
    backgroundColor: '#bcca8fff',
    borderRadius: 22,
    paddingVertical: 24,
    paddingHorizontal: 22,
  },

  row: {
    alignItems: 'center',
    paddingVertical: 14,
  },

  label: {
    fontSize: 14,
    color: '#000000ff',
    marginBottom: 6,
    fontFamily: 'Poppins-Regular',
  },

  value: {
    fontSize: 16,
    color: '#000000ff',
    fontFamily: 'Poppins-SemiBold',
  },

  divider: {
    height: 1,
    backgroundColor: '#2e2e2e',
    marginVertical: 6,
  },

  /* TRACK BUTTON */
  trackBtn: {
    backgroundColor: '#6f9100ff',
    paddingVertical: 18,
    borderRadius: 16,
    alignItems: 'center',
  },

  trackText: {
    color: '#000',
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
  },
});

