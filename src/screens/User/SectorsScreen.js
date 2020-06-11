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

import * as sectorActions from "../../store/actions/sectors";
import Colors from "../../constants/Colors";
import SectorItem from "../../components/UI/SectorItem";

const SectorsScreen = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const sectorError = useSelector((state) => {
    return state.sectors.sectorListError;
  });

  const sectorList = useSelector((state) => {
    return state.sectors.sectorList;
  });

  const onInitSectorList = useCallback(async () => {
    try {
      await dispatch(sectorActions.initSectorList());
    } catch (err) {
      await sectorActions.fetchSectorListFailed(err);
    }
  }, [dispatch, setIsLoading]);

  useEffect(() => {
    setIsLoading(true);
    onInitSectorList().then(() => {
      setIsLoading(false);
    });
  }, [onInitSectorList]);

  if (sectorError) {
    return (
      <View style={styles.centered}>
        <Text>{sectorError}</Text>
        <Button
          title="Tekrar Dene!"
          onPress={sectorList}
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

  const selectItemHandler = (id, title) => {
    props.navigation.navigate("BusinessTypes", {
      sectorId: id,
      sectorName: title,
    });
  };

  const renderItem = (itemData) => {
    return (
      <SectorItem
        title={itemData.item.sectorName}
        image={itemData.item.imageUrl}
        onSelect={() => {
          selectItemHandler(itemData.item._id, itemData.item.sectorName);
        }}
      />
    );
  };

  return (
    <FlatList
      keyExtractor={(item, index) => item._id}
      data={sectorList}
      renderItem={renderItem}
    />
  );
};

SectorsScreen.navigationOptions = (navData) => {
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

export default SectorsScreen;
