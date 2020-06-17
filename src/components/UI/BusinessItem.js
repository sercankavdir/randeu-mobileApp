import React from "react";
import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform,
} from "react-native";
import { AirbnbRating, Rating } from "react-native-elements";

import BoldText from "../../components/Texts/BoldText";
import Colors from "../../constants/Colors";

const ProductItem = (props) => {
  let TouchableCmp = TouchableOpacity;

  if (Platform.OS === "android" && Platform.Version >= 21) {
    TouchableCmp = TouchableNativeFeedback;
  }

  return (
    <View>
      <TouchableCmp onPress={props.onSelect}>
        <View style={styles.itemContainer}>
          <Image style={styles.photo} source={{ uri: props.image }} />
          <View style={styles.container}>
            <BoldText style={styles.name}>{props.title}</BoldText>
            <Rating
              tintColor={Colors.primary}
              type="custom"
              readonly={true}
              imageSize={20}
              startingValue={Math.random(5 - 2) + 2}
              style={styles.star}
            />
          </View>
        </View>
      </TouchableCmp>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  itemContainer: {
    margin: 10,
    height: 215,
    borderColor: "#cccccc",
    borderWidth: 0.5,
    borderRadius: 20,
    overflow: "hidden",
  },

  star: {
    color: "#ccc",
  },
  photo: {
    width: "100%",
    height: 155,
    borderRadius: 20,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    shadowColor: "blue",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowRadius: 5,
    shadowOpacity: 1.0,
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333333",
  },
});

export default ProductItem;
