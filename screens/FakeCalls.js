import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const FakeCalls = ({ navigation }) => {
  const scheduleFakeCall = (delay) => {
    setTimeout(() => {
      navigation.navigate("IncomingCallScreen"); // Opens fake call screen
    }, delay);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Schedule a Fake Call</Text>

      <TouchableOpacity style={styles.button} onPress={() => scheduleFakeCall(0)}>
        <Text style={styles.buttonText}>Call Immediately</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => scheduleFakeCall(5 * 60 * 1000)}>
        <Text style={styles.buttonText}>Call After 5 Minutes</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => scheduleFakeCall(10 * 60 * 1000)}>
        <Text style={styles.buttonText}>Call After 10 Minutes</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#fff" },
  title: { fontSize: 20, fontWeight: "bold", marginBottom: 20 },
  button: { backgroundColor: "#FF3B30", padding: 15, margin: 10, borderRadius: 5 },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
});

export default FakeCalls;
