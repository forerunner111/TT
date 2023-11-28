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

const baseURL = "http://192.168.31.109:4000/api/secretario";

const SecretarioScreen = () => {
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

  //console.log(respuesta);
  //obtener datos para la tabla validacion de equipos
  const [datosValidar, setDatosValidar] = useState("");
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
      setDatosValidar(response.data);
      // console.log(response.data);
    } catch (error) {
      console.log("Error ", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [respuesta]);

  console.log(JSON.stringify(datosValidar["respuesta"]["equipos"]));

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
                {comis == 4 ? (
                  <TouchableOpacity
                    onPress={() => navigation.navigate("Comision")}
                  >
                    <Text style={styles.textcol}>Comision diciplinaria</Text>
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
            Validacion de equipos
          </Text>
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

export default SecretarioScreen;
