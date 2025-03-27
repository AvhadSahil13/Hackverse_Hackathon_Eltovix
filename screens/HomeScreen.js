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
import { SafeAreaView, StatusBar } from "react-native";


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

  // ✅ Request permissions for location & SMS
  const requestPermissions = async () => {
    const { status: locationStatus } = await Location.requestForegroundPermissionsAsync();
    const { status: smsStatus } = await SMS.requestPermissionsAsync();

    if (locationStatus !== "granted") {
      Alert.alert("Permission Denied", "Location permission is required.");
    }
    if (smsStatus !== "granted") {
      Alert.alert("Permission Denied", "SMS permission is required to send emergency messages.");
    }
  };

  // ✅ Get location once and store in state
  const fetchLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permission Denied", "Location permission is required.");
      return;
    }
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

  const handleSOS = () => {
    Alert.alert(
      "Emergency SOS",
      "Choose an action:",
      [
        { text: "Call Police", onPress: () => Linking.openURL("tel:100") },
        { text: "Call Ambulance", onPress: () => Linking.openURL("tel:102") },
        { text: "Call Emergency Contact", onPress: () => Linking.openURL("tel:8010155124") },
        { text: "Close", onPress: () => console.log("Alert closed"), style: "cancel" },
      ],
      { cancelable: true }
    );
  };

  // ✅ Function to send location via SMS
  const shareLocation = async () => {
    if (!location) {
      Alert.alert("Error", "Location not available. Please try again.");
      return;
    }

    const locationUrl = `https://www.google.com/maps?q=${location.coords.latitude},${location.coords.longitude}`;
    const message = `I need help! My current location is: ${locationUrl}`;

    const isAvailable = await SMS.isAvailableAsync();
    if (isAvailable) {
      try {
        await SMS.sendSMSAsync(["8010155124"], message);
        Alert.alert("Success", "Emergency message sent successfully!");
      } catch (error) {
        Alert.alert("Error", "Failed to send SMS. Please try again.");
      }
    } else {
      Alert.alert("SMS Not Available", "Your device does not support sending SMS.");
    }
  };

  return (
    <View style={styles.container}>
      {/* ✅ Sidebar Menu */}
      <Animated.View style={[styles.sidebar, { left: slideAnim }]}>
        <TouchableOpacity style={styles.closeButton} onPress={toggleMenu}>
          <Text style={styles.closeText}>←</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem} onPress={shareLocation}>
          <Text style={styles.menuText}>Share Location</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuText}>Self Defense</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate("FAQ")}>
          <Text style={styles.menuText}>FAQ's</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.logoutButton}>
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>
      </Animated.View>

      {/* ✅ Header */}
      <View style={styles.safeArea}>
        <View style={styles.topBar}>
          <TouchableOpacity onPress={toggleMenu} style={styles.hamburgerContainer}>
            <Image source={require("../assets/hamburger-iconNoBg.png")} style={styles.hamburgerIcon} />
          </TouchableOpacity>
          <Text style={styles.title}>ForHer</Text>
          <TouchableOpacity style={styles.sosButton} onPress={handleSOS}>
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
      </View>

      {/* ✅ Bottom Navigation */}
      <BottomNav />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  safeArea: { paddingTop: 20, backgroundColor: "#FF3B30" },
  topBar: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", padding: 15 },
  title: { fontSize: 20, fontWeight: "bold", color: "white", textAlign: "center", flex: 1 },
  sosButton: { backgroundColor: "white", paddingVertical: 5, paddingHorizontal: 15, borderRadius: 20 },
  sosText: { color: "#FF3B30", fontWeight: "bold" },
  hamburgerContainer: { width: 30, height: 30, justifyContent: "center", alignItems: "center" },
  hamburgerIcon: { width: 40, height: 40, tintColor: "white", transform: [{ rotateY: "180deg" }] },
  mapContainer: { flex: 1, position: "relative" },
  map: { flex: 1 },
  sidebar: { position: "absolute", top: 0, left: -250, width: 250, height: "100%", backgroundColor: "#eee", paddingVertical: 50, paddingHorizontal: 20, shadowColor: "#000", shadowOpacity: 0.3, shadowRadius: 5, zIndex: 10 },
  closeButton: { alignSelf: "flex-start", marginBottom: 20 },
  closeText: { fontSize: 24, fontWeight: "bold" },
  menuItem: { padding: 15, borderBottomWidth: 1, borderBottomColor: "#ccc" },
  menuText: { fontSize: 16, color: "#333" },
  logoutButton: { marginTop: 30, backgroundColor: "#FF3B30", padding: 10, alignItems: "center", borderRadius: 10 },
  logoutText: { color: "white", fontWeight: "bold" },
});

export default HomeScreen;
