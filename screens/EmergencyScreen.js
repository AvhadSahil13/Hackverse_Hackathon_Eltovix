import React, { useEffect } from "react";
import { View, Text, Alert, StyleSheet } from "react-native";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";
import * as Linking from "expo-linking";
import Voice from "react-native-voice";

const EmergencyScreen = () => {

  useEffect(() => {
    requestPermissions();
    startListening(); // ✅ Start listening automatically

    Voice.onSpeechResults = (event) => {
      if (event.value && event.value.length > 0) {
        const spokenText = event.value[0].toLowerCase();
        console.log("Detected Speech:", spokenText);
        if (spokenText.includes("help")) {
          handleSendEmergencySMS();
        }
      }
    };

    Voice.onSpeechError = (error) => {
      console.error("Voice error:", error);
      restartListening(); // ✅ Restart listening if an error occurs
    };

    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  const requestPermissions = async () => {
    const { status: locationStatus } = await Location.requestForegroundPermissionsAsync();
    const { status: audioStatus } = await Permissions.askAsync(Permissions.AUDIO_RECORDING);

    if (locationStatus !== "granted") {
      Alert.alert("Permission denied", "Location permission is required.");
    }
    if (audioStatus !== "granted") {
      Alert.alert("Permission denied", "Microphone permission is required.");
    }
  };

  const startListening = async () => {
    try {
      await Voice.start("en-US");
      console.log("Listening for 'HELP'...");
    } catch (error) {
      console.error("Error starting voice recognition:", error);
    }
  };

  const restartListening = async () => {
    try {
      await Voice.stop();
      setTimeout(() => startListening(), 1000); // ✅ Restart after a short delay
    } catch (error) {
      console.error("Error restarting voice recognition:", error);
    }
  };

  const handleSendEmergencySMS = async () => {
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
      <Text style={styles.subtitle}>Listening for "HELP" in the background...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "red" },
  title: { fontSize: 24, fontWeight: "bold", color: "white" },
  subtitle: { fontSize: 16, color: "white", marginBottom: 20 },
});

export default EmergencyScreen;
