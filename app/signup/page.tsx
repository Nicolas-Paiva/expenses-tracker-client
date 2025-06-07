import Navbar from '@/components/Navbar';
import AuthComponent from '@/components/auth/AuthComponent';

export default function SignUp() {
    return (
        <>
            <Navbar hideSignUpButton={true}/>
            <AuthComponent/>
        </>
    );
};
