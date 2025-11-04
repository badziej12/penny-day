import Callendar from "@/components/Callendar";
import { ScrollView, View } from "react-native";

export default function CallendarScreen() {
  return (
    <ScrollView className={"p-4 pb-20 bg-gray-50 dark:bg-gray-900 pt-20"}>
      <View className={"flex flex-col gap-8"}>
        <Callendar />
      </View>
    </ScrollView>
  );
}
