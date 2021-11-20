import React, { useState, useContext } from "react";
import {
  Button,
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import Icon from "react-native-vector-icons/FontAwesome";
import { AuthContext } from "../Context";
import { getMovie } from "../services/movieService";

const HomeScreen = ({ navigation, route }) => {
  const { user } = useContext(AuthContext);
  const [movieError, setMovieError] = useState();
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    const title = data.title.trim().split(" ").join("+");
    const movie = await getMovie(title, user.token);
    if (movie?.title) {
      setMovieError("");
      reset("");
      navigation.navigate("Movie", {
        movie: movie,
        favorites: user.favorites,
      });
    } else {
      setMovieError(movie?.error || "Movie search failed");
    }
  };

  return (
    <View style={styles.mainView}>
      <Text style={styles.header}>Search for any movie!</Text>
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => {
          return (
            <View style={styles.input}>
              <Text style={styles.formText}>Title: </Text>
              <TextInput
                style={(styles.formText, styles.formInput)}
                onBlur={onBlur}
                onChangeText={(value) => onChange(value)}
                value={value}
                placeholder=" Title"
              />
            </View>
          );
        }}
        name="title"
        rules={{ required: true }}
      />

      <View style={styles.errorContainer}>
        {errors.title && <Text style={styles.errorText}>Title required!</Text>}
        <Text style={styles.errorText}>{movieError}</Text>
      </View>

      <View>
        <Button title="Search" onPress={handleSubmit(onSubmit)} />

        <TouchableOpacity onPress={() => navigation.navigate("Favorites")}>
          <View style={styles.favorites}>
            <Text style={styles.favoritesText}> Favorites</Text>
            <Icon size={30} name="star" color={"#FFC300"} />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  errorContainer: {
    height: 60,
    justifyContent: "center",
  },
  errorText: {
    color: "red",
  },
  favorites: {
    margin: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  favoritesText: {
    fontSize: 20,
  },
  formInput: {
    width: 200,
    borderWidth: 1,
  },
  formText: {
    fontSize: 20,
  },
  header: {
    fontSize: 30,
    paddingLeft: 20,
    paddingRight: 20,
  },
  input: {
    paddingLeft: 30,
    paddingRight: 30,
    paddingTop: 20,
    flexDirection: "row",
    alignSelf: "center",
  },
  mainView: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default HomeScreen;
