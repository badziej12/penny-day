import { forwardRef, useImperativeHandle, useState } from "react";
import { Text, TextInput, View } from "react-native";

export type MonthModalRef = {
  getValue: () => string;
};

const MonthModal = forwardRef<MonthModalRef>(({}, ref) => {
  const [amount, setAmount] = useState("");

  useImperativeHandle(ref, () => ({
    getValue: () => amount,
  }));

  return (
    <>
      <View className={"text-center"}>
        <Text
          className={
            "mb-6 text-2xl font-outfit-semibold text-gray-800 dark:text-white/90"
          }
        >
          Ustal kwotę na ten miesiąc
        </Text>
      </View>
      <View className="flex flex-col">
        <Text
          className={
            "mb-1.5 block text-sm font-outfit-medium text-gray-700 dark:text-gray-400"
          }
        >
          Kwota
        </Text>
        <TextInput
          className={
            "h-11 w-full rounded-lg border appearance-none px-4 py-2.5 text-sm font-outfit shadow-xs placeholder:text-gray-400 focus:outline-hidden focus:ring-3  dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30  bg-transparent text-gray-800 border-gray-300 focus:border-brand-300 focus:ring-brand-500/20 dark:border-gray-700 dark:text-white/90 dark:focus:border-brand-800"
          }
          placeholder="2500,00"
          keyboardType="numeric"
          value={amount}
          onChangeText={setAmount}
        />
      </View>
    </>
  );
});

MonthModal.displayName = "MonthModal";

export default MonthModal;
