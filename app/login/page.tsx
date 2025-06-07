import Navbar from '@/components/Navbar';
import AuthComponent from '@/components/auth/AuthComponent';

export default function Login() {
    return (
        <>
            <Navbar hideSignInButton={true}/>
            <AuthComponent signUp={false}/>
        </>
    );
};
