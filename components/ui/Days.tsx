import { useBudgetStorage } from "@/context/BudgetStorageContext";
import { DateContext, getDayKey } from "@/context/DateContext";
import { useBudgetLimit } from "@/hooks/use-budget-limit";
import { formatCurrency, getCalendarDays } from "@/utils/utils";
import Slider from "@react-native-community/slider";
import { useContext, useState } from "react";
import { Pressable, Text, View } from "react-native";
import RNModal from "./RNModal";

const weekDays = ["Pon", "Wt", "Śr", "Czw", "Pt", "Sob", "N"];

const Days = () => {
  const [modalIsVisible, setModalIsVisible] = useState(false);
  const [sliderLimit, setSliderLimit] = useState(0);
  const [maxSliderLimit, setMaxSliderLimit] = useState(0);
  const { today, month, year, handleSelectDate, selectedDate } =
    useContext(DateContext);
  const { setDailyBudget, dailyBudgets, removeDailyBudget } =
    useBudgetStorage();
  const { getDailyBudget, getDailyBudgetsSummary } = useBudgetLimit();
  const calendarMonthDays = getCalendarDays(year, month);

  console.log(dailyBudgets);

  const handleOpenModal = (day: Date) => {
    const budget = getDailyBudget(day);
    const maximumBudget = getDailyBudgetsSummary(day).budget;

    handleSelectDate(day);
    setSliderLimit(budget);
    setMaxSliderLimit(maximumBudget);
    setModalIsVisible(true);
  };

  const handleCloseModal = () => {
    setModalIsVisible(false);
  };

  const handleAcceptModal = () => {
    console.log(selectedDate);
    setDailyBudget(getDayKey(selectedDate), sliderLimit);
    setModalIsVisible(false);
  };

  return (
    <>
      <View>
        <View
          className={
            "flex flex-row bg-gray-50 border-gray-200 dark:bg-gray-900 dark:border-gray-800 border-t border-b"
          }
        >
          {weekDays.map((day) => (
            <View key={day} className={"w-1/7"}>
              <Text
                className={
                  "uppercase px-3 py-4 inline-block font-outfit-medium text-sm text-gray-400 text-left"
                }
              >
                {day}
              </Text>
            </View>
          ))}
        </View>
        <View className={"border-hidden"}>
          <View className="flex flex-row flex-wrap">
            {calendarMonthDays.map((day, index) => {
              const isToday =
                day.isCurrentMonth && today.getDate() === day.date.getDate();

              const col = index % 7;
              const row = Math.floor(index / 7);

              // Border tylko na prawo i na dół, żeby nie nakładały się
              const borderClasses = [
                col < 6 ? "border-r border-gray-200 dark:border-gray-800" : "",
                row < 5 ? "border-b border-gray-200 dark:border-gray-800" : "",
              ].join(" ");

              const date = new Date(day.date);

              return (
                <Pressable
                  key={index}
                  className={`w-1/7 p-2 ${borderClasses} box-border`}
                  onPress={() => handleOpenModal(date)}
                  onLongPress={() => removeDailyBudget(getDayKey(date))}
                >
                  <View
                    className={`rounded-sm ${isToday ? "bg-gray-100 dark:bg-white/[0.03]" : ""}`}
                  >
                    <Text
                      className={`text-sm font-outfit-medium ${
                        day.isCurrentMonth
                          ? "text-gray-700 dark:text-gray-400"
                          : "text-gray-400 dark:text-white/[0.3]"
                      }`}
                    >
                      {day.date.getDate()}
                    </Text>
                    <Text
                      className={`text-xs font-outfit-medium bg-green-50 rounded-lg text-green-600 dark:bg-green-500/15 dark:text-green-500 py-1 px-2 ${day.isCurrentMonth ? undefined : "opacity-0"}`}
                    >
                      {Math.round(getDailyBudget(day.date))}
                    </Text>
                  </View>
                </Pressable>
              );
            })}
          </View>
        </View>
      </View>
      <RNModal
        visible={modalIsVisible}
        onClose={handleCloseModal}
        onAccept={handleAcceptModal}
      >
        <View className={"text-center mb-4"}>
          <Text
            className={
              "mb-2 text-2xl font-outfit-semibold text-gray-800 dark:text-white/90"
            }
          >
            Ustal limit na {selectedDate.toLocaleDateString()}
          </Text>
        </View>
        <Text className="mb-2 text-center text-2xl font-outfit-semibold text-gray-800 dark:text-white/90">
          {formatCurrency(sliderLimit)}
        </Text>
        <View className="mb-4">
          <Slider
            minimumValue={0}
            maximumValue={maxSliderLimit}
            value={sliderLimit}
            onValueChange={setSliderLimit}
          />
        </View>
      </RNModal>
    </>
  );
};

export default Days;
