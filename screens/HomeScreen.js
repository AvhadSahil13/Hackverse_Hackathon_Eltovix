import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Linking from "expo-linking";

const HomeScreen = () => {
  const userLocation = {
    latitude: 19.0330, // Example coordinates (Replace with real data)
    longitude: 73.0297,
    latitudeDelta: 0.05,
    longitudeDelta: 0.05,
  };

  const handleSOS = () => {
    Alert.alert(
      "Emergency SOS",
      "Choose an action:",
      [
        { text: "Call Police", onPress: () => Linking.openURL("tel:100") },
        { text: "Call Ambulance", onPress: () => Linking.openURL("tel:102") },
        { text: "Call Emergency Contact", onPress: () => Linking.openURL("tel:1234567890") }, // Replace with saved contact
        { text: "Cancel", style: "cancel" },
      ]
    );
  };

  return (
    <View style={styles.container}>
      {/* Safe Top Bar */}
      <View style={styles.safeArea}>
        <View style={styles.topBar}>
          <Text style={styles.title}>ForHer</Text>
          <Text style={styles.greeting}>Welcome back,</Text>
          <TouchableOpacity style={styles.sosButton} onPress={handleSOS}>
            <Text style={styles.sosText}>SOS</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Map View */}
      <View style={styles.mapContainer}>
        <MapView style={styles.map} initialRegion={userLocation}>
          <Marker coordinate={userLocation} title="You are here" />
        </MapView>

        {/* Round Buttons on Map */}
        <TouchableOpacity style={[styles.roundButton, styles.shareLocationButton]}>
          <Image source={require("../assets/location-iconNoBg.png")} style={styles.transparentIcon} />
        </TouchableOpacity>

        <TouchableOpacity style={[styles.roundButton, styles.emptyButton]}>
          <Image source={require("../assets/location-iconNoBg.png")} style={styles.transparentIcon} />
        </TouchableOpacity>
      </View>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navButton}>
          <Image source={require("../assets/profile-icon.png")} style={styles.transparentIcon} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton}>
          <Image source={require("../assets/location-icon.png")} style={styles.transparentIcon} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton}>
          <Image source={require("../assets/profile-icon.png")} style={styles.transparentIcon} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  safeArea: { paddingTop: 40, backgroundColor: "#FF3B30" },
  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
  },
  title: { fontSize: 18, fontWeight: "bold", color: "white" },
  greeting: { fontSize: 14, color: "white" },
  sosButton: { backgroundColor: "white", paddingVertical: 5, paddingHorizontal: 15, borderRadius: 20 },
  sosText: { color: "#FF3B30", fontWeight: "bold" },
  
  mapContainer: { flex: 1, position: "relative" },
  map: { flex: 1 },

  roundButton: {
    position: "absolute",
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#FF3B30",
    justifyContent: "center",
    alignItems: "center",
    elevation: 5, // Shadow for Android
    shadowColor: "#000", // Shadow for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  shareLocationButton: { bottom: 100, right: 20 },
  emptyButton: { bottom: 180, right: 20 },

  transparentIcon: {
    width: 30,
    height: 30,
    resizeMode: "contain", 
    // tintColor: "white", 
  },

  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#FF3B30",
  },
  navButton: { padding: 10 },
});

export default HomeScreen;
