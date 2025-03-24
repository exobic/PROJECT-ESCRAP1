import React, { useState } from 'react';
import Axios from 'axios';
import { jwtDecode } from "jwt-decode";

const LoginForm = () => {
  const [mobileNumber, setMobileNumber] = useState('+971');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await Axios.post(`${import.meta.env.VITE_REACT_APP_API_ENDPOINT}/auth/login`, { mobileNumber, password });
            if (response && response.data) {
                const token = response.data.token;
                const decodedToken = jwtDecode(token);
                const userRole = decodedToken.role;
                setRole(userRole);
                localStorage.setItem('token', token);
                localStorage.setItem('role', userRole);
                if (userRole === 'admin' || userRole === 'seller') {
                    window.location.href = '/';
                }
            } else {
                console.error('Login failed: Response data is undefined');
            }
        } catch (error) {
            if (error.response) {
                if (error.response.status === 404) {
                    alert("Invalid mobile number or password");
                } else {
                    alert("An error occurred during login. Please try again.");
                }
            } else {
                console.error('Login failed:', error.message);
            }
        }
    };

    return (
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                    Login
                </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="mobileNumber" className="block text-sm font-medium leading-6 text-gray-900">
                            Mobile Number
                        </label>
                        <div className="mt-2">
                            <input
                                id="mobileNumber"
                                name="mobileNumber"
                                type="text"
                                placeholder="Mobile Number"
                                value={mobileNumber}
                                onChange={(e) => setMobileNumber(e.target.value)}
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                            Password
                        </label>
                        <div className="mt-2">
                            <input
                                id="password"
                                name="password"
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Login
                        </button>
                    </div>
                </form>
                <p className='mt-3 text-center'>Don't have an account ?  <a className='text-indigo-600' href="/user/signup">Sign Up</a></p>
            </div>
        </div>
    );
};

export default LoginForm;
