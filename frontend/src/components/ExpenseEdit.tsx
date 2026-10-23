import type {Expense} from "../types.ts";
import {Button} from "react-bootstrap";
import {useState} from "react";
import {useExpenses} from "../ExpensesContext.tsx";
import * as React from "react";

interface ExpenseEditProps{
    expense?: Expense;
    initialCategory: string;
    initialColor: string;
    close: () => void;
}

function ExpenseEdit({expense, initialCategory,initialColor, close}: ExpenseEditProps){
    const [color, setColor] = useState(initialColor);
    const [title, setTitle] = useState(expense?.title ?? "");
    const [category, setCategory] = useState(initialCategory);
    const [value, setValue] = useState(expense?.count ?? "0");
    const [hour, setHour] = useState(expense?.hour.toString());
    const [minute, setMinute] = useState(expense?.minute.toString());
    const [day, setDay] = useState(expense?.day.toString());
    const [month, setMonth] = useState(expense?.month.toString());
    const [year, setYear] = useState(expense?.year.toString());
    const { refresh } = useExpenses();
    function handleCategoryChange(value: string) {
        setCategory(value);
        switch (value) {
            case "Basic":
                setColor("#EC0D84")
                break;
            case "Transport":
                setColor("#008787")
                break;
            case "Household":
                setColor("#835FE5")
                break;
            case "Health":
                setColor("#83CA9F")
                break;
            case "Leisure & travel":
                setColor("#FA8073")
                break;
            case "Other":
                setColor("#3164DE")
                break;
            default:
                break;
        }

    }
    async function addExpense() {
        const res = await fetch("http://localhost:4444/add_expense", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                user:localStorage.getItem('user'),
                title: title,
                category: category,
                hour: hour,
                minute: minute,
                day: day,
                month: month,
                year: year,
                count: value,
            }),
        });
        if (!res.ok) {
            const error = await res.json();
            throw new Error(error.error || "Fetch failed");
        }
        close()
        await refresh()
    }
    async function editExpense() {
        const res = await fetch("http://localhost:4444/edit_expense", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                user:localStorage.getItem('user'),
                old_title: expense?.title,
                old_category: initialCategory,
                old_hour: expense?.hour,
                old_minute: expense?.minute,
                old_day: expense?.day,
                old_month: expense?.month,
                old_year: expense?.year,
                old_count: expense?.count,
                new_title: title,
                new_category: category,
                new_hour: hour,
                new_minute: minute,
                new_day: day,
                new_month: month,
                new_year: year,
                new_count: value,
            }),
        });
        if (!res.ok) {
            const error = await res.json();
            throw new Error(error.error || "Fetch failed");
        }
        close()
        await refresh()
    }
    async function handlePost() {
        if(expense) {
            await editExpense();
        }
        else {
            await addExpense();
        }
    }
    return (<div className={"full-page centered blur-overlay"}>
        <div className="rounded pad-gapped vertical edit-container" style={{"--color-assigned":color} as React.CSSProperties}>
            <textarea className={"better-textarea edit-textareas rounded centered edit-title"}
                      placeholder={"Title"} value={title} onChange={(e) => setTitle(e.target.value)}/>
            <div className={"pad-gapped edit-date"}>
                <div className={"edit-date-inner"}>
                    <textarea className={"better-textarea edit-textareas rounded centered"}
                              placeholder={"Hour"} value={hour} onChange={(e)=>setHour(e.target.value)}/>
                    <p className={"edit-text"}>:</p>
                    <textarea className={"better-textarea edit-textareas rounded centered"}
                              placeholder={"Minute"} value={minute} onChange={(e)=>setMinute(e.target.value)}/>
                </div>
                <div className={"edit-date-inner"}>
                    <textarea className={"better-textarea edit-textareas rounded centered"}
                              placeholder={"Day"} value={day} onChange={(e)=>setDay(e.target.value)}/>
                    <p className={"edit-text"}>.</p>
                    <textarea className={"better-textarea edit-textareas rounded centered"}
                              placeholder={"Month"} value={month} onChange={(e)=>setMonth(e.target.value)}/>
                    <p className={"edit-text"}>.</p>
                    <textarea className={"better-textarea edit-textareas rounded centered"}
                              placeholder={"Year"} value={year} onChange={(e)=>setYear(e.target.value)}/>
                </div>
            </div>
            <div className={"edit-date centered pad-gapped"}>
                <select className={"rounded better-textarea edit-textareas"} name="category" value={category} onChange={event => handleCategoryChange(event.target.value)}>
                    <option>Basic</option>
                    <option>Transport</option>
                    <option>Household</option>
                    <option>Health</option>
                    <option>Leisure & travel</option>
                    <option>Other</option>
                </select>
                <textarea className={"better-textarea edit-textareas rounded centered"}
                          placeholder={"Value"} value={value} onChange={(e)=>setValue(e.target.value)}/>
            </div>
            <div className={"pad-gapped edit-buttons"}>
                <Button className={"rounded edit-discard"} onClick={close}>Discard</Button>
                <Button className={"rounded edit-confirm"} onClick={handlePost}>Confirm</Button>
            </div>
        </div>
    </div>)
}
export default ExpenseEdit;