import { getCalendarDays } from "@/utils/utils";
import { FC } from "react";
import { Pressable, Text, View } from "react-native";
import ArrowImage from "./ui/ArrowImage";
import BoxComponent from "./ui/BoxComponent";
import ButtonComponent from "./ui/ButtonComponnt";
import Days from "./ui/Days";

export const today = new Date();
export const months = [
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

type CallendarProps = {
  onModalOpen: () => void;
  onSwitchMonthClick: (next?: boolean) => void;
  currentYear: number;
  currentMonth: number;
};

const Callendar: FC<CallendarProps> = ({
  onModalOpen,
  onSwitchMonthClick,
  currentMonth,
  currentYear,
}) => {
  const daysInMonth = getCalendarDays(currentYear, currentMonth);

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
              <ButtonComponent onClick={() => onSwitchMonthClick(false)}>
                <ArrowImage isLeft={true} />
              </ButtonComponent>
              <ButtonComponent onClick={() => onSwitchMonthClick(true)}>
                <ArrowImage isLeft={false} />
              </ButtonComponent>
            </View>
            <Pressable onPress={onModalOpen} className="ml-3 inline-block">
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
