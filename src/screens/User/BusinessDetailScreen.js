import React from "react";
import { View, StyleSheet, Text } from "react-native";

const BusinessDetailScreen = (props) => {
  const businessId = props.navigation.getParam("businessId");
  console.log(businessId);
  return (
    <View style={styles.container}>
      <Text>Business Detail Screen</Text>
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

export default BusinessDetailScreen;
