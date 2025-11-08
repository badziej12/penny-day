import React from "react";
import { StyleSheet, View } from "react-native";
import AnimatedLoader from "./AnimatedLoader"; // to będzie nasza animacja

export default function LoaderWrapper() {
  return (
    <View style={{ flex: 1 }}>
      <View style={styles.loader}>
        <View style={styles.justifyCenter}>
          <AnimatedLoader />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  loader: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  justifyCenter: {
    justifyContent: "center",
    alignItems: "center",
  },
});
