import { View, Text, SafeAreaView, ScrollView, TextInput } from "react-native";
import React from "react";
import { Drawer } from "react-native-paper";
import { TouchableOpacity } from "react-native-gesture-handler";
import Ionicons from "@expo/vector-icons/Ionicons";
import { StyleSheet } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Table, TableWrapper, Row } from "react-native-table-component";
import Checkbox from "expo-checkbox";
import { useState } from "react";
import {
  Collapse,
  CollapseHeader,
  CollapseBody,
  AccordionList,
} from "accordion-collapse-react-native";
import { useNavigation } from "@react-navigation/native";

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

  //Actualizar Registro
  const [Anombre, onChangeANombre] = useState("");
  const [Aemail, onChangeAEmail] = useState("");
  const [AapellidoP, onChangeAApellidoP] = useState("");
  const [Atelefono, onChangeATelefono] = useState("");
  const [Acurp, onChangeACURP] = useState("");
  const [AContraseña, onChangeAPassword] = React.useState("");
  const [Acolonia, onChangeAColonia] = useState("");
  const [Adireccion, onChangeADireccion] = useState("");
  const [AnumArbitro, onChangeANumArbitro] = useState("");
  const [AmodoPassword, onChangeAmodoPassword] = React.useState(true);

  const [AisComision, setAComision] = useState(false);
  const [AisEntrenador, setAEntrenador] = useState(false);
  const [AisArbitro, setAArbitro] = useState(false);

  const [active, setActive] = React.useState("");
  const [isOpen, setIsOpen] = React.useState(false);

  const Container = isOpen ? Drawer.Section : Drawer.CollapsedItem;

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <View style={styles.IconInput}>
          <TouchableOpacity onPress={() => setIsOpen(!isOpen)}>
            <Ionicons name="exit" size={35} color="#000000" />
          </TouchableOpacity>

          <Text style={styles.titulo}>Administrador</Text>
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
        <Text style={styles.Subtitulo} paddingTop={10}>
          CRUD de Ususarios
        </Text>
        <View alignItems="space-between" marginRight={10}>
          <TouchableOpacity
            style={styles.boton}
            onPress={() => onChangeModoActualizar(true)}
          >
            <Text style={styles.TextoBoton}>Nuevo Registro</Text>
          </TouchableOpacity>
        </View>

        <View alignItems="space-between" marginRight={10}>
          <TouchableOpacity
            style={styles.boton}
            onPress={() => onChangeModoActualizar(false)}
          >
            <Text style={styles.TextoBoton}>Actualizar</Text>
          </TouchableOpacity>
        </View>
        <View paddingHorizontal={10}>
          <ScrollView horizontal={true}>
            <Table borderStyle={{ borderWidth: 1, borderColor: "#000000" }}>
              <Row
                data={["Usuario", "Roles", "Acciones"]}
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
        <View>
          {modoActualizar ? (
            <View style={styles.container2}>
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
                >
                  <Text style={styles.TextoBoton}>Registrar</Text>
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            <View style={styles.container2}>
              <Text style={styles.Subtitulo} paddingTop={10}>
                Actualizar Usuario
              </Text>

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
              <Text style={styles.TextoLabels}>CURP</Text>
              <TextInput
                style={styles.input}
                onChangeText={onChangeACURP}
                value={Acurp}
                placeholder="CURP"
                maxLength={18}
              />
              <Text style={styles.TextoLabels}>Email</Text>
              <TextInput
                style={styles.input}
                onChangeText={onChangeAEmail}
                value={Aemail}
                placeholder="ejemplo@email.com"
              />

              <Text style={styles.TextoLabels}>Contraseña</Text>
              <View style={styles.input}>
                <View style={styles.IconInput}>
                  <TextInput
                    secureTextEntry={AmodoPassword}
                    onChangeText={onChangeAPassword}
                    value={AContraseña}
                    placeholder="••••••••••"
                  />
                  <TouchableOpacity
                    onPress={() => onChangeAmodoPassword(!AmodoPassword)}
                  >
                    {AmodoPassword ? (
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
              <Text style={styles.TextoLabels}>Direccion</Text>
              <TextInput
                style={styles.input}
                onChangeText={onChangeADireccion}
                value={Adireccion}
                placeholder="Direccion"
              />
              <Text style={styles.TextoLabels}>Numero de arbitro</Text>
              <TextInput
                style={styles.input}
                onChangeText={onChangeANumArbitro}
                value={AnumArbitro}
                placeholder="Numero de arbitro"
                maxLength={2}
                keyboardType="numeric"
              />
              <View style={styles.boton}>
                <TouchableOpacity /*onPress={() => navigation.navigate("Home")}*/
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

export default AdminScreen;
