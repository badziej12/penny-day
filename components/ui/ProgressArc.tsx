import { FC } from "react";
import { Text, View } from "react-native";
import Svg, { Path } from "react-native-svg";

type ProgressArcProps = {
  heading: string;
  subheading: string;
  progress: number;
};

const ProgressArc: FC<ProgressArcProps> = ({
  progress,
  heading,
  subheading,
}) => {
  const circumference = 126;
  const strokeDashoffset = circumference - (circumference * progress) / 100;

  return (
    <View className={"relative"}>
      <Svg height={200} viewBox="0 0 100 50">
        <Path
          d="M 10 50 A 40 40 0 0 1 90 50"
          stroke="rgba(228,231,236,0.85)"
          strokeWidth={4}
          fill="none"
          strokeLinecap="round"
        />
        <Path
          d="M 10 50 A 40 40 0 0 1 90 50"
          stroke="rgba(70,95,255,0.85)"
          strokeWidth={4}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
        />
      </Svg>
      <View
        className={
          "absolute flex flex-col gap-2 top-3/4 left-1/2 -translate-x-1/2 -translate-y-1/2 items-center"
        }
      >
        <Text
          className={
            "font-outfit-bold color text-gray-800 dark:text-white/90 text-3xl"
          }
        >
          {heading}
        </Text>
        <Text className="rounded-full text-center w-1/2 bg-green-50 px-3 py-1 font-outfit-medium text-green-600 dark:bg-green-500/15 dark:text-green-500">
          {subheading}
        </Text>
      </View>
    </View>
  );
};

export default ProgressArc;
