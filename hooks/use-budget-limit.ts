import { useBudgetStorage } from "@/context/BudgetStorageContext";
import { getDayKey, getMonthKey } from "@/context/DateContext";
import { calcDaysInMonth } from "@/utils/utils";

export const useBudgetLimit = () => {
    const {dailyBudgets, monthlyBudgets} = useBudgetStorage();

    const getDailyBudgetsSummary = (date: Date) => {
        const monthKey = getMonthKey(date);
        let budget = monthlyBudgets[monthKey];
        const daysInMonth = calcDaysInMonth(date.getFullYear(), date.getMonth());
        
        let daysCounter = 0;
        const monthDay = new Date(date);
        for (let i = 1; i <= daysInMonth.length; i++) {
            monthDay.setDate(i);
            const dayKey = getDayKey(monthDay);
            if (dailyBudgets[dayKey]) {
                budget -= dailyBudgets[dayKey];
                daysCounter++;
            }   
        }

        return {budget, daysCounter, daysInMonth};
    }

    const getDailyBudget = (day: Date) => {
        let dayKey = getDayKey(day);
        if (dailyBudgets[dayKey]) return dailyBudgets[dayKey];

        const monthKey = getMonthKey(day);
        if (monthlyBudgets[monthKey]) {
            const budgetsSummary = getDailyBudgetsSummary(day)

            const divider = budgetsSummary.daysInMonth.length - budgetsSummary.daysCounter;
            const budget = budgetsSummary.budget / divider;

            return budget;
        }

        return 0;
    }


    return {
        getDailyBudget,
        getDailyBudgetsSummary,
    }
}