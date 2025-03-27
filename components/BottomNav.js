import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

const FakeCalls = () => {
  const navigation = useNavigation();

  const scheduleFakeCall = (delay) => {
    setTimeout(() => {
      navigation.navigate("IncomingCallScreen");
    }, delay);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Schedule a Fake Call</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => scheduleFakeCall(0)}
      >
        <Text style={styles.buttonText}>Call Immediately</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => scheduleFakeCall(5 * 60 * 1000)}
      >
        <Text style={styles.buttonText}>Call in 5 minutes</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => scheduleFakeCall(10 * 60 * 1000)}
      >
        <Text style={styles.buttonText}>Call in 10 minutes</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#fff" },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 20 },
  button: { backgroundColor: "#FF3B30", padding: 15, borderRadius: 10, marginVertical: 10, width: "80%", alignItems: "center" },
  buttonText: { color: "#fff", fontSize: 18, fontWeight: "bold" },
});

export default FakeCalls;
