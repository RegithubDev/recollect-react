// OtpScreen.js
import React, { useRef, useState, useEffect, useContext } from 'react';
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
import { verifyCustomerOtp } from '../../../services/auth';
import { AuthContext } from '../../../context/AuthContext';

import AsyncStorage from '@react-native-async-storage/async-storage';
const TOKEN_KEY = 'tempToken';

const OtpScreen = ({ route, navigation }) => {
  // const phone = route?.params?.phone ?? '7799766177';
  const { login } = useContext(AuthContext);
  

  const [otp, setOtp] = useState(['', '', '', '']);
  const [timer, setTimer] = useState(30);

  const inputRefs = [
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
  ];
 const [tempToken, setTempToken] = useState(route?.params?.tempToken ?? null);
  const phone = route?.params?.phone;

  useEffect(() => {
    if (!tempToken) {
      // fallback to AsyncStorage if not passed via params
      (async () => {
        const tok = await AsyncStorage.getItem(TOKEN_KEY);
        setTempToken(tok);
      })();
    }
  }, [tempToken]);
  // countdown
  React.useEffect(() => {
    if (timer === 0) return;
    const interval = setInterval(() => setTimer(prev => prev - 1), 1000);
    return () => clearInterval(interval);
  }, [timer]);

  const handleChange = (text, index) => {
    const digits = text.replace(/[^0-9]/g, '');
    const newOtp = [...otp];
    newOtp[index] = digits;
    setOtp(newOtp);

    if (digits && index < 3) {
      inputRefs[index + 1].current?.focus();
    }

    if (!digits && index > 0) {
      inputRefs[index - 1].current?.focus();
    }
  };

  const handleResend = () => {
    if (timer !== 0) return;
    setOtp(['', '', '', '']);
    inputRefs[0].current?.focus();
    setTimer(30);
    // call resend API here, e.g. sendCustomerOtp(phone)
  };

 const STATIC_OTP = "1111";

const handleVerify = async () => {
  const code = otp.join('');

  if (code !== STATIC_OTP) {
    Alert.alert("Invalid OTP", "Please enter correct OTP (1111)");
    return;
  }

  // Simulate success
  await AsyncStorage.setItem("accessToken", "dummy-static-token");

  // Log user in
  await login("dummy-static-token");

  navigation.reset({
    index: 0,
    routes: [{ name: "HomeTabs" }],
  });

  Alert.alert("Success", "OTP verified successfully");
};



return (
  <SafeAreaView style={styles.container}>
    <StatusBar barStyle="light-content" backgroundColor="#0b1410" />

    {/* Bubble Background */}
    <View style={styles.bubbleOne} />
    <View style={styles.bubbleTwo} />
    <View style={styles.bubbleThree} />
    <View style={styles.bubbleFour} />

    {/* White Card */}
    <View style={styles.card}>
      <Text style={styles.headingTop}>OTP</Text>
      <Text style={styles.headingBottom}>Verification</Text>

      <Text style={styles.subtitle}>
        We have sent a verification code to
      </Text>
      <Text style={styles.phoneText}>+91 {phone}</Text>

      {/* OTP Boxes */}
      <View style={styles.otpRow}>
        {otp.map((value, index) => (
          <TextInput
            key={index}
            ref={inputRefs[index]}
            style={[
              styles.otpInput,
              value && styles.otpInputActive,
            ]}
            keyboardType="number-pad"
            maxLength={1}
            value={value}
            onChangeText={text => handleChange(text, index)}
          />
        ))}
      </View>

      {/* Resend */}
      <View style={styles.resendRow}>
        <Text style={styles.resendText}>Didn’t get OTP?</Text>
        <TouchableOpacity onPress={handleResend} disabled={timer !== 0}>
          <Text
            style={[
              styles.resendLink,
              { opacity: timer === 0 ? 1 : 0.4 },
            ]}
          >
            Resend {timer > 0 ? `in ${timer}s` : ''}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Verify Button */}
      <TouchableOpacity
        style={[
          styles.verifyButton,
          { opacity: otp.join('').length === 4 ? 1 : 0.6 },
        ]}
        disabled={otp.join('').length !== 4}
        onPress={handleVerify}
        activeOpacity={0.85}
      >
        <Text style={styles.verifyText}>Verify OTP</Text>
      </TouchableOpacity>
    </View>
  </SafeAreaView>
);

};

export default OtpScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0b1410',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },

  /* Card */
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 28,
    padding: 24,
    shadowColor: '#000',
    shadowOpacity: 0.18,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 10 },
    elevation: 12,
  },

  headingTop: {
    fontSize: 22,
    color: '#111827',
    fontFamily: 'Poppins-SemiBold',
  },

  headingBottom: {
    fontSize: 30,
    color: '#111827',
    fontFamily: 'Poppins-SemiBold',
    marginBottom: 12,
  },

  subtitle: {
    fontSize: 14,
    color: '#6B7280',
    fontFamily: 'Poppins-Regular',
  },

  phoneText: {
    fontSize: 16,
    color: '#000',
    fontFamily: 'Poppins-Medium',
    marginTop: 6,
    marginBottom: 28,
  },

  /* OTP */
  otpRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },

  otpInput: {
    width: 60,
    height: 60,
    borderRadius: 16,
    borderColor:'#555555ff',
    backgroundColor: '#F3F4F6',
    textAlign: 'center',
    fontSize: 22,
    color: '#111827',
    fontFamily: 'Poppins-SemiBold',
    borderWidth:0.5
  },

  otpInputActive: {
    borderWidth: 2,
    borderColor: '#2de39e',
    backgroundColor: '#ECFDF5',
  },

  /* Resend */
  resendRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 28,
  },

  resendText: {
    fontSize: 13,
    color: '#6B7280',
    fontFamily: 'Poppins-Regular',
    marginRight: 6,
  },

  resendLink: {
    fontSize: 13,
    color: '#187D57',
    fontFamily: 'Poppins-SemiBold',
  },

  /* Button */
  verifyButton: {
    height: 56,
    borderRadius: 18,
    backgroundColor: '#187D57',
    justifyContent: 'center',
    alignItems: 'center',
  },

  verifyText: {
    fontSize: 16,
    color: '#FFFFFF',
    fontFamily: 'Poppins-SemiBold',
  },

  /* Bubbles */
  bubbleOne: {
    position: 'absolute',
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: 'rgba(45, 227, 158, 0.22)',
    top: -40,
    left: -50,
  },

  bubbleTwo: {
    position: 'absolute',
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(45, 227, 158, 0.28)',
    top: 120,
    right: -40,
  },

  bubbleThree: {
    position: 'absolute',
    width: 240,
    height: 240,
    borderRadius: 120,
    backgroundColor: 'rgba(45, 227, 158, 0.12)',
    bottom: -90,
    left: -60,
  },

  bubbleFour: {
    position: 'absolute',
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: 'rgba(45, 227, 158, 0.16)',
    bottom: 80,
    right: -50,
  },
});

