import { formatCurrency } from "@/utils/utils";
import { Text, View } from "react-native";
import BoxComponent from "./ui/BoxComponent";
import TableData from "./ui/TableData";
import TableHead from "./ui/TableHead";

const LatestTransactions = () => {
  return (
    <BoxComponent
      customClassName={
        "rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]"
      }
    >
      <View className={"px-4 pt-4"}>
        <View className={"flex flex-col gap-2 mb-4"}>
          <Text
            className={
              "text-lg font-outfit-semibold text-gray-800 dark:text-white/90"
            }
          >
            Ostatnie transakcje
          </Text>
        </View>
      </View>
      <View className="">
        <View className={"border-gray-100 border-y dark:border-white/[0.05]"}>
          <View className={"flex flex-row"}>
            <TableHead label="Data" />
            <TableHead label="Kategoria" />
            <TableHead label="Kwota" />
          </View>
          <View className={"divide-y divide-gray-100 dark:divide-white/[0.05]"}>
            <View className="flex- flex-row">
              <TableData label="10-10-2025" />
              <TableData label="Zakupy" />
              <TableData label={formatCurrency(20)} />
            </View>
            <View className="flex- flex-row">
              <TableData label="10-10-2025" />
              <TableData label="Zakupy" />
              <TableData label={formatCurrency(20)} />
            </View>
            <View className="flex- flex-row">
              <TableData label="10-10-2025" />
              <TableData label="Zakupy" />
              <TableData label={formatCurrency(20)} />
            </View>
          </View>
        </View>
      </View>
    </BoxComponent>
  );
};

export default LatestTransactions;
