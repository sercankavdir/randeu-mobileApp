import React from "react";
import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform,
} from "react-native";

import BoldText from "../../components/Texts/BoldText";

const ProductItem = (props) => {
  let TouchableCmp = TouchableOpacity;

  if (Platform.OS === "android" && Platform.Version >= 21) {
    TouchableCmp = TouchableNativeFeedback;
  }

  return (
    <View style={styles.gridItem}>
      <TouchableCmp
        underlayColor="rgba(73,182,77,0.9)"
        onPress={props.onSelect}
      >
        <View style={styles.itemContainer}>
          <Image style={styles.photo} source={{ uri: props.image }} />
          <BoldText style={styles.name}>{props.title}</BoldText>
        </View>
      </TouchableCmp>
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    flex: 1,
    margin: 10,
    justifyContent: "center",
    alignItems: "center",
    height: 215,
    borderColor: "#cccccc",
    borderWidth: 0.5,
    borderRadius: 20,
    overflow: "hidden",
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
    flex: 1,
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    color: "#333333",
    marginTop: 8,
  },
});

export default ProductItem;
