import React, { useEffect, useState, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { Ratings } from "../Components/Ratings";
import useOrientation from "../Components/useOrientation";
import Icon from "react-native-vector-icons/FontAwesome";
import { AuthContext } from "../Context";
import getFavorites, {
  addFavorite,
  removeFavorite,
} from "../services/favoritesService";

const MovieScreen = ({ route }) => {
  const user = React.useContext(AuthContext);
  const {
    posterUrl,
    title,
    released,
    ratings,
    plot,
    imdbID,
  } = route.params.movie;

  const [imageSize, setImageSize] = useState({ height: 0, width: 0 });
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    (async () => {
      const favs = await getFavorites(user.token);
      setIsFavorite(favs.some((fav) => fav.imdbID === imdbID));
    })();
  }, []);

  const isPortrait = useOrientation() === "PORTRAIT";
  const screenHeight = Dimensions.get("screen").height;
  useEffect(() => {
    Image.getSize(posterUrl, (width, height) => {
      const newHight = isPortrait ? screenHeight * 0.5 : screenHeight - 100;
      const scale = newHight / height;
      const newWidth = width * scale;
      setImageSize({ height: newHight, width: newWidth });
    });
  }, [isPortrait]);

  return (
    <View style={styles({ isPortrait }).mainView}>
      <Image
        source={{ uri: posterUrl }}
        style={styles({ imageSize }).image}
        resizeMode={"stretch"}
      />
      <View style={styles({ isPortrait }).textArea}>
        <Text style={styles().title}>{title}</Text>
        <Text style={styles().released}>Released: {released}</Text>
        <Ratings ratings={ratings} />
        {!isPortrait && (
          <View style={styles().plot}>
            <Text style={styles().plotHeader}>Plot:</Text>
            <Text style={styles().plotText}>{plot}</Text>
          </View>
        )}

        <TouchableOpacity
          onPress={() => {
            if (isFavorite) {
              removeFavorite(route.params.movie, user.token);
            } else {
              addFavorite(route.params.movie, user.token);
            }
            setIsFavorite(!isFavorite);
          }}
        >
          {isFavorite ? (
            <Icon size={50} name="star" color={"#FFC300"} />
          ) : (
            <Icon size={50} name="star-o" color="black" />
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = ({ imageSize, isPortrait } = {}) =>
  StyleSheet.create({
    image: {
      height: imageSize?.height,
      width: imageSize?.width,
      margin: 20,
    },
    mainView: {
      flex: 1,
      alignItems: "center",
      flexDirection: isPortrait ? "column" : "row",
    },
    released: {
      fontSize: 15,
    },
    plot: {
      paddingBottom: 10,
    },
    plotHeader: {
      fontSize: 15,
      fontWeight: "bold",
    },
    plotText: {
      fontSize: 15,
    },
    textArea: {
      flex: isPortrait ? 0 : 1,
      flexDirection: "column",
      alignItems: "center",
      alignContent: "center",
      alignSelf: "center",
      justifyContent: "center",
      textAlign: "center",
    },
    title: {
      fontSize: 20,
    },
  });

export default MovieScreen;
