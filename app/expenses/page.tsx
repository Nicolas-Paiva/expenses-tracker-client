import Navbar from '@/components/Navbar';
import ExpensesContainer from '@/components/expenses/ExpensesContainer';
import CreateExpense from '@/components/expenses/CreateExpense';
import Chart from '@/components/chart/Chart';

export default function Expenses() {
    return (
        <>
            <Navbar hideSignInButton={true} hideSignUpButton={true} hideLogoutButton={false}/>

            <section className="flex flex-col items-center gap-y-12 mx-auto w-[90%]">

                <h1 className="my-6 w-[90%] text-xl">Hello there!</h1>

                {/* Expenses container */}
                <div className="flex flex-col items-center gap-y-12
                 md:flex-row md:gap-x-8 lg:justify-between w-[90%] mt-4">
                        <CreateExpense/>
                        <ExpensesContainer/>
                </div>

                <Chart/>

            </section>
        </>
    );

};
