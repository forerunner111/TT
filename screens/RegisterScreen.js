import { View, Text, TextInput, Button } from "react-native";
import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { SafeAreaView } from "react-native";
import { StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { useState } from "react";
import Checkbox from "expo-checkbox";

const RegisterScreen = () => {
  const navigation = useNavigation();
  const [nombre, onChangeNombre] = useState("");
  const [email, onChangeEmail] = useState("");
  const [apellidoP, onChangeApellidoP] = useState("");
  const [telefono, onChangeTelefono] = useState("");
  const [curp, onChangeCURP] = useState("");
  const [Contraseña, onChangePassword] = React.useState("");
  const [modoPassword, onChangemodoPassword] = React.useState(true);

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    console.warn("A date has been picked: ", date);
    hideDatePicker();
  };

  const [isComision, setComision] = useState(false);
  const [isEntrenador, setEntrenador] = useState(false);
  const [isArbitro, setArbitro] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.titulo}>Registrarse</Text>
      <View>
        <View style={styles.section}>
          <Checkbox
            style={styles.checkbox}
            value={isComision}
            onValueChange={setComision}
            color={isComision ? "#ff6624" : undefined}
          />
          <Text style={styles.paragraph}>Comisión Diciplinaria</Text>
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
        <Text>Nombre</Text>
        <TextInput
          style={styles.input}
          onChangeText={onChangeNombre}
          value={nombre}
          placeholder="Nombre"
        />
        <Text>Apellido paterno</Text>
        <TextInput
          style={styles.input}
          onChangeText={onChangeApellidoP}
          value={apellidoP}
          placeholder="Apellido Paterno"
        />
        <Text>CURP</Text>
        <TextInput
          style={styles.input}
          onChangeText={onChangeCURP}
          value={curp}
          placeholder="CURP"
          maxLength={18}
        />
        <Text>Email</Text>
        <TextInput
          style={styles.input}
          onChangeText={onChangeEmail}
          value={email}
          placeholder="ejemplo@email.com"
        />

        <Text>Contraseña</Text>
        <View style={styles.input}>
          <View style={styles.IconInput}>
            <TextInput
              secureTextEntry={modoPassword}
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
        </View>
        <View style={styles.boton}>
          <View style={styles.IconInput}>
            <TouchableOpacity onPress={showDatePicker}>
              <Text style={styles.TextoBoton}>Fecha de nacimiento</Text>
            </TouchableOpacity>
            <DateTimePickerModal
              isVisible={isDatePickerVisible}
              mode="date"
              onConfirm={handleConfirm}
              onCancel={hideDatePicker}
            />
            <Ionicons name="calendar" size={35} color="#ffffff" />
          </View>
        </View>
        <Text>Telefono</Text>
        <TextInput
          style={styles.input}
          onChangeText={onChangeTelefono}
          value={telefono}
          placeholder="##########"
          keyboardType="numeric"
          maxLength={10}
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
    fontSize: 23,
    textAlign: "center",
    color: "#ffffff",
    fontWeight: "bold",
    marginRight: 10,
    marginTop: 2,
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
    fontSize: 28,
    fontWeight: "bold",
  },
});

export default RegisterScreen;
