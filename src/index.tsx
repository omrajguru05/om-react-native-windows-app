import React from "react";
import { AppRegistry } from "react-native";
import { App } from "./App";

// Register React Native app
AppRegistry.registerComponent("OmDesktop", () => App);

// Web & desktop DOM mounting
if (typeof document !== "undefined") {
  const rootTag = document.getElementById("root") || document.getElementById("app");
  if (rootTag) {
    AppRegistry.runApplication("OmDesktop", {
      initialProps: {},
      rootTag,
    });
  }
}

export default App;
