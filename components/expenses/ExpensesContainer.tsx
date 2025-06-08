'use client';

import ExpenseRow from '@/components/expenses/ExpenseRow';
import {Expense, getExpenses} from '@/services/expenses';
import {useQuery} from '@tanstack/react-query';
import Loading from '@/components/Loading';

// TODO: modify API method to PUT

export default function ExpensesContainer() {

    // Fetches all the expenses
    const query = useQuery({
        queryKey: ['expenses'],

        queryFn: getExpenses,
    });

    const isLoading = query.isLoading;
    const expenses: Expense[] | undefined = query.data;


    if (isLoading) {
        return (
            <div
                className="flex items-center justify-center h-110 w-full lg:w-1/3 rounded border border-base-300 shadow-lg">
                <Loading fullScreen={false}/>
            </div>
        );
    }

    if (!expenses || expenses.length === 0) {
        return (
            <div
                className="flex items-center justify-center h-110 w-full lg:w-1/3 rounded border border-base-300 shadow-lg">
                <h1 className="text-xl text-primary text-center my-8">Create an expense!</h1>
            </div>
        );
    }

    return (
        <>
            <div className="h-110 w-full lg:w-[60%] overflow-y-auto rounded border border-base-300 shadow-lg">
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
                    {expenses?.map((expense: Expense) => (
                        <ExpenseRow key={expense.id} expense={expense}/>
                    ))}
                    </tbody>
                </table>
            </div>
        </>
    );

};
