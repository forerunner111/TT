import { View, Text, TextInput } from "react-native";
import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { SafeAreaView } from "react-native";
import { StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

const RegisterScreen = () => {
  const navigation = useNavigation();
  const [email, onChangeEmail] = React.useState("");
  const [apellidoP, onChangeapellidoP] = React.useState("");
  const [apellidoM, onChangeapellidoM] = React.useState("");
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.titulo}>Registrarse</Text>
      <View>
        <Text>Email</Text>
        <TextInput
          style={styles.input}
          onChangeText={onChangeEmail}
          value={email}
          placeholder="ejemplo@email.com"
        />
        <Text>Apellido paterno</Text>
        <TextInput
          style={styles.input}
          onChangeText={onChangeapellidoP}
          value={apellidoP}
          placeholder="Apellido Paterno"
        />
        <Text>Apellido Materno</Text>
        <TextInput
          style={styles.input}
          onChangeText={onChangeapellidoM}
          value={apellidoM}
          placeholder="Apellido Materno"
        />
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
    color: "#000000",
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
  input: {
    borderWidth: 2,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderTopWidth: 0,
    padding: 5,
    fontSize: 22,
  },
});

export default RegisterScreen;
