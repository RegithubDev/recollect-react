import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Modal,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Pressable,
} from "react-native";

export default function CancelOrderModal({
  visible,
  reasons,
  loading,
  selectedReason,
  onSelect,
  onClose,
  onConfirm,
}) {
 return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modalBox}>
          <Text style={styles.title}>Cancel Order</Text>

          {loading ? (
            <ActivityIndicator />
          ) : (
            reasons.map((item) => (
              <TouchableOpacity
                key={item.id}
                onPress={() => onSelect(item)}
              >
                <Text
                  style={{
                    padding: 12,
                    color: selectedReason?.id === item.id ? "red" : "#000",
                  }}
                >
                  {item.reason}
                </Text>
              </TouchableOpacity>
            ))
          )}

          <View style={styles.btnRow}>
            <TouchableOpacity onPress={onClose}>
              <Text>Close</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={onConfirm}>
              <Text>Confirm</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "flex-end",
  },
   overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalBox: {
    width: "90%",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
  },

  modalCard: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    maxHeight: "70%",
  },
  modalTitle: {
    fontSize: 18,
    fontFamily: "Poppins-SemiBold",
    color: "#111",
  },
  modalSub: {
    fontSize: 12,
    color: "#6B7280",
    marginBottom: 10,
  },
  reasonRow: {
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    marginVertical: 6,
  },
  reasonActive: {
    borderColor: "#187D57",
    backgroundColor: "#E9F7F1",
  },
  reasonText: {
    fontSize: 14,
    color: "#111",
  },
  modalActions: {
    flexDirection: "row",
    marginTop: 16,
    gap: 12,
  },
  modalCancel: {
    flex: 1,
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#EF4444",
    alignItems: "center",
  },
  modalCancelText: {
    color: "#EF4444",
    fontFamily: "Poppins-SemiBold",
  },
  modalConfirm: {
    flex: 1,
    padding: 12,
    borderRadius: 12,
    backgroundColor: "#187D57",
    alignItems: "center",
  },
  modalConfirmText: {
    color: "#fff",
    fontFamily: "Poppins-SemiBold",
  },
});
