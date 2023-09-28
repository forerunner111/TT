import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native";
import { StyleSheet, Text, View } from "react-native";

export default function PartidosScreen() {
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Text>Estos son los partidos</Text>
        <StatusBar style="auto" />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
