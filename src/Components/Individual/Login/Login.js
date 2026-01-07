import React, { useContext, useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Alert,
} from 'react-native';
import { sendCustomerOtp } from '../../../services/auth';
import { AuthContext } from '../../../context/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

const TOKEN_KEY = 'tempToken';

const SignInScreen = ({ navigation }) => {
  const [phone, setPhone] = useState('');
  const { login } = useContext(AuthContext);

  const isValid = phone.length === 10;

  const handleContinue = async () => {
    if (!isValid) return;

    try {
  const response = await sendCustomerOtp(phone);
console.log("res",response);
const tempToken =
  response?.data?.token ?? response?.data?.data?.token ?? null;
console.log("temptoken",tempToken);

const customerId = response?.data?.id ?? null;
const fullName = response?.data?.fullName;
const email = response?.data?.email;
console.log("token", tempToken);
console.log("customerId", customerId,email);


   if (!tempToken || !customerId) {
  Alert.alert("Error", "Login data missing");
  return;
}

      await AsyncStorage.setItem(TOKEN_KEY, tempToken);
      await AsyncStorage.setItem("customerId", customerId.toString());
      await AsyncStorage.setItem("phone", phone);
      await AsyncStorage.setItem("fullname", fullName);
 await AsyncStorage.setItem("email", email);
      console.log("phonemobile",phone,fullName)
      navigation.navigate('OtpScreen', { phone, tempToken });
    } catch (error) {
      Alert.alert('Error', 'Failed to send OTP');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#187D57" />
{/* Bubble Background */}
<View style={styles.bubbleOne} />
<View style={styles.bubbleTwo} />
<View style={styles.bubbleThree} />
<View style={styles.bubbleFour} />

      {/* White Card */}
      <View style={styles.card}>
        <Text style={styles.title}>Welcome Back 👋</Text>

        <Text style={styles.subtitle}>
          Let’s make waste management{'\n'}simple & sustainable
        </Text>

        <Text style={styles.label}>Mobile Number</Text>

        <View style={styles.phoneRow}>
          <View style={styles.countryCodeBox}>
            <Text style={styles.countryCodeText}>+91</Text>
          </View>

          <TextInput
            style={styles.phoneInput}
            placeholder="Enter mobile number"
            placeholderTextColor="#9CA3AF"
            keyboardType="number-pad"
            maxLength={10}
            value={phone}
            onChangeText={setPhone}
          />
        </View>

        <TouchableOpacity
          style={[
            styles.continueButton,
            { opacity: isValid ? 1 : 0.6 },
          ]}
          disabled={!isValid}
          onPress={handleContinue}
          activeOpacity={0.85}
        >
          <Text style={styles.continueText}>Continue</Text>
        </TouchableOpacity>

        <Text style={styles.footerText}>
          You’ll receive a one-time password (OTP)
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default SignInScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0b1410',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
bubbleOne: {
  position: 'absolute',
  width: 190,
  height: 190,
  borderRadius: 95,
  backgroundColor: 'rgba(144, 238, 144, 0.18)',
  top: -50,
  left: -60,
},

bubbleTwo: {
  position: 'absolute',
  width: 130,
  height: 130,
  borderRadius: 65,
  backgroundColor: 'rgba(144, 238, 144, 0.18)',
  top: 140,
  right: -40,
},

bubbleThree: {
  position: 'absolute',
  width: 240,
  height: 240,
  borderRadius: 120,
  backgroundColor: 'rgba(144, 238, 144, 0.18)',
  bottom: -90,
  left: -50,
},

bubbleFour: {
  position: 'absolute',
  width: 150,
  height: 150,
  borderRadius: 75,
  backgroundColor: 'rgba(144, 238, 144, 0.18)',
  bottom: 70,
  right: -55,
},


bubbleFour: {
  position: 'absolute',
  width: 80,
  height: 140,
  borderRadius: 70,
  backgroundColor: 'rgba(144, 238, 144, 0.18)',
  bottom: 60,
  right: -50,
},

  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 28,
    padding: 24,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 10 },
    elevation: 10,
  },

  title: {
    fontSize: 28,
    color: '#111827',
    fontFamily: 'Poppins-SemiBold',
    marginBottom: 8,
  },

  subtitle: {
    fontSize: 15,
    color: '#4B5563',
    fontFamily: 'Poppins-Regular',
    marginBottom: 28,
    lineHeight: 22,
  },

  label: {
    fontSize: 14,
    color: '#374151',
    fontFamily: 'Poppins-Medium',
    marginBottom: 8,
  },

  phoneRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },

  countryCodeBox: {
    width: 70,
    height: 54,
    borderRadius: 14,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },

  countryCodeText: {
    fontSize: 16,
    color: '#111827',
    fontFamily: 'Poppins-Medium',
  },

  phoneInput: {
    flex: 1,
    height: 54,
    borderRadius: 14,
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#111827',
    fontFamily: 'Poppins-Regular',
  },

  continueButton: {
    height: 56,
    borderRadius: 18,
    backgroundColor: '#187D57',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },

  continueText: {
    fontSize: 16,
    color: '#FFFFFF',
    fontFamily: 'Poppins-SemiBold',
  },

  footerText: {
    marginTop: 16,
    fontSize: 12,
    color: '#6B7280',
    textAlign: 'center',
    fontFamily: 'Poppins-Regular',
  },
});
