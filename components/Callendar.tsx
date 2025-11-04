import { getCalendarDays, shouldChangeYear } from "@/utils/utils";
import { useState } from "react";
import { Pressable, Text, View } from "react-native";
import ArrowImage from "./ui/ArrowImage";
import BoxComponent from "./ui/BoxComponent";
import ButtonComponent from "./ui/ButtonComponnt";
import Days from "./ui/Days";

const today = new Date();
const months = [
  "Styczeń",
  "Luty",
  "Marzec",
  "Kwiecień",
  "Maj",
  "Czerwiec",
  "Lipiec",
  "Sierpień",
  "Wrzesień",
  "Październik",
  "Listopad",
  "Grudzień",
];

const Callendar = () => {
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());

  const daysInMonth = getCalendarDays(currentYear, currentMonth);

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

  return (
    <BoxComponent paddingClass="">
      <View>
        <View
          className={
            "pt-6 px-6 flex flex-col mb-6 justify-between items-center gap-4"
          }
        >
          <View className="flex flex-row">
            <View className={"inline-flex flex-row align-middle gap-2"}>
              <ButtonComponent onClick={() => handleSwitchMonthClick(false)}>
                <ArrowImage isLeft={true} />
              </ButtonComponent>
              <ButtonComponent onClick={() => handleSwitchMonthClick(true)}>
                <ArrowImage isLeft={false} />
              </ButtonComponent>
            </View>
            <Pressable className="ml-3 inline-block">
              <Text
                style={{ backgroundColor: "#465fff" }}
                className="rounded-lg inline-block text-white text-center py-2 px-3 font-outfit text-base"
              >
                Ustal kwotę
              </Text>
            </Pressable>
          </View>
          <View>
            <Text
              className={
                "text-lg font-outfit-medium text-gray-800 dark:text-white/[0.9]"
              }
            >
              {months[currentMonth]} {currentYear}
            </Text>
          </View>
        </View>
        <Days days={daysInMonth} />
      </View>
    </BoxComponent>
  );
};

export default Callendar;
