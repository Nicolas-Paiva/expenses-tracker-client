import {convertToISOString, convertToNumber, ISOStringToDate, displayValue} from '@/utils/utils';
import {MdDeleteOutline, MdModeEdit} from 'react-icons/md';
import {deleteExpense, Expense, updateExpense} from '@/services/expenses';
import {useState} from 'react';
import ExpenseRowInput from '@/components/expenses/ExpenseRowInput';
import {FaRegSave} from 'react-icons/fa';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import toast from 'react-hot-toast';

type ExpenseRowProps = {
    expense: Expense,
}

export default function ExpenseRow({expense}: ExpenseRowProps) {
    const {id, value, category, createdAt} = expense;

    // Used when editing rows
    const [editing, setEditing] = useState<boolean>(false);
    const [editedExpense, setEditedExpense] = useState<Expense>(expense);

    // Used for displaying errors
    const [errorMessage, setErrorMessage] = useState<boolean>(false);


    /**
     * Used in order to display an error when the
     * user provides invalid data as well as to remove
     * the error when the user is providing valid data
     */
    function handleValueInput(newVal: string): void {
        setEditedExpense(prevState => {
            if (!newVal) {
                setErrorMessage(true);
            } else {
                setErrorMessage(false);
            }
            return {...prevState, value: convertToNumber(newVal) || value};
        });
    }


    const queryClient = useQueryClient();

    /**
     * Mutation used to update the expense.
     * If the data provided is valid, the
     * expense is updated on the server,
     * and data is fetched again.
     *
     * If data is invalid, the user will see
     * an error message, and data in the server
     * will not be updated.
     */
    const updateMutation = useMutation({
        mutationFn: updateExpense,

        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['expenses']});
            setEditing(false);
            toast.success('Expense updated!');
            setErrorMessage(false);
        },

        onError: () => {
            setErrorMessage(true);
            toast.error('Invalid data. Please try again');
        },
    });

    const deleteMutation = useMutation({
        mutationFn: deleteExpense,

        onSuccess: () => {
            toast.success('Expense deleted');
            queryClient.invalidateQueries({queryKey: ['expenses']});
        },

        onError: () => {
            toast.error('Failed to delete expense');
        }
    });


    /**
     * Updates the expense currently
     * being modified
     */
    function update(): void {
        const updatedExpense = {
            ...editedExpense,
            createdAt: convertToISOString(editedExpense.createdAt)
        };
        updateMutation.mutate(updatedExpense);
        setEditing(false);
    }


    return (
        // OnChange is passed down so that when the input changes,
        // the state is also modified
        <tr key={id} className="group hover:bg-base-200 h-20 relative">

            {/* Value */}
            <td>{editing ?
                <ExpenseRowInput expense={expense}
                                 onChange={(newVal: string): void => handleValueInput(newVal)}
                                 type="value"/> :
                <p>{displayValue(value)}</p>}
                {errorMessage &&
                    <span className="text-xs text-error absolute bottom-0 left-2">Value format: 12.34</span>}
            </td>


            {/* Category */}
            <td className={`hidden md:block ${editing ?" md:mt-2" : "md:mt-4"}`}>{editing ?
                <ExpenseRowInput expense={expense}
                                 onChange={(newCat: string): void =>
                                     setEditedExpense(prevState => ({...prevState, category: newCat}))}
                                 type="category"/> :
                <p>{category}</p>}
            </td>


            {/* Created at */}
            <td className="">{editing ?
                <ExpenseRowInput expense={expense}
                                 onChange={(newDate: string): void =>
                                     setEditedExpense(prevState => ({...prevState, createdAt: newDate}))}
                                 type="date"/> :
                <p>{ISOStringToDate(createdAt)}</p>}
            </td>

            {/* EDIT / DELETE Icons (MD view) */}
            <td className="hidden md:table-cell align-middle">
                <div className="flex items-center justify-center h-full">
                    {editing ? (
                        <FaRegSave
                            size={18}
                            className="hover:text-green-600"
                            onClick={() => update()}
                        />
                    ) : (
                        <div className="flex gap-x-2">
                            <MdDeleteOutline
                                size={18}
                                className="hover:text-red-600"
                                onClick={() => deleteMutation.mutate(expense)}
                            />
                            <MdModeEdit
                                size={18}
                                className="hover:text-blue-600"
                                onClick={() => {
                                    setEditing(true);
                                    setErrorMessage(false);
                                }}
                            />
                        </div>
                    )}
                </div>
            </td>


            {/* For small screens: display icon normally in flow */}
            <td className="md:hidden">
                {editing ?
                    <FaRegSave size={16} onClick={() => update()}/>
                    :
                    <div className="flex w-full justify-between">
                        <MdDeleteOutline size={16} onClick={() => deleteMutation.mutate(expense)}/>
                        <MdModeEdit size={16} onClick={() => {
                            setEditing(true);
                            setErrorMessage(false);
                        }}/>
                    </div>}
            </td>
        </tr>
    );
};
