import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import SplashScreen from "./screens/SplashScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import HomeScreen from "./screens/HomeScreen";
import ProfileScreen from "./screens/ProfileScreen";
import EmergencyScreen from "./screens/EmergencyScreen"; 
import CommunityForumScreen from "./screens/CommunityForumScreen"; 
import SafeRouteScreen from "./screens/SafeRouteScreen"; 

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Emergency" component={EmergencyScreen} /> 
        <Stack.Screen name="CommunityForumScreen" component={CommunityForumScreen} />
        <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
        <Stack.Screen name="SafeRouteScreen" component={SafeRouteScreen} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}
