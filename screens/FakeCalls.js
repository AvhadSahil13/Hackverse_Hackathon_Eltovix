import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import BottomNav from "../components/BottomNav"; 

const FakeCalls = ({ navigation }) => {
  const [isCallScheduled, setIsCallScheduled] = useState(false);

  useEffect(() => {
    checkScheduledCall();
  }, []);

  const checkScheduledCall = async () => {
    const storedCall = await AsyncStorage.getItem("fakeCallScheduled");
    setIsCallScheduled(storedCall === "true");
  };

  const scheduleFakeCall = async (delay) => {
    if (isCallScheduled) return; // Prevent multiple calls from being scheduled

    setIsCallScheduled(true);
    await AsyncStorage.setItem("fakeCallScheduled", "true");

    setTimeout(async () => {
      await AsyncStorage.removeItem("fakeCallScheduled");
      navigation.navigate("IncomingCallScreen"); // Open fake call screen
      setIsCallScheduled(false);
    }, delay);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Schedule a Fake Call</Text>

      <TouchableOpacity
        style={[styles.button, isCallScheduled && styles.disabledButton]}
        onPress={() => scheduleFakeCall(0)}
        disabled={isCallScheduled}
      >
        <Text style={styles.buttonText}>Call Immediately</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, isCallScheduled && styles.disabledButton]}
        onPress={() => scheduleFakeCall(5 * 60 * 1000)}
        disabled={isCallScheduled}
      >
        <Text style={styles.buttonText}>Call After 5 Minutes</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, isCallScheduled && styles.disabledButton]}
        onPress={() => scheduleFakeCall(10 * 60 * 1000)}
        disabled={isCallScheduled}
      >
        <Text style={styles.buttonText}>Call After 10 Minutes</Text>
      </TouchableOpacity>

      {/* Bottom Navigation */}
      <BottomNav />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#fff" },
  title: { fontSize: 20, fontWeight: "bold", marginBottom: 20 },
  button: { backgroundColor: "#FF3B30", padding: 15, margin: 10, borderRadius: 5, width: 200, alignItems: "center" },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
  disabledButton: { backgroundColor: "#888" },
});

export default FakeCalls;
