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

import DefaultText from "../../components/Texts/DefaultText";
import * as businessesActions from "../../store/actions/businesses";
import Colors from "../../constants/Colors";
import SectorItem from "../../components/UI/SectorItem";

const BusinessesScreen = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const businesses = useSelector((state) => state.businesses.businesses);
  const dispatch = useDispatch();

  const businessTypeName = props.navigation.getParam("businessTypeName");

  const businessesList = useCallback(async () => {
    setError(null);
    try {
      await dispatch(businessesActions.fetchBusinesses(businessTypeName));
    } catch (err) {
      setError(err);
    }
  }, [dispatch, setIsLoading, setError]);

  useEffect(() => {
    const willFocusSub = props.navigation.addListener(
      "willFocus",
      businessesList
    );

    // Clean up. Whenever this component is destroyed or re-run
    return () => {
      willFocusSub.remove();
    };
  }, [businessesList]);

  useEffect(() => {
    setIsLoading(true);
    businessesList().then(() => {
      setIsLoading(false);
    });
  }, [businessesList, dispatch]);

  if (error) {
    return (
      <View style={styles.centered}>
        <Text>Bir hata oluştu!</Text>
        <Button
          title="Tekrar Dene"
          onPress={businessesList}
          color={Colors.primary}
        />
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

  // if (!isLoading && businesses.length === 0) {
  //   return (
  //     <View style={centered}>
  //       <DefaultText>
  //         İş yerleri bulunamadı. Lütfen daha sonra tekrar deneyiniz.
  //       </DefaultText>
  //     </View>
  //   );
  // }

  const selectItemHandler = (id, title) => {
    props.navigation.navigate("BusinessTypes", {
      sectorId: id,
      sectorName: title,
    });
  };

  const renderItem = (itemData) => {
    return (
      <SectorItem
        title={itemData.item.businessName}
        image={
          "https://images.unsplash.com/photo-1444653614773-995cb1ef9efa?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1355&q=80"
        }
        onSelect={() => {}}
      />
    );
  };

  return (
    <FlatList
      keyExtractor={(item, index) => item._id}
      data={businesses}
      renderItem={renderItem}
    />
  );
};

BusinessesScreen.navigationOptions = (navData) => {
  return {
    headerTitle: "Sektörler",
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
