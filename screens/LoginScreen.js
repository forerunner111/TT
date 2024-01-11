import { View, Text, TextInput } from "react-native";
import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native";
import { StyleSheet } from "react-native";
import { TouchableOpacity, Alert } from "react-native";
import { useNavigation, StackActions } from "@react-navigation/native";
import Ionicons from "@expo/vector-icons/Ionicons";
import axios from "axios";
import jwt_decode from "jwt-decode";
import AsyncStorage from "@react-native-async-storage/async-storage";

const baseURL = "http://192.168.31.108:4000/api/login";
//const baseURL = "http://10.1.141.191:4000/api/login";

const LoginScreen = () => {
  const navigation = useNavigation();
  const [email, onChangeEmail] = React.useState("");
  const [Contraseña, onChangePassword] = React.useState("");
  const [modoPassword, onChangemodoPassword] = React.useState(true);
  const [Token, setToken] = useState("");
  const [decode, setDecode] = useState("");

  const Navegar = ([]) => {};

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
            onPress={() =>
              axios
                .post(baseURL, {
                  email: email,
                  contrasena: Contraseña,
                })
                .then(function (response) {
                  clave = JSON.stringify(response["data"]["token"]);
                  AsyncStorage.setItem("tusecretosecreto", clave);
                  const decode = jwt_decode(clave);
                  const admin = JSON.stringify(decode["admin"]);
                  const secretario = JSON.stringify(decode["secretario"]);
                  const jefe = JSON.stringify(decode["jefe"]);
                  const comision = JSON.stringify(decode["comision"]);
                  const arbitro = JSON.stringify(decode["arbitro"]);
                  const entrenador = JSON.stringify(decode["entrenador"]);

                  const num = [];
                  if (admin != "null") {
                    num.push(admin);
                  }
                  if (secretario != "null") {
                    num.push(secretario);
                  }
                  if (jefe != "null") {
                    num.push(jefe);
                  }
                  if (comision != "null") {
                    num.push(comision);
                  }
                  if (arbitro != "null") {
                    num.push(arbitro);
                  }
                  if (entrenador != "null") {
                    num.push(entrenador);
                  }
                  console.log(num);
                  let minimo = 99;
                  //console.log(Math.min.apply(null, num));

                  for (i = 0; i <= num.length; i++) {
                    if (minimo >= num[i]) {
                      minimo = num[i];
                    }
                  }
                  console.log(minimo);
                  switch (minimo) {
                    case "0":
                      navigation.reset({
                        index: 0,
                        routes: [{ name: "Admin" }],
                      });
                      navigation.navigate("Admin");
                      break;
                    case "1":
                      navigation.reset({
                        index: 0,
                        routes: [{ name: "Secretario" }],
                      });
                      navigation.navigate("Secretario");
                      break;
                    case "2":
                      navigation.reset({
                        index: 0,
                        routes: [{ name: "Jefe" }],
                      });
                      navigation.navigate("jefe");
                      break;
                    case "3":
                      navigation.reset({
                        index: 0,
                        routes: [{ name: "Arbitro" }],
                      });
                      navigation.navigate("Arbitro");
                      break;
                    case "4":
                      navigation.reset({
                        index: 0,
                        routes: [{ name: "Comision" }],
                      });
                      navigation.navigate("Comision");
                      break;
                    case "5":
                      navigation.reset({
                        index: 0,
                        routes: [{ name: "Entrenador" }],
                      });
                      navigation.navigate("Entrenador");
                      break;

                    default:
                      Alert.alert("Error:", "Ocurrio un error");
                      break;
                  }
                  // console.log(clave);
                })
                .catch(function (error) {
                  console.log(error);
                  //Alert.alert("Error: ", JSON.stringify(error["message"]));
                })
            }
          >
            <Text style={styles.TextoBoton}>Iniciar sesión</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("Home")}>
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
