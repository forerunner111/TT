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

const baseURL = "http://192.168.31.109:4000/api/jefe_arbitro";
//const baseURL = "http://10.1.141.191:4000/api/jefe_arbitro";

const JefeScreen = () => {
  const navigation = useNavigation();

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

  const [data, setData] = useState("");
  const [configt, setConfigt] = useState();
  const [sid, setId] = useState();
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
    tableHeadUsuarios: ["Nombre", "Roles", "Validar"],
    widthArrUsuarios: [200, 200, 100],
    tableHeadPartidos: [
      "Num. Torneo",
      "Partido",
      "Ausente",
      "Fecha",
      "Arbitros",
    ],
    widthArrPartidos: [100, 200, 100, 100, 300],
  };
  //tabla
  const tableDataUsuarios = [];

  if (data == "") {
  } else {
    usuarios = JSON.stringify(data["respuesta"]["usuarios"]);
    num = JSON.parse(usuarios).length;
    //console.log(JSON.stringify(data["respuesta"]["usuarios"][0]));
    for (let i = 0; i < num; i++) {
      const rowData = [];
      for (let j = 0; j < 3; j++) {
        /*setId(
          JSON.stringify(
            data["respuesta"]["usuarios"][i]["idUsuario"]
          ).replaceAll('"', "")
        );*/
        rowData.push(
          JSON.stringify(data["respuesta"]["usuarios"][i]["nombreUsu"])
        );
        let roles = [];
        if (JSON.stringify(data["respuesta"]["usuarios"][i]["comision"]) == 3) {
          roles.push(' "Comision" ');
        }
        if (JSON.stringify(data["respuesta"]["usuarios"][i]["arbitro"]) == 4) {
          roles.push(' "Arbitro" ');
        }
        if (
          JSON.stringify(data["respuesta"]["usuarios"][i]["entrenador"]) == 5
        ) {
          roles.push(' "Entrenador" ');
        }
        rowData.push(roles);
        rowData.push(
          <View style={styles.IconInput}>
            <TouchableOpacity
              onPress={() =>
                axios
                  .put(
                    baseURL,
                    {
                      curp: JSON.stringify(
                        data["respuesta"]["usuarios"][i]["idUsuario"]
                      ).replaceAll('"', ""),
                    },
                    configt
                  )
                  .then(function (response) {
                    fetchData();
                    Alert.alert("", "Usuario Validado");
                  })
                  .catch(function (error) {
                    console.log("", "ocurrio un error");
                  })
              }
            >
              <Ionicons
                name="checkmark-circle"
                size={30}
                color="green"
                paddingLeft={1}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                Alert.alert(
                  "Atencion: ",
                  "Seguro que deseas eliminar a: " +
                    JSON.stringify(
                      data["respuesta"]["usuarios"][i]["nombreUsu"]
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
                          .delete(
                            baseURL +
                              "/" +
                              data["respuesta"]["usuarios"][i]["idUsuario"],
                            configt
                          )
                          .then(function (response) {
                            fetchData();
                            Alert.alert("", "Usuario eliminado con exito");
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
              <Ionicons
                name="close-circle"
                size={30}
                color="red"
                paddingLeft={1}
              />
            </TouchableOpacity>
          </View>
        );
      }
      tableDataUsuarios.push(rowData);
    }
  }

  //tabla
  const tableDataPartidos = [];

  if (data == "") {
  } else {
    partidos = JSON.stringify(data["respuesta"]["partidos"]);
    num = JSON.parse(partidos).length;
    //console.log(num);
    for (let i = 0; i < num; i++) {
      const rowData = [];
      for (let j = 0; j < 5; j++) {
        rowData.push(
          JSON.stringify(data["respuesta"]["partidos"][i]["competencia"])
        );
        rowData.push(
          JSON.stringify(data["respuesta"]["partidos"][i]["equipoA"]) +
            " VS " +
            JSON.stringify(data["respuesta"]["partidos"][i]["equipoB"])
        );
        rowData.push(
          JSON.stringify(data["respuesta"]["partidos"][i]["ausente"])
        );
        rowData.push(
          JSON.stringify(data["respuesta"]["partidos"][i]["fecha"]).substr(
            0,
            11
          ) + '"'
        );
        let arbitros = [];
        if (
          JSON.stringify(data["respuesta"]["partidos"][i]["arb1"]) != "null"
        ) {
          arbitros.push(
            "arb1: " +
              JSON.stringify(data["respuesta"]["partidos"][i]["arb1"]) +
              ", "
          );
        }
        if (
          JSON.stringify(data["respuesta"]["partidos"][i]["arb2"]) != "null"
        ) {
          arbitros.push(
            "arb2: " +
              JSON.stringify(data["respuesta"]["partidos"][i]["arb2"]) +
              ", "
          );
        }
        if (
          JSON.stringify(data["respuesta"]["partidos"][i]["arb3"]) != "null"
        ) {
          arbitros.push(
            "arb3: " +
              JSON.stringify(data["respuesta"]["partidos"][i]["arb3"]) +
              ", "
          );
        }
        if (
          JSON.stringify(data["respuesta"]["partidos"][i]["arb4"]) != "null"
        ) {
          arbitros.push(
            "arb4: " +
              JSON.stringify(data["respuesta"]["partidos"][i]["arb4"]) +
              ", "
          );
        }
        if (
          JSON.stringify(data["respuesta"]["partidos"][i]["arb5"]) != "null"
        ) {
          arbitros.push(
            "arb5: " + JSON.stringify(data["respuesta"]["partidos"][i]["arb5"])
          );
        }
        rowData.push(arbitros);
      }
      tableDataPartidos.push(rowData);
    }
  }

  // console.log(JSON.stringify(data));
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

          <Text style={styles.titulo}>Jefe de arbitros</Text>
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
                {arbit == 3 ? (
                  <TouchableOpacity
                    onPress={() => navigation.navigate("Arbitro")}
                  >
                    <Text style={styles.textcol}>Arbitro</Text>
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
                    <Text style={styles.textcol}>Comision disciplinaria</Text>
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
        </View>
        <Text style={styles.Subtitulo}>Validacion de Usuarios</Text>
        {/*Tabla validacion Usuarios*/}
        <View>
          <ScrollView>
            <View>
              <ScrollView horizontal={true}>
                <View>
                  <Table
                    borderStyle={{ borderWidth: 1, borderColor: "#000000" }}
                  >
                    <Row
                      data={state.tableHeadUsuarios}
                      widthArr={state.widthArrUsuarios}
                      style={styles.header}
                      textStyle={styles.text}
                    />
                  </Table>

                  <Table
                    borderStyle={{ borderWidth: 1, borderColor: "#000000" }}
                  >
                    {tableDataUsuarios.map((rowData, index) => (
                      <Row
                        key={index}
                        data={rowData}
                        widthArr={state.widthArrUsuarios}
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
          </ScrollView>
        </View>
        {/*Fin tabla usuarios */}
        <Text style={styles.Subtitulo} paddingTop={30}>
          Partidos Default
        </Text>
        {/*Tabla Partidos*/}
        <View>
          <ScrollView>
            <View>
              <ScrollView horizontal={true}>
                <View>
                  <Table
                    borderStyle={{ borderWidth: 1, borderColor: "#000000" }}
                  >
                    <Row
                      data={state.tableHeadPartidos}
                      widthArr={state.widthArrPartidos}
                      style={styles.header}
                      textStyle={styles.text}
                    />
                  </Table>

                  <Table
                    borderStyle={{ borderWidth: 1, borderColor: "#000000" }}
                  >
                    {tableDataPartidos.map((rowData, index) => (
                      <Row
                        key={index}
                        data={rowData}
                        widthArr={state.widthArrPartidos}
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
          </ScrollView>
        </View>
        {/*Fin tabla Partidos*/}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingTop: 20,
    backgroundColor: "#fff",
  },
  main: {
    alignItems: "center",
    // flex: 1,
    bottom: 10,
    justifyContent: "center",
    // maxWidth: 960,
    //marginHorizontal: "auto",
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

    paddingHorizontal: 10,
  },
  section: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
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

export default JefeScreen;
