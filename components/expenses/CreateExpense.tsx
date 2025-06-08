'use client';
import {useState} from 'react';
import {convertToISOString, convertToNumber} from '@/utils/utils';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import {createExpense} from '@/services/expenses';
import toast from 'react-hot-toast';


export default function CreateExpense() {
    const [value, setValue] = useState<string>('1.99');
    const [category, setCategory] = useState<string>('Groceries');
    const [createdAt, setCreatedAt] = useState<string>('');

    const [valueError, setValueError] = useState<boolean>(false);
    const [dateError, setDateError] = useState<boolean>(false);

    const queryClient = useQueryClient();

    const addExpenseMutation = useMutation({
        mutationFn: createExpense,

        onSuccess: () => {
            toast.success('Expense created!');
            queryClient.invalidateQueries({queryKey: ['expenses']});
            queryClient.invalidateQueries({queryKey: ['yearlyExpenses']});
        },

        onError: () => {
            toast.error('Error creating expense, please try again');
        }
    });


    function addExpense(): void {
        if (!value) {
            setValue('1.99');
        }

        if (!createdAt) {
            setDateError(true);
            return;
        }

        const expense = {
            value: convertToNumber(value),
            category,
            createdAt: convertToISOString(createdAt)
        };

        addExpenseMutation.mutate(expense);
    }


    return <fieldset className="fieldset h-auto w-full md:w-2/3 lg:w-1/3 md:h-110 bg-base-200 border-base-300 rounded-box border p-4">

        <h3 className="text-xl">Create an expense</h3>

        <label className="label">Value</label>
        <input className="input"
               type="number"
               step={0.5}
               min={1}
               defaultValue={value}
               onChange={(e) => {
                   const input = e.target.value;

                   if (!input) {
                       setValueError(true);
                   } else {
                       setValueError(false);
                   }

                   setValue(input);
               }}
        />
        {valueError && <span className="text-xs text-error">Provide a valid value, ex: 12.35</span>}

        <label className="label hidden md:inline-flex mt-1">Category</label>
        <input type="text"
               className="input hidden md:inline-flex"
               defaultValue={category}
               onChange={(e) => setCategory(e.target.value)}
        />

        <label className="label mt-1">Created at</label>
        <input type="date"
               className="input"
               onClick={() => setDateError(false)}
               onChange={(e) => {
                   setCreatedAt(e.target.value);
               }}
        />
        {dateError && <span className="text-xs text-error">Provide a valid date</span>}


        <div className="flex flex-row justify-between md:flex-col">
            <button className={`btn ${(dateError || valueError) ? 'btn-disabled' : 'btn-primary'} mt-4 w-1/3 lg:w-1/2`}
                    onClick={addExpense}>Create
            </button>
            <button className="btn btn-error mt-4 w-1/3 lg:w-1/2">Clear</button>
        </div>
    </fieldset>;
};
