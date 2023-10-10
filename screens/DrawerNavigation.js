import { View, Text, SafeAreaView } from "react-native";
import React from "react";
import { Drawer } from "react-native-paper";
import { TouchableOpacity } from "react-native-gesture-handler";
import Ionicons from "@expo/vector-icons/Ionicons";
import { StyleSheet } from "react-native";
import AdminScreen from "./AdminScreen";
import HomeScreen from "./HomeScreen";

/*const DrawerNavigation = () => {
  const [active, setActive] = React.useState("");
  const [isOpen, setIsOpen] = React.useState(false);

  const Container = isOpen ? Drawer.Section : Drawer.CollapsedItem;*/

export function DrawerNavigation() {
  return <Text>Hola</Text>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 24,
    marginTop: 30,
  },
});

export default DrawerNavigation;
