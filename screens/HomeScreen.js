import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import MapView, { Marker } from "react-native-maps";

const HomeScreen = () => {
  const userLocation = {
    latitude: 19.0330, // Example coordinates (Replace with real data)
    longitude: 73.0297,
    latitudeDelta: 0.05,
    longitudeDelta: 0.05,
  };

  return (
    <View style={styles.container}>
      {/* Top Bar */}
      <View style={styles.topBar}>
        <Text style={styles.title}>ForHer</Text>
        <Text style={styles.greeting}>Welcome back, </Text>
        <TouchableOpacity style={styles.sosButton}>
          <Text style={styles.sosText}>SOS</Text>
        </TouchableOpacity>
      </View>

      {/* Map View */}
      <MapView style={styles.map} initialRegion={userLocation}>
        <Marker coordinate={userLocation} title="You are here" />
      </MapView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navButton}>
          <Image source={require("../assets/profile-icon.png")} style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton}>
          <Image source={require("../assets/location-icon.png")} style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton}>
          <Image source={require("../assets/profile-icon.png")} style={styles.icon} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    backgroundColor: "#FF3B30",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
  greeting: {
    fontSize: 14,
    color: "white",
  },
  sosButton: {
    backgroundColor: "white",
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 20,
  },
  sosText: {
    color: "#FF3B30",
    fontWeight: "bold",
  },
  map: {
    flex: 1,
  },
  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#FF3B30",
  },
  navButton: {
    padding: 10,
  },
  icon: {
    width: 30,
    height: 30,
    tintColor: "white",
  },
});

export default HomeScreen;
