import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  Dimensions
} from "react-native";
import { updateCustomerAddress } from "../../services/auth";


const { width } = Dimensions.get("window");

const EditAddressScreen = ({ navigation, route }) => {
  const { address, regionId } = route.params;

  const [form, setForm] = useState({
    id: address.id,
    customerId: address.customerId,
    scrapRegionId: regionId,
    wardId: address.wardId,
    isScrapService: address.isScrapService,
    isScrapLocationActive: address.isScrapLocationActive,
    isBioWasteService: address.isBioWasteService,
    isBioWasteLocationActive: address.isBioWasteLocationActive,
    residenceType: address.residenceType || "",
    residenceDetails: address.residenceDetails || "",
    landmark: address.landmark || "",
    latitude: address.latitude?.toString() || "",
    longitude: address.longitude?.toString() || ""
  });

  const [saving, setSaving] = useState(false);

  const handleChange = (key, value) => {
    setForm({ ...form, [key]: value });
  };

  const saveAddress = async () => {
    try {
      setSaving(true);
      await updateCustomerAddress(form);
      alert("Address updated successfully");
      navigation.goBack();
    } catch (err) {
      console.log(err);
      alert("Failed to update address");
    } finally {
      setSaving(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.content}
          keyboardShouldPersistTaps="handled"
        >
          <Text style={styles.title}>Edit Address</Text>

          <TextInput
            placeholder="Residence Type"
            placeholderTextColor="#8a9a8f"
            value={form.residenceType}
            onChangeText={(t) => handleChange("residenceType", t)}
            style={styles.input}
          />

          <TextInput
            placeholder="Residence Details"
            placeholderTextColor="#8a9a8f"
            value={form.residenceDetails}
            onChangeText={(t) => handleChange("residenceDetails", t)}
            style={styles.input}
          />

          <TextInput
            placeholder="Landmark"
            placeholderTextColor="#8a9a8f"
            value={form.landmark}
            onChangeText={(t) => handleChange("landmark", t)}
            style={styles.input}
          />

          {/* <View style={styles.row}>
            <TextInput
              placeholder="Latitude"
              placeholderTextColor="#8a9a8f"
              value={form.latitude}
              onChangeText={(t) => handleChange("latitude", t)}
              style={[styles.input, styles.half]}
            />

            <TextInput
              placeholder="Longitude"
              placeholderTextColor="#8a9a8f"
              value={form.longitude}
              onChangeText={(t) => handleChange("longitude", t)}
              style={[styles.input, styles.half]}
            />
          </View> */}

          <TouchableOpacity
            style={[styles.saveBtn, saving && { opacity: 0.7 }]}
            onPress={saveAddress}
            disabled={saving}
          >
            {saving ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.saveText}>Save Changes</Text>
            )}
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = {
  container: {
    flex: 1,
    backgroundColor: "#0b1410"
  },

  content: {
    paddingHorizontal: 16,
    paddingBottom: 24,
    marginTop:'10%'
  },

  title: {
    color: "#ffffff",
    fontSize: width * 0.05, // responsive
    fontWeight: "600",
    marginBottom: 16
  },

  input: {
    backgroundColor: "#111c17",
    color: "#fff",
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 14,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: "#1f3b2f",
    fontSize: width * 0.04 // responsive
  },

  row: {
    flexDirection: "row",
    gap: 10
  },

  half: {
    flex: 1
  },

  saveBtn: {
    backgroundColor: "#32c784",
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: "center",
    marginTop: 10
  },

  saveText: {
    color: "#fff",
    fontSize: width * 0.045,
    fontWeight: "700"
  }
};

export default EditAddressScreen;
