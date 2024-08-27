'use client'
import React, { useState } from 'react';
import bgImage from '../public/bgImage.png';
import loginSignup from '../public/loginSignup.png';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import axios from 'axios';

export default function Page() {
    const pathname = usePathname();
    const router = useRouter();

    const [loginData, setLoginData] = useState({
        email: "",
        password: ""
    });

    const [showPassword, setShowPassword] = useState(false);

    const [errors, setErrors] = useState({});

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLoginData({ ...loginData, [name]: value });
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const validateForm = () => {
        const newErrors = {};

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(loginData.email)) {
            newErrors.email = "Invalid email format";
        }

        if (!loginData.email) newErrors.email = "Email is required";

        return newErrors;
    };

    const handleSignIn = async (e) => {
        e.preventDefault();

        const validationErrors = validateForm();

        if (!validationErrors) {
            setErrors(validationErrors);
            return;
        }

        setLoading(true);

        const loginDataaa = {
            adminEmail: loginData.email,
            adminPassword: loginData.password
        }

        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_URL}/admin/login`, loginDataaa);
            console.log('Admin logged in successfully', response.data);
            localStorage.setItem("adminToken", response.data.token)
            localStorage.setItem("adminName", response.data.adminName)
            localStorage.setItem("adminEmail", response.data.adminEmail)
            localStorage.setItem("adminGender", response.data.adminGender)
            setTimeout(() => {
                router.push('/admin');
            }, 2000);

        } catch (error) {
            console.error('Error registering admin:', error);
            setLoading(false);
        }
    };

    return (
        <div
            style={{
                backgroundImage: `url(${bgImage.src})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
            className='flex flex-col justify-center items-center min-h-screen px-4 py-8'
        >
            <div
                className='flex flex-col justify-center items-center rounded-md bg-[#E6EEF8] px-10 py-10 shadow-lg xl:w-[60%] lg:w-[80%] md:w-[50%] sm:w-full w-full'
            >
                <p className='text-3xl text-[#082777] font-semibold mb-4'>InsightHub</p>
                <div className='flex flex-col lg:flex-row items-center lg:gap-10 gap-4'>
                    <Image src={loginSignup} alt="Login" className='w-[400px] h-[300px] lg:block hidden' />
                    <div className='w-full lg:border-l-2 lg:border-[#D3E2F4] lg:pl-8'>
                        <div className='flex gap-4 mb-8'>
                            <Link href="/">
                                <p className={`text-[#4B93E7] text-xl ${pathname === "/" ? 'font-semibold text-2xl border-b-2 border-[#F7AC25]' : ''}`}>Login</p>
                            </Link>
                            <Link href="/administrator/register">
                                <p className={`text-[#4B93E7] text-xl ${pathname === "/administrator/register" ? 'font-semibold text-2xl border-b-2 border-orange-500' : ''}`}>Sign Up</p>
                            </Link>
                        </div>
                        <form className="space-y-6">
                            <div className="relative group">
                                <input
                                    type="email"
                                    name="email"
                                    id="floating_email"
                                    className={`block py-2.5 w-full px-3 text-sm font-semibold text-[#082777] bg-transparent border-0 border-b-2 ${errors.email ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-0 focus:border-[#4B93E7] peer`}
                                    placeholder=" "
                                    value={loginData.email}
                                    onChange={handleChange}
                                />
                                <label
                                    htmlFor="floating_email"
                                    className="absolute text-sm text-[#082777] duration-300 transform -translate-y-6 scale-75 top-3 origin-[0] peer-focus:text-[#082777] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                                >
                                    Email address
                                </label>
                                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                            </div>
                            <div className="relative group">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    name="password"
                                    id="floating_password"
                                    className={`block py-2.5 w-full px-3 text-sm font-semibold text-[#082777] bg-transparent border-0 border-b-2 ${errors.password ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-0 focus:border-[#4B93E7] peer`}
                                    placeholder=" "
                                    value={loginData.password}
                                    onChange={handleChange}
                                />
                                <label
                                    htmlFor="floating_password"
                                    className="absolute text-sm text-[#082777] duration-300 transform -translate-y-6 scale-75 top-3 origin-[0] peer-focus:text-[#082777] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                                >
                                    Password
                                </label>
                                <div
                                    className="absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer"
                                    onClick={togglePasswordVisibility}
                                >
                                    {showPassword ? <FaEye color='#91BDF5' /> : <FaEyeSlash color='#91BDF5' />}
                                </div>
                                {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-[#F7AC25] text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                                disabled={loading}
                                onClick={handleSignIn}
                            >
                                {loading ? 'Logging you in...' : 'Login'}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}