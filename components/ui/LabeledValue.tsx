import { formatCurrency } from "@/utils/utils";
import { FC } from "react";
import { Text, View } from "react-native";

type LabeledValueProps = {
  label: string;
  value: number;
};

const LabeledValue: FC<LabeledValueProps> = ({ label, value }) => {
  const formattedValue = formatCurrency(value);

  return (
    <View>
      <Text
        className={
          "mb-1 text-center text-gray-500 text-xs dark:text-gray-400 font-outfit"
        }
      >
        {label}
      </Text>
      <Text
        className={
          "text-base font-outfit-semibold text-gray-800 dark:text-white/90"
        }
      >
        {formattedValue}
      </Text>
    </View>
  );
};

export default LabeledValue;
