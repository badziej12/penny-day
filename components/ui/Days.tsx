import { FC } from "react";
import { Text, View } from "react-native";

const weekDays = ["Pon", "Wt", "Śr", "Czw", "Pt", "Sob", "N"];

type DaysProps = {
  days: { date: Date; isCurrentMonth: boolean }[];
};

const Days: FC<DaysProps> = ({ days }) => {
  const daysInMonth = days;
  const today = new Date();

  return (
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
          {daysInMonth.map((day, index) => {
            const isToday =
              day.isCurrentMonth && today.getDate() === day.date.getDate();

            const col = index % 7;
            const row = Math.floor(index / 7);

            // Border tylko na prawo i na dół, żeby nie nakładały się
            const borderClasses = [
              col < 6 ? "border-r border-gray-200 dark:border-gray-800" : "",
              row < 5 ? "border-b border-gray-200 dark:border-gray-800" : "",
            ].join(" ");

            return (
              <View
                key={index}
                className={`w-1/7 p-2 ${borderClasses} box-border`}
              >
                <View
                  className={`rounded-sm ${isToday ? "bg-gray-100 dark:bg-white/[0.03]" : ""} p-`}
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
                    120
                  </Text>
                </View>
              </View>
            );
          })}
        </View>
      </View>
    </View>
  );
};

export default Days;
