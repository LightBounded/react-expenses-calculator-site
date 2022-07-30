import { useState } from "react";
import { BudgetForm } from "./components/BudgetForm";
import { ExpenseForm } from "./components/ExpenseForm";
import { ExpenseTable } from "./components/ExpenseTable";
import {
  CashIcon,
  CreditCardIcon,
  CurrencyDollarIcon,
} from "@heroicons/react/outline";

function App() {
  const [data, setData] = useState({
    budget: 0,
    expenses: [],
  });

  const calculateTotalExpenses = expenses => {
    return expenses
      .map(expense => parseFloat(expense.amount))
      .reduce((accumulator, currentValue) => accumulator + currentValue, 0);
  };

  const calculateBalance = (budget, totalExpenses) => budget - totalExpenses;

  return (
    <div className="flex flex-col w-max mx-auto p-8">
      <div className="text-3xl font-semibold uppercase text-center mb-6">Expenses Calculator</div>
      <div className="flex flex-col items-center gap-8 md:items-start md:flex-row">
        <div>
          <BudgetForm data={data} setData={setData} />
          <ExpenseForm data={data} setData={setData} />
        </div>
        <div className="flex flex-col items-center gap-8">
          <div className="flex gap-10">
            <div className="flex flex-col items-center">
              <div className="text-green-400 text-2xl font-bold uppercase">
                Budget
              </div>
              <CashIcon className="text-green-400 w-16 h-16" />
              <div className="text-green-400 text-xl font-semibold">
                ${data.budget}
              </div>
            </div>
            <div className="flex flex-col items-center">
              <div className="text-red-400 text-2xl font-bold uppercase">
                Expenses
              </div>
              <CreditCardIcon className="text-red-400 w-16 h-16" />
              <div className="text-red-400 text-xl font-semibold">
                ${calculateTotalExpenses(data.expenses)}
              </div>
            </div>
            <div className="flex flex-col items-center">
              <div className="text-blue-400 text-2xl font-bold uppercase">
                Balance
              </div>
              <CurrencyDollarIcon className="text-blue-400 w-16 h-16" />
              <div className="text-blue-400 text-xl font-semibold">
                $
                {calculateBalance(
                  data.budget,
                  calculateTotalExpenses(data.expenses)
                )}
              </div>
            </div>
          </div>
          <ExpenseTable data={data} setData={setData} />
        </div>
      </div>
    </div>
  );
}

export default App;
