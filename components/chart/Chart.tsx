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
import {Expense, getExpenses} from '@/services/expenses';
import {useQuery} from '@tanstack/react-query';
import {ISOStringToDate} from '@/utils/utils';

const data = [
    {
        name: 'Page A',
        uv: 4000,
        pv: 2400,
        amt: 2400,
    },
    {
        name: 'Page B',
        uv: 3000,
        pv: 1398,
        amt: 2210,
    },
    {
        name: 'Page C',
        uv: 2000,
        pv: 9800,
        amt: 2290,
    },
    {
        name: 'Page D',
        uv: 2780,
        pv: 3908,
        amt: 2000,
    },
    {
        name: 'Page E',
        uv: 1890,
        pv: 4700,
        amt: 2181,
    },
    {
        name: 'Page F',
        uv: 2390,
        pv: 3800,
        amt: 2500,
    },
    {
        name: 'Page G',
        uv: 3490,
        pv: 4300,
        amt: 2100,
    },
];
export default function Chart() {

    // Fetches all the expenses
    const query = useQuery({
        queryKey: ['expenses'],

        queryFn: getExpenses,
    });

    const {isLoading, data: expenses} = query;

    if (isLoading) {
        return (
            <span className="block mx-auto loading loading-spinner text-primary w-12"></span>
        )
    }

    const newExpenses = expenses?.map((expense: Expense) => {
        const {value, createdAt} = expense;
        return {value, createdAt: ISOStringToDate(createdAt)};
    })

    return (
        <div className="h-120 w-full">
            <ResponsiveContainer width="100%" height="100%">
                <LineChart data={newExpenses}>
                    {/*<CartesianGrid strokeDasharray="3 3" />*/}
                    <XAxis dataKey="createdAt"/>
                    <YAxis/>
                    <Tooltip/>
                    <Legend/>
                    <Line type="monotone" dataKey="value" stroke="#8884d8" activeDot={{r: 8}}/>
                    {/*<Line type="monotone" dataKey="uv" stroke="#82ca9d"/>*/}
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};
