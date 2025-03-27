import React, { useState } from "react";
import { View, Text, Button, Alert, StyleSheet } from "react-native";
import * as Location from "expo-location";
import * as Linking from "expo-linking";

const EmergencyScreen = () => {
  const [isListening, setIsListening] = useState(false);

  const handleSendEmergencySMS = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permission denied", "Location permission is required.");
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    const message = `EMERGENCY! HELP detected. Location: https://maps.google.com/?q=${location.coords.latitude},${location.coords.longitude}`;

    const emergencyNumber = "1234567890"; // Replace with actual number
    const smsUrl = `sms:${emergencyNumber}?body=${encodeURIComponent(message)}`;

    Linking.openURL(smsUrl)
      .then(() => console.log("SMS app opened"))
      .catch((error) => Alert.alert("Failed to send SMS", error.message));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Emergency SOS</Text>
      <Button title="Send Emergency Alert" onPress={handleSendEmergencySMS} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "red" },
  title: { fontSize: 24, fontWeight: "bold", color: "white" },
});

export default EmergencyScreen;
