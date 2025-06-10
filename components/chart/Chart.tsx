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
import {getYearlyExpenses} from '@/services/expenses';
import {useQuery} from '@tanstack/react-query';
import Loading from '@/components/Loading';

export default function Chart() {

    // Fetches all the expenses
    const query = useQuery({
        queryKey: ['yearlyExpenses'],

        queryFn: getYearlyExpenses,
    });

    const {isLoading, data: expenses} = query;

    if (isLoading) {
        return <Loading fullScreen={false}/>;
    }


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
