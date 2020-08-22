import { AnimatedCircularProgress } from "react-native-circular-progress";
import { Text, View } from "react-native";
import React from "react";

const getSensorPercentage = (sensorRead: number) => {
  return Math.round(100 - (sensorRead / 1000) * 100);
};

export default function ProgressScreen({
  percentage,
  name,
  size = 80,
  width = 10,
}: {
  percentage: number;
  size?: number;
  width?: number;
  name: string;
}) {
  return (
    <View style={{ alignContent: "center", alignItems: "center" }}>
      <AnimatedCircularProgress
        size={size}
        width={width}
        fill={getSensorPercentage(percentage)}
        tintColor="#00e0ff"
        backgroundColor="#3d5875"
      >
        {(fill) => <Text>{getSensorPercentage(percentage)}%</Text>}
      </AnimatedCircularProgress>
      <Text>{name}</Text>
    </View>
  );
}
