import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform,
} from "react-native";
import Colors from "../../constants/Colors";

const AppointmentButton = (props) => {
  let TouchableCmp = TouchableOpacity;

  if (Platform.OS === "android" && Platform.Version >= 21) {
    TouchableCmp = TouchableNativeFeedback;
  }

  return (
    <View style={styles.buttonContainer}>
      <TouchableCmp activeOpacity={0.6} onPress={props.onPress}>
        <View style={styles.button}>
          <Text style={styles.buttonText}>Randevu Al</Text>
        </View>
      </TouchableCmp>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    borderRadius: 25,
    overflow: "hidden",
  },
  button: {
    flex: 1,
    height: 50,
    width: 200,
    marginTop: 20,
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 100,
    borderColor: Colors.primary,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  buttonText: {
    color: Colors.primary,
    fontFamily: "open-sans",
    fontSize: 18,
  },
});

export default AppointmentButton;
