import { useState } from "react";
import { PencilAltIcon, TrashIcon } from "@heroicons/react/outline";
import EditExpenseModal from "./EditExpenseModal.jsx";

export const ExpenseTable = ({ data, setData }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState({});

  return data.expenses.length === 0 ? (
    <div>
      <div class="text-2xl">Oops! Nothing here!</div>
      <div>
        Fill out the form to see inputted details <br />
        In the mean time, here is a cake 🍰
      </div>
    </div>
  ) : (
    <>
      <table className="divide-y w-max">
        <thead>
          <tr className="">
            <th scope="col" className="px-6 py-1 font-semibold uppercase">
              Title
            </th>
            <th scope="col" className="px-6 py-1 font-semibold uppercase">
              Amount
            </th>
            <th scope="col" className="px-6 py-1 font-semibold uppercase">
              Action
            </th>
          </tr>
        </thead>
        <tbody className="divide-y">
          {data.expenses.map(expense => (
            <tr key={expense.id}>
              <td className="px-6 py-3 whitespace-nowrap">{expense.title}</td>
              <td className="px-6 py-3 whitespace-nowrap">{expense.amount}</td>
              <td className="flex px-6 py-3 whitespace-nowrap">
                <PencilAltIcon
                  onClick={() => {
                    setIsOpen(true);
                    setSelectedExpense(expense);
                  }}
                  className="w-6 h-6 text-yellow-400 cursor-pointer"
                />
                <TrashIcon
                  onClick={() =>
                    setData({
                      ...data,
                      expenses: data.expenses.filter(
                        element => element.id !== expense.id
                      ),
                    })
                  }
                  className="w-6 h-6 text-red-400 cursor-pointer"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <EditExpenseModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        data={data}
        setData={setData}
        selectedExpense={selectedExpense}
      />
    </>
  );
};
