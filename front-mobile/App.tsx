import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { AppLoading } from "expo";
import {
  useFonts, Play_400Regular, Play_700Bold
} from "@expo-google-fonts/play";

export default function App() {
  const [fontsLoaded] = useFonts({
    Play_400Regular, Play_700Bold
  });

  if (!fontsLoaded) {
    return <AppLoading />
  } else {
    return (
        <View style={styles.container}>
          <Text>Hello World!!!!!</Text>
          <StatusBar style="auto" />
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
