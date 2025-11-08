import Callendar from "@/components/Callendar";
import MonthModal, { MonthModalRef } from "@/components/MonthModal";
import CloseButton from "@/components/ui/CloseButton";
import RNModal from "@/components/ui/RNModal";
import { useBudgetStorage } from "@/context/BudgetStorageContext";
import { DateContext, getMonthKey } from "@/context/DateContext";
import { useContext, useRef, useState } from "react";
import { ScrollView, Text, View } from "react-native";

export default function CallendarScreen() {
  const [monthModalVisible, setMonthModalVisible] = useState(false);
  const { selectedDate } = useContext(DateContext);
  const { setMonthlyBudget } = useBudgetStorage();

  const monthModalRef = useRef<MonthModalRef>(null);

  const handleMonthModalOpen = () => {
    setMonthModalVisible(true);
  };

  const handleMonthModalClose = () => {
    setMonthModalVisible(false);
  };

  const handleSubmitMonthLimit = () => {
    if (!monthModalRef.current) return;

    const value = monthModalRef.current.getValue();

    try {
      const floatValue = parseFloat(value);
      const monthKey = getMonthKey(selectedDate);

      setMonthlyBudget(monthKey, floatValue);
      handleMonthModalClose();
    } catch (err: any) {
      throw new Error(err);
    }
  };

  return (
    <>
      <ScrollView className={"p-4 pb-20 bg-gray-50 dark:bg-gray-900 pt-20"}>
        <View className={"flex flex-col gap-8"}>
          <Callendar onModalOpen={handleMonthModalOpen} />
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
      <RNModal
        visible={monthModalVisible}
        onAccept={handleSubmitMonthLimit}
        onClose={handleMonthModalClose}
      >
        <MonthModal ref={monthModalRef} />
        <CloseButton onClose={handleMonthModalClose} />
      </RNModal>
    </>
  );
}
