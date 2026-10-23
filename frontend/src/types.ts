export type Expense = {
    title: string;
    count: number;
    year: number;
    month: number;
    day: number;
    hour: number;
    minute: number;
};
export type ExpenseRaw = {
    title: string;
    count: number;
    year: number;
    month: number;
    day: number;
    hour: number;
    minute: number;
};
export type ExpensesResponseRaw = {
    [category: string]: ExpenseRaw[];
};
export type ExpensesByCategory = {
    [category: string]: Expense[];
};