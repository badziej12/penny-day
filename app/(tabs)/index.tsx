import { ScrollView, View } from "react-native";

import DailyLimitComponent from "@/components/DailyLimitComponent";
import LatestTransactions from "@/components/LatestTransactions";

export default function HomeScreen() {
  return (
    <ScrollView className={"p-4 pb-20 bg-gray-50 dark:bg-gray-900 pt-20"}>
      <View className={"flex flex-col gap-8"}>
        <DailyLimitComponent />
        <LatestTransactions />
      </View>
    </ScrollView>
  );
}
