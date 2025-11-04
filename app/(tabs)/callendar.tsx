import Callendar from "@/components/Callendar";
import RNModal from "@/components/ui/RNModal";
import { ScrollView, Text, View } from "react-native";

export default function CallendarScreen() {
  return (
    <>
      <ScrollView className={"p-4 pb-20 bg-gray-50 dark:bg-gray-900 pt-20"}>
        <View className={"flex flex-col gap-8"}>
          <Callendar />
        </View>
      </ScrollView>
      <RNModal visible={false}>
        <View className={"text-center"}>
          <Text
            className={
              "mb-2 text-2xl font-outfit-semibold text-gray-800 dark:text-white/90"
            }
          >
            All Done! Success Confirmed
          </Text>
        </View>
      </RNModal>
    </>
  );
}
