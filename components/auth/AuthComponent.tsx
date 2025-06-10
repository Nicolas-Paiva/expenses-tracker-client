'use client';
import {useState} from 'react';
import {useMutation} from '@tanstack/react-query';
import {register, type AuthRequest, USERNAME_EXISTS, login, LoginResponse, SignUpResponse} from '@/services/auth';
import toast from 'react-hot-toast';
import {useRouter} from 'next/navigation';
import Loading from '@/components/Loading';

type AuthComponentProps = {
    signUp?: boolean
}

export default function AuthComponent({signUp = true}: AuthComponentProps) {
    // Used to create user credentials
    const [userName, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmationUsername, setConfirmationUsername] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    // Used to display error messages if the username or password is too short
    const [invalidUsername, setInvalidUsername] = useState(false);
    const [shortPassword, setShortPassword] = useState(false);

    // Used to display error messages to the user if the username or password does not match
    const [invalidUsernameConfirmation, setInvalidUsernameConfirmation] = useState(false);
    const [invalidPasswordConfirmation, setInvalidPasswordConfirmation] = useState(false);

    // Used to display a message when the provided username already exists
    const [usernameAlreadyExists, setUsernameAlreadyExists] = useState(false);

    const [badCredentials, setBadCredentials] = useState(false);

    const router = useRouter();

    const [loading, setLoading] = useState<boolean>(false);


    // Validates all the input provided by the user
    function validateForm(): boolean {
        let validUsername = true;
        let validConfirmationUsername = true;
        let validPassword = true;
        let validConfirmationPassword = true;

        if (userName.length < 3) {
            setInvalidUsername(true);
            validUsername = false;
        }

        if (userName !== confirmationUsername) {
            setInvalidUsernameConfirmation(true);
            validConfirmationUsername = false;
        }

        if (password.length < 8) {
            setShortPassword(true);
            validPassword = false;
        }

        if (password !== confirmPassword) {
            setInvalidPasswordConfirmation(true);
            validConfirmationPassword = false;
        }

        if (!validUsername || !validConfirmationUsername || !validPassword || !validConfirmationPassword) {
            return false;
        }

        return true;
    }


    const signUpMutation = useMutation({
        mutationFn: register,

        onSuccess: (data: SignUpResponse) => {
            console.log('sign up successful', data);
            toast.success('User created successfully!');
            router.push('/login')
        },

        onError: (error: Error) => {
            toast.error('User could not be created, please check your credentials');
            console.log(error);
            if (error.message == USERNAME_EXISTS) {
                setUsernameAlreadyExists(true);
            }
        }
    });


    /**
     * If successful, stores the JWT in local storage and redirects
     * the user to the expenses page.
     */
    const loginMutation = useMutation({
        mutationFn: login,

        onSuccess: (data: LoginResponse) => {
            localStorage.setItem('token', data.jwtToken);
            toast.success('Welcome back!');
            router.push('/expenses');
            setLoading(true);
        },

        onError: (error: Error) => {
            console.log(error);
            toast.error('Please check your credentials');
            setBadCredentials(true);
        }
    });


    function performLogin(): void {
        const loginRequest: AuthRequest = {userName, password};
        loginMutation.mutate(loginRequest);
    }


    // Verifies whether the provided data is valid
    // and sends it to the API
    function performSignUp(): void {
        const isFormValid = validateForm();

        const signUpRequest: AuthRequest = {userName, password};

        if (isFormValid) {
            signUpMutation.mutate(signUpRequest);
        }
    }

    if (loading) {
        return <Loading fullScreen={true}/>
    }

    return (
        <div className="hero bg-base-200 min-h-screen items-start pt-20">
            <div className="hero-content pt-10 md:w-2/3 flex-col">
                <div className="flex flex-col items-center text-center">
                    <h1 className="text-5xl md:text-6xl font-bold">{signUp ? 'Sign up now!' : 'Hello Again!'}</h1>
                    <p className={`${signUp && 'py-6'} md:text-xl w-80`}>
                        {signUp ? 'Register now and start taking care of what matters!' : ''}
                    </p>
                </div>

                {badCredentials &&
                    <div className="alert alert-error flex justify-center w-full max-w-sm">
                        <p className="">Invalid username or password</p>
                    </div>
                }

                <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                    <div className="card-body">
                        <fieldset className="fieldset"
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                if (signUp) {
                                    performSignUp()
                                    return;
                                }
                                performLogin();
                            }
                        }}>

                            {/* Username */}
                            <label className="label">Username</label>
                            <input type="text"
                                   className="input"
                                   placeholder="Username"
                                   onChange={(e) => setUsername(e.target.value)}
                                   onClick={() => {
                                       setInvalidUsername(false);
                                       setUsernameAlreadyExists(false);
                                   }}
                            />

                            {invalidUsername &&
                                <p className={'text-sm text-error'}>Username must have at least 3 characters</p>}

                            {usernameAlreadyExists && <p className={'text-sm text-error'}>Username already exists</p>}

                            {/* Confirmation Username */}
                            {signUp &&
                                <>
                                    <label className="label mt-4">Confirm username</label>
                                    <input type="text"
                                           className="input"
                                           placeholder="Username"
                                           onChange={(e) => setConfirmationUsername(e.target.value)}
                                           onClick={() => setInvalidUsernameConfirmation(false)}
                                    />
                                </>
                            }
                            {invalidUsernameConfirmation && <p className={'text-sm text-error'}>Username must match</p>}

                            {/* Password */}
                            <label className="label mt-4">Password</label>
                            <input type="password"
                                   className="input"
                                   placeholder="Password"
                                   onChange={(e) => setPassword(e.target.value)}
                                   onClick={() => setShortPassword(false)}
                            />
                            {shortPassword &&
                                <p className={'text-sm text-error'}>Password must have at least 8 characters</p>}

                            {/* Confirmation Password */}
                            {signUp &&
                                <>
                                    <label className="label mt-4">Confirm password</label>
                                    <input type="password"
                                           className="input"
                                           placeholder="Password"
                                           onChange={(e) => setConfirmPassword(e.target.value)}
                                           onClick={() => setInvalidPasswordConfirmation(false)}
                                    />
                                </>
                            }
                            {invalidPasswordConfirmation && <p className={'text-sm text-error'}>Password must match</p>}

                            {
                                signUp ? '' : <div><a className="link link-hover">Forgot password?</a></div>
                            }

                            <button
                                className="btn btn-primary mt-4"
                                onClick={signUp ? () => performSignUp() :
                                    () => performLogin()}>
                                {signUp ? 'Sign up' : 'Login'}
                            </button>
                        </fieldset>
                        <div className="mt-4">
                            <span>{signUp ? 'Already have an account?' : 'Don\'t have an account?'}</span>
                            <a href={signUp ? '/login' : '/signup'}
                               className="link link-accent ml-2">
                                {signUp ? 'Login' : 'Register here'}
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
