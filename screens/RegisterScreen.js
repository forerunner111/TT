import { View, Text, TextInput, Button, ScrollView } from "react-native";
import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { SafeAreaView } from "react-native";
import { StyleSheet } from "react-native";
import { TouchableOpacity, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import Checkbox from "expo-checkbox";
import axios from "axios";

const baseURL = "http://192.168.31.109:4000/api/register";
//const baseURL = "http://10.1.141.191:4000/api/register";

const RegisterScreen = () => {
  const navigation = useNavigation();
  const [nombre, onChangeNombre] = useState("");
  const [email, onChangeEmail] = useState("");
  const [apellidoP, onChangeApellidoP] = useState("");
  const [telefono, onChangeTelefono] = useState("");
  const [curp, onChangeCURP] = useState("");
  const [Contraseña, onChangePassword] = React.useState("");
  const [modoPassword, onChangemodoPassword] = React.useState(true);
  const [colonia, onChangeColonia] = useState("");
  const [direccion, onChangeDireccion] = useState("");
  const [numArbitro, onChangeNumArbitro] = useState("");

  const [isComision, setComision] = useState(false);
  const [isEntrenador, setEntrenador] = useState(false);
  const [isArbitro, setArbitro] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.titulo}>Registrarse</Text>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View>
          <View>
            <Text style={styles.TextoLabels}>Seleccione un rol</Text>
          </View>
          <View style={styles.section}>
            <Checkbox
              style={styles.checkbox}
              value={isComision}
              onValueChange={setComision}
              color={isComision ? "#ff6624" : undefined}
            />
            <Text style={styles.paragraph}>Comisión Disciplinaria</Text>
          </View>
          <View style={styles.section}>
            <Checkbox
              style={styles.checkbox}
              value={isEntrenador}
              onValueChange={setEntrenador}
              color={isEntrenador ? "#ff6624" : undefined}
            />
            <Text style={styles.paragraph}>Entrenador</Text>
          </View>
          <View style={styles.section}>
            <Checkbox
              style={styles.checkbox}
              value={isArbitro}
              onValueChange={setArbitro}
              color={isArbitro ? "#ff6624" : undefined}
            />
            <Text style={styles.paragraph}>Árbitro</Text>
          </View>
          <View>
            {isArbitro || isComision || isEntrenador ? (
              <View>
                <Text style={styles.TextoLabels}>Nombre</Text>
                <TextInput
                  style={styles.input}
                  onChangeText={onChangeNombre}
                  value={nombre}
                  placeholder="Nombre"
                />
                <Text style={styles.TextoLabels}>Apellido paterno</Text>
                <TextInput
                  style={styles.input}
                  onChangeText={onChangeApellidoP}
                  value={apellidoP}
                  placeholder="Apellido Paterno"
                />
                <Text style={styles.TextoLabels}>CURP</Text>
                <TextInput
                  style={styles.input}
                  onChangeText={onChangeCURP}
                  value={curp}
                  placeholder="CURP"
                  maxLength={18}
                />
                <Text style={styles.TextoLabels}>Email</Text>
                <TextInput
                  style={styles.input}
                  onChangeText={onChangeEmail}
                  value={email}
                  placeholder="ejemplo@email.com"
                />

                <Text style={styles.TextoLabels}>Contraseña</Text>
                <View style={styles.input}>
                  <View style={styles.IconInput}>
                    <TextInput
                      value={Contraseña}
                      placeholder="••••••••••"
                      secureTextEntry={modoPassword}
                      onChangeText={onChangePassword}
                      maxLength={25}
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
                </View>
              </View>
            ) : (
              <View></View>
            )}
          </View>

          <View>
            {isEntrenador ? (
              <View>
                <Text style={styles.TextoLabels}>Teléfono</Text>
                <TextInput
                  style={styles.input}
                  onChangeText={onChangeTelefono}
                  value={telefono}
                  placeholder="##########"
                  keyboardType="numeric"
                  maxLength={10}
                />

                <Text style={styles.TextoLabels}>Colonia</Text>
                <TextInput
                  style={styles.input}
                  onChangeText={onChangeColonia}
                  value={colonia}
                  placeholder="Colonia"
                />
                <Text style={styles.TextoLabels}>Dirección</Text>
                <TextInput
                  style={styles.input}
                  onChangeText={onChangeDireccion}
                  value={direccion}
                  placeholder="Dirección"
                />
              </View>
            ) : (
              <View>
                <Text></Text>
              </View>
            )}
          </View>
          <View>
            {isArbitro ? (
              <View>
                <Text style={styles.TextoLabels}>Número de árbitro</Text>
                <TextInput
                  style={styles.input}
                  onChangeText={onChangeNumArbitro}
                  value={numArbitro}
                  placeholder="##"
                  maxLength={2}
                  keyboardType="numeric"
                />
              </View>
            ) : (
              <View></View>
            )}
          </View>
          <View>
            {isArbitro || isComision || isEntrenador ? (
              <View style={styles.boton}>
                <TouchableOpacity
                  onPress={() =>
                    //navigation.navigate("Login") &&
                    axios
                      .post(baseURL, {
                        curp: curp,
                        nombre: nombre,
                        apellidoP: apellidoP,
                        email: email,
                        contrasena: Contraseña,
                        numeroTel: telefono,
                        direccion: direccion,
                        colonia: colonia,
                        numeroArb: numArbitro,
                        comision: isComision,
                        entrenador: isEntrenador,
                        arbitro: isArbitro,
                      })
                      .then(function (response) {
                        console.log(response);
                        Alert.alert("Mensaje: ", "Ususaio creado con exito", [
                          {
                            text: "OK",
                            onPress: () => navigation.navigate("Login"),
                          },
                        ]);
                      })
                      .catch(function (error) {
                        console.log(error);
                        Alert.alert(
                          "Error: ",
                          JSON.stringify(error["message"])
                        );
                      })
                  }
                >
                  <Text style={styles.TextoBoton}>Registrarse</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <View alignItems={"center"}>
                <Text style={styles.TextoLabels}>
                  Elije un rol para poder registrarte
                </Text>
              </View>
            )}
          </View>

          <TouchableOpacity onPress={() => navigation.navigate("Home")}>
            <Text style={styles.TextoBoton2}>Regresar </Text>
          </TouchableOpacity>
        </View>
        <Text padding={150}></Text>
      </ScrollView>
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
    backgroundColor: "#ff6624",
    borderRadius: 5,
    marginVertical: 7,
    paddingHorizontal: 10,
    paddingVertical: 50,
    height: 50,
  },
  TextoBoton: {
    fontSize: 30,
    textAlign: "center",
    color: "#ffffff",
    fontWeight: "bold",
    marginRight: 10,
    marginTop: 2,
    paddingHorizontal: 50,
    paddingVertical: 10,
  },
  input: {
    borderWidth: 2,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderTopWidth: 0,
    padding: 5,
    fontSize: 22,
  },
  section: {
    flexDirection: "row",
    alignItems: "center",
  },
  paragraph: {
    fontSize: 15,
  },
  checkbox: {
    margin: 8,
  },
  BotonFecNac: {
    backgroundColor: "#ff6624",
  },
  IconInput: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
  },
  boton: {
    backgroundColor: "#ff6624",
    borderRadius: 5,
    marginVertical: 10,
    paddingHorizontal: 15,
    height: "auto",
    textAlign: "center",
  },
  TextoLabels: {
    color: "#ff6624",
    fontSize: 24,
    fontWeight: "bold",
  },
  TextoBoton2: {
    fontSize: 33,
    textAlign: "center",
    color: "#ff6624",
    paddingTop: 10,
    paddingHorizontal: 10,
  },
});

export default RegisterScreen;
