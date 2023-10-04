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

export default class PartidosScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tableHead: [
        "Head",
        "Head2",
        "Head3",
        "Head4",
        "Head5",
        "Head6",
        "Head7",
        "Head8",
        "Head9",
      ],
      widthArr: [40, 60, 80, 100, 120, 140, 160, 180, 200],
    };
  }

  render() {
    const state = this.state;
    const tableData = [];
    for (let i = 0; i < 30; i += 1) {
      const rowData = [];
      for (let j = 0; j < 9; j += 1) {
        rowData.push(`${i}${j}`);
      }
      tableData.push(rowData);
    }

    return (
      <View style={styles.container}>
        <Text style={styles.titulo}>Partido</Text>

        <View style={styles.IconInput}>
          <TouchableOpacity>
            <Ionicons name="person-circle-outline" size={35} color="#ff6624" />
          </TouchableOpacity>
          <Text style={styles.TextoLabels}>Iniciar sesión</Text>
        </View>

        <Text style={styles.titulotabla}>Tabla de Posiciones</Text>

        <ScrollView horizontal={true}>
          <View>
            <Table borderStyle={{ borderWidth: 1, borderColor: "#C1C0B9" }}>
              <Row
                data={state.tableHead}
                widthArr={state.widthArr}
                style={styles.header}
                textStyle={styles.text}
              />
            </Table>
            <ScrollView style={styles.dataWrapper}>
              <Table borderStyle={{ borderWidth: 1, borderColor: "#C1C0B9" }}>
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
    backgroundColor: "#537791",
  },
  text: {
    textAlign: "center",
    fontWeight: "100",
  },
  dataWrapper: {
    marginTop: -1,
  },
  row: {
    height: 40,
    backgroundColor: "#E7E6E1",
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
});
