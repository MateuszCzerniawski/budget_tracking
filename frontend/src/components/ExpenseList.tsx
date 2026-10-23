import { FaPlus } from "react-icons/fa";
import ExpenseView from "./ExpenseView.tsx";
import {type ReactNode, useState} from "react";
import {useExpenses} from "../ExpensesContext.tsx";
import ExpenseEdit from "./ExpenseEdit.tsx";
import * as React from "react";
interface ExpenseListProps {
    title: string;
    color: string;
    icon: ReactNode;
}

function ExpenseList({title, color,icon}: ExpenseListProps) {
    const { expenses, refresh } = useExpenses();
    const [addMode, setAddMode] = useState(false);
    return (<div className="expense-list rounded" style={{"--color-assigned":color}  as React.CSSProperties}>
        <div style={{height:'0.5em', display: 'flex'}}/>
        <div className="expense-list-header centered">
            {icon}
            <p className="expense-list-title centered" style={{"--color-assigned":color} as React.CSSProperties}>{title}</p>
            <FaPlus className="expense-list-button" style={{"--color-assigned":color} as React.CSSProperties} onClick={()=>setAddMode(true)}/>
        </div>
        <div className={"expense-list-content vertical"}>
            <div style={{height:'1em', display: 'flex'}}/>
            {(expenses[title] ?? []).map((item) => (
                <ExpenseView expense={item} category={title} color={color}/>
            ))}
        </div>
        {addMode && <ExpenseEdit initialColor={color} initialCategory={title} close={()=>{
            setAddMode(false);
            refresh();
        }}/>}
    </div>)
}
export default ExpenseList;