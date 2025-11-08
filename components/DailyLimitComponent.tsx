import { useBudgetStorage } from "@/context/BudgetStorageContext";
import { DateContext } from "@/context/DateContext";
import { useContext } from "react";
import { Text, View } from "react-native";
import BoxComponent from "./ui/BoxComponent";
import LabeledValue from "./ui/LabeledValue";
import ProgressArc from "./ui/ProgressArc";
import Separator from "./ui/Separator";

const DailyLimitComponent = () => {
  const { currentMonthKey, daysInMonth, currentDayKey, today } =
    useContext(DateContext);
  const { monthlyBudgets, dailyBudgets } = useBudgetStorage();

  let dailyLimit = 0;
  if (dailyBudgets[currentDayKey]) {
    dailyLimit = dailyBudgets[currentDayKey];
  } else if (monthlyBudgets[currentMonthKey]) {
    const divider = daysInMonth.length - today.getDate();

    dailyLimit = monthlyBudgets[currentMonthKey] / divider;
  }

  const percent = 60;

  return (
    <BoxComponent paddingClass="" bgClass="bg-gray-100 dark:bg-white/[0.03]">
      <View className={"flex flex-col"}>
        <View
          className={
            "flex flex-col px-5 pt-5 pb-11 bg-white rounded-2xl dark:bg-gray-900"
          }
        >
          <View className={"flex justify-between"}>
            <View className="flex flex-col">
              <Text className="text-lg font-outfit-semibold text-gray-800 dark:text-white/90">
                Dzienny limit
              </Text>
              <Text
                className={
                  "mt-1 text-gray-500 text-sm font-outfit dark:text-gray-400"
                }
              >
                Limit jaki mozesz dzisiaj wydać
              </Text>
            </View>
          </View>
          <ProgressArc
            limitLeft={dailyLimit}
            subheading={"+12%"}
            progress={percent}
          />
          <Text
            className={
              "mt-10 w-full max-w-[380px] text-center text-sm text-gray-500 font-outfit"
            }
          >
            Wydałeś dzisiaj 30 zł, jeszcze mieścisz się w limicie. Tak trzymaj!
          </Text>
        </View>
        <View
          className={
            "flex flex-row items-center justify-center justify-items-center gap-5 px-6 py-3.5"
          }
        >
          <LabeledValue label="Limit" value={dailyLimit} />
          <Separator />
          <LabeledValue label="Wydano" value={20} />
          <Separator />
          <LabeledValue
            label="Ogólnie"
            value={monthlyBudgets[currentMonthKey]}
          />
        </View>
      </View>
    </BoxComponent>
  );
};

export default DailyLimitComponent;
