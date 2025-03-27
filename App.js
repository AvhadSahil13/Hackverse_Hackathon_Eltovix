import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';

export default function App() {
  useEffect(() => {
    const prepareApp = async () => {
      await new Promise(resolve => setTimeout(resolve, 3000)); // Wait 3 sec
      await SplashScreen.hideAsync();
    };
    prepareApp();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome to Women Safety App</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#FF3B30' },
  text: { fontSize: 24, color: 'white', fontWeight: 'bold' },
});
