export const formatCurrency = (value: number) =>
  new Intl.NumberFormat("pl-PL", {
    style: "currency",
    currency: "PLN",
  }).format(value);

export const getCalendarDays = (year: number, month: number) => {
  const result: { date: Date; isCurrentMonth: boolean }[] = [];

  // Pierwszy dzień miesiąca
  const firstDayOfMonth = new Date(year, month, 1);
  const firstWeekDay = firstDayOfMonth.getDay(); // 0 = niedziela, 1 = pon, ...

  // W Europie tydzień zwykle zaczyna się od poniedziałku, więc robimy korektę:
  const offset = (firstWeekDay + 6) % 7;

  // Ile dni ma dany miesiąc?
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  // Ile dni miał poprzedni miesiąc?
  const daysInPrevMonth = new Date(year, month, 0).getDate();

  // 42 elementy = 6 tygodni
  for (let i = 0; i < 42; i++) {
    const dayNumber = i - offset + 1;

    if (dayNumber <= 0) {
      // dni z poprzedniego miesiąca
      result.push({
        date: new Date(year, month - 1, daysInPrevMonth + dayNumber),
        isCurrentMonth: false,
      });
    } else if (dayNumber > daysInMonth) {
      // dni z następnego miesiąca
      result.push({
        date: new Date(year, month + 1, dayNumber - daysInMonth),
        isCurrentMonth: false,
      });
    } else {
      // dni z aktualnego miesiąca
      result.push({
        date: new Date(year, month, dayNumber),
        isCurrentMonth: true,
      });
    }
  }

  return result;
};

export const shouldChangeYear = (currentMonth: number) => {
  if (currentMonth > 11 || currentMonth < 0) {
    return true;
  }

  return false;
};
