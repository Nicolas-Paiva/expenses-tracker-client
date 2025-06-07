'use client';

import ExpenseRow from '@/components/expenses/ExpenseRow';
import {getExpenses} from '@/services/expenses';
import {useQuery} from '@tanstack/react-query';

// TODO: modify API method to PUT
// TODO: Display message if there is no expense

export default function ExpensesContainer() {


    // Fetches all the expenses
    const {data: expenses, isLoading, isError} = useQuery({
        queryKey: ['expenses'],

        queryFn: getExpenses
    })


    if (isLoading) {
        return <span className="block mx-auto loading loading-spinner text-primary w-12"></span>;
    }

    return (
        <>
            <div className="h-110 overflow-y-auto md:w-2/3
             mx-auto rounded border border-base-300 shadow-lg">
                <table className="table">
                    {/* head */}
                    <thead>
                    <tr>
                        <th className="text-accent">Value</th>
                        <th className="hidden md:block text-accent">Category</th>
                        <th className="text-accent">Created at</th>
                    </tr>
                    </thead>
                    <tbody>
                    {expenses?.map((expense) => (
                        <ExpenseRow key={expense.id} expense={expense}/>
                    ))}
                    </tbody>
                </table>
            </div>
        </>
    );
};
