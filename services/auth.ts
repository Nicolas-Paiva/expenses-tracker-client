import customFetch from '@/config/axiosConfig';

export type AuthRequest = {
    userName: string,
    password: string
}

export type SignUpResponse = {
    created: boolean,
    message: string
}

export const USERNAME_EXISTS = 'Username already exists';

export type LoginResponse = {
    success: boolean,
    jwtToken: string
}


/**
 * Sends a signup request to the register endpoint.
 * Returns a SignUpResponse
 */
export async function register(signUpRequest: AuthRequest): Promise<SignUpResponse> {
    const response = await customFetch.post('/register', signUpRequest);
    return response.data;
}

/**
 * Sends a login request to the register endpoint.
 * Returns a LoginResponse
 */
export async function login(loginRequest: AuthRequest): Promise<LoginResponse> {
    const response = await customFetch.post('/login', loginRequest);
    return response.data;
}


/**
 * Logs the user out, removing the JWT token
 * from local storage
 */
export function logOut() {
    localStorage.removeItem('token');
}
