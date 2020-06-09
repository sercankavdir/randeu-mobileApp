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
  const [error, setError] = useState();
  const sectors = useSelector((state) => state.sectors.sectorList);
  const dispatch = useDispatch();

  const sectorList = useCallback(async () => {
    setError(null);
    try {
      await dispatch(sectorActions.fetchSectors());
    } catch (err) {
      setError(err);
    }
  }, [dispatch, setIsLoading, setError]);

  useEffect(() => {
    const willFocusSub = props.navigation.addListener("willFocus", sectorList);

    // Clean up. Whenever this component is destroyed or re-run
    return () => {
      willFocusSub.remove();
    };
  }, [sectorList]);

  useEffect(() => {
    setIsLoading(true);
    sectorList().then(() => {
      setIsLoading(false);
    });
  }, [sectorList, dispatch]);

  if (error) {
    return (
      <View style={styles.centered}>
        <Text>An error occurred!</Text>
        <Button title="Try Again" onPress={sectorList} color={Colors.primary} />
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
      data={sectors}
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
