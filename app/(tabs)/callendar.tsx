import Callendar, { today } from "@/components/Callendar";
import MonthModal, { MonthModalRef } from "@/components/MonthModal";
import CloseButton from "@/components/ui/CloseButton";
import RNModal from "@/components/ui/RNModal";
import { useBudgetStorage } from "@/hooks/use-budget-storage";
import { shouldChangeYear } from "@/utils/utils";
import { useRef, useState } from "react";
import { ScrollView, Text, View } from "react-native";

export default function CallendarScreen() {
  const [monthModalVisible, setMonthModalVisible] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());

  const { setMonthlyBudget, monthlyBudgets } = useBudgetStorage();

  const monthModalRef = useRef<MonthModalRef>(null);

  const handleSwitchMonthClick = (next?: boolean) => {
    setCurrentMonth((prev) => {
      const increment = next ? 1 : -1;
      if (shouldChangeYear(prev + increment)) {
        if (next) {
          setCurrentYear((prev) => prev + 1);
          return 1;
        } else {
          setCurrentYear((prev) => prev - 1);
          return 11;
        }
      }

      return prev + increment;
    });
  };

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
      const monthKey = `${currentYear}-${currentMonth + 1}`;

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
          <Callendar
            onModalOpen={handleMonthModalOpen}
            onSwitchMonthClick={handleSwitchMonthClick}
            currentMonth={currentMonth}
            currentYear={currentYear}
          />
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
