// src/screens/WalletScreen.js
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const TRANSACTIONS = [
  { id: 1, title: 'DH Waste Pickup', date: 'Dec 15', amount: '+₹450', type: 'credit' },
  { id: 2, title: 'Scrap Sale', date: 'Dec 12', amount: '+₹320', type: 'credit' },
  { id: 3, title: 'Withdrawal', date: 'Dec 10', amount: '-₹200', type: 'debit' },
  { id: 4, title: 'DH Waste Pickup', date: 'Dec 8', amount: '+₹580', type: 'credit' },
];

const WalletScreen = () => {
  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" />
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <Text style={styles.pageTitle}>Wallet</Text>

        {/* Balance Card */}
        <View style={styles.balanceCard}>
          <Text style={styles.balanceLabel}>Available Balance</Text>
          <Text style={styles.balanceAmount}>₹2,450</Text>

          <View style={styles.actionRow}>
         <TouchableOpacity style={styles.withdrawBtn}>
  <Image
    source={require('../../../../assets/topright.png')} 
    style={styles.withdrawIcon}
  />
  <Text style={styles.withdrawText}>Withdraw</Text>
</TouchableOpacity>


            <TouchableOpacity style={styles.bankBtn}>
              {/* <Ionicons name="card-outline" size={18} color="#fff" /> */}
              <Text style={styles.bankText}>Add Bank</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Transactions */}
        <Text style={styles.sectionTitle}>Recent Transactions</Text>

        <View style={styles.txnCard}>
          {TRANSACTIONS.map(item => (
            <View key={item.id} style={styles.txnRow}>
             <View
  style={[
    styles.txnIcon,
    { backgroundColor: item.type === 'credit' ? '#1f6f4a' : '#5a2d2d' },
  ]}
>
  <Image
    source={
      item.type === 'credit'
        ? require('../../../../assets/topright.png')  
        : require('../../../../assets/downarrow.png')    
    }
    style={[
      styles.txnIconImage,
      { tintColor: item.type === 'credit' ? '#2dff9a' : '#ff4d4d' },
    ]}
  />
</View>


              <View style={{ flex: 1 }}>
                <Text style={styles.txnTitle}>{item.title}</Text>
                <Text style={styles.txnDate}>{item.date}</Text>
              </View>

              <Text
                style={[
                  styles.txnAmount,
                  { color: item.type === 'credit' ? '#2dff9a' : '#ff4d4d' },
                ]}
              >
                {item.amount}
              </Text>
            </View>
          ))}
        </View>

        <View style={{ height: 80 }} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default WalletScreen;


const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#0b1411',
    paddingHorizontal: 18,
  },
  withdrawIcon: {
  width: 18,
  height: 18,
  resizeMode: 'contain',
  marginRight: 8,
},

txnIconImage: {
  width: 18,
  height: 18,
  resizeMode: 'contain',
},

  pageTitle: {
    fontSize: 26,
    color: '#fff',
    fontFamily: 'Poppins-SemiBold',
    marginVertical: 16,
    marginTop:'13%'
  },

  balanceCard: {
    backgroundColor: '#101d18',
    borderRadius: 24,
    padding: 22,
    borderWidth: 1,
    borderColor: '#1f3d31',
    shadowColor: '#2dff9a',
    shadowOpacity: 0.25,
    shadowRadius: 20,
  },

  balanceLabel: {
    color: '#9ca3af',
    fontSize: 14,
    marginBottom: 6,
    fontFamily: 'Poppins-Regular',
  },

  balanceAmount: {
    color: '#fff',
    fontSize: 42,
    fontFamily: 'Poppins-SemiBold',
    marginBottom: 20,
  },

  actionRow: {
    flexDirection: 'row',
    gap: 12,
  },

  withdrawBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#2dff9a',
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 28,
    flex: 1,
    justifyContent: 'center',
  },

  withdrawText: {
    color: '#000',
    fontFamily: 'Poppins-SemiBold',
    fontSize: 15,
  },

  bankBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    borderWidth: 1,
    borderColor: '#2dff9a55',
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 28,
    flex: 1,
    justifyContent: 'center',
  },

  bankText: {
    color: '#fff',
    fontFamily: 'Poppins-Medium',
    fontSize: 15,
  },

  sectionTitle: {
    marginTop: 28,
    marginBottom: 12,
    fontSize: 18,
    color: '#fff',
    fontFamily: 'Poppins-SemiBold',
  },

  txnCard: {
    backgroundColor: '#101d18',
    borderRadius: 22,
    padding: 10,
    borderWidth: 1,
    borderColor: '#1f3d31',
  },

  txnRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: 0.5,
    borderBottomColor: '#1f3d31',
  },

  txnIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },

  txnTitle: {
    color: '#fff',
    fontSize: 15,
    fontFamily: 'Poppins-Medium',
  },

  txnDate: {
    color: '#9ca3af',
    fontSize: 12,
    marginTop: 2,
  },

  txnAmount: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
  },
});
