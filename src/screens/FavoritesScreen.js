import React, { useState, useEffect, useContext } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { AuthContext } from "../Context";
import getFavorites, {
  addFavorite,
  removeFavorite,
} from "../services/favoritesService";
import Icon from "react-native-vector-icons/FontAwesome";
import { getMovie } from "../services/movieService";

const Favorite = ({ item, navigation, user, setMovieError }) => {
  const [isFavorite, setIsFavorite] = useState(true);

  const onPress = async () => {
    const title = item.title.trim().split(" ").join("+");

    const movie = await getMovie(title, user.token);
    if (movie?.title) {
      navigation.navigate("Movie", {
        movie: movie,
        favorites: user.favorites,
      });
    } else {
      setMovieError(movie?.error || "");
    }
  };

  return (
    <View style={styles.favorite}>
      <TouchableOpacity
        onPress={() => {
          if (isFavorite) {
            removeFavorite(item, user.token);
          } else {
            addFavorite(item, user.token);
          }
          setIsFavorite(!isFavorite);
        }}
      >
        {isFavorite ? (
          <Icon style={styles.icon} size={30} name="star" color="#FFC300" />
        ) : (
          <Icon style={styles.icon} size={30} name="star-o" color="black" />
        )}
      </TouchableOpacity>
      <TouchableOpacity onPress={onPress}>
        <Text>{item.title}</Text>
      </TouchableOpacity>
    </View>
  );
};

const Favorites = ({ navigation }) => {
  const [movieError, setMovieError] = useState();
  const { user } = useContext(AuthContext);
  const [favorites, setFavorites] = useState(null);

  useEffect(() => {
    (async () => {
      const favs = await getFavorites(user.token);
      setFavorites(favs);
    })();
  }, []);

  if (!favorites || favorites.length === 0) {
    return (
      <View style={styles.center}>
        <Text style={styles.noFavorites}>You have no favorites, yet...</Text>
      </View>
    );
  }

  return (
    <View style={styles.center}>
      {movieError && <Text style={styles.error}> {movieError}</Text>}
      <FlatList
        data={favorites}
        renderItem={({ item }) => (
          <Favorite
            item={item}
            navigation={navigation}
            user={user}
            setMovieError={setMovieError}
          />
        )}
        keyExtractor={(item) => item.imdbID}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  center: {
    flex: 1,
    marginLeft: 10,
  },
  error: {
    alignSelf: "center",
    color: "red",
    marginBottom: 20,
    marginTop: 20,
    fontSize: 20,
  },
  favorite: {
    flexDirection: "row",
    alignItems: "center",
    margin: 10,
  },
  icon: {
    marginRight: 5,
  },
  noFavorites: {
    fontSize: 20,
    margin: 10,
  },
});

export default Favorites;
