import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from "recharts";
import {useExpenses} from "../ExpensesContext.tsx";
import {useEffect, useState} from "react";
const COLORS = ["#EC0D84", "#008787", "#835FE5", "#83CA9F", "#FA8073", "#3164DE"];
interface ExpensesPieChartProps {
    negative: boolean;
}
function ExpensesPieChart({negative}: ExpensesPieChartProps) {
    const [data,setData] = useState<{ name: string; value: number }[]>([
        { name: "Basic", value: 0 },
        { name: "Transport", value: 0 },
        { name: "Household", value: 0 },
        { name: "Health", value: 0 },
        { name: "Leisure & travel", value: 0 },
        { name: "Other", value: 0 },
    ]);
    const { expenses } = useExpenses();
    useEffect(() => {
        const getData = async () => {
            const res = await fetch("http://localhost:4444/categorise_expenses", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    user:localStorage.getItem('user'),
                    negative:negative,
                }),
            });
            if (!res.ok) {
                const error = await res.json();
                console.log(error.message);
                throw new Error(error.error || "Fetch failed");
            }
            const pieData = Object.entries(await res.json()).map(
                ([name, value]) => ({
                    name,
                    value,
                })
            ) as { name: string; value: number }[];
            setData(pieData)
        }
        getData();
    },[expenses]);
    return (
        <ResponsiveContainer width="100%" height={300}>
            <PieChart>
                <Pie
                    data={data}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    label
                >
                    {data.map((_, index) => (
                        <Cell
                            key={index}
                            fill={COLORS[index % COLORS.length]}
                        />
                    ))}
                </Pie>

                <Tooltip />
                <Legend />
            </PieChart>
        </ResponsiveContainer>
    );
}
export default ExpensesPieChart;
