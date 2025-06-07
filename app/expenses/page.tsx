import Navbar from '@/components/Navbar';
import ExpensesContainer from '@/components/expenses/ExpensesContainer';
import CreateExpense from '@/components/expenses/CreateExpense';

export default function Expenses() {
    return (
        <>
            <Navbar hideSignInButton={true} hideSignUpButton={true} hideLogoutButton={false} />

            <div className="flex flex-col px-2 md:flex-row w-full mt-4 items-start">
                {/* Create Expense Section */}
                <div className="w-full md:w-1/3 xl:w-1/4 lg:ml-16">
                    <CreateExpense />
                </div>

                {/* Expenses Table Section */}
                <div className="w-full md:w-2/3 lg:w-full mt-8 md:mt-0">
                    <ExpensesContainer />
                </div>
            </div>
        </>
    );

};
