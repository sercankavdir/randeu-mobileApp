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
import * as businessTypeActions from "../../store/actions/businessTypes";
import Colors from "../../constants/Colors";
import SmallCard from "../../components/UI/SmallCard";

const BusinessTypeScreen = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const businessTypes = useSelector(
    (state) => state.businessTypes.businessTypeList
  );
  const dispatch = useDispatch();

  const sectorId = props.navigation.getParam("sectorId");

  const businessTypeList = useCallback(async () => {
    setError(null);
    try {
      await dispatch(businessTypeActions.fetchBusinessTypes(sectorId));
    } catch (err) {
      setError(err);
    }
  }, [dispatch, setIsLoading, setError]);

  useEffect(() => {
    const willFocusSub = props.navigation.addListener(
      "willFocus",
      businessTypeList
    );

    // Clean up. Whenever this component is destroyed or re-run
    return () => {
      willFocusSub.remove();
    };
  }, [businessTypeList]);

  useEffect(() => {
    setIsLoading(true);
    businessTypeList().then(() => {
      setIsLoading(false);
    });
  }, [businessTypeList, dispatch]);

  if (error) {
    return (
      <View style={styles.centered}>
        <Text>Bir hata oluştu!</Text>
        <Button
          title="Tekrar Dene"
          onPress={businessTypeList}
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

  // if (!isLoading && businessTypes.length === 0) {
  //   return (
  //     <View style={centered}>
  //       <DefaultText>
  //         İş yeri tipleri bulunamadı. Lütfen daha sonra tekrar deneyiniz.
  //       </DefaultText>
  //     </View>
  //   );
  // }

  const selectItemHandler = (title) => {
    props.navigation.navigate("Businesses", {
      businessTypeName: title,
    });
  };

  const renderItem = (itemData) => {
    return (
      <SmallCard
        title={itemData.item.businessTypeName}
        image={itemData.item.imageUrl}
        onSelect={() => {
          selectItemHandler(itemData.item.businessTypeName);
        }}
      />
    );
  };

  return (
    <FlatList
      keyExtractor={(item, index) => item._id}
      data={businessTypes}
      vertical
      showsVerticalScrollIndicator={false}
      numColumns={2}
      renderItem={renderItem}
    />
  );
};

BusinessTypeScreen.navigationOptions = (navData) => {
  return {
    headerTitle: navData.navigation.getParam("sectorName"),
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

export default BusinessTypeScreen;
