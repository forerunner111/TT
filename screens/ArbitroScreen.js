import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TextInput,
  Alert,
} from "react-native";
import React from "react";
import { Drawer } from "react-native-paper";
import { TouchableOpacity } from "react-native-gesture-handler";
import Ionicons from "@expo/vector-icons/Ionicons";
import { StyleSheet } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Table, TableWrapper, Row } from "react-native-table-component";
import Checkbox from "expo-checkbox";
import { useState, useEffect } from "react";
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
import { SelectList } from "react-native-dropdown-select-list";

const baseURL = "http://192.168.31.108:4000/api/arbitro/";

const ArbitroScreen = () => {
  const navigation = useNavigation();
  const [admin, setAdmin] = useState("");
  const [secre, setSecre] = useState("");
  const [jefe, setJefe] = useState("");
  const [arbit, setArbit] = useState("");
  const [comis, setComis] = useState("");
  const [entre, setEntre] = useState("");

  const [isEquA, onChangeIsEquA] = useState(false);
  const [isEquB, onChangeIsEquB] = useState(false);
  const [juegolisto, onChangeJuegoListo] = useState(false);

  const [respuesta, setRespuesta] = useState();
  const [sid, setId] = useState();

  AsyncStorage.getItem("tusecretosecreto", (err, res) => {
    decode = jwt_decode(res);
    setRespuesta(res);
    setAdmin(JSON.stringify(decode["admin"]));
    setSecre(JSON.stringify(decode["secretario"]));
    setJefe(JSON.stringify(decode["jefe"]));
    setArbit(JSON.stringify(decode["arbitro"]));
    setComis(JSON.stringify(decode["comision"]));
    setEntre(JSON.stringify(decode["entrenador"]));
    setId(JSON.stringify(decode["uID"]).replaceAll('"', ""));
    // console.log(JSON.stringify(decode));
    //console.log(JSON.stringify(decode));
  });

  //console.log(sid);

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
      const response = await axios.get(baseURL + sid, config);
      setData(response.data);
      // console.log(JSON.stringify(response));
    } catch (error) {
      console.log("Error ", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [sid]);

  this.state = {
    tableHead: [
      "Partido",
      "Fecha",
      "Hora",
      "Jefe De Mesa",
      "Cronometrista",
      "Anotador",
      "Juez 2",
      "Juez 3",
    ],
    widthArr: [250, 200, 200, 200, 200, 200, 200, 200],
    tableHeadPos: ["Posiciones", "Acciones"],
    widthArrPos: [150, 150],
    tableHeadPun: ["Puntos", "Acciones"],
    widthArrPun: [150, 150],
    tableHeadListo: ["Partidos", "Jugar"],
    widthArrListo: [250, 150],
    tableHeadAsistencia: ["Nombre", "Acciones"],
    widthArrAsistencia: [250, 250],
    tableHeadFaltas: ["Nombre", "Acciones"],
    widthArrFaltas: [250, 250],
    tableHeadDetenciones: ["Detenciones", "Acciones"],
    widthArrDetenciones: [250, 250],
  };
  const tableData = [];
  //console.log(JSON.stringify(data).includes("cabecera"));
  console.log(JSON.stringify(data["respuesta"]));
  // desplegable tabla disposicion
  const [selected, setSelected] = React.useState("");

  if (data == "") {
    for (let i = 0; i < 1; i++) {
      const rowData = [];
      for (let j = 0; j < 9; j++) {
        rowData.push("Sin Informacion");
      }
      tableData.push(rowData);
    }
  } else {
    //console.log(JSON.stringify(data));
    usuarios = JSON.stringify(data["respuesta"]["partidos"]);
    num = JSON.parse(usuarios).length;
    //console.log(num);

    for (let i = 0; i < num; i++) {
      const rowData = [];
      for (let j = 0; j < 8; j++) {
        rowData.push(
          JSON.stringify(
            data["respuesta"]["partidos"][i]["equipoA"] +
              " VS " +
              data["respuesta"]["partidos"][i]["equipoB"]
          )
        );
        rowData.push(
          JSON.stringify(data["respuesta"]["partidos"][i]["fechaEnc"]).substr(
            0,
            11
          ) + '"'
        );
        rowData.push(JSON.stringify(data["respuesta"]["partidos"][i]["hora"]));
        //Verifica si se cuenta con un jefe de mesa
        if (
          JSON.stringify(data["respuesta"]["partidos"][i]["jefe"]) == "null"
        ) {
          rowData.push(
            <View justifyContent="center" alignItems="center">
              <TouchableOpacity
                onPress={() =>
                  Alert.alert(
                    "Atención",
                    "Confirmas tu participacion en el partido " +
                      JSON.stringify(
                        data["respuesta"]["partidos"][i]["equipoA"] +
                          " VS " +
                          data["respuesta"]["partidos"][i]["equipoB"]
                      ) +
                      " que se jugará el " +
                      JSON.stringify(
                        data["respuesta"]["partidos"][i]["fechaEnc"]
                      ).substr(0, 11) +
                      '" a las ' +
                      JSON.stringify(data["respuesta"]["partidos"][i]["hora"]) +
                      " en el puesto de Jefe de Mesa",
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
                              baseURL,
                              {
                                idPartido: JSON.stringify(
                                  data["respuesta"]["partidos"][i][
                                    "idEncuentro"
                                  ]
                                ).replaceAll('"', ""),
                                idArbitro: sid,
                                posicion: "jefeEquipo",
                              },
                              configt
                            )
                            .then(function (response) {
                              fetchData();
                              Alert.alert("", "Puesto asignado");
                              console.log(response);
                            })
                            .catch(function (error) {
                              console.log(error);
                            }),
                      },
                    ]
                  )
                }
              >
                <Ionicons name="add-circle" size={35} color="#ff6624" />
              </TouchableOpacity>
            </View>
          );
        } else {
          rowData.push(
            JSON.stringify(data["respuesta"]["partidos"][i]["jefe"])
          );
        }

        //verifica si se cuenta con un cronometrista
        if (
          JSON.stringify(data["respuesta"]["partidos"][i]["crono"]) == "null"
        ) {
          rowData.push(
            <View justifyContent="center" alignItems="center">
              <TouchableOpacity
                onPress={() =>
                  Alert.alert(
                    "Atención",
                    "Confirmas tu participacion en el partido " +
                      JSON.stringify(
                        data["respuesta"]["partidos"][i]["equipoA"] +
                          " VS " +
                          data["respuesta"]["partidos"][i]["equipoB"]
                      ) +
                      " que se jugará el " +
                      JSON.stringify(
                        data["respuesta"]["partidos"][i]["fechaEnc"]
                      ).substr(0, 11) +
                      '" a las ' +
                      JSON.stringify(data["respuesta"]["partidos"][i]["hora"]) +
                      " en el puesto de Cronometrista",
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
                              baseURL,
                              {
                                idPartido: JSON.stringify(
                                  data["respuesta"]["partidos"][i][
                                    "idEncuentro"
                                  ]
                                ).replaceAll('"', ""),
                                idArbitro: sid,
                                posicion: "cronometrista",
                              },
                              configt
                            )
                            .then(function (response) {
                              fetchData();
                              Alert.alert("", "Puesto asignado");
                              console.log(response);
                            })
                            .catch(function (error) {
                              console.log(error);
                            }),
                      },
                    ]
                  )
                }
              >
                <Ionicons name="add-circle" size={35} color="#ff6624" />
              </TouchableOpacity>
            </View>
          );
        } else {
          rowData.push(
            JSON.stringify(data["respuesta"]["partidos"][i]["crono"])
          );
        }

        //Verifica si se cuenta con un Anotador
        if (
          JSON.stringify(data["respuesta"]["partidos"][i]["anotador"]) == "null"
        ) {
          rowData.push(
            <View justifyContent="center" alignItems="center">
              <TouchableOpacity
                onPress={() =>
                  Alert.alert(
                    "Atención",
                    "Confirmas tu participacion en el partido " +
                      JSON.stringify(
                        data["respuesta"]["partidos"][i]["equipoA"] +
                          " VS " +
                          data["respuesta"]["partidos"][i]["equipoB"]
                      ) +
                      " que se jugará el " +
                      JSON.stringify(
                        data["respuesta"]["partidos"][i]["fechaEnc"]
                      ).substr(0, 11) +
                      '" a las ' +
                      JSON.stringify(data["respuesta"]["partidos"][i]["hora"]) +
                      " en el puesto de Anotador",
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
                              baseURL,
                              {
                                idPartido: JSON.stringify(
                                  data["respuesta"]["partidos"][i][
                                    "idEncuentro"
                                  ]
                                ).replaceAll('"', ""),
                                idArbitro: sid,
                                posicion: "anotador",
                              },
                              configt
                            )
                            .then(function (response) {
                              fetchData();
                              Alert.alert("", "Puesto asignado");
                              console.log(response);
                            })
                            .catch(function (error) {
                              console.log(error);
                            }),
                      },
                    ]
                  )
                }
              >
                <Ionicons name="add-circle" size={35} color="#ff6624" />
              </TouchableOpacity>
            </View>
          );
        } else {
          rowData.push(
            JSON.stringify(data["respuesta"]["partidos"][i]["anotador"])
          );
        }

        //verifica si se cuenta con un juez2
        if (
          JSON.stringify(data["respuesta"]["partidos"][i]["juez2"]) == "null"
        ) {
          rowData.push(
            <View justifyContent="center" alignItems="center">
              <TouchableOpacity
                onPress={() =>
                  Alert.alert(
                    "Atención",
                    "Confirmas tu participacion en el partido " +
                      JSON.stringify(
                        data["respuesta"]["partidos"][i]["equipoA"] +
                          " VS " +
                          data["respuesta"]["partidos"][i]["equipoB"]
                      ) +
                      " que se jugará el " +
                      JSON.stringify(
                        data["respuesta"]["partidos"][i]["fechaEnc"]
                      ).substr(0, 11) +
                      '" a las ' +
                      JSON.stringify(data["respuesta"]["partidos"][i]["hora"]) +
                      " en el puesto de Juez 2",
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
                              baseURL,
                              {
                                idPartido: JSON.stringify(
                                  data["respuesta"]["partidos"][i][
                                    "idEncuentro"
                                  ]
                                ).replaceAll('"', ""),
                                idArbitro: sid,
                                posicion: "juez2",
                              },
                              configt
                            )
                            .then(function (response) {
                              fetchData();
                              Alert.alert("", "Puesto asignado");
                              console.log(response);
                            })
                            .catch(function (error) {
                              console.log(error);
                            }),
                      },
                    ]
                  )
                }
              >
                <Ionicons name="add-circle" size={35} color="#ff6624" />
              </TouchableOpacity>
            </View>
          );
        } else {
          rowData.push(
            JSON.stringify(data["respuesta"]["partidos"][i]["juez2"])
          );
        }

        //verifica si se cuenta con un juez 3
        if (
          JSON.stringify(data["respuesta"]["partidos"][i]["juez3"]) == "null"
        ) {
          rowData.push(
            <View justifyContent="center" alignItems="center">
              <TouchableOpacity
                onPress={() =>
                  Alert.alert(
                    "Atención",
                    "Confirmas tu participacion en el partido " +
                      JSON.stringify(
                        data["respuesta"]["partidos"][i]["equipoA"] +
                          " VS " +
                          data["respuesta"]["partidos"][i]["equipoB"]
                      ) +
                      " que se jugará el " +
                      JSON.stringify(
                        data["respuesta"]["partidos"][i]["fechaEnc"]
                      ).substr(0, 11) +
                      '" a las ' +
                      JSON.stringify(data["respuesta"]["partidos"][i]["hora"]) +
                      " en el puesto de Juez 3",
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
                              baseURL,
                              {
                                idPartido: JSON.stringify(
                                  data["respuesta"]["partidos"][i][
                                    "idEncuentro"
                                  ]
                                ).replaceAll('"', ""),
                                idArbitro: sid,
                                posicion: "juez3",
                              },
                              configt
                            )
                            .then(function (response) {
                              fetchData();
                              Alert.alert("", "Puesto asignado");
                              console.log(response);
                            })
                            .catch(function (error) {
                              console.log(error);
                            }),
                      },
                    ]
                  )
                }
              >
                <Ionicons name="add-circle" size={35} color="#ff6624" />
              </TouchableOpacity>
            </View>
          );
        } else {
          rowData.push(
            JSON.stringify(data["respuesta"]["partidos"][i]["juez3"])
          );
        }
      }
      tableData.push(rowData);
    }
  }

  const tableDataListos = [];
  const datoslistos = [];
  if (data != "") {
    if (sid != 117) {
    } else {
      for (let i = 0; i < 1; i++) {
        const rowDataListos = [];
        for (let j = 0; j < 2; j++) {
          rowDataListos.push(
            JSON.stringify(
              data["respuesta"]["partidos"][5]["equipoA"] +
                " VS " +
                data["respuesta"]["partidos"][5]["equipoB"]
            )
          );
          rowDataListos.push(
            <View alignItems="center">
              <TouchableOpacity onPress={() => onChangeJuegoListo(!juegolisto)}>
                <Ionicons
                  name="checkmark-circle-outline"
                  size={35}
                  color="green"
                />
              </TouchableOpacity>
            </View>
          );
        }
        tableDataListos.push(rowDataListos);
      }
    }
  }
  //console.log(juegolisto);

  const tableDataAsistenciaA = [];
  if (data != "") {
    if (sid != 117) {
    } else {
      usuarios = JSON.stringify(data["respuesta"]["jugadoEA"]);
      num = JSON.parse(usuarios).length;
      console.log(num);

      for (let i = 0; i < num; i++) {
        const rowData = [];
        for (let j = 0; j < 2; j++) {
          rowData.push(
            JSON.stringify(
              data["respuesta"]["jugadoEA"][i]["apellido"] +
                " " +
                data["respuesta"]["jugadoEA"][i]["nombre"]
            )
          );
          rowData.push(
            <View style={styles.IconInput}>
              <TouchableOpacity>
                <Ionicons
                  name="checkmark-circle-outline"
                  size={35}
                  color="green"
                />
              </TouchableOpacity>
              <TouchableOpacity>
                <Ionicons name="checkmark" size={35} color="orange" />
              </TouchableOpacity>
              <TouchableOpacity>
                <Ionicons name="close-circle-outline" size={35} color="red" />
              </TouchableOpacity>
            </View>
          );
        }
        tableDataAsistenciaA.push(rowData);
      }
    }
  }
  const tableDataAsistenciaB = [];

  if (data != "") {
    if (sid != 117) {
    } else {
      usuarios = JSON.stringify(data["respuesta"]["jugadoEB"]);
      num = JSON.parse(usuarios).length;
      console.log(num);

      for (let i = 0; i < num; i++) {
        const rowData = [];
        for (let j = 0; j < 2; j++) {
          rowData.push(
            JSON.stringify(
              data["respuesta"]["jugadoEB"][i]["apellido"] +
                " " +
                data["respuesta"]["jugadoEB"][i]["nombre"]
            )
          );
          rowData.push(
            <View style={styles.IconInput}>
              <TouchableOpacity>
                <Ionicons
                  name="checkmark-circle-outline"
                  size={35}
                  color="green"
                />
              </TouchableOpacity>
              <TouchableOpacity>
                <Ionicons name="checkmark" size={35} color="orange" />
              </TouchableOpacity>
              <TouchableOpacity>
                <Ionicons name="close-circle-outline" size={35} color="red" />
              </TouchableOpacity>
            </View>
          );
        }
        tableDataAsistenciaB.push(rowData);
      }
    }
  }
  const tableDataPos = [];
  const datar = [
    { key: "A", value: "A" },
    { key: "B", value: "B" },
  ];

  const TipoPunto = [
    { key: "1", value: "Tiro libre" },
    { key: "2", value: "Doble" },
    { key: "3", value: "Triple" },
  ];

  const JugadoresA = [];
  if (data != "") {
    if (sid != 117) {
    } else {
      usuarios = JSON.stringify(data["respuesta"]["jugadoEA"]);
      num = JSON.parse(usuarios).length;
      for (let i = 0; i < num; i++) {
        JugadoresA.push({
          key: JSON.stringify(data["respuesta"]["jugadoEA"][i]["idJugador"]),
          value: JSON.stringify(
            data["respuesta"]["jugadoEA"][i]["apellido"] +
              " " +
              data["respuesta"]["jugadoEA"][i]["nombre"]
          ),
        });
      }
    }
  }

  const JugadoresB = [];
  if (data != "") {
    if (sid != 117) {
    } else {
      usuarios = JSON.stringify(data["respuesta"]["jugadoEB"]);
      num = JSON.parse(usuarios).length;
      for (let i = 0; i < num; i++) {
        JugadoresB.push({
          key: JSON.stringify(data["respuesta"]["jugadoEB"][i]["idJugador"]),
          value: JSON.stringify(
            data["respuesta"]["jugadoEB"][i]["apellido"] +
              " " +
              data["respuesta"]["jugadoEB"][i]["nombre"]
          ),
        });
      }
    }
  }

  const Cuarto = [
    { key: "1", value: "1" },
    { key: "2", value: "2" },
    { key: "3", value: "3" },
    { key: "4", value: "4" },
  ];

  const UltimoPunto = [
    { key: "0", value: "NO" },
    { key: "1", value: "SI" },
  ];

  const TipoFalta = [
    { key: "0", value: "Tecnica" },
    { key: "1", value: "Personal" },
    { key: "2", value: "Antideportiva" },
    { key: "3", value: "Descalificante" },
  ];

  const POS = [];

  for (let i = 0; i < 4; i++) {
    const rowDataPos = [];
    for (let j = 0; j < 2; j++) {
      rowDataPos.push(
        <View style={styles.IconInput}>
          <TouchableOpacity>
            <Text>A</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text>B</Text>
          </TouchableOpacity>
        </View>
      );
      rowDataPos.push(
        <View style={styles.IconInput}>
          <TouchableOpacity>
            <Ionicons name="sync" size={35} color="#ff6624" />
          </TouchableOpacity>
          <TouchableOpacity>
            <Ionicons name="trash" size={35} color="#ff6624" />
          </TouchableOpacity>
        </View>
      );
    }
    tableDataPos.push(rowDataPos);
  }

  const tableDataPun = [];

  const dataTPA = [
    { key: "A", value: "A" },
    { key: "B", value: "B" },
  ];

  //console.log(JSON.stringify(data["respuesta"]["cabecera"]["equA"]));

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

          <Text style={styles.titulo}>Arbitro</Text>
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
                {admin == 0 ? (
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
                    <Text style={styles.textcol}>Secretario</Text>
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
          <Text style={styles.Subtitulo}>Disposición Para Partidos</Text>
          {
            //Tabla disposicion
          }
          <View paddingHorizontal={10}>
            <ScrollView horizontal={true}>
              <View>
                <Table borderStyle={{ borderWidth: 1, borderColor: "#000000" }}>
                  <Row
                    data={state.tableHead}
                    widthArr={state.widthArr}
                    style={styles.header}
                    textStyle={styles.text}
                  />
                </Table>

                <Table borderStyle={{ borderWidth: 1, borderColor: "#000000" }}>
                  {tableData.map((rowData, index) => (
                    <Row
                      key={index}
                      data={rowData}
                      widthArr={state.widthArr}
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
            //Fin tabla Disposicion
          }
          <Text style={styles.Subtitulo}>Partidos Listos</Text>
          {
            ///Tabla partidos listos
          }
          <View paddingHorizontal={10}>
            <ScrollView horizontal={true}>
              <View>
                <Table borderStyle={{ borderWidth: 1, borderColor: "#000000" }}>
                  <Row
                    data={state.tableHeadListo}
                    widthArr={state.widthArrListo}
                    style={styles.header}
                    textStyle={styles.text}
                  />
                </Table>

                <Table borderStyle={{ borderWidth: 1, borderColor: "#000000" }}>
                  {tableDataListos.map((rowData, index) => (
                    <Row
                      key={index}
                      data={rowData}
                      widthArr={state.widthArrListo}
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
            ///Fin Tabla partidos listos
          }
          {juegolisto ? (
            <View>
              <Text style={styles.Subtitulo}>Hoja de Anotaciones</Text>
              <Text style={styles.Subtitulo2}>Asistencia Equipo SINERGIA</Text>
              {
                //tabla Asistencia Equipo A
              }
              <View paddingHorizontal={10}>
                <ScrollView horizontal={true}>
                  <View>
                    <Table
                      borderStyle={{ borderWidth: 1, borderColor: "#000000" }}
                    >
                      <Row
                        data={state.tableHeadAsistencia}
                        widthArr={state.widthArrAsistencia}
                        style={styles.header}
                        textStyle={styles.text}
                      />
                    </Table>

                    <Table
                      borderStyle={{ borderWidth: 1, borderColor: "#000000" }}
                    >
                      {tableDataAsistenciaA.map((rowData, index) => (
                        <Row
                          key={index}
                          data={rowData}
                          widthArr={state.widthArrAsistencia}
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
                //Fin tabla asistencia equipoA
              }
              <Text style={styles.Subtitulo2} paddingTop={20}>
                Asistencia Equipo WILL CATS
              </Text>

              {
                //tabla Asistencia Equipo B
              }
              <View paddingHorizontal={10}>
                <ScrollView horizontal={true}>
                  <View>
                    <Table
                      borderStyle={{ borderWidth: 1, borderColor: "#000000" }}
                    >
                      <Row
                        data={state.tableHeadAsistencia}
                        widthArr={state.widthArrAsistencia}
                        style={styles.header}
                        textStyle={styles.text}
                      />
                    </Table>

                    <Table
                      borderStyle={{ borderWidth: 1, borderColor: "#000000" }}
                    >
                      {tableDataAsistenciaB.map((rowData, index) => (
                        <Row
                          key={index}
                          data={rowData}
                          widthArr={state.widthArrAsistencia}
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
                //Fin tabla asistencia equipoB
              }
              <Text style={styles.Subtitulo2}>Posiciones</Text>
              {
                //Tabla Posiciones
              }
              <View paddingHorizontal={10}>
                <ScrollView horizontal={true}>
                  <View>
                    <Table
                      borderStyle={{ borderWidth: 1, borderColor: "#000000" }}
                    >
                      <Row
                        data={state.tableHeadPos}
                        widthArr={state.widthArrPos}
                        style={styles.header}
                        textStyle={styles.text}
                      />
                    </Table>

                    <Table
                      borderStyle={{ borderWidth: 1, borderColor: "#000000" }}
                    >
                      {tableDataPos.map((rowData, index) => (
                        <Row
                          key={index}
                          data={rowData}
                          widthArr={state.widthArrPos}
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
                //Fin tabla Posiciones
              }
              <Text style={styles.TextoLabels}>Posición</Text>
              {
                <SelectList
                  setSelected={(val) => setSelected(val)}
                  data={datar}
                  save="key"
                  placeholder="Seleccionar Posición"
                  search={false}
                />
              }
              <View style={styles.boton}>
                <TouchableOpacity>
                  <Text style={styles.TextoBoton}>Confirmar</Text>
                </TouchableOpacity>
              </View>
              <View>
                <Text style={styles.Subtitulo}>Acciones</Text>
                <View style={styles.IconInput}>
                  <View style={styles.boton}>
                    <TouchableOpacity
                      onPress={() =>
                        onChangeIsEquA(!isEquA) && onChangeIsEquB(false)
                      }
                    >
                      <Text style={styles.TextoBoton}>SINERGIA</Text>
                    </TouchableOpacity>
                  </View>
                  <View style={styles.boton}>
                    <TouchableOpacity
                      onPress={() =>
                        onChangeIsEquA(false) && onChangeIsEquB(!isEquB)
                      }
                    >
                      <Text style={styles.TextoBoton}>WILL CATS</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
              {isEquA ? (
                <View>
                  <Text style={styles.Subtitulo}>SINERGIA</Text>
                  <Text style={styles.Subtitulo2}>Puntos</Text>
                  {
                    //Tabla puntos equipo A
                  }
                  <View paddingHorizontal={10}>
                    <ScrollView horizontal={true}>
                      <View>
                        <Table
                          borderStyle={{
                            borderWidth: 1,
                            borderColor: "#000000",
                          }}
                        >
                          <Row
                            data={state.tableHeadPun}
                            widthArr={state.widthArrPun}
                            style={styles.header}
                            textStyle={styles.text}
                          />
                        </Table>

                        <Table
                          borderStyle={{
                            borderWidth: 1,
                            borderColor: "#000000",
                          }}
                        >
                          {tableDataPun.map((rowData, index) => (
                            <Row
                              key={index}
                              data={rowData}
                              widthArr={state.widthArrPun}
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
                    //Fin tabla puntos A
                  }
                  <Text style={styles.TextoLabels}>Tipo de punto anotado</Text>
                  {
                    <SelectList
                      setSelected={(val) => setSelected(val)}
                      data={TipoPunto}
                      save="key"
                      placeholder="Seleccionar Tipo de Punto"
                      search={false}
                    />
                  }
                  <Text style={styles.TextoLabels}>Jugador</Text>
                  {
                    <SelectList
                      setSelected={(val) => setSelected(val)}
                      data={JugadoresA}
                      save="key"
                      placeholder="Seleccionar Jugador"
                      search={false}
                    />
                  }
                  <Text style={styles.TextoLabels}>Cuarto</Text>
                  {
                    <SelectList
                      setSelected={(val) => setSelected(val)}
                      data={Cuarto}
                      save="key"
                      placeholder="Seleccionar Cuarto"
                      search={false}
                    />
                  }
                  <Text style={styles.TextoLabels}>
                    ¿Es el último punto del cuarto?
                  </Text>
                  {
                    <SelectList
                      setSelected={(val) => setSelected(val)}
                      data={UltimoPunto}
                      save="key"
                      placeholder="Elija Una Opción"
                      search={false}
                    />
                  }
                  <View style={styles.boton}>
                    <TouchableOpacity>
                      <Text style={styles.TextoBoton}>Confirmar Punto</Text>
                    </TouchableOpacity>
                  </View>
                  <Text style={styles.Subtitulo2}>Faltas</Text>
                  {
                    //inicio tabla faltas
                  }
                  <View paddingHorizontal={10}>
                    <ScrollView horizontal={true}>
                      <View>
                        <Table
                          borderStyle={{
                            borderWidth: 1,
                            borderColor: "#000000",
                          }}
                        >
                          <Row
                            data={state.tableHeadFaltas}
                            widthArr={state.widthArrFaltas}
                            style={styles.header}
                            textStyle={styles.text}
                          />
                        </Table>

                        <Table
                          borderStyle={{
                            borderWidth: 1,
                            borderColor: "#000000",
                          }}
                        >
                          {tableDataPun.map((rowData, index) => (
                            <Row
                              key={index}
                              data={rowData}
                              widthArr={state.widthArrFaltas}
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
                    //fin tabla Faltas
                  }
                  <Text style={styles.TextoLabels}>Tipo de Falta</Text>
                  {
                    <SelectList
                      setSelected={(val) => setSelected(val)}
                      data={TipoFalta}
                      save="key"
                      placeholder="Seleccionar Tipo de Falta"
                      search={false}
                    />
                  }
                  <Text style={styles.TextoLabels}>Jugador</Text>
                  {
                    <SelectList
                      setSelected={(val) => setSelected(val)}
                      data={JugadoresA}
                      save="key"
                      placeholder="Seleccionar Jugador"
                      search={false}
                    />
                  }
                  <Text style={styles.TextoLabels}>Cuarto</Text>
                  {
                    <SelectList
                      setSelected={(val) => setSelected(val)}
                      data={Cuarto}
                      save="key"
                      placeholder="Seleccionar Cuarto"
                      search={false}
                    />
                  }
                  <View style={styles.boton}>
                    <TouchableOpacity>
                      <Text style={styles.TextoBoton}>Confirmar Falta</Text>
                    </TouchableOpacity>
                  </View>
                  <Text style={styles.Subtitulo2}>Detenciones</Text>
                  {
                    //Iniciotabla detenciones
                  }
                  <View paddingHorizontal={10}>
                    <ScrollView horizontal={true}>
                      <View>
                        <Table
                          borderStyle={{
                            borderWidth: 1,
                            borderColor: "#000000",
                          }}
                        >
                          <Row
                            data={state.tableHeadDetenciones}
                            widthArr={state.widthArrDetenciones}
                            style={styles.header}
                            textStyle={styles.text}
                          />
                        </Table>

                        <Table
                          borderStyle={{
                            borderWidth: 1,
                            borderColor: "#000000",
                          }}
                        >
                          {tableDataPun.map((rowData, index) => (
                            <Row
                              key={index}
                              data={rowData}
                              widthArr={state.widthArrDetenciones}
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
                    //Fin Tabla detenciones
                  }
                  <Text style={styles.TextoLabels}>Cuarto</Text>
                  {
                    <SelectList
                      setSelected={(val) => setSelected(val)}
                      data={Cuarto}
                      save="key"
                      placeholder="Seleccionar Cuarto"
                      search={false}
                    />
                  }
                  <Text style={styles.TextoLabels}>Mitad o Tiempo Extra</Text>
                  {
                    <SelectList
                      setSelected={(val) => setSelected(val)}
                      data={UltimoPunto}
                      save="key"
                      placeholder="Seleccionar Opción"
                      search={false}
                    />
                  }
                  <View style={styles.boton}>
                    <TouchableOpacity>
                      <Text style={styles.TextoBoton}>Confirmar Detencion</Text>
                    </TouchableOpacity>
                  </View>
                  <View style={styles.IconInput}>
                    <View style={styles.boton}>
                      <TouchableOpacity
                        onPress={() => onChangeJuegoListo(false)}
                      >
                        <Text style={styles.TextoBoton}>Cerrar</Text>
                      </TouchableOpacity>
                    </View>
                    <View style={styles.boton}>
                      <TouchableOpacity
                        onPress={() =>
                          Alert.alert(
                            "Atencion",
                            "Estas por finalizar la hoja de anotacion",
                            [
                              {
                                text: "Cancelar",
                                // onPress: () => console.log("Cancel Pressed"),
                                style: "cancel",
                              },
                              {
                                text: "OK",
                                onPress: () =>
                                  Alert.alert(
                                    "",
                                    "Necesitas completar todo el partido"
                                  ),
                                style: "cancel",
                              },
                            ]
                          )
                        }
                      >
                        <Text style={styles.TextoBoton}>Finalizar Hoja</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              ) : (
                <View>
                  <Text style={styles.Subtitulo}>WILL CATS</Text>
                  <Text style={styles.Subtitulo2}>Puntos</Text>
                  {
                    //Tabla puntos equipo B
                  }
                  <View paddingHorizontal={10}>
                    <ScrollView horizontal={true}>
                      <View>
                        <Table
                          borderStyle={{
                            borderWidth: 1,
                            borderColor: "#000000",
                          }}
                        >
                          <Row
                            data={state.tableHeadPun}
                            widthArr={state.widthArrPun}
                            style={styles.header}
                            textStyle={styles.text}
                          />
                        </Table>

                        <Table
                          borderStyle={{
                            borderWidth: 1,
                            borderColor: "#000000",
                          }}
                        >
                          {tableDataPun.map((rowData, index) => (
                            <Row
                              key={index}
                              data={rowData}
                              widthArr={state.widthArrPun}
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
                    //Fin tabla puntos B
                  }
                  <Text style={styles.TextoLabels}>Tipo de punto anotado</Text>
                  {
                    <SelectList
                      setSelected={(val) => setSelected(val)}
                      data={TipoPunto}
                      save="key"
                      placeholder="Seleccionar Tipo de Punto"
                      search={false}
                    />
                  }
                  <Text style={styles.TextoLabels}>Jugador</Text>
                  {
                    <SelectList
                      setSelected={(val) => setSelected(val)}
                      data={JugadoresB}
                      save="key"
                      placeholder="Seleccionar Jugador"
                      search={false}
                    />
                  }
                  <Text style={styles.TextoLabels}>Cuarto</Text>
                  {
                    <SelectList
                      setSelected={(val) => setSelected(val)}
                      data={Cuarto}
                      save="key"
                      placeholder="Seleccionar Cuarto"
                      search={false}
                    />
                  }
                  <Text style={styles.TextoLabels}>
                    ¿Es el último punto del cuarto?
                  </Text>
                  {
                    <SelectList
                      setSelected={(val) => setSelected(val)}
                      data={UltimoPunto}
                      save="key"
                      placeholder="Elija Una Opción"
                      search={false}
                    />
                  }
                  <View style={styles.boton}>
                    <TouchableOpacity>
                      <Text style={styles.TextoBoton}>Confirmar Punto</Text>
                    </TouchableOpacity>
                  </View>
                  <Text style={styles.Subtitulo2}>Faltas</Text>
                  {
                    //inicio tabla faltas B
                  }
                  <View paddingHorizontal={10}>
                    <ScrollView horizontal={true}>
                      <View>
                        <Table
                          borderStyle={{
                            borderWidth: 1,
                            borderColor: "#000000",
                          }}
                        >
                          <Row
                            data={state.tableHeadFaltas}
                            widthArr={state.widthArrFaltas}
                            style={styles.header}
                            textStyle={styles.text}
                          />
                        </Table>

                        <Table
                          borderStyle={{
                            borderWidth: 1,
                            borderColor: "#000000",
                          }}
                        >
                          {tableDataPun.map((rowData, index) => (
                            <Row
                              key={index}
                              data={rowData}
                              widthArr={state.widthArrFaltas}
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
                    //fin tabla Faltas B
                  }
                  <Text style={styles.TextoLabels}>Tipo de Falta</Text>
                  {
                    <SelectList
                      setSelected={(val) => setSelected(val)}
                      data={TipoFalta}
                      save="key"
                      placeholder="Seleccionar Tipo de Falta"
                      search={false}
                    />
                  }
                  <Text style={styles.TextoLabels}>Jugador</Text>
                  {
                    <SelectList
                      setSelected={(val) => setSelected(val)}
                      data={JugadoresB}
                      save="key"
                      placeholder="Seleccionar Jugador"
                      search={false}
                    />
                  }
                  <Text style={styles.TextoLabels}>Cuarto</Text>
                  {
                    <SelectList
                      setSelected={(val) => setSelected(val)}
                      data={Cuarto}
                      save="key"
                      placeholder="Seleccionar Cuarto"
                      search={false}
                    />
                  }
                  <View style={styles.boton}>
                    <TouchableOpacity>
                      <Text style={styles.TextoBoton}>Confirmar Falta</Text>
                    </TouchableOpacity>
                  </View>
                  <Text style={styles.Subtitulo2}>Detenciones</Text>
                  {
                    //Iniciotabla detenciones
                  }
                  <View paddingHorizontal={10}>
                    <ScrollView horizontal={true}>
                      <View>
                        <Table
                          borderStyle={{
                            borderWidth: 1,
                            borderColor: "#000000",
                          }}
                        >
                          <Row
                            data={state.tableHeadDetenciones}
                            widthArr={state.widthArrDetenciones}
                            style={styles.header}
                            textStyle={styles.text}
                          />
                        </Table>

                        <Table
                          borderStyle={{
                            borderWidth: 1,
                            borderColor: "#000000",
                          }}
                        >
                          {tableDataPun.map((rowData, index) => (
                            <Row
                              key={index}
                              data={rowData}
                              widthArr={state.widthArrDetenciones}
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
                    //Fin Tabla detenciones
                  }
                  <Text style={styles.TextoLabels}>Cuarto</Text>
                  {
                    <SelectList
                      setSelected={(val) => setSelected(val)}
                      data={Cuarto}
                      save="key"
                      placeholder="Seleccionar Cuarto"
                      search={false}
                    />
                  }
                  <Text style={styles.TextoLabels}>Mitad o Tiempo Extra</Text>
                  {
                    <SelectList
                      setSelected={(val) => setSelected(val)}
                      data={UltimoPunto}
                      save="key"
                      placeholder="Seleccionar Opción"
                      search={false}
                    />
                  }
                  <View style={styles.boton}>
                    <TouchableOpacity>
                      <Text style={styles.TextoBoton}>Confirmar Detencion</Text>
                    </TouchableOpacity>
                  </View>
                  <View style={styles.IconInput}>
                    <View style={styles.boton}>
                      <TouchableOpacity
                        onPress={() => onChangeJuegoListo(false)}
                      >
                        <Text style={styles.TextoBoton}>Cerrar</Text>
                      </TouchableOpacity>
                    </View>
                    <View style={styles.boton}>
                      <TouchableOpacity
                        onPress={() =>
                          Alert.alert(
                            "Atencion",
                            "Estas por finalizar la hoja de anotacion",
                            [
                              {
                                text: "Cancelar",
                                // onPress: () => console.log("Cancel Pressed"),
                                style: "cancel",
                              },
                              {
                                text: "OK",
                                onPress: () =>
                                  Alert.alert(
                                    "",
                                    "Necesitas completar todo el partido"
                                  ),
                                style: "cancel",
                              },
                            ]
                          )
                        }
                      >
                        <Text style={styles.TextoBoton}>Finalizar Hoja</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              )}
            </View>
          ) : (
            <View></View>
          )}
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
  Subtitulo2: {
    textAlign: "center",
    fontSize: 24,
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
  menucol: {
    alignItems: "center",
  },
  textcol: {
    fontSize: 22,
    fontWeight: "bold",
  },
});

export default ArbitroScreen;
