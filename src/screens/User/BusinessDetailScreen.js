import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  StyleSheet,
  Text,
  ActivityIndicator,
  Button,
  Image,
  ScrollView,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { ListItem } from "react-native-elements";

import * as businessDetailActions from "../../store/actions/businessDetail";
import Colors from "../../constants/Colors";
import BoldText from "../../components/Texts/BoldText";
import DefaultText from "../../components/Texts/DefaultText";
import AppointmentButton from "../../components/UI/AppointmentButton";

const BusinessDetailScreen = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const businessId = props.navigation.getParam("businessId");

  const businessDetailError = useSelector((state) => {
    return state.businessDetail.businessDetailError;
  });

  const businessDetail = useSelector((state) => {
    return state.businessDetail.businessDetail;
  });

  const businessProvidingServices = useSelector((state) => {
    return state.businessDetail.businessProvidingServices;
  });
  const businessProvidingServicesError = useSelector((state) => {
    return state.businessDetail.businessProvidingServicesError;
  });

  const onInitBusinessDetail = useCallback(async () => {
    await dispatch(businessDetailActions.initBusinessDetail(businessId));
  }, [dispatch, setIsLoading]);

  const onInitBusinessProvidingServices = useCallback(async () => {
    await dispatch(
      businessDetailActions.initBusinessProvidingServices(businessId)
    );
  }, [dispatch]);

  useEffect(() => {
    onInitBusinessProvidingServices();
  }, [onInitBusinessProvidingServices]);

  useEffect(() => {
    setIsLoading(true);
    onInitBusinessDetail().then(() => {
      setIsLoading(false);
    });
  }, [onInitBusinessDetail]);

  if (businessDetailError) {
    return (
      <View style={styles.centered}>
        <Text>{businessDetailError}</Text>
        <Button title="Tekrar Dene" onPress={() => {}} color={Colors.primary} />
      </View>
    );
  }

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Image
        style={styles.image}
        source={{
          uri:
            "https://images.unsplash.com/photo-1545056453-f0359c3df6db?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80",
        }}
      />
      <View style={styles.infoContainer}>
        <BoldText style={styles.infoName}>
          {businessDetail.businessName}
        </BoldText>
        <DefaultText>{businessDetail.address}</DefaultText>
      </View>
      <View style={styles.buttonContainer}>
        <AppointmentButton onPress={() => {}} />
      </View>
      <View style={styles.listItem}>
        <DefaultText style={styles.servisTitle}>Servisler</DefaultText>
        {businessProvidingServices.map((l, i) => (
          <ListItem
            key={i}
            title={l.serviceName}
            bottomDivider
            titleStyle={styles.title}
          />
        ))}
      </View>
    </ScrollView>
  );
};

BusinessDetailScreen.navigationOptions = (navData) => {
  return {
    headerTitle: navData.navigation.getParam("businessName"),
  };
};

const styles = StyleSheet.create({
  infoContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  title: {
    fontFamily: "open-sans",
    fontSize: 14,
  },
  infoName: {
    fontSize: 25,
    margin: 10,
    color: "black",
    textAlign: "center",
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    flex: 1,
  },
  image: {
    width: "100%",
    height: 250,
  },
  servisTitle: {
    color: Colors.primary,
    fontSize: 18,
    textAlign: "center",
    fontWeight: "bold",
    marginBottom: 10,
  },
});

export default BusinessDetailScreen;
