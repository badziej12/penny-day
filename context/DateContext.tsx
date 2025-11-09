import { calcDaysInMonth } from "@/utils/utils";
import { createContext, FC, ReactNode, useMemo, useState } from "react";

export const getMonthKey = (date: Date) =>
  `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;

export const getDayKey = (date: Date) =>
  `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate() + 1).padStart(2, "0")}`;

export const DateContext = createContext({
  today: new Date(),
  selectedDate: new Date(),
  handleSelectDate: (date: Date) => {},
  month: 0,
  year: 0,
  currentMonthKey: getMonthKey(new Date()),
  selectedMonthKey: getMonthKey(new Date()),
  currentDayKey: getDayKey(new Date()),
  daysInMonth: [new Date()],
  nextMonth: () => {},
  prevMonth: () => {},
  goToToday: () => {},
  setMonth: (newMonth: number, newYear?: number) => {},
});

type DateProviderProps = {
  children: ReactNode;
};

export const DateProvider: FC<DateProviderProps> = ({ children }) => {
  const today = useMemo(() => new Date(), []);
  const [selectedDate, setSelectedDate] = useState<Date>(today);

  const month = selectedDate.getMonth(); // 0-11
  const year = selectedDate.getFullYear();

  const currentMonthKey = useMemo(() => getMonthKey(today), [today]);
  const currentDayKey = useMemo(() => getDayKey(today), [today]);

  const selectedMonthKey = useMemo(
    () => getMonthKey(selectedDate),
    [selectedDate]
  );

  const handleSelectDate = (date: Date) => {
    setSelectedDate(date);
  };

  const nextMonth = () => {
    const isDecember = month === 11;
    setSelectedDate(
      new Date(isDecember ? year + 1 : year, isDecember ? 0 : month + 1, 1)
    );
  };

  const prevMonth = () => {
    const isJanuary = month === 0;
    setSelectedDate(
      new Date(isJanuary ? year - 1 : year, isJanuary ? 11 : month - 1, 1)
    );
  };

  const goToToday = () => {
    setSelectedDate(today);
  };

  const setMonth = (newMonth: number, newYear = year) => {
    setSelectedDate(new Date(newYear, newMonth, 1));
  };

  const daysInMonth = useMemo(
    () => calcDaysInMonth(year, month),
    [month, year]
  );

  const value = {
    today,
    selectedDate,
    handleSelectDate,
    month,
    year,
    currentMonthKey,
    currentDayKey,
    selectedMonthKey,
    daysInMonth,
    nextMonth,
    prevMonth,
    goToToday,
    setMonth,
  };

  return <DateContext.Provider value={value}>{children}</DateContext.Provider>;
};
