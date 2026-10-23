import "../styles.css"
import Toolbar from "../components/Toolbar.tsx";
import ExpenseList from "../components/ExpenseList.tsx";
import { FaHouseChimney } from "react-icons/fa6";
import {FaCar, FaMoneyBillWave, FaRegCreditCard} from "react-icons/fa";
import {IoMdHeart} from "react-icons/io";
import {BiSolidDrink} from "react-icons/bi";
import {ExpensesProvider} from "../ExpensesProvider.tsx";
import ExpensesPieChart from "../components/ExpensesPieChart.tsx";
import * as React from "react";
function Expenses() {
  let user = localStorage.getItem('user');
  if (!user){
    user=""
  }
  return (
    <ExpensesProvider user={user}>
      <div className="full-page vertical">
        <Toolbar/>
        <div className="expenses-content">
          <div className={"expenses-lists vertical pad-gapped"}>
            <div className={"expense-list-row centered"}>
              <ExpenseList title={"Basic"} color={"#EC0D84"}
                           icon={<FaRegCreditCard  className={"expense-icon"} style={{"--color-assigned":"#EC0D84"}  as React.CSSProperties}/>}/>
              <ExpenseList title={"Transport"} color={"#008787"}
                           icon={<FaCar className={"expense-icon"} style={{"--color-assigned":"#008787"}  as React.CSSProperties}/>}/>
              <ExpenseList title={"Household"} color={"#835FE5"}
                           icon={<FaHouseChimney className={"expense-icon"} style={{"--color-assigned":"#835FE5"} as React.CSSProperties}/>}/>
            </div>
            <div className={"expense-list-row centered"}>
              <ExpenseList title={"Health"} color={"#83CA9F"}
                           icon={<IoMdHeart className={"expense-icon"} style={{"--color-assigned":"#83CA9F"} as React.CSSProperties}/>}/>
              <ExpenseList title={"Leisure & travel"} color={"#FA8073"}
                           icon={<BiSolidDrink className={"expense-icon"} style={{"--color-assigned":"#FA8073"} as React.CSSProperties}/>}/>
              <ExpenseList title={"Other"} color={"#3164DE"}
                           icon={<FaMoneyBillWave className={"expense-icon"} style={{"--color-assigned":"#3164DE"} as React.CSSProperties}/>}/>
            </div>
          </div>
          <div className={"expenses-chart vertical centered"}>
            <p className={"chart-title"}>Expenses</p>
            <ExpensesPieChart negative={true}/>
            <p className={"chart-title"}>Incomes</p>
            <ExpensesPieChart negative={false}/>
          </div>
        </div>
      </div>
    </ExpensesProvider>
  )
}

export default Expenses
