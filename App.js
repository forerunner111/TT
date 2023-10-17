import "react-native-gesture-handler";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import PartidosScreen from "./screens/PartidosScreen";
import DrawerNavigation from "./screens/DrawerNavigation";
import AdminScreen from "./screens/AdminScreen";
import EntrenadorScreen from "./screens/EntrenadorScreen";
import ComisionScreen from "./screens/ComisionScreen";
import tablaejemplo from "./screens/tablaejemplo";
import JefeScreen from "./screens/JefeScreen";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Register"
          component={RegisterScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Partidos"
          component={PartidosScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Drawer"
          component={DrawerNavigation}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Admin"
          component={AdminScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Entrenador"
          component={EntrenadorScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Comision"
          component={ComisionScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Jefe"
          component={JefeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="tabla"
          component={tablaejemplo}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
