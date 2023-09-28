import { View, Text } from "react-native";
import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { SafeAreaView } from "react-native";
import { StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

const HomeScreen = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.titulo}>Bienvenido</Text>

      <View style={styles.container}>
        <Ionicons name="basketball" size={200} color="#ff6624" />
        <View>
          <Text style={styles.subtitle}>Que vamos a hacer?</Text>
          <TouchableOpacity
            style={styles.boton}
            onPress={() => navigation.navigate("Login")}
          >
            <Text style={styles.TextoBoton}>Iniciar sesión</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.boton}
            onPress={() => navigation.navigate("Register")}
          >
            <Text style={styles.TextoBoton}>Registrarse</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.boton}
            onPress={() => navigation.navigate("Partidos")}
          >
            <Text style={styles.TextoBoton}>Consultar partidos</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 24,
  },
  main: {
    flex: 1,
    justifyContent: "center",
    maxWidth: 960,
    marginHorizontal: "auto",
  },
  title: {
    fontSize: 64,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 32,
    color: "#38434D",
    fontWeight: "bold",
  },
  titulo: {
    textAlign: "center",
    fontSize: 34,
    fontWeight: "bold",
    color: "#ff6624",
  },
  boton: {
    fontSize: 55,
    backgroundColor: "#ff6624",
    borderRadius: 5,
    marginVertical: 7,
    paddingHorizontal: 10,
    height: 50,
  },
  TextoBoton: {
    fontSize: 33,
    textAlign: "center",
    color: "#ffffff",
    fontWeight: "bold",
  },
});

export default HomeScreen;
