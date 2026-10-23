import {useState} from "react";
import {Button} from "react-bootstrap";
import {FaTrashAlt} from "react-icons/fa";
import {MdEdit} from "react-icons/md";
import {useExpenses} from "../ExpensesContext.tsx";
import type {Expense} from "../types.ts";
import ExpenseEdit from "./ExpenseEdit.tsx";
import * as React from "react";
interface ExpenseProps {
    expense: Expense;
    category: string;
    color: string;
}

function ExpenseView({ expense,category, color }: ExpenseProps) {
    const [hovered, setHovered] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const { refresh } = useExpenses();

    async function deleteExpense() {
        const res = await fetch("http://localhost:4444/delete_expense", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                user:localStorage.getItem('user'),
                title: expense.title,
                category: category,
                hour: expense.hour,
                minute: expense.minute,
                day: expense.day,
                month: expense.month,
                year: expense.year,
                count: expense.count,
            }),
        });

        if (!res.ok) {
            const error = await res.json();
            throw new Error(error.error || "Fetch failed");
        }
        await refresh()
    }
    return (<div className="expense rounded vertical" style={{"--color-assigned":color} as React.CSSProperties}
    onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
        <div className={"expense-info"}>
            <p className={"expense-name"}>{expense.title}</p>
        </div>
        <div className={"expense-info"} style={{justifyContent: "space-between"}}>
            <p className={"expense-date"}>{expense.hour}:{expense.minute} {expense.day}.{expense.month}.{expense.year}</p>
            <p className={`rounded ${expense.count>0?"expense-positive":"expense-negative"}`}>{expense.count>0?"+":""}{expense.count}zł</p>
        </div>
        {hovered && <div className={"expense-buttons pad-gapped"}>
            <Button className={"expense-edit-button"} onClick={()=>setEditMode(true)}><MdEdit /></Button>
            <Button className={"expense-delete-button"} onClick={deleteExpense}><FaTrashAlt/></Button>
        </div>}
        {editMode && <ExpenseEdit expense={expense} initialCategory={category} initialColor={color} close={()=>{
            setEditMode(false);
            setHovered(false);
        }}/>}
    </div>)
}
export default ExpenseView;