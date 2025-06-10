import customFetch from '@/config/axiosConfig';

export type Expense = {
    id?: number,
    value: number,
    category: string,
    createdAt: string
}

// export type YearlyExpense = {
//     value: number,
//     month: string
// }


/**
 * Retrieves a list with all the expenses
 */
export async function getExpenses(): Promise<Expense[]> {
    const response = await customFetch.get('/expenses');
    return response.data;
}

export async function getYearlyExpenses(){
    const response = await customFetch.get('/expenses/yearly')
    return response.data;
}


/**
 *
 */
export async function createExpense(expense: Expense) {
    const response = await customFetch.post('/expenses', expense);
    return response.data;
}


/**
 * Sends an expense to the server which
 * will be used to update the specified
 * expense.
 */
export async function updateExpense(expense: Expense): Promise<Expense> {
    const response = await customFetch
        .patch(`/expenses/${expense.id}`, expense);
    return response.data;
}


/**
 * Sends a request to delete an expense
 */
export async function deleteExpense(expense: Expense) {
    const response = await customFetch
        .delete(`/expenses/${expense.id}`);
    return response.data;
}