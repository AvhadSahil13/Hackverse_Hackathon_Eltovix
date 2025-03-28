import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, StatusBar, Alert } from "react-native";
import MapView, { Marker, Polyline } from "react-native-maps";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { SafeAreaView } from "react-native";


// console.log("Raw Origin Data:", someOriginValue);
// console.log("Raw Destination Data:", someDestinationValue);
// setOrigin(someOriginValue);
// setDestination(someDestinationValue);

// Predefined city coordinates
const cities = {
  Mumbai: { latitude: 19.076, longitude: 72.8777 },
  Delhi: { latitude: 28.6139, longitude: 77.209 },
  Bangalore: { latitude: 12.9716, longitude: 77.5946 },
  Hyderabad: { latitude: 17.385, longitude: 78.4867 },
  Chennai: { latitude: 13.0827, longitude: 80.2707 },
  Kolkata: { latitude: 22.5726, longitude: 88.3639 },
  Ahmedabad: { latitude: 23.0225, longitude: 72.5714 },
  Pune: { latitude: 18.5204, longitude: 73.8567 },
  Jaipur: { latitude: 26.9124, longitude: 75.7873 },
  Lucknow: { latitude: 26.8467, longitude: 80.9462 },
};

// Predefined routes
const predefinedRoutes = {
  "Mumbai-Delhi": [cities.Mumbai, cities.Ahmedabad, cities.Jaipur, cities.Delhi],
  "Bangalore-Kolkata": [cities.Bangalore, cities.Hyderabad, cities.Kolkata],
  "Chennai-Mumbai": [cities.Chennai, cities.Bangalore, cities.Pune, cities.Mumbai],
  "Delhi-Kolkata": [cities.Delhi, cities.Lucknow, cities.Kolkata],
  "Hyderabad-Jaipur": [cities.Hyderabad, cities.Ahmedabad, cities.Jaipur],
};

const SafeRouteMap = () => {
  const [origin, setOrigin] = useState(null);
  const [destination, setDestination] = useState(null);
  const [route, setRoute] = useState([]);

  const getSafeRoute = () => {
    console.log("🚀 Checking Route:");
    console.log("✅ Origin: ", origin);
    console.log("✅ Destination: ", destination);

    if (!origin || !destination) {
      Alert.alert("Error", "Please select both source and destination cities.");
      return;
    }

    if (origin.name === destination.name) {
      Alert.alert("Error", "Source and destination cannot be the same.");
      return;
    }

    const routeKey = `${origin.name}-${destination.name}`;
    const reverseKey = `${destination.name}-${origin.name}`;

    if (predefinedRoutes[routeKey]) {
      setRoute(predefinedRoutes[routeKey]);
    } else if (predefinedRoutes[reverseKey]) {
      setRoute(predefinedRoutes[reverseKey]);
    } else {
      Alert.alert("Error", "Route not available. Please choose different cities.");
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#FF3B30" />
      <View style={styles.container}>
        {/* Source Selection */}
        <GooglePlacesAutocomplete
          placeholder="Enter Source City"
          onPress={(data) => {
            const cityName = data.structured_formatting.main_text;
            console.log("📍 Selected Source City: ", cityName);
            if (cities[cityName]) {
              setOrigin({ name: cityName, ...cities[cityName] });
              console.log("✅ Updated Origin: ", { name: cityName, ...cities[cityName] });
            } else {
              Alert.alert("Error", "City not in predefined list.");
            }
          }}
          fetchDetails={false}
          query={{ key: "YOUR_GOOGLE_MAPS_API_KEY", language: "en" }}
          styles={autocompleteStyles}
        />

        {/* Destination Selection */}
        <GooglePlacesAutocomplete
          placeholder="Enter Destination City"
          onPress={(data) => {
            const cityName = data.structured_formatting.main_text;
            console.log("📍 Selected Destination City: ", cityName);
            if (cities[cityName]) {
              setDestination({ name: cityName, ...cities[cityName] });
              console.log("✅ Updated Destination: ", { name: cityName, ...cities[cityName] });
            } else {
              Alert.alert("Error", "City not in predefined list.");
            }
          }}
          fetchDetails={false}
          query={{ key: "YOUR_GOOGLE_MAPS_API_KEY", language: "en" }}
          styles={autocompleteStyles}
        />

        <TouchableOpacity style={styles.button} onPress={getSafeRoute}>
          <Text style={styles.buttonText}>Find Safe Route</Text>
        </TouchableOpacity>

        {/* Map View */}
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: 20.5937, // Center of India
            longitude: 78.9629,
            latitudeDelta: 10,
            longitudeDelta: 10,
          }}
        >
          {/* Markers */}
          {origin && <Marker coordinate={origin} title="Source" />}
          {destination && <Marker coordinate={destination} title="Destination" />}
          {route.length > 0 && (
            <Polyline coordinates={route} strokeWidth={4} strokeColor="blue" />
          )}
        </MapView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#fff" },
  container: { flex: 1, padding: 10 },
  button: {
    backgroundColor: "#ff5252",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: { color: "#fff", fontWeight: "bold" },
  map: { flex: 1, marginTop: 10 },
});

const autocompleteStyles = {
  textInput: {
    height: 40,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  container: { flex: 0, marginBottom: 10 },
};

export default SafeRouteMap;