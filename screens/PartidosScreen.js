import React, { Component } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Table, TableWrapper, Row } from "react-native-table-component";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";

export default class PartidosScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tableHead: [
        "Num",
        "Equipo",
        "Rama",
        "JJ",
        "JG",
        "JP",
        "PF",
        "PC",
        "DIF",
        "PTS",
      ],
      widthArr: [40, 200, 40, 40, 40, 40, 40, 40, 40, 40],
    };
  }

  render() {
    const state = this.state;
    const tableData = [];
    for (let i = 0; i < 10; i += 1) {
      const rowData = [];
      for (let j = 0; j < 10; j += 1) {
        rowData.push(`${i}${j}`);
      }
      tableData.push(rowData);
    }
    return (
      <View style={styles.container}>
        <Text style={styles.titulo}>Partido</Text>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.IconInput}>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate("Login")}
            >
              <Ionicons
                name="person-circle-outline"
                size={35}
                color="#ff6624"
              />
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
                  <Table
                    borderStyle={{ borderWidth: 1, borderColor: "#000000" }}
                  >
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
                  <Table
                    borderStyle={{ borderWidth: 1, borderColor: "#000000" }}
                  >
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
          <View style={styles.boton}>
            <Text style={styles.TextoBoton}>Descargar horarios</Text>
          </View>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate("Home")}
          >
            <Text style={styles.titulo}>Regresar</Text>
          </TouchableOpacity>
          <View paddingTop={50}></View>
        </ScrollView>
      </View>
    );
  }
}

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
    fontWeight: "200",
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
