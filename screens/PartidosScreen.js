import { View, Text, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import { StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Table, TableWrapper, Row } from "react-native-table-component";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import axios, { formToJSON } from "axios";
import jwt_decode from "jwt-decode";

const baseURL = "http://192.168.31.109:4000/api/main";

const PartidosScreen = () => {
  const navigation = useNavigation();
  const [datos, setDatos] = useState("");
  const [estF, onChangeestF] = useState(false);
  const tableData = [];
  const tableDataEstF = [];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(baseURL);
        setDatos(response.data);
      } catch (error) {
        console.error("Error al obtener los datos de la base de datos");
      }
    };
    fetchData();
  }, []);
  console.log(JSON.stringify(datos["respuesta"]));

  this.state = {
    tableHead: ["Pos", "Equipo", "Rama", "JJ", "JG", "JP"],
    tableEstF: [
      "Lugar",
      "Jugador",
      "Equipo",
      "Rama",
      "Tiros Libres",
      "Puntos dobles",
      "Puntos Triples",
      "Total Puntos",
      "Juegos jugados",
    ],
    widthArr: [40, 200, 40, 40, 40, 40],
    widthArrEstF: [60, 100, 100, 60, 60, 60, 60, 60, 60],
  };

  if (datos == "") {
  } else {
    equiPosicion = JSON.stringify(datos["respuesta"]["equiPosiciones"]);
    num = JSON.parse(equiPosicion).length;

    for (let i = 0; i < num; i += 1) {
      const rowData = [];
      for (let j = 0; j < 6; j += 1) {
        rowData.push(i + 1);
        rowData.push(
          JSON.stringify(
            datos["respuesta"]["equiPosiciones"][i]["NombreEquipo"]
          )
        );
        rowData.push(
          JSON.stringify(datos["respuesta"]["equiPosiciones"][i]["rama"])
        );
        rowData.push(
          '"' +
            JSON.stringify(
              datos["respuesta"]["equiPosiciones"][i]["JuegosJugados"]
            ) +
            '"'
        );
        rowData.push(
          JSON.stringify(
            datos["respuesta"]["equiPosiciones"][i]["JuegosGanados"]
          )
        );
        rowData.push(
          JSON.stringify(
            datos["respuesta"]["equiPosiciones"][i]["JuegosPerdidos"]
          )
        );
      }
      tableData.push(rowData);
    }
  }

  if (datos == "") {
  } else {
    estFem = JSON.stringify(datos["respuesta"]["estFem"]);
    numF = JSON.parse(estFem).length;
    // hola = JSON.stringify(datos["respuesta"]["estFem"][0]["NombreJugador"]);
    // console.log(hola);

    for (let i = 0; i < numF; i += 1) {
      const rowDataEstF = [];
      for (let j = 0; j < 9; j += 1) {
        rowDataEstF.push(i + 1);
        rowDataEstF.push(
          JSON.stringify(datos["respuesta"]["estFem"][i]["NombreJugador"])
        );
        rowDataEstF.push(
          JSON.stringify(datos["respuesta"]["estFem"][i]["Equipo"])
        );
        rowDataEstF.push('"F"');
        rowDataEstF.push(JSON.stringify(datos["respuesta"]["estFem"][i]["PL"]));
        rowDataEstF.push(JSON.stringify(datos["respuesta"]["estFem"][i]["PD"]));
        rowDataEstF.push(JSON.stringify(datos["respuesta"]["estFem"][i]["PT"]));
        rowDataEstF.push(
          '"' + JSON.stringify(datos["respuesta"]["estFem"][i]["TP"]) + '"'
        );
        rowDataEstF.push(
          '"' + JSON.stringify(datos["respuesta"]["estFem"][i]["JJ"]) + '"'
        );
      }
      tableDataEstF.push(rowDataEstF);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Partido</Text>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.IconInput}>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate("Login")}
          >
            <Ionicons name="person-circle-outline" size={35} color="#ff6624" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate("Login")}
          >
            <Text style={styles.TextoLabels}>Iniciar sesión</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.titulotabla}>Tabla de Posiciones</Text>
        <View>
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
              <ScrollView>
                <Table borderStyle={{ borderWidth: 1, borderColor: "#000000" }}>
                  {tableData.map((rowData, index) => (
                    <Row
                      key={index}
                      data={rowData}
                      widthArr={state.widthArr}
                      style={styles.row}
                      textStyle={styles.text}
                    />
                  ))}
                </Table>
              </ScrollView>
            </View>
          </ScrollView>
        </View>
        <View>
          <Text style={styles.titulotabla2}>Estadisticas jugadores</Text>
          <View>
            {
              //estadisticas inicio
            }
            <ScrollView horizontal={true}>
              <View>
                <Table borderStyle={{ borderWidth: 1, borderColor: "#000000" }}>
                  <Row
                    data={state.tableEstF}
                    widthArr={state.widthArrEstF}
                    style={styles.header}
                    textStyle={styles.text}
                  />
                </Table>
                <ScrollView>
                  <Table
                    borderStyle={{ borderWidth: 1, borderColor: "#000000" }}
                  >
                    {tableDataEstF.map((rowData, index) => (
                      <Row
                        key={index}
                        data={rowData}
                        widthArr={state.widthArrEstF}
                        style={styles.row}
                        textStyle={styles.text}
                      />
                    ))}
                  </Table>
                </ScrollView>
              </View>
            </ScrollView>
          </View>
          {
            //estadisticas fin
          }
        </View>
        <View>
          <Text style={styles.titulotabla2}>Horario de partidos</Text>
        </View>
        <View>
          <ScrollView horizontal={true}>
            <View>
              <Table borderStyle={{ borderWidth: 1, borderColor: "#000000" }}>
                <Row
                  data={["Rama", "Partido", "Fecha", "Hora"]}
                  widthArr={[150, 150, 150, 150]}
                  style={styles.header}
                  textStyle={styles.text}
                />
              </Table>
              <ScrollView>
                <Table borderStyle={{ borderWidth: 1, borderColor: "#000000" }}>
                  <Row
                    data={[
                      ["F"],
                      ["Dodgers vs Tomateros"],
                      ["04/10/2023"],
                      ["7:30pm"],
                    ]}
                    widthArr={[150, 150, 150, 150]}
                    style={styles.row}
                    textStyle={styles.text}
                  />
                  <Row
                    data={[
                      ["F"],
                      ["Venados vs Red Sox"],
                      ["04/10/2023"],
                      ["8:30pm"],
                    ]}
                    widthArr={[150, 150, 150, 150]}
                    style={styles.row}
                    textStyle={styles.text}
                  />
                </Table>
              </ScrollView>
            </View>
          </ScrollView>
        </View>
        <TouchableOpacity style={styles.boton}>
          <Text style={styles.TextoBoton}>Descargar horarios</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Home")}>
          <Text style={styles.titulo}>Regresar</Text>
        </TouchableOpacity>
        <View paddingTop={50}></View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingTop: 30,
    backgroundColor: "#fff",
  },
  header: {
    height: 50,
    backgroundColor: "#ff6624",
  },
  text: {
    textAlign: "center",
    //fontWeight: "200",
  },
  dataWrapper: {
    marginTop: -1,
  },
  row: {
    height: 40,
    backgroundColor: "#ffffff",
  },
  titulo: {
    textAlign: "center",
    fontSize: 34,
    fontWeight: "bold",
    color: "#ff6624",
  },
  IconInput: {
    flexDirection: "row",
    alignItems: "center",
  },
  boton: {
    fontSize: 55,
    backgroundColor: "#ff6624",
    borderRadius: 5,
    marginVertical: 7,
    paddingHorizontal: 10,
    height: 50,
  },
  TextoLabels: {
    color: "#ff6624",
    fontSize: 28,
    fontWeight: "bold",
  },
  titulotabla: {
    textAlign: "center",
    fontSize: 34,
    fontWeight: "bold",
    color: "#000000",
  },
  titulotabla2: {
    textAlign: "center",
    fontSize: 34,
    fontWeight: "bold",
    color: "#000000",
    paddingVertical: 20,
  },
  btn: { width: 58, height: 18, backgroundColor: "#78B7BB", borderRadius: 2 },
  btnText: { textAlign: "center", color: "#fff" },
  TextoBoton: {
    fontSize: 33,
    textAlign: "center",
    color: "#ffffff",
    fontWeight: "bold",
  },
});

export default PartidosScreen;
