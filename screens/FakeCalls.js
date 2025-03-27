import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const IncomingCallScreen = ({ route, navigation }) => {
  const { callerName, callerNumber } = route.params || {
    callerName: "Unknown Caller",
    callerNumber: "+91 8010155124",
  };

  const rejectCall = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.callerName}>{callerName}</Text>
      <Text style={styles.callerNumber}>{callerNumber}</Text>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.rejectButton} onPress={rejectCall}>
          <Text style={styles.rejectText}>Reject</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000000AA",
  },
  callerName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  callerNumber: {
    fontSize: 18,
    color: "#DDDDDD",
    marginBottom: 30,
  },
  buttonContainer: {
    flexDirection: "row",
    gap: 20,
  },
  rejectButton: {
    backgroundColor: "#FF0000",
    padding: 15,
    borderRadius: 50,
    width: 100,
    alignItems: "center",
  },
  rejectText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default IncomingCallScreen;