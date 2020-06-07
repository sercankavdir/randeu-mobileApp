import React from "react";
import { View, StyleSheet, Text } from "react-native";

const SectorsScreen = (props) => {
  return (
    <View style={styles.container}>
      <Text>Sectors Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default SectorsScreen;
