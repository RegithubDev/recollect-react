import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  StatusBar,
  Image,
  Dimensions,
  Platform,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';

const { width } = Dimensions.get('window');

const ScrapMoneyScreen = ({ navigation }) => {
  // sample values
  const userName = 'Lakshmi Monika';
  const balance = '₹00.00';

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="#000"
      />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => navigation?.goBack?.()}>
        <Image
                   source={require('../../../../assets/back.png')}
                   style={styles.backIcon}
                 />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Scrap Money</Text>
        {/* spacer for alignment */}
        <View style={{ width: 40 }} />
      </View>

      {/* Avatar + greeting */}
      <View style={styles.avatarRow}>
        <View style={styles.avatarWrap}>
          {/* simple avatar circle, replace with Image if you have one */}
          <View style={styles.avatarCircle}>
             <Image
                                       source={require('../../../../assets/avatar.png')}
                                       style={styles.avatarImage}
                                     />
          </View>
        </View>

        <Text style={styles.greeting}>Hello {userName}</Text>
      </View>

      {/* Balance gradient bar */}
      <View style={styles.balanceWrap}>
        <LinearGradient
          colors={['#10120a', '#187D57', '#10120a']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.balanceGradient}
        >
          <Text style={styles.balanceText}>{balance}</Text>
        </LinearGradient>

        <Text style={styles.availableLabel}>Available Balance</Text>
      </View>

      {/* Buttons */}
      <View style={styles.buttonsRow}>
        <TouchableOpacity style={styles.actionBtn}>
          <Text style={styles.actionText}>Move to wallet</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionBtn}>
          <Text style={styles.actionText}>Withdrawal</Text>
        </TouchableOpacity>
      </View>

      {/* Transaction history panel */}
      <View style={styles.historyCard}>
        <View style={styles.historyHeader}>
          <Text style={styles.historyTitle}>Transaction History</Text>

          <View style={styles.historyIcons}>
            {/* <TouchableOpacity style={styles.iconBtn}> */}
              {/* <Icon name="download-outline" size={20} color="#b9d44f" /> */}
            {/* </TouchableOpacity> */}
            {/* <TouchableOpacity style={[styles.iconBtn, { marginLeft: 10 }]}> */}
              {/* <Icon name="filter-outline" size={20} color="#b9d44f" /> */}
            {/* </TouchableOpacity> */}
          </View>
        </View>

        <View style={styles.noDataWrap}>
          <Text style={styles.noDataText}>No transaction data available.</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ScrapMoneyScreen;

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#0b1410', // screen background black
  },
  header: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginTop:'10%',
    justifyContent: 'space-between',
    // slightly elevated area like screenshot top bar
  },
     avatarImage: {
    width: 25,
    height: 25,
    resizeMode: 'contain',
    tintColor:'#fff'
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#808080ff',
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
    color: '#000000ff',
    fontSize: 18,
    fontWeight: '600',
  },

  avatarRow: {
    alignItems: 'center',
    marginTop: 8,
  },
  avatarWrap: {
    marginBottom: 8,
  },
  avatarCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#187D57',
    alignItems: 'center',
    justifyContent: 'center',
    // little border to match screenshot
    borderWidth: 2,
    borderColor: 'rgba(0,0,0,0.08)',
  },
  greeting: {
    marginTop: 8,
    color: '#fcfcfcff',
    fontSize: 16,
    fontWeight: '700',
    textAlign: 'center',
  },

  balanceWrap: {
    alignItems: 'center',
    marginTop: 12,
  },
  balanceGradient: {
    width: width * 0.92,
    height: 90,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  balanceText: {
    color: '#fff',
    fontSize: 42,
    fontWeight: '800',
    letterSpacing: 1,
  },
  availableLabel: {
    marginTop: 10,
    color: '#187D57',
    fontWeight: '700',
  },

  buttonsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 18,
    marginTop: 16,
  },
  actionBtn: {
    width: (width - 72) / 2, // equal width, with margins
    paddingVertical: 14,
    backgroundColor: '#187D57',
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    // small shadow for android
    elevation: 3,
  },
  actionText: {
    color: '#ffffffff',
    fontSize: 16,
    fontWeight: '700',
  },

  historyCard: {
    flex: 1,
    marginTop: 20,
    backgroundColor: '#727473ff',
    borderTopLeftRadius: 26,
    borderTopRightRadius: 26,
    paddingHorizontal: 18,
    paddingTop: 18,
  },
  historyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  historyTitle: {
    color: '#ffffffff',
    fontWeight: '700',
    fontSize: 18,
  },
  historyIcons: {
    flexDirection: 'row',
  },
  iconBtn: {
    width: 44,
    height: 44,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#acacacff',
    backgroundColor: '#b1b1b1ff',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    elevation: 2,
  },

  noDataWrap: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
  },
  noDataText: {
    color: '#ffffffff',
    fontSize: 18,
    textAlign: 'center',
    opacity: 0.9,
    fontWeight: '700',
  },
});
