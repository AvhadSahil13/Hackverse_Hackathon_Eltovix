import React, { useState, useEffect } from "react";
import {
  View, Text, StyleSheet, Image, TouchableOpacity, Alert, Animated, Dimensions
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Linking from "expo-linking";
import { useNavigation } from "@react-navigation/native";
import * as Location from "expo-location";
import * as SMS from "expo-sms";
import BottomNav from "../components/BottomNav";

const screenWidth = Dimensions.get("window").width;

const HomeScreen = () => {
  const [menuVisible, setMenuVisible] = useState(false);
  const slideAnim = useState(new Animated.Value(-screenWidth))[0];
  const navigation = useNavigation();
  const [location, setLocation] = useState(null);

  useEffect(() => {
    requestPermissions();
    fetchLocation();
  }, []);

  const requestPermissions = async () => {
    await Location.requestForegroundPermissionsAsync();
    await SMS.requestPermissionsAsync();
  };

  const fetchLocation = async () => {
    let currentLocation = await Location.getCurrentPositionAsync({});
    setLocation(currentLocation);
  };

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
    Animated.timing(slideAnim, {
      toValue: menuVisible ? -screenWidth : 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const shareLiveLocation = async () => {
    if (!location) {
      Alert.alert("Error", "Location not available. Please try again.");
      return;
    }

    const locationUrl = `https://www.google.com/maps?q=${location.coords.latitude},${location.coords.longitude}`;
    const message = `I'm sharing my live location: ${locationUrl}`;

    const isAvailable = await SMS.isAvailableAsync();
    if (isAvailable) {
      await SMS.sendSMSAsync(["8010155124"], message);
      Alert.alert("Success", "Live location sent successfully!");
    } else {
      Alert.alert("SMS Not Available", "Your device does not support sending SMS.");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.safeArea}>
        <View style={styles.topBar}>
          <TouchableOpacity onPress={toggleMenu} style={styles.hamburgerContainer}>
            <Image source={require("../assets/hamburger-iconNoBg.png")} style={styles.hamburgerIcon} />
          </TouchableOpacity>
          <Text style={styles.title}>ForHer</Text>
          <TouchableOpacity style={styles.sosButton}>
            <Text style={styles.sosText}>SOS</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* ✅ Map Section */}
      <View style={styles.mapContainer}>
        <MapView style={styles.map} initialRegion={{
          latitude: 19.219610,
          longitude: 73.164493,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}>
          <Marker coordinate={{ latitude: 19.219610, longitude: 73.164493 }} title="Aap Yaha Ho" />
        </MapView>

        {/* ✅ Floating Buttons */}
        <View style={styles.floatingButtons}>
          <TouchableOpacity style={styles.fabBtn} onPress={() => navigation.navigate("ChatbotScreen")}>
            {/* <Image source={require("../assets/location-iconNoBg.png")} style={styles.fabIcon} /> */}
            <Text style={styles.helpText}>URGENT HELP</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.fab} onPress={shareLiveLocation}>
            <Image source={require("../assets/liveLocation-icon.png")} style={styles.fabIcon} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.fab} onPress={() => navigation.navigate("ChatbotScreen")}>
            <Image source={require("../assets/chatbot-icon.png")} style={styles.fabIcon} />
          </TouchableOpacity>

        </View>
      </View>

      <BottomNav />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  safeArea: {backgroundColor: "#FF3B30" },
  topBar: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", padding: 15 },
  title: { fontSize: 20, fontWeight: "bold", color: "white", textAlign: "center", flex: 1 },
  sosButton: { backgroundColor: "white", paddingVertical: 5, paddingHorizontal: 15, borderRadius: 20 },
  sosText: { color: "#FF3B30", fontWeight: "bold" },
  hamburgerContainer: { width: 30, height: 30, justifyContent: "center", alignItems: "center" },
  hamburgerIcon: { width: 40, height: 40, tintColor: "white", transform: [{ rotateY: "180deg" }] },
  helpText: { paddingVertical: 5, paddingHorizontal: 5, borderRadius: 20, color: "white", textAlign: "center", fontWeight: "bold" },
  mapContainer: { flex: 1, position: "relative" },
  map: { flex: 1 },

  floatingButtons: {
    position: "absolute",
    bottom: 80,
    right: 20,
    flexDirection: "column",
    alignItems: "flex-end",
  },

  fab: {
    backgroundColor: "#FF3B30",
    width: 60,
    height: 60,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  fabBtn: {
    backgroundColor: "#FF3B30",
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 300,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  fabIcon: {
    width: 40,
    height: 40,
    tintColor: "white",
  },
});

export default HomeScreen;
