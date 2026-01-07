import React, { useContext, useState,useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Image,
  Dimensions
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { AuthContext } from "../../../context/AuthContext";
import { providerLoginApi } from "../../../services/Providerauth/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
const { width } = Dimensions.get("window");

export default function LoginScreen() {
  const [passwordVisible, setPasswordVisible] = useState(false);
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const { login } = useContext(AuthContext);

const handleProviderLogin = async () => {
  try {
    if (!email || !password) return;

    const payload = {
     username: `+91${email}`,
      password: password,
    };

    const result = await providerLoginApi(payload);

    console.log("providerlogin", result);

    const token = result?.data?.token;
  const name = result?.data?.fullName;
const useremail = result?.data?.email;
const phone = result?.data?.phoneNumber;
console.log("email",useremail,phone)

    console.log("name",name);
 console.log("providertoken", token);
    const role = "provider";

    // SAVE TOKEN WITH NEW NAME
    await AsyncStorage.setItem("providerToken", token);
    await AsyncStorage.setItem("providerName", name);
     await AsyncStorage.setItem("providerEmail", useremail);
      await AsyncStorage.setItem("providerMobile", phone);
const stored = await AsyncStorage.getItem("providerToken");
console.log("SAVED PROVIDER TOKEN", stored);
    // continue your existing auth flow
    await login(token, role);

  } catch (error) {
    console.log("Provider login failed:", error);
  }
};

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Header Green Section */}
        <View style={styles.header}>
          <View style={styles.logoWrapper}>
                       <View style={styles.logoBox}>
                         <Image
                           source={require('../../../../assets/recycle.png')} // replace with your icon
                           style={styles.logo}
                         />
                       </View>
                     </View>

          <Text style={styles.appTitle}>Recollect</Text>
          <Text style={styles.subTitle}>Provider Portal</Text>
        </View>

        {/* Card Section */}
        <View style={styles.card}>
          <View style={styles.cardHeaderRow}>
            <View style={styles.iconCircle}>
             <Image
                           source={require('../../../../assets/providerlog.png')} // replace with your icon
                           style={styles.searchicon}
                         />
            </View>
            <View>
              <Text style={styles.cardTitle}>Picker Login</Text>
              {/* <Text style={styles.cardSubtitle}>Access your dashboard</Text> */}
            </View>
          </View>

          {/* Email Input */}
        <Text style={styles.label}>Mobile Number</Text>

<View style={styles.mobileRow}>
  <Text style={styles.prefix}>+91</Text>

  <TextInput
    placeholder="Enter mobile number"
    placeholderTextColor="#9CA3AF"
    value={email}
    onChangeText={(text) => {
      // allow only digits, no spaces, max 10
      const cleaned = text.replace(/[^0-9]/g, '').slice(0, 10);
      setEmail(cleaned);
    }}
    keyboardType="number-pad"
    style={styles.mobileInput}
  />
</View>


          {/* Password Input */}
          <Text style={styles.label}>Password</Text>
          <View style={styles.passwordWrapper}>
           <TextInput
  placeholder="Enter your Password"
  placeholderTextColor="#9CA3AF"
  value={password}
  onChangeText={setPassword}
  secureTextEntry={!passwordVisible}
  style={styles.input}
/>
          <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)}>
  <Image
    source={
      passwordVisible
        ? require("../../../../assets/visible.png")
        : require("../../../../assets/hidden.png")
    }
    style={{ width: 20, height: 20, tintColor: "#5a6b7a" }}
    resizeMode="contain"
  />
</TouchableOpacity>

          </View>

          <TouchableOpacity>
            <Text style={styles.forgot}>Forgot Password?</Text>
          </TouchableOpacity>

          {/* Button */}
       <TouchableOpacity style={styles.signInBtn} onPress={handleProviderLogin}>
  <Text style={styles.signInText}>Sign In</Text>
</TouchableOpacity>


          <Text style={styles.supportText}>
            Having trouble? <Text style={styles.supportLink}>Contact Support</Text>
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#183528",
  },
logoWrapper: {
  alignItems: 'center',
  marginTop: '22%',
},

logoBox: {
  width: 96,
  height: 96,
  borderRadius: 28,
  backgroundColor: '#0f1f18',
  alignItems: 'center',
  justifyContent: 'center',

  // softer modern glow
  shadowColor: '#2de39e',
  shadowOpacity: 0.35,
  shadowRadius: 28,
  elevation: 12,
},
mobileRow: {
  flexDirection: "row",
  alignItems: "center",
  borderWidth: 1,
  borderColor: "#E5E7EB",
  borderRadius: 10,
  paddingHorizontal: 12,
  height: 48,
  backgroundColor: "#fff",
},

prefix: {
  fontSize: 16,
  color: "#111827",
  marginRight: 6,
  fontWeight: "600",
},

mobileInput: {
  flex: 1,
  fontSize: 16,
  color: "#111827",
},

logo: {
  width: 62,
  height: 62,
  tintColor: '#2de39e',
},

  searchicon:{
 width: 28,
    height: 28,
    // tintColor: '#000000ff',
  },
  header: {
    backgroundColor: "#005f31ff",
    paddingTop: 80,
    paddingBottom: 80,
    alignItems: "center",
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
  },

  logoWrapper: {
    width: 80,
    height: 80,
    borderRadius: 20,
    backgroundColor: "#E9FFF2",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },

  appTitle: {
    fontSize: 26,
    color: "#fff",
    fontWeight: "bold",
  },

  subTitle: {
    color: "#E6FFF2",
    fontSize: 14,
  },

  card: {
    marginTop: -60,
    marginHorizontal: 20,
    backgroundColor: "#fff",
    borderRadius: 25,
    padding: 20,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 8 },
    shadowRadius: 10,
    elevation: 8,
  },

  cardHeaderRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },

  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 50,
    backgroundColor: "#E9FFF2",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },

  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },

  cardSubtitle: {
    color: "#818a96",
  },

  label: {
    marginTop: 10,
    fontWeight: "600",
  },

  inputWrapper: {
    borderWidth: 1.5,
    borderColor: "#2FA866",
    borderRadius: 15,
    paddingHorizontal: 15,
    marginTop: 8,
  },

  passwordWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1.5,
    borderColor: "#d7e2eb",
    borderRadius: 15,
    paddingHorizontal: 15,
    marginTop: 8,
    justifyContent: "space-between",
  },

  input: {
    flex: 1,
    height: 48,
    color:'#000'
  },

  forgot: {
    color: "#1A9F5D",
    marginTop: 12,
    fontWeight: "600",
  },

  signInBtn: {
    backgroundColor: "#19A463",
    paddingVertical: 14,
    borderRadius: 18,
    marginTop: 25,
    alignItems: "center",
  },

  signInText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },

  supportText: {
    textAlign: "center",
    marginTop: 20,
    color: "#7b8a9b",
  },

  supportLink: {
    color: "#1A9F5D",
    fontWeight: "600",
  },
});
