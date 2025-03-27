import React, { useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert, Animated, Dimensions } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Linking from "expo-linking";
import { useNavigation } from "@react-navigation/native";
import * as Location from "expo-location";
import * as Sharing from "expo-sharing";

const screenWidth = Dimensions.get("window").width;

const HomeScreen = () => {
  const [menuVisible, setMenuVisible] = useState(false);
  const slideAnim = useState(new Animated.Value(-screenWidth))[0];
  const navigation = useNavigation();

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
        { text: "Close", onPress: () => console.log("Alert closed"), style: "cancel" }, // Explicit "Close" button
      ],
      { cancelable: true } // Allow tapping outside the alert to dismiss it
    );
  };
  
  

  const shareLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permission Denied", "Location permission is required to share your location.");
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    const locationUrl = `https://www.google.com/maps?q=${location.coords.latitude},${location.coords.longitude}`;

    if (await Sharing.isAvailableAsync()) {
      await Sharing.shareAsync(locationUrl);
    } else {
      Alert.alert("Sharing Not Available", "Your device does not support sharing.");
    }
  };

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.sidebar, { left: slideAnim }]}>
        <TouchableOpacity style={styles.closeButton} onPress={toggleMenu}>
          <Text style={styles.closeText}>←</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem} onPress={shareLocation}>
          <Text style={styles.menuText}>Share Location</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuText}>Rate Us</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuText}>Refer a Friend</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.logoutButton}>
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>
      </Animated.View>

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

      <View style={styles.mapContainer}>
        <MapView style={styles.map} initialRegion={{ latitude: 19.219610, 
    longitude: 73.164493,
    latitudeDelta: 0.05,
    longitudeDelta: 0.05,}}>
          <Marker coordinate={{ latitude: 19.219610, 
    longitude: 73.164493 }} title="Aap Yaha Ho" />
        </MapView>
      </View>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate("CommunityForum")}>
          <View style={styles.iconContainer}>
            <Image source={require("../assets/community.jpeg")} style={styles.navIcon} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate("FakeCall")}>
          <View style={styles.iconContainer}>
            <Image source={require("../assets/fake-call.jpeg")} style={styles.navIcon} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate("LiveLocation")}>
          <View style={styles.iconContainer}>
            <Image source={require("../assets/location-icon.png")} style={styles.navIcon} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate("SelfDefense")}>
          <View style={styles.iconContainer}>
            <Image source={require("../assets/self-defence.jpeg")} style={styles.navIcon} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton}>
          <View style={styles.iconContainer}>
            <Image source={require("../assets/profile-icon.png")} style={styles.navIcon} />
          </View>
        </TouchableOpacity>
      </View>
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
  bottomNav: { flexDirection: "row", justifyContent: "space-around", alignItems: "center", padding: 10, backgroundColor: "#FF3B30" },
  navButton: { padding: 10 },
  iconContainer: { width: 50, height: 50, borderRadius: 25, backgroundColor: "white", alignItems: "center", justifyContent: "center" },
  navIcon: { width: 30, height: 30, borderRadius: 20 },
  sidebar: { position: "absolute", top: 0, left: -250, width: 250, height: "100%", backgroundColor: "#eee", paddingVertical: 50, paddingHorizontal: 20, shadowColor: "#000", shadowOpacity: 0.3, shadowRadius: 5, zIndex: 10 },
  closeButton: { alignSelf: "flex-start", marginBottom: 20 },
  closeText: { fontSize: 24, fontWeight: "bold" },
  menuItem: { padding: 15, borderBottomWidth: 1, borderBottomColor: "#ccc" },
  menuText: { fontSize: 16, color: "#333" },
  logoutButton: { marginTop: 30, backgroundColor: "#FF3B30", padding: 10, alignItems: "center", borderRadius: 10 },
  logoutText: { color: "white", fontWeight: "bold" },
});

export default HomeScreen;
