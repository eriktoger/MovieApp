import React, { useState } from "react";
import { StyleSheet, Text, View, Switch } from "react-native";
import { Login } from "./Login";
import CreateAccount from "./CreateAccount";

export default LoginPage = () => {
  const [isCreatingAccount, setIsCreatingAccount] = useState(false);

  return (
    <View style={styles.container}>
      {isCreatingAccount ? <CreateAccount /> : <Login />}
      <Text>Switch to: {isCreatingAccount ? "Login" : "Create Account"} </Text>
      <Switch
        style={styles.switch}
        trackColor={{ false: "#81b0ff", true: "#81b0ff" }}
        thumbColor={"#f5dd4b"}
        ios_backgroundColor="#3e3e3e"
        onValueChange={() => setIsCreatingAccount(!isCreatingAccount)}
        value={isCreatingAccount}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  switch: {
    marginBottom: 20,
  },
});
