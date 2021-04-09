import React, { useState } from "react";
import { Button, Text, View, TextInput, Switch } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { styles } from "./styles";
import { createAccount } from "../../services/loginService";
import { LoginContext } from "../../Context";

const CreateAccount = () => {
  const setUser = React.useContext(LoginContext);
  const [createError, setCreateError] = useState();
  const { control, handleSubmit } = useForm();

  const onCreateAccount = async (data) => {
    if (data.password !== data.repeatPassword) {
      setCreateError("Passwords did not match!");
      return;
    }

    const user = await createAccount(data.name, data.password);
    if (user?.token) {
      setUser(user);
    } else {
      setCreateError(user?.error || "Create account failed");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Account</Text>
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

      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => {
          return (
            <View style={styles.input}>
              <Text style={styles.formText}>Repeat Password: </Text>
              <TextInput
                style={(styles.formText, styles.formInput)}
                onBlur={onBlur}
                onChangeText={(value) => onChange(value)}
                value={value}
                secureTextEntry={true}
                placeholder=" repeat password"
              />
            </View>
          );
        }}
        name="repeatPassword"
        rules={{ required: true }}
      />
      <Text style={styles.errorText}>{createError}</Text>
      <View style={styles.button}>
        <Button
          title="Create Account"
          onPress={handleSubmit(onCreateAccount)}
        />
      </View>
    </View>
  );
};

export default CreateAccount;
