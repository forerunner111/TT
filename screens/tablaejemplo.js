import { View, Text } from "react-native";
import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const tablaejemplo = () => {
  const [email, setEmail] = useState([]);

  const fetchData = () => {
    return axios
      .post("http://localhost:4000/api/register", {
        curp: "803",
        nombre: "Token2",
        apellidoP: "Tokencito2",
        email: "ejemplo803@email.com",
        contrasena: "123",
        numeroTel: "4921207650",
        direccion: "Calle Token2 900",
        colonia: "Colonia Token2",
        numeroArb: 32,
        comision: true,
        entrenador: false,
        arbitro: false,
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <SafeAreaView>
      <View>
        <TouchableOpacity
          onPress={() =>
            axios
              .post("http://192.168.31.109:4000/api/register", {
                curp: "804",
                nombre: "Token2",
                apellidoP: "Tokencito2",
                email: "ejemplo803@email.com",
                contrasena: "123",
                numeroTel: "4921207650",
                direccion: "Calle Token2 900",
                colonia: "Colonia Token2",
                numeroArb: 32,
                comision: true,
                entrenador: false,
                arbitro: false,
              })
              .then(function (response) {
                console.log(response);
              })
              .catch(function (error) {
                console.log(error);
              })
          }
        >
          <Text>Esto deberia crear al usuario 803</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default tablaejemplo;
