import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  ActivityIndicator,
  Button,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";

import * as businessesActions from "../../store/actions/businesses";
import Colors from "../../constants/Colors";
import BusinessItem from "../../components/UI/BusinessItem";

const BusinessesScreen = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const businessTypeName = props.navigation.getParam("businessTypeName");

  const businessesError = useSelector((state) => {
    return state.businesses.businessesListError;
  });

  const businessesList = useSelector((state) => {
    return state.businesses.businessesList;
  });

  const onInitBusinessesList = useCallback(async () => {
    try {
      await dispatch(businessesActions.initBusinessesList(businessTypeName));
    } catch (err) {
      await dispatch(businessesActions.fetchBusinessesListFailed(err));
    }
  }, [dispatch, setIsLoading]);

  useEffect(() => {
    setIsLoading(true);
    onInitBusinessesList().then(() => {
      setIsLoading(false);
    });
  }, [onInitBusinessesList]);

  if (businessesError) {
    return (
      <View style={styles.centered}>
        <Text>{businessesError}</Text>
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

  // if (!isLoading && businessesList.length === 0) {
  //   return (
  //     <View style={styles.centered}>
  //       <DefaultText>
  //         İş yerleri bulunamadı. Lütfen daha sonra tekrar deneyiniz.
  //       </DefaultText>
  //     </View>
  //   );
  // }

  const selectItemHandler = (id, name) => {
    props.navigation.navigate("Business", {
      businessId: id,
      businessName: name,
    });
  };

  const renderItem = (itemData) => {
    return (
      <BusinessItem
        title={itemData.item.businessName}
        image={
          "https://images.unsplash.com/photo-1444653614773-995cb1ef9efa?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1355&q=80"
        }
        onSelect={() =>
          selectItemHandler(itemData.item._id, itemData.item.businessName)
        }
      />
    );
  };

  return (
    <FlatList
      keyExtractor={(item, index) => item._id}
      data={businessesList}
      renderItem={renderItem}
    />
  );
};

BusinessesScreen.navigationOptions = (navData) => {
  return {
    headerTitle: navData.navigation.getParam("businessTypeName"),
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default BusinessesScreen;
