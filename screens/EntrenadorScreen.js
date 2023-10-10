import { View, Text, ScrollView, TextInput } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Table, TableWrapper, Row } from "react-native-table-component";
import { useState } from "react";
import { CheckBox } from "@rneui/themed";
import { SelectList } from "react-native-dropdown-select-list";
import DateTimePickerModal from "react-native-modal-datetime-picker";

const EntrenadorScreen = () => {
  const [modoEquipoJugador, onChangeModoEquipoJugador] = React.useState(true);
  const [nombreEquipo, onChangeNombreEquipo] = useState("");
  const [selectedIndex, setIndex] = React.useState(0);

  const [selected, setSelected] = React.useState("");

  const data = [
    { key: "1", value: "Tomateros" },
    { key: "2", value: "Dodgers" },
  ];

  //nuevo jugador
  const [nombre, onChangeNombre] = useState("");
  const [apellidoP, onChangeApellidoP] = useState("");
  const [telefono, onChangeTelefono] = useState("");
  const [curp, onChangeCURP] = useState("");
  const [numPlayera, onChangeNumPlayera] = useState("");
  // fecha de nacimiento
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

  return (
    <SafeAreaView>
      <ScrollView>
        <View>
          <View style={styles.IconInput}>
            <TouchableOpacity>
              <Ionicons name="menu" size={35} color="#000000" />
            </TouchableOpacity>

            <Text style={styles.titulo}>Entrenador</Text>
            <Text></Text>
            <Text></Text>
          </View>

          <Text style={styles.Subtitulo}>Equipos inscritos</Text>
          <View alignItems="space-between" marginRight={10}>
            <TouchableOpacity
              style={styles.boton}
              onPress={() => onChangeModoEquipoJugador(true)}
            >
              <Text style={styles.TextoBoton} marginVertical={5}>
                Nuevo Equipo
              </Text>
            </TouchableOpacity>
          </View>
          <View>
            <ScrollView horizontal={true}>
              <View paddingHorizontal={10}>
                <Table borderStyle={{ borderWidth: 1, borderColor: "#000000" }}>
                  <Row
                    data={["Nombre", "Rama", "Num. Torneo", "Estatus"]}
                    widthArr={[150, 50, 50, 150]}
                    style={styles.header}
                    textStyle={styles.text}
                  />
                </Table>
                <ScrollView>
                  <Table
                    borderStyle={{ borderWidth: 1, borderColor: "#000000" }}
                  >
                    <Row
                      data={[["Dodgers"], ["V"], ["1"], ["Validado"]]}
                      widthArr={[150, 50, 50, 150]}
                      style={styles.row}
                      textStyle={styles.text}
                    />
                    <Row
                      data={[["Tomateros"], ["V"], ["1"], ["Rechazado"]]}
                      widthArr={[150, 50, 50, 150]}
                      style={styles.row}
                      textStyle={styles.text}
                    />
                  </Table>
                </ScrollView>
              </View>
            </ScrollView>
          </View>
          <Text style={styles.Subtitulo} paddingTop={15}>
            CRUD Miembros de Equipo
          </Text>
          <View alignItems="space-between" marginRight={10}>
            <TouchableOpacity
              style={styles.boton}
              onPress={() => onChangeModoEquipoJugador(false)}
            >
              <Text style={styles.TextoBoton} marginVertical={5}>
                Nuevo jugador
              </Text>
            </TouchableOpacity>
          </View>
          <View>
            <View style={styles.rowinput} paddingHorizontal={10}>
              <TouchableOpacity style={styles.boton2}>
                <Text style={styles.TextoBoton} marginVertical={5}>
                  Tomateros
                </Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.boton2}>
                <Text style={styles.TextoBoton}>Dodgers</Text>
              </TouchableOpacity>
            </View>
            <View>
              <ScrollView horizontal={true}>
                <View paddingHorizontal={10}>
                  <Table
                    borderStyle={{ borderWidth: 1, borderColor: "#000000" }}
                  >
                    <Row
                      data={["Nombre", "Telefono", "Num. playera", "Acciones"]}
                      widthArr={[150, 150, 50, 150]}
                      style={styles.header}
                      textStyle={styles.text}
                    />
                  </Table>
                  <ScrollView>
                    <Table
                      borderStyle={{ borderWidth: 1, borderColor: "#000000" }}
                    >
                      <Row
                        data={[
                          ["Juan Pedro"],
                          ["4567891235"],
                          ["1"],
                          ["Validado"],
                        ]}
                        widthArr={[150, 150, 50, 150]}
                        style={styles.row}
                        textStyle={styles.text}
                      />
                      <Row
                        data={[["Rene"], ["3692581478"], ["12"], ["Rechazado"]]}
                        widthArr={[150, 150, 50, 150]}
                        style={styles.row}
                        textStyle={styles.text}
                      />
                    </Table>
                  </ScrollView>
                </View>
              </ScrollView>
            </View>
          </View>
          <View>
            {modoEquipoJugador ? (
              <View>
                <Text style={styles.Subtitulo}>Inscripcion de Equipo</Text>
                <View style={styles.container2}>
                  <Text style={styles.TextoLabels}>Nombre de Equipo</Text>
                  <TextInput
                    style={styles.input}
                    onChangeText={onChangeNombreEquipo}
                    value={nombreEquipo}
                    placeholder="Nombre del equipo"
                  />
                  <Text style={styles.TextoLabels}>Rama</Text>
                  <View>
                    <CheckBox
                      checked={selectedIndex === 0}
                      onPress={() => setIndex(0)}
                      iconType="material-community"
                      checkedIcon="radiobox-marked"
                      uncheckedIcon="radiobox-blank"
                      title={"Masculino"}
                    />
                    <CheckBox
                      checked={selectedIndex === 1}
                      onPress={() => setIndex(1)}
                      iconType="material-community"
                      checkedIcon="radiobox-marked"
                      uncheckedIcon="radiobox-blank"
                      title={"Femenino"}
                    />
                  </View>
                  <View alignItems="space-between" marginRight={10}>
                    <TouchableOpacity style={styles.boton}>
                      <Text style={styles.TextoBoton} marginVertical={5}>
                        Inscribir Equipo
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            ) : (
              <View>
                <Text style={styles.Subtitulo}>Inscribir jugadores</Text>
                <View style={styles.container2}>
                  <Text style={styles.TextoLabels}>Equipo</Text>
                  <SelectList
                    setSelected={(val) => setSelected(val)}
                    data={data}
                    save="value"
                    placeholder="Seleccionar equipo"
                  />
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

                  <Text style={styles.TextoLabels}>Telefono</Text>
                  <TextInput
                    style={styles.input}
                    onChangeText={onChangeTelefono}
                    value={telefono}
                    placeholder="##########"
                    keyboardType="numeric"
                    maxLength={10}
                  />
                  <Text style={styles.TextoLabels}>Sexo</Text>
                  <View>
                    <CheckBox
                      checked={selectedIndex === 0}
                      onPress={() => setIndex(0)}
                      iconType="material-community"
                      checkedIcon="radiobox-marked"
                      uncheckedIcon="radiobox-blank"
                      title={"Masculino"}
                    />
                    <CheckBox
                      checked={selectedIndex === 1}
                      onPress={() => setIndex(1)}
                      iconType="material-community"
                      checkedIcon="radiobox-marked"
                      uncheckedIcon="radiobox-blank"
                      title={"Femenino"}
                    />
                  </View>
                  <View style={styles.boton}>
                    <View style={styles.IconInput}>
                      <TouchableOpacity onPress={showDatePicker}>
                        <Text style={styles.TextoBoton} marginVertical={5}>
                          Fecha de nacimiento
                        </Text>
                      </TouchableOpacity>
                      <DateTimePickerModal
                        isVisible={isDatePickerVisible}
                        mode="date"
                        onConfirm={handleConfirm}
                        onCancel={hideDatePicker}
                      />
                      <TouchableOpacity onPress={showDatePicker}>
                        <Ionicons name="calendar" size={35} color="#ffffff" />
                      </TouchableOpacity>
                    </View>
                  </View>
                  <Text style={styles.TextoLabels}>Numero de Playera</Text>
                  <TextInput
                    style={styles.input}
                    onChangeText={onChangeNumPlayera}
                    value={numPlayera}
                    placeholder="Numero de playera"
                    maxLength={2}
                    keyboardType="numeric"
                  />
                  <View style={styles.boton}>
                    <TouchableOpacity /*onPress={() => navigation.navigate("Home")}*/
                    >
                      <Text style={styles.TextoBoton} marginVertical={5}>
                        Registrar
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            )}
          </View>
        </View>
        <View paddingTop={80}></View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingTop: 30,
    backgroundColor: "#fff",
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
    marginVertical: 10,
    paddingHorizontal: 10,
    height: 50,
  },
  TextoBoton: {
    fontSize: 30,
    textAlign: "center",
    color: "#ffffff",
    fontWeight: "bold",
    marginVertical: 2,
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
    alignItems: "center",
    paddingLeft: 10,
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
    paddingTop: 70,
  },
  Subtitulo: {
    textAlign: "center",
    fontSize: 28,
    fontWeight: "bold",
    color: "#000000",
  },
  header: {
    height: 50,
    backgroundColor: "#ff6624",
  },
  text: {
    textAlign: "center",
    fontWeight: "200",
  },
  row: {
    height: 40,
    backgroundColor: "#ffffff",
  },
  container2: {
    //flex: 1,

    paddingHorizontal: 24,
  },
  section: {
    flexDirection: "row",
    alignItems: "center",
  },
  checkbox: {
    margin: 8,
  },
  paragraph: {
    fontSize: 15,
  },
  input: {
    borderWidth: 2,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderTopWidth: 0,
    padding: 5,
    fontSize: 22,
  },
  TextoLabels: {
    color: "#ff6624",
    fontSize: 24,
    fontWeight: "bold",
  },
  boton: {
    backgroundColor: "#ff6624",
    borderRadius: 5,
    marginVertical: 10,
    paddingHorizontal: 15,
    height: "auto",
    textAlign: "center",
  },
  TextoBoton: {
    fontSize: 23,
    textAlign: "center",
    color: "#ffffff",
    fontWeight: "bold",
    marginRight: 10,
    marginTop: 2,
  },
  rowinput: {
    flexDirection: "row",
  },
  boton2: {
    backgroundColor: "#ff6624",
    borderRadius: 5,
    // marginVertical: 10,
    paddingHorizontal: 5,
    height: "auto",
  },
});

export default EntrenadorScreen;
