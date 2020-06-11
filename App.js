import React, { useState } from "react";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import ReduxThunk from "redux-thunk";
import { AppLoading } from "expo";
import * as Font from "expo-font";

import RandeuNavigator from "./src/navigation/RandeuNavigator";
import sectorsReducer from "./src/store/reducers/sectors";
import businessTypeReducer from "./src/store/reducers/businessTypes";
import businessesReducer from "./src/store/reducers/businesses";
import authReducer from "./src/store/reducers/auth";

const rootReducer = combineReducers({
  sectors: sectorsReducer,
  businessTypes: businessTypeReducer,
  businesses: businessesReducer,
  auth: authReducer,
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

const fetchFonts = () => {
  return Font.loadAsync({
    "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
    "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
  });
};

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);

  if (!fontLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => {
          setFontLoaded(true);
        }}
      />
    );
  }
  return (
    <Provider store={store}>
      <RandeuNavigator />
    </Provider>
  );
}
