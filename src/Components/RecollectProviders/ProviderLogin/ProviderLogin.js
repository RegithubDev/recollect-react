import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  Image,
  StatusBar,
} from 'react-native';

const ProviderLogin = () => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
  <View style={styles.bubbleOne} />
  <View style={styles.bubbleTwo} />
  <View style={styles.bubbleThree} />
      {/* Illustration */}
      <View style={styles.imageWrapper}>
        <Image
          source={require('../../../../assets/signinprovider.png')}
          style={styles.image}
          resizeMode="contain"
        />
      </View>

      {/* Form */}
     {/* Form */}
<View style={styles.form}>

  {/* TRANSPARENT CARD */}
  <View style={styles.card}>
{/* Card Heading */}
<View style={styles.cardHeader}>
  <Text style={styles.cardTitle}>Provider Login</Text>
  <Text style={styles.cardSubtitle}>
    Sign in to continue managing collections
  </Text>
</View>

    <View style={styles.inputBox}>
      <TextInput
        placeholder="Username"
        placeholderTextColor="rgba(255,255,255,0.6)"
        style={styles.input}
      />
    </View>

    <View style={styles.inputBox}>
      <TextInput
        placeholder="Password"
        placeholderTextColor="rgba(255,255,255,0.6)"
        secureTextEntry
        style={styles.input}
      />
    </View>

    <TouchableOpacity>
      <Text style={styles.forgot}>Forgot Password?</Text>
    </TouchableOpacity>

    <TouchableOpacity style={styles.loginBtn}>
      <Text style={styles.loginText}>Login</Text>
    </TouchableOpacity>

  </View>

</View>

    </SafeAreaView>
  );
};

export default ProviderLogin;



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0b1410',
  },
cardHeader: {
  marginBottom: 24,
},

cardTitle: {
  fontSize: 22,
  fontWeight: '700',
  color: '#FFFFFF',
  marginBottom: 6,
},

cardSubtitle: {
  fontSize: 14,
  color: 'rgba(255,255,255,0.75)',
},

  imageWrapper: {
    flex: 1.2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bubbleOne: {
  position: 'absolute',
  width: 260,
  height: 260,
  borderRadius: 130,
  backgroundColor: '#2de39e',
  opacity: 0.25,
  top: -80,
  left: -60,
},

bubbleTwo: {
  position: 'absolute',
  width: 200,
  height: 200,
  borderRadius: 100,
  backgroundColor: '#2de39e',
  opacity: 0.18,
  top: 180,
  right: -70,
},

bubbleThree: {
  position: 'absolute',
  width: 220,
  height: 220,
  borderRadius: 160,
  backgroundColor: '#2de39e',
  opacity: 0.12,
  bottom: -120,
  left: 40,
},

card: {
  backgroundColor: 'rgba(255,255,255,0.12)', // transparent card
  borderRadius: 22,
  padding: 32,

//   borderWidth: 1,
//   borderColor: 'rgba(255,255,255,0.25)',

  shadowColor: '#000',
  shadowOffset: { width: 0, height: 8 },
  shadowOpacity: 0.3,
  shadowRadius: 12,
  elevation: 8,
},

  image: {
    width: '85%',
    height: '85%',
  },

  form: {
    flex: 1,
    paddingHorizontal: 28,
  },

inputBox: {
  backgroundColor: 'rgba(255,255,255,0.15)',
  borderRadius: 14,
  paddingHorizontal: 16,
  height: 52,
  marginBottom: 14,
},



  icon: {
    width: 18,
    height: 18,
    tintColor: '#187D57',
    marginRight: 10,
  },

input: {
  flex: 1,
  fontSize: 15,
  color: '#FFFFFF',
},


 forgot: {
  textAlign: 'right',
  color: 'rgba(255,255,255,0.7)',
  fontSize: 13,
  marginBottom: 18,
},


  loginBtn: {
    backgroundColor: '#187D57',
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },

  loginText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },

  footer: {
    textAlign: 'center',
    color: '#6B7280',
    fontSize: 13,
  },

  create: {
    color: '#187D57',
    fontWeight: '600',
  },
});
