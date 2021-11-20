import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { AuthContext, LoginContext } from "./src/Context";
import LoginPage from "./src/Components/Login/LoginPage";
import HomeScreen from "./src/screens/HomeScreen";
import MovieScreen from "./src/screens/MovieScreen";
import FavoritesScreen from "./src/screens/FavoritesScreen";

const Stack = createStackNavigator();

export default function App() {
  const [user, setUser] = useState(null);

  if (!user) {
    return (
      <AuthContext.Provider value={{ user, setUser }}>
        <LoginPage />
      </AuthContext.Provider>
    );
  }

  return (
    <NavigationContainer>
      <AuthContext.Provider value={{ user, setUser }}>
        <Stack.Navigator initialRouteName={"Home"}>
          <Stack.Screen name={"Home"} component={HomeScreen} />
          <Stack.Screen name={"Movie"} component={MovieScreen} />
          <Stack.Screen name={"Favorites"} component={FavoritesScreen} />
        </Stack.Navigator>
      </AuthContext.Provider>
    </NavigationContainer>
  );
}
