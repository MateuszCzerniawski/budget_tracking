import { useEffect, useState } from "react";
import { ExpensesContext } from "./ExpensesContext";
import type {Expense, ExpenseRaw, ExpensesByCategory, ExpensesResponseRaw} from "./types";
import * as React from "react";

type Props = {
    user: string;
    children: React.ReactNode;
};
function mapExpense(raw: ExpenseRaw): Expense {
    return {
        title: raw.title,
        count: raw.count,
        year: raw.year,
        month: raw.month,
        day: raw.day,
        hour: raw.hour,
        minute: raw.minute
    };
}
async function fetchExpenses(
    user: string
): Promise<ExpensesByCategory> {
    const res = await fetch("http://localhost:4444/expenses", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ user }),
    });

    if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || "Fetch failed");
    }

    const data: ExpensesResponseRaw = await res.json();

    const mapped: ExpensesByCategory = {};

    for (const category in data) {
        mapped[category] = data[category].map(mapExpense);
    }

    return mapped;
}

export function ExpensesProvider({ user, children }: Props) {
    const [expenses, setExpenses] = useState<ExpensesByCategory>({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const loadExpenses = async () => {
        try {
            setLoading(true);
            setError(null);
            const data = await fetchExpenses(user);
            setExpenses(data);
        } catch (e: any) {
            setError(e.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadExpenses();
    }, [user]);

    return (
        <ExpensesContext.Provider value={{expenses,loading,error,refresh: loadExpenses,}}>{children}</ExpensesContext.Provider>
    );
}
