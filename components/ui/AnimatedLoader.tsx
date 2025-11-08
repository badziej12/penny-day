import React, { useEffect, useRef } from "react";
import { Animated, Easing, StyleSheet, View } from "react-native";

export default function Loader() {
  const centerBar = useRef(new Animated.Value(0)).current;
  const leftBar = useRef(new Animated.Value(0)).current;
  const rightBar = useRef(new Animated.Value(0)).current;

  const animateBar = (bar: Animated.Value, delay: number) => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(bar, {
          toValue: 1,
          duration: 400,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: false,
          delay,
        }),
        Animated.timing(bar, {
          toValue: 0,
          duration: 400,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: false,
        }),
      ])
    ).start();
  };

  useEffect(() => {
    animateBar(leftBar, 0);
    animateBar(centerBar, 160);
    animateBar(rightBar, 320);
  }, []);

  const getBarStyle = (animValue: Animated.Value, offsetX: number) => ({
    transform: [{ translateX: offsetX }],
    height: animValue.interpolate({
      inputRange: [0, 1],
      outputRange: [32, 40],
    }),
    opacity: animValue.interpolate({
      inputRange: [0, 1],
      outputRange: [0.75, 1],
    }),
  });

  return (
    <View style={styles.loader}>
      <Animated.View style={[styles.bar, getBarStyle(leftBar, -10)]} />
      <Animated.View style={[styles.bar, getBarStyle(centerBar, 0)]} />
      <Animated.View style={[styles.bar, getBarStyle(rightBar, 10)]} />
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
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  bar: {
    width: 12,
    backgroundColor: "#4191F9",
    marginHorizontal: 3,
  },
});
