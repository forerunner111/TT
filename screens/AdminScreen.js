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

const baseURL = "http://192.168.31.109:4000/api/admin";
//const baseURL = "http://10.1.141.191:4000/api/admin";

const AdminScreen = () => {
  const navigation = useNavigation();
  const [modoActualizar, onChangeModoActualizar] = React.useState(true);

  //Nuevo registro
  const [nombre, onChangeNombre] = useState("");
  const [email, onChangeEmail] = useState("");
  const [apellidoP, onChangeApellidoP] = useState("");
  const [telefono, onChangeTelefono] = useState("");
  const [curp, onChangeCURP] = useState("");
  const [Contraseña, onChangePassword] = React.useState("");
  const [modoPassword, onChangemodoPassword] = React.useState(true);
  const [colonia, onChangeColonia] = useState("");
  const [direccion, onChangeDireccion] = useState("");
  const [numArbitro, onChangeNumArbitro] = useState("");

  const [isComision, setComision] = useState(false);
  const [isEntrenador, setEntrenador] = useState(false);
  const [isArbitro, setArbitro] = useState(false);
  const [isJefe, setIsJefe] = useState(false);
  const [isSecretario, setSecretario] = useState(false);

  //Actualizar Registro
  const [Anombre, onChangeANombre] = useState("");
  const [Aemail, onChangeAEmail] = useState("");
  const [AapellidoP, onChangeAApellidoP] = useState("");
  const [Atelefono, onChangeATelefono] = useState("");
  const [Acolonia, onChangeAColonia] = useState("");
  const [Adireccion, onChangeADireccion] = useState("");
  const [AnumArbitro, onChangeANumArbitro] = useState("");

  const [AisComision, setAComision] = useState(true);
  const [AisEntrenador, setAEntrenador] = useState(false);
  const [AisArbitro, setAArbitro] = useState(false);

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
    tableHead: ["Nombre", "Roles", "Acciones"],
    widthArr: [200, 200, 100],
  };
  //tabla
  const tableData = [];

  if (data == "") {
  } else {
    usuarios = JSON.stringify(data["usuarios"]);
    num = JSON.parse(usuarios).length;
    //console.log(num);
    for (let i = 0; i < num; i++) {
      const rowData = [];
      for (let j = 0; j < 3; j++) {
        // console.log(JSON.stringify(data["usuarios"][i]["idUsuario"]));
        // setId(JSON.stringify(data["usuarios"][i]["idUsuario"]));
        rowData.push(JSON.stringify(data["usuarios"][i]["nombreUsu"]));
        let roles = [];
        if (JSON.stringify(data["usuarios"][i]["admin"]) != "null") {
          roles.push(' "Administrador" ');
        }
        if (JSON.stringify(data["usuarios"][i]["secretario"]) != "null") {
          roles.push(' "Secretario" ');
        }
        if (JSON.stringify(data["usuarios"][i]["jefe"]) != "null") {
          roles.push(' "Jefe de Arbitros" ');
        }
        if (JSON.stringify(data["usuarios"][i]["comision"]) != "null") {
          roles.push(' "Comision Diciplinaria" ');
        }
        if (JSON.stringify(data["usuarios"][i]["arbitro"]) != "null") {
          roles.push(' "Arbitro" ');
        }
        if (JSON.stringify(data["usuarios"][i]["entrenador"]) != "null") {
          roles.push(' "Entrenador" ');
        }
        rowData.push(roles);
        rowData.push(
          <View style={styles.IconInput}>
            <TouchableOpacity
              onPress={() =>
                Alert.alert(
                  "Atencion: ",
                  "Seguro que deseas eliminar a: " +
                    JSON.stringify(data["usuarios"][i]["nombreUsu"]),
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
                            baseURL + "/" + data["usuarios"][i]["idUsuario"],
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
                name="trash"
                size={30}
                color="#ff6624"
                paddingLeft={10}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                axios
                  .get(
                    baseURL + "/" + data["usuarios"][i]["idUsuario"],
                    configt
                  )
                  .then(function (response) {
                    /*console.log(
                      JSON.stringify(
                        response["data"]["respuesta"]["usuario"]["nombreUsu"]
                      )
                    );*/
                    setId("/" + data["usuarios"][i]["idUsuario"]);
                    onChangeModoActualizar(false);
                    onChangeANombre(
                      JSON.stringify(
                        response["data"]["respuesta"]["usuario"]["nombreUsu"]
                      ).replaceAll('"', "")
                    );
                    onChangeAApellidoP(
                      JSON.stringify(
                        response["data"]["respuesta"]["usuario"]["apellidoP"]
                      ).replaceAll('"', "")
                    );
                    onChangeAEmail(
                      JSON.stringify(
                        response["data"]["respuesta"]["usuario"]["email"]
                      ).replaceAll('"', "")
                    );

                    console.log(
                      JSON.stringify(
                        response["data"]["respuesta"]["roles"][0]["entrenador"]
                      )
                    );
                    if (
                      JSON.stringify(
                        response["data"]["respuesta"]["roles"][0]["entrenador"]
                      ) != "null"
                    ) {
                      setAEntrenador(true);
                      onChangeATelefono(
                        JSON.stringify(
                          response["data"]["respuesta"]["entrenador"][0][
                            "numeroTel"
                          ]
                        ).replaceAll('"', "")
                      );
                      onChangeAColonia(
                        JSON.stringify(
                          response["data"]["respuesta"]["entrenador"][0][
                            "colonia"
                          ]
                        ).replaceAll('"', "")
                      );
                      onChangeADireccion(
                        JSON.stringify(
                          response["data"]["respuesta"]["entrenador"][0][
                            "direccion"
                          ]
                        ).replaceAll('"', "")
                      );
                    } else {
                      onChangeATelefono("");
                      onChangeAColonia("");
                      onChangeADireccion("");
                      setAEntrenador(false);
                    }

                    if (
                      JSON.stringify(
                        response["data"]["respuesta"]["roles"][0]["arbitro"]
                      ) != "null"
                    ) {
                      setAArbitro(true);
                      onChangeANumArbitro(
                        JSON.stringify(
                          response["data"]["respuesta"]["arbitro"][0][
                            "numeroArb"
                          ]
                        ).replaceAll('"', "")
                      );
                    } else {
                      setAArbitro(false);
                      onChangeANumArbitro("");
                    }
                  })
                  .catch(function (error) {
                    console.log(error);
                  })
              }
            >
              <Ionicons
                name="refresh"
                size={30}
                color="#ff6624"
                paddingLeft={10}
              />
            </TouchableOpacity>
          </View>
        );
      }
      tableData.push(rowData);
    }
  }

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

          <Text style={styles.titulo}>Administrador</Text>
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
                {/*arbit == 3 ? (
                  <TouchableOpacity
                    onPress={() => navigation.navigate("Arbitro")}
                  >
                    <Text style={styles.textcol}>Árbitro</Text>
                  </TouchableOpacity>
                ) : (
                  <View></View>
                )*/}
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
        </View>
        <Text style={styles.Subtitulo} paddingTop={10}>
          Usuarios
        </Text>
        <View alignItems="space-between" marginRight={10}>
          <TouchableOpacity
            style={styles.boton}
            onPress={() => onChangeModoActualizar(true)}
          >
            <Text style={styles.TextoBoton}>Nuevo Registro</Text>
          </TouchableOpacity>
        </View>
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
        <View>
          {modoActualizar ? (
            /*<View style={styles.container2}>
              <Text style={styles.Subtitulo} paddingTop={10}>
                Agregar usuario
              </Text>
              <View style={styles.section}>
                <Checkbox
                  style={styles.checkbox}
                  value={isComision}
                  onValueChange={setComision}
                  color={isComision ? "#ff6624" : undefined}
                />
                <Text style={styles.paragraph}>Comisión Diciplinaria</Text>
              </View>
              <View style={styles.section}>
                <Checkbox
                  style={styles.checkbox}
                  value={isEntrenador}
                  onValueChange={setEntrenador}
                  color={isEntrenador ? "#ff6624" : undefined}
                />
                <Text style={styles.paragraph}>Entrenador</Text>
              </View>
              <View style={styles.section}>
                <Checkbox
                  style={styles.checkbox}
                  value={isArbitro}
                  onValueChange={setArbitro}
                  color={isArbitro ? "#ff6624" : undefined}
                />
                <Text style={styles.paragraph}>Árbitro</Text>
              </View>
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
              <Text style={styles.TextoLabels}>Email</Text>
              <TextInput
                style={styles.input}
                onChangeText={onChangeEmail}
                value={email}
                placeholder="ejemplo@email.com"
              />

              <Text style={styles.TextoLabels}>Contraseña</Text>
              <View style={styles.input}>
                <View style={styles.IconInput}>
                  <TextInput
                    secureTextEntry={modoPassword}
                    onChangeText={onChangePassword}
                    value={Contraseña}
                    placeholder="••••••••••"
                  />
                  <TouchableOpacity
                    onPress={() => onChangemodoPassword(!modoPassword)}
                  >
                    {modoPassword ? (
                      <Ionicons name="eye" size={30} color="#ff6624" />
                    ) : (
                      <Ionicons name="eye-off" size={30} color="#ff6624" />
                    )}
                  </TouchableOpacity>
                </View>
              </View>
              <Text style={styles.TextoLabels}>Telefono</Text>
              <TextInput
                style={styles.input}
                onChangeText={onChangeTelefono}
                value={telefono}
                placeholder="##########"
                keyboardType="numeric"
                maxLength={10}
              />
              <Text style={styles.TextoLabels}>Colonia</Text>
              <TextInput
                style={styles.input}
                onChangeText={onChangeColonia}
                value={colonia}
                placeholder="Colonia"
              />
              <Text style={styles.TextoLabels}>Direccion</Text>
              <TextInput
                style={styles.input}
                onChangeText={onChangeDireccion}
                value={direccion}
                placeholder="Direccion"
              />
              <Text style={styles.TextoLabels}>Numero de arbitro</Text>
              <TextInput
                style={styles.input}
                onChangeText={onChangeNumArbitro}
                value={numArbitro}
                placeholder="Numero de arbitro"
                maxLength={2}
                keyboardType="numeric"
              />
              <View style={styles.boton}>
                <TouchableOpacity /*onPress={() => navigation.navigate("Home")}*/
            /*  >
                  <Text style={styles.TextoBoton}>Registrar</Text>
                </TouchableOpacity>
              </View>
            </View>*/
            <View style={styles.container2}>
              <Text style={styles.Subtitulo} paddingTop={10}>
                Agregar usuario
              </Text>
              <View>
                <Text style={styles.TextoLabels}>Seleccione un rol</Text>
              </View>
              <View style={styles.section}>
                <Checkbox
                  style={styles.checkbox}
                  value={isSecretario}
                  onValueChange={setSecretario}
                  color={isSecretario ? "#ff6624" : undefined}
                />
                <Text style={styles.paragraph}>Secretario de liga</Text>
              </View>
              <View style={styles.section}>
                <Checkbox
                  style={styles.checkbox}
                  value={isJefe}
                  onValueChange={setIsJefe}
                  color={isJefe ? "#ff6624" : undefined}
                />
                <Text style={styles.paragraph}>Jefe de árbitro</Text>
              </View>
              <View style={styles.section}>
                <Checkbox
                  style={styles.checkbox}
                  value={isComision}
                  onValueChange={setComision}
                  color={isComision ? "#ff6624" : undefined}
                />
                <Text style={styles.paragraph}>Comisión Disciplinaria</Text>
              </View>
              <View style={styles.section}>
                <Checkbox
                  style={styles.checkbox}
                  value={isEntrenador}
                  onValueChange={setEntrenador}
                  color={isEntrenador ? "#ff6624" : undefined}
                />
                <Text style={styles.paragraph}>Entrenador</Text>
              </View>
              <View style={styles.section}>
                <Checkbox
                  style={styles.checkbox}
                  value={isArbitro}
                  onValueChange={setArbitro}
                  color={isArbitro ? "#ff6624" : undefined}
                />
                <Text style={styles.paragraph}>Árbitro</Text>
              </View>
              <View>
                {isArbitro ||
                isComision ||
                isEntrenador ||
                isJefe ||
                isSecretario ? (
                  <View>
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
                    <Text style={styles.TextoLabels}>Email</Text>
                    <TextInput
                      style={styles.input}
                      onChangeText={onChangeEmail}
                      value={email}
                      placeholder="ejemplo@email.com"
                    />

                    <Text style={styles.TextoLabels}>Contraseña</Text>
                    <View style={styles.input}>
                      <View style={styles.IconInput}>
                        <TextInput
                          value={Contraseña}
                          placeholder="••••••••••"
                          secureTextEntry={modoPassword}
                          onChangeText={onChangePassword}
                          maxLength={25}
                        />
                        <TouchableOpacity
                          onPress={() => onChangemodoPassword(!modoPassword)}
                        >
                          {modoPassword ? (
                            <Ionicons name="eye" size={30} color="#ff6624" />
                          ) : (
                            <Ionicons
                              name="eye-off"
                              size={30}
                              color="#ff6624"
                            />
                          )}
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                ) : (
                  <View></View>
                )}
              </View>

              <View>
                {isEntrenador ? (
                  <View>
                    <Text style={styles.TextoLabels}>Telefono</Text>
                    <TextInput
                      style={styles.input}
                      onChangeText={onChangeTelefono}
                      value={telefono}
                      placeholder="##########"
                      keyboardType="numeric"
                      maxLength={10}
                    />

                    <Text style={styles.TextoLabels}>Colonia</Text>
                    <TextInput
                      style={styles.input}
                      onChangeText={onChangeColonia}
                      value={colonia}
                      placeholder="Colonia"
                    />
                    <Text style={styles.TextoLabels}>Dirección</Text>
                    <TextInput
                      style={styles.input}
                      onChangeText={onChangeDireccion}
                      value={direccion}
                      placeholder="Direccion"
                    />
                  </View>
                ) : (
                  <View>
                    <Text></Text>
                  </View>
                )}
              </View>
              <View>
                {isArbitro ? (
                  <View>
                    <Text style={styles.TextoLabels}>Número de árbitro</Text>
                    <TextInput
                      style={styles.input}
                      onChangeText={onChangeNumArbitro}
                      value={numArbitro}
                      placeholder="##"
                      maxLength={2}
                      keyboardType="numeric"
                    />
                  </View>
                ) : (
                  <View></View>
                )}
              </View>
              <View>
                {isArbitro ||
                isComision ||
                isEntrenador ||
                isJefe ||
                isSecretario ? (
                  <View style={styles.boton}>
                    <TouchableOpacity
                      onPress={() =>
                        //navigation.navigate("Login") &&
                        axios
                          .post(
                            baseURL,
                            {
                              curp: curp,
                              nombre: nombre,
                              apellidoP: apellidoP,
                              email: email,
                              contrasena: Contraseña,
                              numeroTel: telefono,
                              direccion: direccion,
                              colonia: colonia,
                              numeroArb: numArbitro,
                              comision: isComision,
                              entrenador: isEntrenador,
                              arbitro: isArbitro,
                              secretario: isSecretario,
                              jefe: isJefe,
                            },
                            configt
                          )
                          .then(function (response) {
                            // console.log(response);
                            Alert.alert(
                              "Mensaje: ",
                              "Ususaio creado con exito"
                            );
                            onChangeNombre("");
                            onChangeEmail("");
                            onChangeApellidoP("");
                            onChangeTelefono("");
                            onChangeCURP("");
                            onChangePassword("");
                            // onChangemodoPassword(true);
                            onChangeColonia("");
                            onChangeDireccion("");
                            onChangeNumArbitro("");

                            setComision(false);
                            setEntrenador(false);
                            setArbitro(false);
                            setIsJefe(false);
                            setSecretario(false);

                            fetchData();
                            fetchData();
                          })
                          .catch(function (error) {
                            console.log(error);
                            Alert.alert(
                              "Error: ",
                              JSON.stringify(error["message"])
                            );
                          })
                      }
                    >
                      <Text style={styles.TextoBoton}>Registrarse</Text>
                    </TouchableOpacity>
                  </View>
                ) : (
                  <View alignItems={"center"}>
                    <Text style={styles.TextoLabels}>
                      Elije un rol para poder registrarte
                    </Text>
                  </View>
                )}
              </View>
            </View>
          ) : (
            <View style={styles.container2}>
              <Text style={styles.Subtitulo} paddingTop={10}>
                Actualizar Usuario
              </Text>
              {AisComision || AisArbitro || AisEntrenador ? (
                <View>
                  <Text style={styles.TextoLabels}>Nombre</Text>
                  <TextInput
                    style={styles.input}
                    onChangeText={onChangeANombre}
                    value={Anombre}
                    placeholder="Nombre"
                  />
                  <Text style={styles.TextoLabels}>Apellido paterno</Text>
                  <TextInput
                    style={styles.input}
                    onChangeText={onChangeAApellidoP}
                    value={AapellidoP}
                    placeholder="Apellido Paterno"
                  />
                  <Text style={styles.TextoLabels}>Email</Text>
                  <TextInput
                    style={styles.input}
                    onChangeText={onChangeAEmail}
                    value={Aemail}
                    placeholder="ejemplo@email.com"
                  />
                </View>
              ) : (
                <View></View>
              )}
              {AisEntrenador ? (
                <View>
                  <Text style={styles.TextoLabels}>Teléfono</Text>
                  <TextInput
                    style={styles.input}
                    onChangeText={onChangeATelefono}
                    value={Atelefono}
                    placeholder="##########"
                    keyboardType="numeric"
                    maxLength={10}
                  />
                  <Text style={styles.TextoLabels}>Colonia</Text>
                  <TextInput
                    style={styles.input}
                    onChangeText={onChangeAColonia}
                    value={Acolonia}
                    placeholder="Colonia"
                  />
                  <Text style={styles.TextoLabels}>Dirección</Text>
                  <TextInput
                    style={styles.input}
                    onChangeText={onChangeADireccion}
                    value={Adireccion}
                    placeholder="Dirección"
                  />
                </View>
              ) : (
                <View></View>
              )}

              {AisArbitro ? (
                <View>
                  <Text style={styles.TextoLabels}>Número de árbitro</Text>
                  <TextInput
                    style={styles.input}
                    onChangeText={onChangeANumArbitro}
                    value={AnumArbitro}
                    placeholder="Numero de arbitro"
                    maxLength={2}
                    keyboardType="numeric"
                  />
                </View>
              ) : (
                <View></View>
              )}

              <View style={styles.boton}>
                <TouchableOpacity
                  onPress={() =>
                    axios
                      .put(
                        baseURL + sid,
                        {
                          nombre: Anombre,
                          apellidoP: AapellidoP,
                          email: Aemail,
                          numeroTel: Atelefono,
                          colonia: Acolonia,
                          direccion: Adireccion,
                          numeroArb: AnumArbitro,
                        },
                        configt
                      )
                      .then(function (response) {
                        Alert.alert("", "Actualizacion exitosa");
                        fetchData();
                      })
                      .catch(function (error) {
                        console.log("", "Ocurrio un error intentelo mas tarde");
                      })
                  }
                >
                  <Text style={styles.TextoBoton}>Actualizar</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

/*
const AdminScreen = () => {
  const [active, setActive] = React.useState("");
  const [isOpen, setIsOpen] = React.useState(false);

  const Container = isOpen ? Drawer.Section : Drawer.CollapsedItem;
  return (
    <SafeAreaView>
      <Text>Administrador </Text>
      <View>
        <TouchableOpacity onPress={() => setIsOpen(!isOpen)}>
          <Ionicons name="menu" size={50} color="#ff6624" />
        </TouchableOpacity>

        <Container title="Some title">
          <Drawer.Item
            label="First Item"
            active={active === "first"}
            onPress={() => setActive("first")}
          />
          <Drawer.Item
            label="Second Item"
            active={active === "second"}
            onPress={() => setActive("second")}
          />
        </Container>
      </View>
    </SafeAreaView>
  );
};
*/
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
  dataWrapper: { marginTop: -1 },
});

export default AdminScreen;
