import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from "react-native";
import React, { useEffect } from "react";
import { BarChart, LineChart, PieChart } from "react-native-gifted-charts";
import { StyleSheet } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { SafeAreaView } from "react-native-safe-area-context";
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
import { useState } from "react";
import { Table, TableWrapper, Row } from "react-native-table-component";

const baseURL = "http://192.168.31.109:4000/api/comision";
//const baseURL = "http://10.1.141.191:4000/api/comision";

const ComisionScreen = () => {
  const navigation = useNavigation();

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
  console.log(JSON.stringify(data));

  useEffect(() => {
    fetchData();
  }, [respuesta]);

  this.state = {
    tableHead: [" ", "Nombre", "Equipo", "Faltas Totales"],
    widthArr: [50, 200, 200, 100],
  };
  //tabla
  const tableData = [];

  const [tecnica, setTecnica] = useState(1);
  const [antideportiva, setAntideportiva] = useState(1);
  const [personal, setPersonal] = useState(1);
  const [descalificante, setDescalificante] = useState(1);
  const [nombre, setNombre] = useState("");

  if (data == "") {
  } else {
    usuarios = JSON.stringify(data["jugadoresConFaltas"]);
    num = JSON.parse(usuarios).length;
    //console.log(num);

    for (let i = 0; i < num; i++) {
      const rowData = [];
      for (let j = 0; j < 4; j++) {
        rowData.push(
          <TouchableOpacity
            onPress={() =>
              axios
                .get(
                  baseURL +
                    "/" +
                    JSON.stringify(
                      data["jugadoresConFaltas"][i]["idUsuario"]
                    ).replaceAll('"', ""),
                  configt
                )
                .then(function (response) {
                  faltas = JSON.stringify(response.data);

                  setTecnica(
                    JSON.parse(response.data["faltasJugador"][0]["faltasT"])
                  );
                  setAntideportiva(
                    JSON.parse(response.data["faltasJugador"][0]["faltasA"])
                  );
                  setPersonal(
                    JSON.parse(response.data["faltasJugador"][0]["faltasP"])
                  );
                  setDescalificante(
                    JSON.parse(response.data["faltasJugador"][0]["faltasD"])
                  );
                  setNombre(
                    JSON.stringify(
                      response.data["faltasJugador"][0]["nombreUsu"]
                    )
                  );
                })
                .catch(function (error) {
                  console.log(JSON.stringify(error));
                })
            }
          >
            <View>
              <Ionicons
                name="checkmark-outline"
                size={35}
                color="#ff6626"
                paddingLeft={5}
              />
            </View>
          </TouchableOpacity>
        );
        rowData.push(
          JSON.stringify(data["jugadoresConFaltas"][i]["nombreUsu"])
        );
        rowData.push(
          JSON.stringify(data["jugadoresConFaltas"][i]["nombreEqu"])
        );
        rowData.push(JSON.stringify(data["jugadoresConFaltas"][i]["faltasT"]));
      }
      tableData.push(rowData);
    }
  }

  const datar = [
    { value: tecnica, text: tecnica, color: "green" },
    { value: personal, text: personal, color: "orange" },
    { value: antideportiva, text: antideportiva, color: "purple" },
    { value: descalificante, text: descalificante, color: "red" },
  ];

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

          <Text style={styles.titulo}>Comision disciplinaria</Text>
          <Text></Text>
          <Text></Text>
        </View>
      </View>

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
                <TouchableOpacity onPress={() => navigation.navigate("Admin")}>
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
                  <Text style={styles.textcol}>Jefe de Arbitros</Text>
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
      <View paddingTop={5}>
        <View style={styles.main}>
          <Text style={styles.Subtitulo}>Faltas Cometidas </Text>
          <View paddingTop={20}>
            <PieChart
              data={datar}
              donut
              focusOnPress
              showText
              textColor="black"
              centerLabelComponent={() => {
                return (
                  <View>
                    <TextInput
                      value={nombre}
                      //placeholder={nombre}
                      disableInput={true}
                    />
                  </View>
                );
              }}
            />
          </View>
        </View>
        <View>
          <View style={styles.section}>
            <Ionicons name="square" size={35} color="green" />
            <Text> Tecnica </Text>
            <Ionicons name="square" size={35} color="purple" paddingLeft={10} />
            <Text> Antideportiva </Text>
          </View>
          <View style={styles.section}>
            <Ionicons name="square" size={35} color="orange" />
            <Text> Personal</Text>
            <Ionicons name="square" size={35} color="red" paddingLeft={10} />
            <Text> Descalificante</Text>
          </View>
        </View>
      </View>
      <ScrollView horizontal={true}>
        <View paddingHorizontal={10}>
          <View>
            <Table borderStyle={{ borderWidth: 1, borderColor: "#000000" }}>
              <Row
                data={state.tableHead}
                widthArr={state.widthArr}
                style={styles.header}
                textStyle={styles.text}
              />
            </Table>
          </View>
          <ScrollView>
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
            <Text paddingTop={200} marginTop={400}></Text>
          </ScrollView>
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

export default ComisionScreen;
