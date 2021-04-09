import React from "react";
import { View, Text, StyleSheet } from "react-native";

const Rating = ({ Source, Value }) => {
  return (
    <View style={styles.rating}>
      <Text style={styles.source}>{Source}:</Text>
      <Text style={styles.value}> {Value} </Text>
    </View>
  );
};

export const Ratings = ({ ratings }) => {
  return (
    <View style={styles.mainView}>
      {ratings.map((rating, i) => (
        <Rating key={i} Source={rating.Source} Value={rating.Value} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  mainView: {
    margin: 20,
  },
  rating: {
    flexDirection: "row",
  },
  source: {
    width: 175,
    margin: 2,
  },
  value: {
    margin: 2,
  },
});
