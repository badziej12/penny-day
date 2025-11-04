import { FC, ReactNode } from "react";
import { View } from "react-native";

type BoxComponentProps = {
  children: ReactNode;
  paddingClass?: string;
  bgClass?: string;
};

const BoxComponent: FC<BoxComponentProps> = ({
  children,
  bgClass = "bg-white dark:bg-white/[0.03]",
  paddingClass = "p-5",
}) => {
  return (
    <View
      className={`rounded-2xl border overflow-hidden border-gray-200 ${paddingClass} ${bgClass} dark:border-gray-800`}
    >
      {children}
    </View>
  );
};

export default BoxComponent;
