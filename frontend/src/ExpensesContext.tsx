import { createContext, useContext } from "react";
import type {ExpensesByCategory} from "./types";

type ExpensesContextType = {
    expenses: ExpensesByCategory;
    loading: boolean;
    error: string | null;
    refresh: () => Promise<void>;
};

export const ExpensesContext = createContext<ExpensesContextType | null>(null);

export function useExpenses() {
    const ctx = useContext(ExpensesContext);
    if (!ctx) {
        throw new Error("useExpenses must be used inside ExpensesProvider");
    }
    return ctx;
}
