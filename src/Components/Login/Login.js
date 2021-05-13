import React, { useEffect, useState } from "react";
import { Button, Text, View, TextInput } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { styles } from "./styles";
import { login } from "../../services/userService";
import { LoginContext } from "../../Context";

export const Login = () => {
  const setUser = React.useContext(LoginContext);
  const [loginError, setLoginError] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  /*
  useEffect(() => {
    login("erik", "erik").then((user) => setUser(user));
  }, []);
*/
  const onLogin = async (data) => {
    const user = await login(data.name, data.password);
    if (user?.token) {
      setUser(user);
    } else {
      setLoginError(user?.error || "Login failed");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => {
          return (
            <View style={styles.input}>
              <Text style={styles.formText}>Name: </Text>
              <TextInput
                style={(styles.formText, styles.formInput)}
                onBlur={onBlur}
                onChangeText={(value) => onChange(value)}
                value={value}
                placeholder=" name"
              />
            </View>
          );
        }}
        name="name"
        rules={{ required: true }}
      />
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => {
          return (
            <View style={styles.input}>
              <Text style={styles.formText}>Password: </Text>
              <TextInput
                style={(styles.formText, styles.formInput)}
                onBlur={onBlur}
                onChangeText={(value) => onChange(value)}
                value={value}
                secureTextEntry={true}
                placeholder=" password"
              />
            </View>
          );
        }}
        name="password"
        rules={{ required: true }}
      />
      <Text style={styles.errorText}>{loginError}</Text>
      <View style={styles.button}>
        <Button title="Login" onPress={handleSubmit(onLogin)} />
      </View>
    </View>
  );
};
