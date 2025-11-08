import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  createContext,
  FC,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

type BudgetState = {
  monthlyBudgets: Record<string, number>;
  dailyBudgets: Record<string, number>;
};

type BudgetStorageContextType = {
  isLoading: boolean;
  monthlyBudgets: Record<string, number>;
  dailyBudgets: Record<string, number>;
  setMonthlyBudget: (monthKey: string, value: number) => void;
  setDailyBudget: (date: string, value: number) => void;
  removeDailyBudget: (date: string) => void;
};

type BudgetStorageProviderProps = {
  children: ReactNode;
};

export const BudgetStorageContext = createContext<
  BudgetStorageContextType | undefined
>(undefined);

export const useBudgetStorage = () => {
  const value = useContext(BudgetStorageContext);
  if (!value) {
    throw new Error(
      "useBudgetStorage must be wrapper in a <BudgetStorageProvider />"
    );
  }

  return value;
};

const STORAGE_KEY = "budgetData";

export const BudgetStorageProvider: FC<BudgetStorageProviderProps> = ({
  children,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<BudgetState>({
    monthlyBudgets: {},
    dailyBudgets: {},
  });

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      (async () => {
        const saved = await AsyncStorage.getItem(STORAGE_KEY);
        if (saved) {
          setData(JSON.parse(saved));
          setIsLoading(false);
        }
      })();
    }, 2000);
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

  const contextValue = {
    isLoading,
    ...data,
    setMonthlyBudget,
    setDailyBudget,
    removeDailyBudget,
  };

  return (
    <BudgetStorageContext.Provider value={contextValue}>
      {children}
    </BudgetStorageContext.Provider>
  );
};
