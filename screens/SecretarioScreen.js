import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TextInput,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Drawer } from "react-native-paper";
import { TouchableOpacity } from "react-native-gesture-handler";
import Ionicons from "@expo/vector-icons/Ionicons";
import { StyleSheet } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Table, TableWrapper, Row } from "react-native-table-component";
import Checkbox from "expo-checkbox";
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

const baseURL = "http://192.168.31.108:4000/api/secretario";
//const baseURL = "http://10.1.141.191:4000/api/secretario";

const SecretarioScreen = () => {
  const navigation = useNavigation();

  const [newTorneo, onChangeTorneo] = useState(true);

  const [admin, setAdmin] = useState("");
  const [secre, setSecre] = useState("");
  const [jefe, setJefe] = useState("");
  const [arbit, setArbit] = useState("");
  const [comis, setComis] = useState("");
  const [entre, setEntre] = useState("");

  const [respuesta, setRespuesta] = useState();

  AsyncStorage.getItem("tusecretosecreto", (err, res) => {
    decode = jwt_decode(res);
    setRespuesta(res);
    setAdmin(JSON.stringify(decode["admin"]));
    setSecre(JSON.stringify(decode["secretario"]));
    setJefe(JSON.stringify(decode["jefe"]));
    setArbit(JSON.stringify(decode["arbitro"]));
    setComis(JSON.stringify(decode["comision"]));
    setEntre(JSON.stringify(decode["entrenador"]));
  });

  //console.log(respuesta);
  //obtener datos para la tabla validacion de equipos
  const [data, setData] = useState("");
  const [configt, setConfigt] = useState();
  // const [sid, setId] = useState();
  const fetchData = async () => {
    try {
      const token = respuesta.replaceAll('"', "");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      setConfigt(config);
      const response = await axios.get(baseURL, config);
      setData(response.data);
      // console.log(response.data);
    } catch (error) {
      console.log("Error ", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [respuesta]);

  this.state = {
    tableHeadValidacion: ["Equipo", "Rama", "Entrenador", "Validación"],
    widthArrValidacion: [200, 200, 100, 100],
    tableHeadHorarios: [
      "Vuelta",
      "Rama",
      "Partido",
      "Fecha",
      "Hora",
      "Acciones",
    ],
    widthArrHorarios: [100, 100, 200, 200, 100, 120],
    widthArrTorneo: [240, 100],
    tableHeadTorHis: [
      "Num. Torneo",
      "Fecha de Inicio",
      "Equipos Femeniles",
      "Equipos Masculinos",
    ],
    widthArrTorHis: [100, 100, 100, 100],
    tableHeadCredencial: ["Jugador", "Equipo", "Credencial"],
    widthArrCredencial: [200, 150, 100],
  };
  //tabla Validacion
  const tableDataValidacion = [];

  {
    //Checar la parte de validar y rechazar
  }
  if (data == "") {
  } else {
    usuarios = JSON.stringify(data["respuesta"]["equipos"]);
    num = JSON.parse(usuarios).length;
    // console.log(num);
    if (num == 0) {
      tableDataValidacion.push("sin equipos para validar");
    } else {
      for (let i = 0; i < num; i++) {
        const rowData = [];
        for (let j = 0; j < 4; j++) {
          rowData.push(
            JSON.stringify(data["respuesta"]["equipos"][i]["nombreEqu"])
          );
          rowData.push(JSON.stringify(data["respuesta"]["equipos"][i]["rama"]));
          rowData.push(
            JSON.stringify(
              data["respuesta"]["equipos"][i]["nombreUsu"] +
                " " +
                data["respuesta"]["equipos"][i]["apellidoP"]
            )
          );
          let identy = JSON.stringify(
            data["respuesta"]["equipos"][i]["idEquipo"]
          ).replaceAll('"', "");
          // console.log(identy);
          rowData.push(
            <View style={styles.IconInput}>
              <TouchableOpacity
                onPress={() =>
                  axios
                    .post(
                      baseURL + "/equipo/valido",
                      {
                        idEquipo: identy,
                      },
                      configt
                    )
                    .then(function (response) {
                      fetchData();
                      Alert.alert("", "Equipo validado correctamente");
                    })
                    .catch(function (error) {
                      console.log("", "Ocurrio un error");
                      console.log(error);
                    })
                }
              >
                <Ionicons
                  name="checkmark-circle"
                  size={30}
                  color="green"
                  paddingLeft={10}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() =>
                  Alert.alert(
                    "Atencion",
                    "Estas por rechazar a: " +
                      JSON.stringify(
                        data["respuesta"]["equipos"][i]["nombreEqu"]
                      ),
                    [
                      {
                        text: "Cancelar",
                        // onPress: () => console.log("Cancel Pressed"),
                        style: "cancel",
                      },
                      {
                        text: "OK",

                        onPress: () =>
                          axios
                            .post(
                              baseURL + "/equipo/invalido",
                              {
                                idEquipo: JSON.stringify(
                                  data["respuesta"]["equipos"][i]["idEquipo"]
                                ).replaceAll('"', ""),
                              },
                              configt
                            )
                            .then(function (response) {
                              fetchData();
                              Alert.alert("", "Equipo eliminado correctamente");
                            })
                            .catch(function (error) {
                              console.log("", "Ocurrio un error");
                              console.log(error);
                            }),
                      },
                    ]
                  )
                }
              >
                <Ionicons name="close-circle" size={30} color="red" />
              </TouchableOpacity>
            </View>
          );
        }
        tableDataValidacion.push(rowData);
      }
    }
  }

  //tabla Horarios
  const tableDataHorarios = [];

  if (data == "") {
  } else {
    usuarios = JSON.stringify(data["respuesta"]["cronograma"]);
    num = JSON.parse(usuarios).length;
    //console.log(num);

    for (let i = 0; i < num; i++) {
      const rowData = [];
      for (let j = 0; j < 6; j++) {
        rowData.push(
          JSON.stringify(data["respuesta"]["cronograma"][i]["vuelta"])
        );
        rowData.push(
          JSON.stringify(data["respuesta"]["cronograma"][i]["rama"])
        );
        rowData.push(
          JSON.stringify(
            data["respuesta"]["cronograma"][i]["equipoA"] +
              " VS " +
              data["respuesta"]["cronograma"][i]["equipoB"]
          )
        );
        rowData.push(
          JSON.stringify(data["respuesta"]["cronograma"][i]["fechaEnc"]).substr(
            0,
            11
          ) + '"'
        );
        rowData.push(
          JSON.stringify(data["respuesta"]["cronograma"][i]["hora"])
        );
        rowData.push(
          <View style={styles.IconInput}>
            <TouchableOpacity>
              <Ionicons
                name="swap-vertical"
                size={30}
                color="black"
                paddingLeft={1}
              />
            </TouchableOpacity>
            <TouchableOpacity>
              <Ionicons
                name="ios-backspace"
                size={30}
                color="#00a4d3"
                paddingLeft={1}
              />
            </TouchableOpacity>
            <TouchableOpacity>
              <Ionicons
                name="checkmark-circle"
                size={30}
                color="green"
                paddingLeft={1}
              />
            </TouchableOpacity>
          </View>
        );
      }
      tableDataHorarios.push(rowData);
    }
  }

  const rowInfoTorneo = [
    "Número maximo de equipos por entrenador",
    "Número maximo de jugadores por equipo",
    "Número minimo de jugadores por equipo",
    "Número maximo de equipos por torneo",
    "Número minimo de equipos por torneo",
    "Número de dias antes del torneo para registrarse",
  ];
  const [maxEntre, onChangeMaxEntre] = useState("");
  const [maxJugadoresEquipo, onChangeMaxJugadoresEquipo] = useState("");
  const [minJugadoresEquipo, onChangeMinJugadoresEquipo] = useState("");
  const [maxEquTorneo, onChangeMaxEquTorneo] = useState("");
  const [minEquTorneo, onChangeMinEquTorneo] = useState("");
  const [diasAntes, onChangeDiasAntes] = useState("");

  const sets = [
    onChangeMaxEntre,
    onChangeMaxJugadoresEquipo,
    onChangeMinJugadoresEquipo,
    onChangeMaxEquTorneo,
    onChangeMinEquTorneo,
    onChangeDiasAntes,
  ];

  const values = [
    maxEntre,
    maxJugadoresEquipo,
    minJugadoresEquipo,
    maxEquTorneo,
    minEquTorneo,
    diasAntes,
  ];

  //tabla Horarios
  const tableinfoTorneo = [];
  for (let i = 0; i < 6; i++) {
    const rowData = [];
    for (let j = 0; j < 2; j++) {
      rowData.push(rowInfoTorneo[i]);
      rowData.push(
        <View>
          <TextInput
            style={styles.input}
            onChangeText={sets[i]}
            value={values[i]}
            placeholder="##"
            keyboardType="numeric"
            maxLength={2}
          />
        </View>
      );
    }
    tableinfoTorneo.push(rowData);
  }

  // tabla Torneos
  const tableDataTorneos = [];

  if (data == "") {
  } else {
    usuarios = JSON.stringify(data["respuesta"]["torneo"]);
    num = JSON.parse(usuarios).length;
    //console.log(usuarios);

    for (let i = 0; i < num; i++) {
      const rowData = [];
      for (let j = 0; j < 4; j++) {
        rowData.push(
          JSON.stringify(data["respuesta"]["torneo"][i]["idTorneo"])
        );
        rowData.push(
          JSON.stringify(data["respuesta"]["torneo"][i]["fechaIniTor"]).substr(
            0,
            11
          ) + '"'
        );
        rowData.push(
          JSON.stringify(data["respuesta"]["torneo2"][i]["EquiposFemeninos"])
        );
        rowData.push(
          JSON.stringify(data["respuesta"]["torneo2"][i]["EquiposMasculinos"])
        );
      }
      tableDataTorneos.push(rowData);
    }
  }

  //credenciales
  /*
  const tableDataCredencial = [];
  if (data == "") {
  } else {
    usuarios = JSON.stringify(data["respuesta"]["jugadores"]);
    num = JSON.parse(usuarios).length;
    console.log(num);

    for (let i = 0; i < num; i++) {
      const rowData = [];
      for (let j = 0; j < 4; j++) {
        rowData.push(
          '"' +
            JSON.stringify(
              data["respuesta"]["jugadores"][i]["apellidoP"]
            ).replaceAll('"', "") +
            " " +
            JSON.stringify(data["respuesta"]["jugadores"][i]["nombre"]).replace(
              '"',
              ""
            )
        );
        rowData.push(
          JSON.stringify(data["respuesta"]["jugadores"][i]["equipo"])
        );
        rowData.push(
          <View alignItems="center">
            <TouchableOpacity>
              <Ionicons name="download-outline" size={30} color="black" />
            </TouchableOpacity>
          </View>
        );
      }
      tableDataCredencial.push(rowData);
    }
  }*/
  console.log(JSON.stringify(data["respuesta"]));

  return (
    <SafeAreaView style={styles.container}>
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

          <Text style={styles.titulo}>Secretario</Text>
          <Text></Text>
          <Text></Text>
        </View>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
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
              <View>
                {entre == 5 ? (
                  <TouchableOpacity
                    onPress={() => navigation.navigate("Entrenador")}
                  >
                    <Text style={styles.textcol}>Entrenador</Text>
                  </TouchableOpacity>
                ) : (
                  <View></View>
                )}
              </View>
            </CollapseBody>
          </Collapse>
          <Text style={styles.Subtitulo} paddingTop={10}>
            Validación de equipos
          </Text>
          {
            //Tabla Equipos inscritos
          }
          <View paddingHorizontal={10}>
            <ScrollView horizontal={true}>
              <View>
                <Table borderStyle={{ borderWidth: 1, borderColor: "#000000" }}>
                  <Row
                    data={state.tableHeadValidacion}
                    widthArr={state.widthArrValidacion}
                    style={styles.header}
                    textStyle={styles.text}
                  />
                </Table>

                <Table borderStyle={{ borderWidth: 1, borderColor: "#000000" }}>
                  {tableDataValidacion.map((rowData, index) => (
                    <Row
                      key={index}
                      data={rowData}
                      widthArr={state.widthArrValidacion}
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
          <Text style={styles.Subtitulo} paddingTop={10}>
            Horario de partidos
          </Text>
          {
            //Tabla horario de partidos
          }
          <View paddingHorizontal={10}>
            <ScrollView horizontal={true}>
              <View>
                <Table borderStyle={{ borderWidth: 1, borderColor: "#000000" }}>
                  <Row
                    data={state.tableHeadHorarios}
                    widthArr={state.widthArrHorarios}
                    style={styles.header}
                    textStyle={styles.text}
                  />
                </Table>

                <Table borderStyle={{ borderWidth: 1, borderColor: "#000000" }}>
                  {tableDataHorarios.map((rowData, index) => (
                    <Row
                      key={index}
                      data={rowData}
                      widthArr={state.widthArrHorarios}
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
            //Fin tabla Horario de partidos
          }
          <View alignItems="space-between" marginRight={10}>
            <TouchableOpacity
              style={styles.boton}
              onPress={() => onChangeTorneo(false)}
            >
              <Text style={styles.TextoBoton} marginVertical={5}>
                Nuevo torneo
              </Text>
            </TouchableOpacity>
          </View>
          {newTorneo ? (
            <View></View>
          ) : (
            <View>
              <Table borderStyle={{ borderWidth: 1, borderColor: "#000000" }}>
                {tableinfoTorneo.map((rowData, index) => (
                  <Row
                    key={index}
                    data={rowData}
                    widthArr={state.widthArrTorneo}
                    style={[
                      styles.row,
                      index % 2 && { backgroundColor: "#F7F6E7" },
                    ]}
                    textStyle={styles.text}
                  />
                ))}
              </Table>
              <View
                alignItems="space-between"
                marginRight={10}
                style={styles.IconInput}
              >
                <TouchableOpacity
                  style={styles.boton}
                  onPress={() => onChangeTorneo(true)}
                >
                  <Text style={styles.TextoBoton} margin={5}>
                    Cerrar
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.boton}>
                  <Text style={styles.TextoBoton} marginVertical={5}>
                    Crear Torneo
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
          <Text style={styles.Subtitulo} paddingTop={10}>
            Torneos
          </Text>
          {
            //Tabla Equipos inscritos
          }
          <View paddingHorizontal={10}>
            <ScrollView horizontal={true}>
              <View>
                <Table borderStyle={{ borderWidth: 1, borderColor: "#000000" }}>
                  <Row
                    data={state.tableHeadTorHis}
                    widthArr={state.widthArrTorHis}
                    style={styles.header}
                    textStyle={styles.text}
                  />
                </Table>

                <Table borderStyle={{ borderWidth: 1, borderColor: "#000000" }}>
                  {tableDataTorneos.map((rowData, index) => (
                    <Row
                      key={index}
                      data={rowData}
                      widthArr={state.widthArrTorHis}
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
            //Fin tabla Torneo
          }
          {/*
          <Text style={styles.Subtitulo} paddingTop={10}>
            Credenciales de Jugadores
          </Text>
          {
            //Tabla Credenciales
          }
          
          <View paddingHorizontal={10}>
            <ScrollView horizontal={true}>
              <View>
                <Table borderStyle={{ borderWidth: 1, borderColor: "#000000" }}>
                  <Row
                    data={state.tableHeadCredencial}
                    widthArr={state.widthArrCredencial}
                    style={styles.header}
                    textStyle={styles.text}
                  />
                </Table>

                <Table borderStyle={{ borderWidth: 1, borderColor: "#000000" }}>
                  {tableDataCredencial.map((rowData, index) => (
                    <Row
                      key={index}
                      data={rowData}
                      widthArr={state.widthArrCredencial}
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
*/}
          {
            //Fin tabla Equipos inscritos
          }
        </View>
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
    paddingLeft: 35,
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
    //paddingLeft: 10,
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
    flex: 1,

    padding: 24,
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
  menucol: {
    alignItems: "center",
  },
  textcol: {
    fontSize: 22,
    fontWeight: "bold",
  },
});

export default SecretarioScreen;
