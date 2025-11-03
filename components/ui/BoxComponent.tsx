import { FC, ReactNode } from "react";
import { View } from "react-native";

type BoxComponentProps = {
  children: ReactNode;
  customClassName?: string;
};

const BoxComponent: FC<BoxComponentProps> = ({ children, customClassName }) => {
  return (
    <View
      className={
        customClassName ??
        "rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]"
      }
    >
      {children}
    </View>
  );
};

export default BoxComponent;
