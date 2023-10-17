import { View, Text, TextInput } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native";
import { StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Ionicons from "@expo/vector-icons/Ionicons";

const LoginScreen = () => {
  const navigation = useNavigation();
  const [email, onChangeEmail] = React.useState("");
  const [Contraseña, onChangePassword] = React.useState("");
  const [modoPassword, onChangemodoPassword] = React.useState(true);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.titulo}>Iniciar sesión</Text>
      <View style={styles.containerT}>
        <View>
          <Text style={styles.TextoLabels}>Email</Text>
          <View style={styles.IconInput}>
            <TextInput
              style={styles.input}
              onChangeText={onChangeEmail}
              value={email}
              placeholder="ejemplo@email.com"
            />
          </View>
          <Text style={styles.TextoLabels}>Contraseña</Text>
          <View style={styles.IconInput}>
            <TextInput
              secureTextEntry={modoPassword}
              style={styles.input}
              onChangeText={onChangePassword}
              value={Contraseña}
              placeholder="••••••••••"
            />
            <TouchableOpacity
              onPress={() => onChangemodoPassword(!modoPassword)}
            >
              {modoPassword ? (
                <Ionicons name="eye" size={30} color="#ff6624" />
              ) : (
                <Ionicons name="eye-off" size={30} color="#ff6624" />
              )}
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={styles.boton}
            onPress={() => navigation.navigate("Admin")}
          >
            <Text style={styles.TextoBoton}>Iniciar sesión</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("tabla")}>
            <Text style={styles.TextoBoton2}>Regresar </Text>
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
  TextoBoton2: {
    fontSize: 33,
    textAlign: "center",
    color: "#ff6624",
    paddingTop: 70,
  },
  Labels: {
    paddingRight: 250,
  },
  TextoLabels: {
    color: "#ff6624",
    fontSize: 28,
    fontWeight: "bold",
  },
  input: {
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderTopWidth: 0,

    padding: 5,
    fontSize: 22,
    width: "90%",
  },
  containerT: {
    flex: 1,
    justifyContent: "center",
    padding: 5,
  },
  IconInput: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 2,
  },
});

export default LoginScreen;
