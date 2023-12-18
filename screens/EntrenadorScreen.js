import { View, Text, ScrollView, TextInput, Alert } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Table, TableWrapper, Row } from "react-native-table-component";
import { useState, useEffect } from "react";
import { CheckBox } from "@rneui/themed";
import { SelectList } from "react-native-dropdown-select-list";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import {
  Collapse,
  CollapseHeader,
  CollapseBody,
  AccordionList,
} from "accordion-collapse-react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import jwt_decode from "jwt-decode";
import axios, { formToJSON } from "axios";

const baseURL = "http://192.168.31.109:4000/api/entrenador";
//const baseURL = "http://10.1.141.191:4000/api/entrenador";

const EntrenadorScreen = () => {
  const navigation = useNavigation();
  const [modoEquipoJugador, onChangeModoEquipoJugador] = useState(true);
  const [nombreEquipo, onChangeNombreEquipo] = useState("");
  const [selectedIndex, setIndex] = useState("");
  const [inscribirEquipo, onChangeInscribirEquipo] = useState(false);

  const [selected, setSelected] = React.useState("");

  //nuevo jugador
  const [nombre, onChangeNombre] = useState("");
  const [apellidoP, onChangeApellidoP] = useState("");
  const [telefono, onChangeTelefono] = useState("");
  const [curp, onChangeCURP] = useState("");
  const [numPlayera, onChangeNumPlayera] = useState("");
  const [BDD, setBDD] = useState("");
  // fecha de nacimiento
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    fecha = JSON.stringify(date).replaceAll('"', "");
    bien = fecha.substr(0, 10);
    excelente = bien.substr(8, 9);
    dia = excelente - 1;
    todo = fecha.substr(0, 8) + dia;
    //console.log(todo);
    setBDD(todo);
    hideDatePicker();
  };
  //menu desplegable
  const [admin, setAdmin] = useState("");
  const [secre, setSecre] = useState("");
  const [jefe, setJefe] = useState("");
  const [arbit, setArbit] = useState("");
  const [comis, setComis] = useState("");
  const [entre, setEntre] = useState("");

  const [respuesta, setRespuesta] = useState();
  const [uID, setUID] = useState();
  const [usuario, setUsuario] = useState("");

  AsyncStorage.getItem("tusecretosecreto", (err, res) => {
    decode = jwt_decode(res);
    setRespuesta(res);
    setAdmin(JSON.stringify(decode["admin"]));
    setSecre(JSON.stringify(decode["secretario"]));
    setJefe(JSON.stringify(decode["jefe"]));
    setArbit(JSON.stringify(decode["arbitro"]));
    setComis(JSON.stringify(decode["comision"]));
    setEntre(JSON.stringify(decode["entrenador"]));
    setUID("/" + JSON.stringify(decode["uID"]).replaceAll('"', ""));
    setUsuario(JSON.stringify(decode["uID"]).replaceAll('"', ""));
  });
  //console.log(usuario);
  const [data, setData] = useState("");
  const [configt, setConfigt] = useState();
  const fetchData = async () => {
    try {
      const token = respuesta.replaceAll('"', "");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      setConfigt(config);
      const response = await axios.get(baseURL + uID, config);
      //const respuestaJugadores = await axios.get(baseURL + "/987");
      /// setDataJugadores(respuestaJugadores);
      setData(response.data);
      //console.log(response.data);
    } catch (error) {
      console.log("Error ", error);
    }
  };
  // console.log(JSON.stringify(data["respuesta"]["jugadores"]));

  useEffect(() => {
    fetchData();
  }, [uID]);

  this.state = {
    tableHeadequi: ["Nombre", "Rama", "Estatus"],
    widthArrequi: [200, 50, 200],
    tableHeadeJugadores: [
      "Nombre",
      "Apellido",
      "Equipo",
      "Rama",
      "No. Playera",
      "Fecha de nacimiento",
    ],
    widthArrJugadores: [100, 100, 100, 50, 50, 100],
  };
  //tabla
  const tableDataequi = [];

  //desplegable nuevo jugador
  const datar = [];

  if (data == "") {
  } else {
    usuarios = JSON.stringify(data["respuesta"]["equipos"]);
    num = JSON.parse(usuarios).length;
    //console.log(num);
    for (let i = 0; i < num; i++) {
      const rowDataequi = [];
      datar.push({
        key: JSON.stringify(data["respuesta"]["equipos"][i]["idEquipo"]),
        value: JSON.stringify(
          data["respuesta"]["equipos"][i]["nombreEqu"]
        ).replaceAll('"', ""),
      });
      for (let j = 0; j < 3; j++) {
        rowDataequi.push(
          JSON.stringify(data["respuesta"]["equipos"][i]["nombreEqu"])
        );
        rowDataequi.push(
          JSON.stringify(data["respuesta"]["equipos"][i]["rama"])
        );
        if (
          JSON.stringify(data["respuesta"]["equipos"][i]["equiValidado"]) ==
          '"S"'
        ) {
          rowDataequi.push("Validado");
        } else if (
          JSON.stringify(data["respuesta"]["equipos"][i]["equiValidado"]) ==
          '"N"'
        ) {
          rowDataequi.push("Rechazado");
        } else {
          rowDataequi.push("Esperando Validacion");
        }
      }
      tableDataequi.push(rowDataequi);
    }
  }

  const tableDatajugadores = [];
  if (data == "") {
  } else {
    jugadores = JSON.stringify(data["respuesta"]["jugadores"]);
    num = JSON.parse(jugadores).length;
    console.log(jugadores);

    for (let i = 0; i < num; i++) {
      const rowDataJugadores = [];
      for (let j = 0; j < 6; j++) {
        rowDataJugadores.push(
          JSON.stringify(data["respuesta"]["jugadores"][i]["nombreUsu"])
        );
        rowDataJugadores.push(
          JSON.stringify(data["respuesta"]["jugadores"][i]["apellidoP"])
        );
        rowDataJugadores.push(
          JSON.stringify(data["respuesta"]["jugadores"][i]["nombreEqu"])
        );
        rowDataJugadores.push(
          JSON.stringify(data["respuesta"]["jugadores"][i]["sexo"])
        );
        rowDataJugadores.push(
          JSON.stringify(data["respuesta"]["jugadores"][i]["numeroJug"])
        );
        rowDataJugadores.push(
          JSON.stringify(data["respuesta"]["jugadores"][i]["fechaNac"]).substr(
            0,
            11
          ) + '"'
        );
      }
      tableDatajugadores.push(rowDataJugadores);
    }
  }
  //console.log(JSON.stringify(data));

  return (
    <SafeAreaView>
      <View>
        <View style={styles.IconInput}>
          <TouchableOpacity
            onPress={() =>
              AsyncStorage.clear()
                .then(function (response) {
                  console.log(response);
                  navigation.reset({
                    index: 0,
                    routes: [{ name: "Home" }],
                  });
                })
                .catch(function (error) {
                  console.log("", "Ocurrio un error");
                })
            }
          >
            <Ionicons name="exit" size={35} color="#000000" />
          </TouchableOpacity>

          <Text style={styles.titulo}>Entrenador</Text>
          <Text></Text>
          <Text></Text>
        </View>
      </View>
      <ScrollView>
        <View padding={10}>
          <Collapse>
            <CollapseHeader style={styles.menucol}>
              <View>
                <Ionicons name="person" size={35} color="#000000" />
              </View>
            </CollapseHeader>
            <CollapseBody style={styles.menucol}>
              <View>
                {admin == 0 ? ( //Modificar esta parte cuando se tenga la pantalla de secretario
                  <TouchableOpacity
                    onPress={() => navigation.navigate("Admin")}
                  >
                    <Text style={styles.textcol}>Administrador</Text>
                  </TouchableOpacity>
                ) : (
                  <View></View>
                )}
              </View>
              <View>
                {secre == 1 ? ( //Modificar esta parte cuando se tenga la pantalla de secretario
                  <TouchableOpacity
                    onPress={() => navigation.navigate("Secretario")}
                  >
                    <Text style={styles.textcol}>Secretario de liga </Text>
                  </TouchableOpacity>
                ) : (
                  <View></View>
                )}
              </View>
              <View>
                {jefe == 2 ? (
                  <TouchableOpacity onPress={() => navigation.navigate("Jefe")}>
                    <Text style={styles.textcol}>Jefe de Árbitros</Text>
                  </TouchableOpacity>
                ) : (
                  <View></View>
                )}
              </View>
              <View>
                {arbit == 3 ? (
                  <TouchableOpacity
                    onPress={() => navigation.navigate("Arbitro")}
                  >
                    <Text style={styles.textcol}>Árbitro</Text>
                  </TouchableOpacity>
                ) : (
                  <View></View>
                )}
              </View>
              <View>
                {comis == 4 ? (
                  <TouchableOpacity
                    onPress={() => navigation.navigate("Comision")}
                  >
                    <Text style={styles.textcol}>Comisión Disciplinaria</Text>
                  </TouchableOpacity>
                ) : (
                  <View></View>
                )}
              </View>
            </CollapseBody>
          </Collapse>
        </View>
        <View>
          <Text style={styles.Subtitulo}>Equipos inscritos</Text>
          <View alignItems="space-between" marginRight={10}>
            <TouchableOpacity
              style={styles.boton}
              onPress={() => onChangeInscribirEquipo(true)}
            >
              <Text style={styles.TextoBoton} marginVertical={5}>
                Nuevo Equipo
              </Text>
            </TouchableOpacity>
          </View>
          {
            //Tabla Equipos inscritos
          }
          <View paddingHorizontal={10}>
            <ScrollView horizontal={true}>
              <View>
                <Table borderStyle={{ borderWidth: 1, borderColor: "#000000" }}>
                  <Row
                    data={state.tableHeadequi}
                    widthArr={state.widthArrequi}
                    style={styles.header}
                    textStyle={styles.text}
                  />
                </Table>

                <Table borderStyle={{ borderWidth: 1, borderColor: "#000000" }}>
                  {tableDataequi.map((rowDataequi, index) => (
                    <Row
                      key={index}
                      data={rowDataequi}
                      widthArr={state.widthArrequi}
                      style={[
                        styles.row,
                        index % 2 && { backgroundColor: "#F7F6E7" },
                      ]}
                      textStyle={styles.text}
                    />
                  ))}
                </Table>
              </View>
            </ScrollView>
          </View>
          {
            //Fin tabla Equipos inscritos
          }
          {inscribirEquipo ? (
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
                    checked={selectedIndex == "M"}
                    onPress={() => setIndex("M")}
                    iconType="material-community"
                    checkedIcon="radiobox-marked"
                    uncheckedIcon="radiobox-blank"
                    title={"Masculino"}
                  />
                  <CheckBox
                    checked={selectedIndex == "F"}
                    onPress={() => setIndex("F")}
                    iconType="material-community"
                    checkedIcon="radiobox-marked"
                    uncheckedIcon="radiobox-blank"
                    title={"Femenino"}
                  />
                </View>
                <View
                  alignItems="space-between"
                  marginRight={10}
                  style={styles.IconInput}
                >
                  <TouchableOpacity
                    style={styles.boton}
                    onPress={() =>
                      onChangeInscribirEquipo(false) &&
                      onChangeNombreEquipo("") &&
                      setIndex("")
                    }
                  >
                    <Text style={styles.TextoBoton} marginVertical={5}>
                      Cerrar
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.boton}
                    onPress={() =>
                      axios
                        .post(
                          baseURL + "/equipo",
                          {
                            nombre: nombreEquipo,
                            rama: selectedIndex,
                            idEntrenador: usuario,
                          },
                          configt
                        )
                        .then(function (response) {
                          console.log(response);
                          console.log(uID);
                          Alert.alert("", "Usuuario creado con exito");
                          onChangeInscribirEquipo(false);
                          onChangeNombreEquipo("");
                          setIndex("");
                          fetchData();
                        })
                        .catch(function (error) {
                          console.log(error);
                        })
                    }
                  >
                    <Text style={styles.TextoBoton} marginVertical={5}>
                      Inscribir Equipo
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ) : (
            <View></View>
          )}
          <Text style={styles.Subtitulo} paddingTop={15}>
            Miembros de Equipo
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
            {/*Tabla jugadores */}
            <View paddingHorizontal={10}>
              <ScrollView horizontal={true}>
                <View>
                  <Table
                    borderStyle={{ borderWidth: 1, borderColor: "#000000" }}
                  >
                    <Row
                      data={state.tableHeadeJugadores}
                      widthArr={state.widthArrJugadores}
                      style={styles.header}
                      textStyle={styles.text}
                    />
                  </Table>

                  <Table
                    borderStyle={{ borderWidth: 1, borderColor: "#000000" }}
                  >
                    {tableDatajugadores.map((rowDataJugadores, index) => (
                      <Row
                        key={index}
                        data={rowDataJugadores}
                        widthArr={state.widthArrJugadores}
                        style={[
                          styles.row,
                          index % 2 && { backgroundColor: "#F7F6E7" },
                        ]}
                        textStyle={styles.text}
                      />
                    ))}
                  </Table>
                </View>
              </ScrollView>
            </View>
            {/*Fin tabla jugadores*/}
          </View>
          <View>
            {modoEquipoJugador ? (
              <View></View>
            ) : (
              <View>
                <Text style={styles.Subtitulo}>Inscribir jugadores</Text>
                <View style={styles.container2}>
                  <Text style={styles.TextoLabels}>Equipo</Text>
                  {
                    <SelectList
                      setSelected={(val) => setSelected(val)}
                      data={datar}
                      save="key"
                      placeholder="Seleccionar equipo"
                      search={false}
                    />
                  }
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

                  <Text style={styles.TextoLabels}>Sexo</Text>
                  <View>
                    <CheckBox
                      checked={selectedIndex === "M"}
                      onPress={() => setIndex("M")}
                      iconType="material-community"
                      checkedIcon="radiobox-marked"
                      uncheckedIcon="radiobox-blank"
                      title={"Masculino"}
                    />
                    <CheckBox
                      checked={selectedIndex === "F"}
                      onPress={() => setIndex("F")}
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
                  <Text style={styles.TextoLabels}>Número de Playera</Text>
                  <TextInput
                    style={styles.input}
                    onChangeText={onChangeNumPlayera}
                    value={numPlayera}
                    placeholder="Número de playera"
                    maxLength={2}
                    keyboardType="numeric"
                  />
                  <View
                    alignItems="space-between"
                    marginRight={10}
                    style={styles.IconInput}
                  >
                    <TouchableOpacity
                      style={styles.boton}
                      onPress={() =>
                        onChangeModoEquipoJugador(true) &&
                        onChangeCURP("") &&
                        onChangeApellidoP("") &&
                        onChangeNombre("") &&
                        onChangeNumPlayera("") &&
                        setBDD("") &&
                        setSelected("") &&
                        setIndex("")
                      }
                    >
                      <Text style={styles.TextoBoton} marginVertical={5}>
                        Cerrar
                      </Text>
                    </TouchableOpacity>
                    <View style={styles.boton}>
                      <TouchableOpacity
                        onPress={() =>
                          axios
                            .post(
                              baseURL + "/jugador",
                              {
                                curp: curp,
                                nombre: nombre,
                                apellido: apellidoP,
                                sexo: selectedIndex,
                                equipo: selected,
                                numPlayera: numPlayera,
                                fechaNac: BDD,
                              },
                              configt
                            )
                            .then(function (response) {
                              console.log(response);
                              Alert.alert("", "Usuario creado con exito");
                              onChangeCURP("");
                              onChangeApellidoP("");
                              onChangeNombre("");
                              onChangeNumPlayera("");
                              setBDD("");
                              setSelected("");
                              setIndex("");
                              fetchData();
                            })
                            .catch(function (error) {
                              console.log(error);
                            })
                        }
                      >
                        <Text
                          style={styles.TextoBoton}
                          marginVertical={5}
                          paddingHorizontal={30}
                        >
                          Registrar
                        </Text>
                      </TouchableOpacity>
                    </View>
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
  menucol: {
    alignItems: "center",
  },
  textcol: {
    fontSize: 22,
    fontWeight: "bold",
  },
});

export default EntrenadorScreen;
