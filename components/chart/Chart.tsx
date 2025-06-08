'use client';

import {
    LineChart,
    Line,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    ResponsiveContainer
} from 'recharts';
import {Expense, getExpenses, getYearlyExpenses, YearlyExpense} from '@/services/expenses';
import {useQuery} from '@tanstack/react-query';
import {ISOStringToDate} from '@/utils/utils';

// TODO: Make the chart get the expenses from the /yearly endpoint

export default function Chart() {

    // Fetches all the expenses
    const query = useQuery({
        queryKey: ['yearlyExpenses'],

        queryFn: getYearlyExpenses,
    });

    const {isLoading, data: expenses} = query;

    if (isLoading) {
        return (
            <span className="block mx-auto loading loading-spinner text-primary w-12"></span>
        )
    }

    console.log(expenses);

    // const newExpenses = expenses?.map((expense: YearlyExpense) => {
    //     const {value, createdAt} = expense;
    //     return {value, createdAt: ISOStringToDate(createdAt)};
    // })

    return (
        <div className="h-120 w-full">
            <ResponsiveContainer width="100%" height="100%">
                <LineChart data={expenses}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month"/>
                    <YAxis/>
                    <Tooltip/>
                    <Legend/>
                    <Line type="monotone" dataKey="value" stroke="#8884d8" activeDot={{r: 8}}/>
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};
