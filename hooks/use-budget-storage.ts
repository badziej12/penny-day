import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";

type BudgetState = {
  monthlyBudgets: Record<string, number>;
  dailyBudgets: Record<string, number>;
};

const STORAGE_KEY = "budgetData";

export const useBudgetStorage = () => {
  const [data, setData] = useState<BudgetState>({
    monthlyBudgets: {},
    dailyBudgets: {},
  });

  useEffect(() => {
    (async () => {
      const saved = await AsyncStorage.getItem(STORAGE_KEY);
      if (saved) setData(JSON.parse(saved));
    })();
  }, []);

  const save = (next: BudgetState) => {
    setData(next);
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  };

  const setMonthlyBudget = (monthKey: string, value: number) => {
    save({
      ...data,
      monthlyBudgets: {
        ...data.monthlyBudgets,
        [monthKey]: value,
      },
    });
  };

  const setDailyBudget = (date: string, value: number) => {
    save({
      ...data,
      dailyBudgets: { ...data.dailyBudgets, [date]: value },
    });
  };

  const removeDailyBudget = (date: string) => {
    const newBudgets = { ...data.dailyBudgets };
    delete newBudgets[date];
    save({ ...data, dailyBudgets: newBudgets });
  };

  return {
    ...data,
    setMonthlyBudget,
    setDailyBudget,
    removeDailyBudget,
  };
};
