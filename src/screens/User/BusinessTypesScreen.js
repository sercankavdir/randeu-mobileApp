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

import * as businessTypeActions from "../../store/actions/businessTypes";
import Colors from "../../constants/Colors";
import SmallCard from "../../components/UI/SmallCard";

const BusinessTypeScreen = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const sectorId = props.navigation.getParam("sectorId");

  const businessTypeError = useSelector((state) => {
    return state.businessTypes.businessTypeListError;
  });

  const businessTypeList = useSelector((state) => {
    return state.businessTypes.businessTypeList;
  });

  const onInitBusinessTypeList = useCallback(async () => {
    try {
      await dispatch(businessTypeActions.initBusinessTypeList(sectorId));
    } catch (err) {
      await dispatch(businessTypeActions.fetchBusinessTypeListFailed(err));
    }
  }, [dispatch, setIsLoading]);

  useEffect(() => {
    setIsLoading(true);
    onInitBusinessTypeList().then(() => {
      setIsLoading(false);
    });
  }, [onInitBusinessTypeList]);

  if (businessTypeError) {
    return (
      <View style={styles.centered}>
        <Text>{businessTypeError}</Text>
        <Button
          title="Tekrar Dene!"
          onPress={() => {}}
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
      data={businessTypeList}
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
