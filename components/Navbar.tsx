'use client';
import Link from 'next/link';
import {useEffect, useState} from 'react';
import {logOut} from '@/services/auth';
import {useRouter} from 'next/navigation';
import toast from 'react-hot-toast';

type NavbarProps = {
    hideSignUpButton?: boolean,
    hideSignInButton?: boolean,
    hideLogoutButton?: boolean
}

const lightTheme = 'corporate';
const darkTheme = 'business';

export default function Navbar({
                                   hideSignUpButton = false,
                                   hideSignInButton = false,
                                   hideLogoutButton = true
                               }: NavbarProps) {

    const [theme, setTheme] = useState('');

    const router = useRouter();

    // Syncs theme on mount
    useEffect(() => {
        const storedTheme: string | null = localStorage.getItem('theme');
        const initialTheme: string = storedTheme || darkTheme;

        document.documentElement.setAttribute('data-theme', initialTheme);
        setTheme(initialTheme);
    }, []);


    function toggleTheme(): void {
        if (!theme) return; // Don't toggle until theme is initialized

        const newTheme = theme === darkTheme ? lightTheme : darkTheme;
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        setTheme(newTheme);
    }


    return (
        <nav>
            <div
                className="flex navbar bg-neutral text-neutral-content items-center justify-between md:px-12 lg:px-24">
                {/* Hero text */}
                <Link href={'/'}>
                    <div className="text-3xl font-extrabold tracking-tight">
                        <span className="text-accent">Expense</span>
                        <span className="text-gray-800 dark:text-white">Mate</span>
                    </div>
                </Link>

                {/*Theme toggle, Sign up, Log-in container*/}
                <div className="flex md:gap-x-8 items-center">
                    <label className="swap swap-rotate">
                        {/* this hidden checkbox controls the state */}
                        <input type="checkbox"
                               onClick={() => toggleTheme()}
                               className="theme-controller absolute opacity-0 w-0 h-0"
                               value="synthwave"/>

                        {/* sun icon */}
                        <svg
                            className="swap-off h-10 w-10 fill-current align-middle"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24">
                            <path
                                d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z"/>
                        </svg>

                        {/* moon icon */}
                        <svg
                            className="swap-on h-10 w-10 fill-current"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24">
                            <path
                                d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z"/>
                        </svg>
                    </label>
                    {hideSignUpButton ? '' :
                        <Link href="/signup">
                            <button
                                className="btn btn-ghost md:btn-outline btn-sm text-lg underline md:no-underline">Sign
                                up
                            </button>
                        </Link>}
                    {hideSignInButton ? '' :
                        <Link href="/login">
                            <button
                                className="btn btn-ghost md:btn-outline btn-sm text-lg underline md:no-underline">Login
                            </button>
                        </Link>}

                    {hideLogoutButton ? '' :
                        <button onClick={() => {
                            logOut();
                            toast.success('Logged out successfully!');
                            router.push('/');
                        }}
                                className="btn btn-ghost md:btn-outline btn-sm text-lg underline md:no-underline">Logout
                        </button>
                    }
                </div>
            </div>
        </nav>
    );
}

