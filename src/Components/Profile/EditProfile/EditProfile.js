import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  SafeAreaView,
  ScrollView,
  Image
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { updateCustomerProfile } from "../../../services/auth";

export default function EditProfileScreen({ navigation }) {
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadSavedData = async () => {
      const savedPhone = await AsyncStorage.getItem("phone");
      const savedName = await AsyncStorage.getItem("fullname");
      const savedEmail = await AsyncStorage.getItem("email");
    

      if (savedPhone) setPhoneNumber(savedPhone);
      if (savedName) setName(savedName);
      if (savedEmail) setEmail(savedEmail);
    };

    loadSavedData();
  }, []);

const handleUpdate = async () => {
  if (!name || !phoneNumber) {
    Alert.alert("Error", "Name & phone number are required");
    return;
  }

  try {
    setLoading(true);

    const payload = { 
      name, 
      // phoneNumber, 
      email 
    };

    const res = await updateCustomerProfile(payload);

    console.log("UPDATE PROFILE RESPONSE ===>", res);

 if (!res.ok) {
  Alert.alert("Error", res?.data?.message || "Failed to update profile");
  return;
}

//  UPDATE LOCAL STORAGE
await AsyncStorage.setItem("fullname", name);
await AsyncStorage.setItem("phone", phoneNumber);
await AsyncStorage.setItem("email", email);

Alert.alert(
  "Success",
  res?.data?.message || "Profile updated successfully",
  [{ text: "OK", onPress: () => navigation.goBack() }]
);


  } catch (err) {
    console.log("UPDATE ERROR ===>", err);
    Alert.alert("Error", "Something went wrong");
  } finally {
    setLoading(false);
  }
};





  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#0b1410" }}>
      <ScrollView contentContainerStyle={{ padding: 16 }}>
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
        
                <Text style={styles.headerTitle}>Edit Profile</Text>
        
                <View style={{ width: 36 }} />
              </View>
        <Text style={{ fontSize: 20, fontWeight: "600", marginBottom: '2%',marginTop:'1%',color:'#fff' }}>
       
        </Text>

        <Text style={{color:'#fff'}}>Name</Text>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
          placeholder="Enter name"
          placeholderTextColor='#fff'
        />

        <Text style={{ marginTop: 12,color:'#fff' }}>Phone Number</Text>
      <TextInput
  style={[
    styles.input,
    {
      backgroundColor: "#585858ff",
      borderColor: "#4B5563",
      opacity: 0.6,
    },
  ]}
  value={phoneNumber}
  editable={false}
  selectTextOnFocus={false}
  keyboardType="number-pad"
  placeholderTextColor="#9CA3AF"
/>


        <Text style={{ marginTop: 12,color:'#fff' }}>Email</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
           placeholderTextColor='#fff'
        />

        <TouchableOpacity
          style={styles.button}
          onPress={handleUpdate}
          disabled={loading}
        >
          <Text style={styles.buttonText}>
            {loading ? "Updating..." : "Save Changes"}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = {
  input: {
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 10,
    padding: 12,
    marginTop: 6,
    color:'#fff'
  },
  button: {
    backgroundColor: "#187D57",
    padding: 14,
    borderRadius: 10,
    marginTop: 24,
    alignItems: "center",
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
  buttonText: {
    color: "#fff",
    fontWeight: "600",
  },
};
