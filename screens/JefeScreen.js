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
import {
  Collapse,
  CollapseHeader,
  CollapseBody,
  AccordionList,
} from "accordion-collapse-react-native";
import { useNavigation } from "@react-navigation/native";

const JefeScreen = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <View style={styles.IconInput}>
          <TouchableOpacity onPress={() => setIsOpen(!isOpen)}>
            <Ionicons name="exit" size={35} color="#000000" />
          </TouchableOpacity>

          <Text style={styles.titulo}>Jefe de arbitro</Text>
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
              <TouchableOpacity onPress={() => navigation.navigate("Admin")}>
                <Text style={styles.textcol}>Administrador</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigation.navigate("Entrenador")}
              >
                <Text style={styles.textcol}>Entrenador</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.navigate("Comision")}>
                <Text style={styles.textcol}>Comision diciplinaria</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.navigate("Jefe")}>
                <Text style={styles.textcol}>Jefe de Arbitros</Text>
              </TouchableOpacity>
            </CollapseBody>
          </Collapse>
        </View>
        <Text style={styles.Subtitulo}>Validacion de Usuarios</Text>
        <View paddingHorizontal={10}>
          <ScrollView horizontal={true}>
            <Table borderStyle={{ borderWidth: 1, borderColor: "#000000" }}>
              <Row
                data={["Nombre", "Roles", "Validar"]}
                widthArr={[150, 150, 150]}
                style={styles.header}
                textStyle={styles.text}
              />
              <Row
                data={[["Juan"], ["Secretarios"], ["04/10/2023"]]}
                widthArr={[150, 150, 150]}
                style={styles.row}
                textStyle={styles.text}
              />
              <Row
                data={[["F"], ["Venados vs Red Sox"], ["04/10/2023"]]}
                widthArr={[150, 150, 150]}
                style={styles.row}
                textStyle={styles.text}
              />
            </Table>
          </ScrollView>
        </View>
        <Text style={styles.Subtitulo} paddingTop={30}>
          Partidos Default
        </Text>
        <View paddingHorizontal={10}>
          <ScrollView horizontal={true}>
            <Table borderStyle={{ borderWidth: 1, borderColor: "#000000" }}>
              <Row
                data={["Nombre", "Roles", "Validar"]}
                widthArr={[150, 150, 150]}
                style={styles.header}
                textStyle={styles.text}
              />
              <Row
                data={[["Juan"], ["Secretarios"], ["04/10/2023"]]}
                widthArr={[150, 150, 150]}
                style={styles.row}
                textStyle={styles.text}
              />
              <Row
                data={[["F"], ["Venados vs Red Sox"], ["04/10/2023"]]}
                widthArr={[150, 150, 150]}
                style={styles.row}
                textStyle={styles.text}
              />
            </Table>
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

export default JefeScreen;
